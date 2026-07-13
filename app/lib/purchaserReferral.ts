import { query } from "@/lib/db";
import { ReferralStorage } from "@/lib/referralStorage";
import { stripe } from "@/lib/stripe";
import type { ReferralCode } from "@/enrol/types";

function mapReferralRow(row: Record<string, unknown>): ReferralCode {
  return {
    id: row.id as string,
    code: row.code as string,
    ownerEmail: row.owner_email as string,
    createdAt: (row.created_at as Date).toISOString(),
    usedCount: parseInt(String(row.used_count)),
    isActive: row.is_active as boolean,
    allowedPlans: row.allowed_plans as ReferralCode["allowedPlans"],
    sourceCodeId: (row.source_code_id as string | null) ?? undefined,
  };
}

export async function getLatestActiveReferralCodeByOwner(
  email: string,
): Promise<ReferralCode | null> {
  const result = await query(
    `
    SELECT *
    FROM referral_codes
    WHERE owner_email = $1 AND is_active = true
    ORDER BY created_at DESC
    LIMIT 1
  `,
    [email.toLowerCase().trim()],
  );

  if (result.rows.length === 0) return null;
  return mapReferralRow(result.rows[0]);
}

export async function getReferralCodeForEnrollment(
  email: string,
  paymentIntentId: string,
): Promise<ReferralCode | null> {
  const byPaymentIntent =
    await ReferralStorage.getReferralCodeByPaymentIntent(paymentIntentId);
  if (byPaymentIntent) return byPaymentIntent;

  const result = await query(
    `
    SELECT rc.*
    FROM referral_codes rc
    INNER JOIN enrollments e ON e.stripe_payment_intent_id = $2
    WHERE rc.owner_email = $1
      AND rc.is_active = true
      AND rc.created_at >= e.created_at - INTERVAL '2 minutes'
    ORDER BY rc.created_at DESC
    LIMIT 1
  `,
    [email.toLowerCase().trim(), paymentIntentId],
  );

  if (result.rows.length === 0) return null;
  return mapReferralRow(result.rows[0]);
}

export async function ensurePurchaserReferralCode({
  email,
  paymentIntentId,
  planType,
  amountCents,
}: {
  email: string;
  paymentIntentId: string;
  planType?: string;
  amountCents?: number;
}): Promise<ReferralCode | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const isTestPayment = paymentIntentId.startsWith("test_payment_intent_");

  const existingCode =
    await ReferralStorage.getReferralCodeByPaymentIntent(paymentIntentId);
  if (existingCode) return existingCode;

  const enrollmentResult = await query(
    "SELECT * FROM enrollments WHERE stripe_payment_intent_id = $1",
    [paymentIntentId],
  );

  if (enrollmentResult.rows.length > 0) {
    const enrollmentCode = await getReferralCodeForEnrollment(
      normalizedEmail,
      paymentIntentId,
    );
    if (enrollmentCode) return enrollmentCode;
  }

  if (!isTestPayment) {
    const paymentIntent =
      await stripe().paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return null;
    }

    const metadataEmail = paymentIntent.metadata.email?.toLowerCase().trim();
    if (metadataEmail && metadataEmail !== normalizedEmail) {
      return null;
    }

    if (enrollmentResult.rows.length === 0) {
      await ReferralStorage.recordEnrollment(
        paymentIntentId,
        normalizedEmail,
        planType ?? paymentIntent.metadata.planType ?? "essential",
        amountCents ?? paymentIntent.amount,
        paymentIntent.metadata.referralCode,
      );
    }
  } else if (enrollmentResult.rows.length === 0) {
    await ReferralStorage.recordEnrollment(
      paymentIntentId,
      normalizedEmail,
      planType ?? "essential",
      amountCents ?? 0,
    );
  }

  const enrollmentCode = await getReferralCodeForEnrollment(
    normalizedEmail,
    paymentIntentId,
  );
  if (enrollmentCode) return enrollmentCode;

  const referralCode = await ReferralStorage.createReferralCode({
    ownerEmail: normalizedEmail,
    stripePaymentIntentId: paymentIntentId,
  });

  await ReferralStorage.trackEvent(
    referralCode.id,
    "generated",
    normalizedEmail,
    {
      planType: planType ?? "essential",
      source: isTestPayment ? "test_payment_claim" : "payment_claim",
    },
  );

  return referralCode;
}
