import _pool, { query, transaction } from "@/lib/db";
import type {
  ReferralCode,
  ReferralCodeValidation,
  ReferralCodeCreation,
} from "@/enrol/types";
import type { PlanType } from "@/lib/constants";

// Generate a unique referral code
function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "REF-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const createReferralCode = (
  data: ReferralCodeCreation,
): Promise<ReferralCode> =>
  transaction(async (client) => {
    // Generate unique code
    let code: string;
    let existingCode;
    do {
      code = generateReferralCode();
      existingCode = await client.query(
        "SELECT id FROM referral_codes WHERE code = $1",
        [code],
      );
    } while (existingCode.rows.length > 0);

    const result = await client.query(
      `INSERT INTO referral_codes (code, owner_email, allowed_plans, source_code_id, stripe_payment_intent_id)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL
       DO UPDATE SET owner_email = EXCLUDED.owner_email
       RETURNING id, code, owner_email, created_at, used_count, is_active, allowed_plans, source_code_id`,
      [
        code,
        data.ownerEmail,
        data.allowedPlans ?? ["essential", "intensive"],
        data.sourceCodeId ?? null,
        data.stripePaymentIntentId ?? null,
      ],
    );

    const [row] = result.rows;
    return {
      id: row.id,
      code: row.code,
      ownerEmail: row.owner_email,
      createdAt: row.created_at.toISOString(),
      usedCount: parseInt(row.used_count),
      isActive: row.is_active,
      allowedPlans: row.allowed_plans as PlanType[],
      sourceCodeId: row.source_code_id,
    };
  });

const validateReferralCode = async (
  code: string,
  planType?: PlanType,
  checkoutEmail?: string,
): Promise<ReferralCodeValidation> => {
  try {
    const result = await query(
      "SELECT * FROM referral_codes WHERE code = $1 AND is_active = true",
      [code.toUpperCase()],
    );

    if (result.rows.length === 0) {
      return { valid: false, reason: "Invalid referral code" };
    }

    const [row] = result.rows;
    const referralCode: ReferralCode = {
      id: row.id,
      code: row.code,
      ownerEmail: row.owner_email,
      createdAt: row.created_at.toISOString(),
      usedCount: parseInt(row.used_count),
      isActive: row.is_active,
      allowedPlans: row.allowed_plans as PlanType[],
      sourceCodeId: row.source_code_id,
    };

    if (planType && !referralCode.allowedPlans.includes(planType)) {
      return {
        valid: false,
        reason:
          "This referral code is not compatible with the selected plan. Referral discounts are available for Essential and Intensive plans only.",
      };
    }

    if (checkoutEmail) {
      const owner = referralCode.ownerEmail.toLowerCase().trim();
      const checkout = checkoutEmail.toLowerCase().trim();
      if (owner === checkout) {
        return {
          valid: false,
          reason:
            "Referral codes are for sharing with friends and family — you can't use your own code at checkout.",
        };
      }
    }

    return { valid: true, referralCode };
  } catch (error) {
    console.error("Error validating referral code:", error);
    return { valid: false, reason: "Error validating referral code" };
  }
};

const incrementUsage = async (code: string): Promise<void> => {
  try {
    await query(
      "UPDATE referral_codes SET used_count = used_count + 1 WHERE code = $1",
      [code.toUpperCase()],
    );
  } catch (error) {
    console.error("Error incrementing usage:", error);
  }
};

const mapReferralRow = (row: Record<string, unknown>): ReferralCode => ({
  id: row.id as string,
  code: row.code as string,
  ownerEmail: row.owner_email as string,
  createdAt: (row.created_at as Date).toISOString(),
  usedCount: parseInt(String(row.used_count), 10),
  isActive: row.is_active as boolean,
  allowedPlans: row.allowed_plans as PlanType[],
  sourceCodeId: (row.source_code_id as string | null) ?? undefined,
});

const getReferralCodeByPaymentIntent = async (
  paymentIntentId: string,
): Promise<ReferralCode | null> => {
  try {
    const result = await query(
      `SELECT id, code, owner_email, created_at, used_count, is_active, allowed_plans, source_code_id
       FROM referral_codes
       WHERE stripe_payment_intent_id = $1
       LIMIT 1`,
      [paymentIntentId],
    );

    if (result.rows.length === 0) return null;
    return mapReferralRow(result.rows[0]);
  } catch (error) {
    console.error("Error getting referral code by payment intent:", error);
    return null;
  }
};

const getReferralCodeById = async (
  id: string,
): Promise<ReferralCode | null> => {
  try {
    const result = await query("SELECT * FROM referral_codes WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    const [row] = result.rows;
    return {
      id: row.id,
      code: row.code,
      ownerEmail: row.owner_email,
      createdAt: row.created_at.toISOString(),
      usedCount: parseInt(row.used_count),
      isActive: row.is_active,
      allowedPlans: row.allowed_plans as PlanType[],
      sourceCodeId: row.source_code_id,
    };
  } catch (error) {
    console.error("Error getting referral code by ID:", error);
    return null;
  }
};

const getReferralCodesByOwner = async (
  email: string,
): Promise<ReferralCode[]> => {
  try {
    const result = await query(
      `SELECT * FROM referral_codes
       WHERE owner_email = $1
       ORDER BY created_at DESC`,
      [email.toLowerCase().trim()],
    );

    return result.rows.map((row) => ({
      id: row.id,
      code: row.code,
      ownerEmail: row.owner_email,
      createdAt: row.created_at.toISOString(),
      usedCount: parseInt(row.used_count),
      isActive: row.is_active,
      allowedPlans: row.allowed_plans as PlanType[],
      sourceCodeId: row.source_code_id,
    }));
  } catch (error) {
    console.error("Error getting referral codes by owner:", error);
    return [];
  }
};

const deactivateReferralCode = async (code: string): Promise<void> => {
  try {
    await query("UPDATE referral_codes SET is_active = false WHERE code = $1", [
      code.toUpperCase(),
    ]);
  } catch (error) {
    console.error("Error deactivating referral code:", error);
  }
};

// Analytics methods
const trackEvent = async (
  referralCodeId: string,
  eventType: string,
  email?: string,
  metadata?: unknown,
): Promise<void> => {
  try {
    await query(
      "INSERT INTO referral_analytics (referral_code_id, event_type, email, metadata) VALUES ($1, $2, $3, $4)",
      [referralCodeId, eventType, email, JSON.stringify(metadata ?? {})],
    );
  } catch (error) {
    console.error("Error tracking analytics event:", error);
  }
};

// Enrollment tracking
const recordEnrollment = async (
  stripePaymentIntentId: string,
  email: string,
  planType: string,
  amountCents: number,
  referralCodeUsed?: string,
  options?: {
    promoCodeUsed?: string;
    discountKind?: string;
    discountCents?: number;
    creditSourceEnrollmentId?: string;
  },
): Promise<void> => {
  await query(
    `INSERT INTO enrollments (
       stripe_payment_intent_id, email, plan_type, referral_code_used, amount_cents,
       promo_code_used, discount_kind, discount_cents, credit_source_enrollment_id
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (stripe_payment_intent_id) DO NOTHING`,
    [
      stripePaymentIntentId,
      email.toLowerCase().trim(),
      planType,
      referralCodeUsed ?? null,
      amountCents,
      options?.promoCodeUsed ?? null,
      options?.discountKind ?? "none",
      options?.discountCents ?? 0,
      options?.creditSourceEnrollmentId ?? null,
    ],
  );
};

export const ReferralStorage = {
  createReferralCode,
  validateReferralCode,
  incrementUsage,
  getReferralCodeByPaymentIntent,
  getReferralCodeById,
  getReferralCodesByOwner,
  deactivateReferralCode,
  trackEvent,
  recordEnrollment,
};
