import { PRICING, type PlanType } from "@/lib/constants";
import { DISCOUNT_ELIGIBLE_PLANS, REFERRAL_VALUE } from "@/enrol/constants";
import { ReferralStorage } from "@/lib/referralStorage";
import { PromoCodeStorage } from "@/lib/promoStorage";
import { query } from "@/lib/db";

export type DiscountKind = "none" | "referral" | "promo" | "diagnostic_credit";

export interface DiscountLine {
  kind: Exclude<DiscountKind, "none">;
  amountCents: number;
  label: string;
  code?: string;
  creditSourceEnrollmentId?: string;
}

export interface DiscountResolutionResult {
  planType: PlanType;
  planPriceCents: number;
  finalAmountCents: number;
  /** Line items that stack (diagnostic credit + at most one code). */
  discounts: DiscountLine[];
  totalDiscountCents: number;
  /** Composite kind for audit/metadata, e.g. diagnostic_credit+referral */
  discountKind: string;
}

/** @deprecated Prefer DiscountLine — kept for type imports in UI */
export type ResolvedDiscount = DiscountLine & { kind: DiscountKind };

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

function compositeDiscountKind(lines: DiscountLine[]): string {
  if (lines.length === 0) return "none";
  if (lines.length === 1) return lines[0].kind;
  return lines
    .map((l) => l.kind)
    .sort()
    .join("+");
}

/**
 * Server authority for checkout discounts.
 * Online and trial: no discounts.
 * Essential/Intensive:
 *   - Diagnostic credit stacks with one referral OR promo code
 *   - Referral and promo cannot stack with each other (single code field)
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

  const empty = (): DiscountResolutionResult => ({
    planType,
    planPriceCents,
    finalAmountCents: planPriceCents,
    discounts: [],
    totalDiscountCents: 0,
    discountKind: "none",
  });

  if (planType === "online" || planType === "trial") {
    return empty();
  }

  if (!DISCOUNT_ELIGIBLE_PLANS.includes(planType)) {
    return empty();
  }

  const lines: DiscountLine[] = [];

  if (email) {
    const credit = await findEligibleDiagnosticCredit(email);
    if (credit) {
      lines.push({
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
      lines.push({
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
        lines.push({
          kind: "referral",
          amountCents: REFERRAL_VALUE,
          label: "Referral thank-you",
          code,
        });
      }
    }
  }

  const totalDiscountCents = lines.reduce((sum, l) => sum + l.amountCents, 0);
  const finalAmountCents = Math.max(100, planPriceCents - totalDiscountCents);

  return {
    planType,
    planPriceCents,
    finalAmountCents,
    discounts: lines,
    totalDiscountCents,
    discountKind: compositeDiscountKind(lines),
  };
}

/** True if resolution applied a referral or promo for the given code. */
export function resolutionAppliedCode(
  result: DiscountResolutionResult,
  code?: string,
): boolean {
  if (!code?.trim()) return false;
  const normalized = code.trim().toUpperCase();
  return result.discounts.some(
    (d) =>
      (d.kind === "referral" || d.kind === "promo") && d.code === normalized,
  );
}

export function hasDiagnosticCredit(result: DiscountResolutionResult): boolean {
  return result.discounts.some((d) => d.kind === "diagnostic_credit");
}
