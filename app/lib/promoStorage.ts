import { query } from "@/lib/db";
import type { PromoCode } from "@/enrol/constants";
import type { PlanType } from "@/lib/constants";

export interface PromoCodeValidation {
  valid: boolean;
  reason?: string;
  promoCode?: PromoCode;
}

const validatePromoCode = async (
  code: string,
  plan?: PlanType,
  checkoutEmail?: string,
): Promise<PromoCodeValidation> => {
  try {
    const result = await query(
      "SELECT * FROM promo_codes WHERE code = $1 AND is_active = true",
      [code.toUpperCase()],
    );

    if (result.rows.length === 0) {
      return { valid: false, reason: "Invalid promo code" };
    }

    if (plan === "online") {
      return {
        valid: false,
        reason:
          "Discounts do not apply to the Online plan — fixed term price only.",
      };
    }

    if (plan === "trial") {
      return {
        valid: false,
        reason: "Discounts do not apply to the Diagnostic Discovery session.",
      };
    }

    const [row] = result.rows;

    // Check expiration
    if (row.expires_at && new Date() > new Date(row.expires_at)) {
      return { valid: false, reason: "This promo code has expired" };
    }

    // Check usage limits
    if (row.max_uses && row.current_uses >= row.max_uses) {
      return {
        valid: false,
        reason: "This promo code has reached its usage limit",
      };
    }

    const allowedPlans = row.allowed_plans as PlanType[];

    // Check plan compatibility if plan is provided
    if (plan && allowedPlans && !allowedPlans.includes(plan)) {
      return {
        valid: false,
        reason: `This promo code is not valid for the ${plan} plan`,
      };
    }

    if (row.owner_email && checkoutEmail) {
      const owner = (row.owner_email as string).toLowerCase().trim();
      const checkout = checkoutEmail.toLowerCase().trim();
      if (owner !== checkout) {
        return {
          valid: false,
          reason:
            "This reward code is linked to a different email address. Sign in with the email that received it.",
        };
      }
    } else if (row.owner_email && !checkoutEmail) {
      return {
        valid: false,
        reason: "Enter your email address before applying this reward code.",
      };
    }

    const promoCode: PromoCode = {
      discountCents: parseInt(row.discount_cents),
      description: row.description,
      maxUses: row.max_uses,
      expiresAt: row.expires_at,
      isActive: row.is_active,
      allowedPlans,
    };

    return { valid: true, promoCode };
  } catch (error) {
    console.error("Error validating promo code:", error);
    return { valid: false, reason: "Error validating promo code" };
  }
};

const incrementUsage = async (code: string): Promise<void> => {
  try {
    await query(
      "UPDATE promo_codes SET current_uses = current_uses + 1 WHERE code = $1",
      [code.toUpperCase()],
    );
  } catch (error) {
    console.error("Error incrementing promo code usage:", error);
  }
};

const createPromoCode = async (data: {
  code: string;
  discountCents: number;
  description: string;
  maxUses?: number | null;
  expiresAt?: string | null;
  allowedPlans?: PlanType[];
  ownerEmail?: string | null;
}): Promise<void> => {
  try {
    // Default: term plans that accept discounts (not Online, not Diagnostic)
    const allowedPlans = data.allowedPlans ?? ["essential", "intensive"];
    const ownerEmail = data.ownerEmail
      ? data.ownerEmail.toLowerCase().trim()
      : null;
    await query(
      `INSERT INTO promo_codes (code, discount_cents, description, max_uses, expires_at, allowed_plans, owner_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        data.code.toUpperCase(),
        data.discountCents,
        data.description,
        data.maxUses,
        data.expiresAt,
        allowedPlans,
        ownerEmail,
      ],
    );
  } catch (error) {
    console.error("Error creating promo code:", error);
    throw error;
  }
};

const getAllPromoCodes = async (): Promise<Record<string, PromoCode>> => {
  try {
    const result = await query(
      "SELECT * FROM promo_codes WHERE is_active = true",
    );
    const promoCodes: Record<string, PromoCode> = {};

    result.rows.forEach((row) => {
      promoCodes[row.code] = {
        discountCents: parseInt(row.discount_cents),
        description: row.description,
        maxUses: row.max_uses,
        expiresAt: row.expires_at,
        isActive: row.is_active,
        allowedPlans: row.allowed_plans as PlanType[],
      };
    });

    return promoCodes;
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return {};
  }
};

const deactivatePromoCode = async (code: string): Promise<void> => {
  try {
    await query("UPDATE promo_codes SET is_active = false WHERE code = $1", [
      code.toUpperCase(),
    ]);
  } catch (error) {
    console.error("Error deactivating promo code:", error);
  }
};

// Analytics tracking
const trackEvent = async (
  promoCodeId: string,
  eventType: string,
  email?: string,
  metadata?: unknown,
): Promise<void> => {
  try {
    await query(
      "INSERT INTO promo_analytics (promo_code_id, event_type, email, metadata) VALUES ($1, $2, $3, $4)",
      [promoCodeId, eventType, email, JSON.stringify(metadata ?? {})],
    );
  } catch (error) {
    console.error("Error tracking promo analytics event:", error);
  }
};

// Migrate existing promo codes from constants
const migrateExistingPromoCodes = async (): Promise<void> => {
  const existingCodes = {
    WELCOME25: {
      discountCents: 2500,
      description: "$25 off your first term",
      maxUses: 100,
      expiresAt: "2024-12-31",
      isActive: true,
    },
    FRIENDS10: {
      discountCents: 1000,
      description: "$10 referral bonus",
      maxUses: null,
      expiresAt: null,
      isActive: true,
    },
    BACKTOSCHOOL: {
      discountCents: 5000,
      description: "$50 off back-to-school special",
      maxUses: 50,
      expiresAt: "2024-03-01",
      isActive: true,
    },
  };

  for (const [code, data] of Object.entries(existingCodes)) {
    try {
      // Check if code already exists
      const existing = await query(
        "SELECT id FROM promo_codes WHERE code = $1",
        [code],
      );
      if (existing.rows.length === 0) {
        await createPromoCode({
          code,
          discountCents: data.discountCents,
          description: data.description,
          maxUses: data.maxUses,
          expiresAt: data.expiresAt,
        });
        console.warn(`Migrated promo code: ${code}`);
      }
    } catch (error) {
      console.error(`Error migrating promo code ${code}:`, error);
    }
  }
};

export const PromoCodeStorage = {
  validatePromoCode,
  incrementUsage,
  createPromoCode,
  getAllPromoCodes,
  deactivatePromoCode,
  trackEvent,
  migrateExistingPromoCodes,
};
