import { PRICING, type PlanType } from "@/lib/constants";
import { DISCOUNT_ELIGIBLE_PLANS, REFERRAL_VALUE } from "@/enrol/constants";
import { ReferralStorage } from "@/lib/referralStorage";
import { PromoCodeStorage } from "@/lib/promoStorage";
import { query } from "@/lib/db";

export type DiscountKind = "none" | "referral" | "promo" | "diagnostic_credit";

export interface ResolvedDiscount {
  kind: DiscountKind;
  amountCents: number;
  label: string;
  code?: string;
  creditSourceEnrollmentId?: string;
}

export interface DiscountResolutionResult {
  planType: PlanType;
  planPriceCents: number;
  finalAmountCents: number;
  discount: ResolvedDiscount;
}

export interface EligibleDiagnosticCredit {
  enrollmentId: string;
  amountCents: number;
}

const DIAGNOSTIC_CREDIT_DAYS = 30;

export async function findEligibleDiagnosticCredit(
  email: string,
): Promise<EligibleDiagnosticCredit | null> {
  const normalized = email.toLowerCase().trim();
  if (!normalized) return null;

  try {
    const result = await query(
      `SELECT id, amount_cents
       FROM enrollments
       WHERE LOWER(email) = LOWER($1)
         AND plan_type = 'trial'
         AND status = 'completed'
         AND credit_redeemed_at IS NULL
         AND created_at > NOW() - ($2::text || ' days')::interval
       ORDER BY created_at DESC
       LIMIT 1`,
      [normalized, DIAGNOSTIC_CREDIT_DAYS],
    );

    if (result.rows.length === 0) return null;

    const [row] = result.rows;
    return {
      enrollmentId: row.id as string,
      amountCents:
        typeof row.amount_cents === "number"
          ? row.amount_cents
          : PRICING.trial.price,
    };
  } catch (error) {
    console.error("Error finding diagnostic credit:", error);
    return null;
  }
}

export async function markDiagnosticCreditRedeemed(
  trialEnrollmentId: string,
): Promise<boolean> {
  try {
    const result = await query(
      `UPDATE enrollments
       SET credit_redeemed_at = NOW()
       WHERE id = $1
         AND plan_type = 'trial'
         AND credit_redeemed_at IS NULL
       RETURNING id`,
      [trialEnrollmentId],
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error("Error marking diagnostic credit redeemed:", error);
    return false;
  }
}

/**
 * Server authority for checkout discounts.
 * Online and trial: no discounts.
 * Essential/Intensive: exactly one of referral, promo, or diagnostic credit
 * (highest value wins when multiple are eligible).
 */
export async function resolveDiscount(input: {
  planType: PlanType;
  email?: string;
  code?: string;
}): Promise<DiscountResolutionResult> {
  const { planType } = input;
  const planPriceCents = PRICING[planType].price;
  const email = input.email?.toLowerCase().trim() ?? undefined;
  const code = input.code?.trim().toUpperCase() ?? undefined;

  const none = (): DiscountResolutionResult => ({
    planType,
    planPriceCents,
    finalAmountCents: planPriceCents,
    discount: {
      kind: "none",
      amountCents: 0,
      label: "No discount",
    },
  });

  if (planType === "online" || planType === "trial") {
    return none();
  }

  if (!DISCOUNT_ELIGIBLE_PLANS.includes(planType)) {
    return none();
  }

  type Candidate = ResolvedDiscount;
  const candidates: Candidate[] = [];

  if (email) {
    const credit = await findEligibleDiagnosticCredit(email);
    if (credit) {
      candidates.push({
        kind: "diagnostic_credit",
        amountCents: Math.min(credit.amountCents, PRICING.trial.price),
        label: "Diagnostic Discovery credit",
        creditSourceEnrollmentId: credit.enrollmentId,
      });
    }
  }

  if (code) {
    const promoValidation = await PromoCodeStorage.validatePromoCode(
      code,
      planType,
      email,
    );
    if (promoValidation.valid && promoValidation.promoCode) {
      candidates.push({
        kind: "promo",
        amountCents: promoValidation.promoCode.discountCents,
        label: promoValidation.promoCode.description,
        code,
      });
    } else {
      const referralValidation = await ReferralStorage.validateReferralCode(
        code,
        planType,
        email,
      );
      if (referralValidation.valid && referralValidation.referralCode) {
        candidates.push({
          kind: "referral",
          amountCents: REFERRAL_VALUE,
          label: "Referral thank-you",
          code,
        });
      }
    }
  }

  if (candidates.length === 0) {
    return none();
  }

  candidates.sort((a, b) => b.amountCents - a.amountCents);
  const [winner] = candidates;
  const finalAmountCents = Math.max(100, planPriceCents - winner.amountCents);

  return {
    planType,
    planPriceCents,
    finalAmountCents,
    discount: winner,
  };
}
