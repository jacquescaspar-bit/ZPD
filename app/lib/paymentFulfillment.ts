import type Stripe from "stripe";
import { EmailService } from "@/lib/email";
import { ReferralStorage } from "@/lib/referralStorage";
import { PromoCodeStorage } from "@/lib/promoStorage";
import { createReferrerRewardPromo } from "@/lib/referrerRewards";
import { markDiagnosticCreditRedeemed } from "@/lib/discountResolution";
import { query } from "@/lib/db";

async function enrollmentExists(paymentIntentId: string): Promise<boolean> {
  const result = await query(
    "SELECT id FROM enrollments WHERE stripe_payment_intent_id = $1 LIMIT 1",
    [paymentIntentId],
  );
  return result.rows.length > 0;
}

export async function fulfillPaymentIntent(
  paymentIntent: Stripe.PaymentIntent,
): Promise<void> {
  const email = paymentIntent.metadata.email?.toLowerCase().trim();
  const planType = paymentIntent.metadata.planType ?? "essential";
  const referralCodeUsed = paymentIntent.metadata.referralCode || undefined;
  const promoCodeUsed = paymentIntent.metadata.promoCode || undefined;
  const discountKind = paymentIntent.metadata.discountKind || "none";
  const discountCents = parseInt(
    paymentIntent.metadata.discountCents || "0",
    10,
  );
  const creditSourceEnrollmentId =
    paymentIntent.metadata.creditSourceEnrollmentId || undefined;

  if (!email) {
    throw new Error(
      `Payment ${paymentIntent.id} missing customer email metadata`,
    );
  }

  const alreadyFulfilled = await enrollmentExists(paymentIntent.id);

  if (!alreadyFulfilled) {
    // Redeem diagnostic credit when present (alone or stacked with a code)
    const usesDiagnosticCredit =
      Boolean(creditSourceEnrollmentId) &&
      (discountKind === "diagnostic_credit" ||
        discountKind.includes("diagnostic_credit"));

    if (usesDiagnosticCredit && creditSourceEnrollmentId) {
      const redeemed = await markDiagnosticCreditRedeemed(
        creditSourceEnrollmentId,
      );
      if (!redeemed) {
        throw new Error(
          `Diagnostic credit already redeemed or missing for ${paymentIntent.id}`,
        );
      }
    }

    await ReferralStorage.recordEnrollment(
      paymentIntent.id,
      email,
      planType,
      paymentIntent.amount,
      referralCodeUsed,
      {
        promoCodeUsed,
        discountKind,
        discountCents: Number.isFinite(discountCents) ? discountCents : 0,
        creditSourceEnrollmentId,
      },
    );
  }

  let purchaserCode = await ReferralStorage.getReferralCodeByPaymentIntent(
    paymentIntent.id,
  );
  if (!purchaserCode) {
    purchaserCode = await ReferralStorage.createReferralCode({
      ownerEmail: email,
      stripePaymentIntentId: paymentIntent.id,
    });

    await ReferralStorage.trackEvent(purchaserCode.id, "generated", email, {
      planType,
      paymentIntentId: paymentIntent.id,
    });
  }

  if (!alreadyFulfilled) {
    const referralEmailSent = await EmailService.sendReferralCodeEmail(
      email,
      purchaserCode.code,
    );
    if (!referralEmailSent) {
      throw new Error(
        `Failed to send referral code email for ${paymentIntent.id}`,
      );
    }
  }

  if (referralCodeUsed && !alreadyFulfilled) {
    const usedCodeValidation =
      await ReferralStorage.validateReferralCode(referralCodeUsed);

    await ReferralStorage.incrementUsage(referralCodeUsed);
    await ReferralStorage.deactivateReferralCode(referralCodeUsed);

    if (usedCodeValidation.valid && usedCodeValidation.referralCode) {
      const referrerEmail = usedCodeValidation.referralCode.ownerEmail;

      await ReferralStorage.trackEvent(
        usedCodeValidation.referralCode.id,
        "used",
        email,
        { planType, paymentIntentId: paymentIntent.id },
      );

      const rewardPromoCode = await createReferrerRewardPromo(referrerEmail);

      const newShareableCode = await ReferralStorage.createReferralCode({
        ownerEmail: referrerEmail,
        sourceCodeId: usedCodeValidation.referralCode.id,
      });

      await ReferralStorage.trackEvent(
        newShareableCode.id,
        "generated",
        referrerEmail,
        {
          source: "propagation",
          originalCode: referralCodeUsed,
          rewardPromoCode,
          paymentIntentId: paymentIntent.id,
        },
      );

      const propagationEmailSent = await EmailService.sendNewReferralCodeEmail(
        referrerEmail,
        rewardPromoCode,
        newShareableCode.code,
        referralCodeUsed,
      );
      if (!propagationEmailSent) {
        throw new Error(
          `Failed to send propagation email for ${paymentIntent.id}`,
        );
      }
    }
  }

  if (promoCodeUsed && !alreadyFulfilled) {
    await PromoCodeStorage.incrementUsage(promoCodeUsed);
  }
}
