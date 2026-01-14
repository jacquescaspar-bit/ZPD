import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ReferralStorage } from "@/lib/referralStorage";
import { EmailService } from "@/lib/email";
import { validateWebhookRequest } from "@/lib/webhookSecurity";
import type Stripe from "stripe";

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set");
}
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting and other security measures
    const securityCheck = validateWebhookRequest(request);
    if (securityCheck) {
      return securityCheck;
    }

    const body = await request.text();
    const sig = request.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 },
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe().webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Webhook signature verification failed.`, message);
      return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.warn("PaymentIntent was successful!", paymentIntent.id);

        const { planType, parentName, email, phone, referralCode } =
          paymentIntent.metadata;

        console.warn("Enrollment data:", {
          planType,
          parentName,
          email,
          phone,
          referralCode,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });

        try {
          // Record the enrollment
          await ReferralStorage.recordEnrollment(
            paymentIntent.id,
            email,
            planType,
            paymentIntent.amount,
            referralCode,
          );

          // Generate referral code for the purchaser
          const newReferralCode = await ReferralStorage.createReferralCode({
            ownerEmail: email,
          });

          console.warn(
            "Generated referral code for purchaser:",
            newReferralCode.code,
          );

          // Track analytics
          await ReferralStorage.trackEvent(
            newReferralCode.id,
            "generated",
            email,
            { planType },
          );

          // Send email to purchaser with their referral code
          await EmailService.sendReferralCodeEmail(email, newReferralCode.code);

          // If payment used a referral code, increment usage and propagate
          if (referralCode) {
            await ReferralStorage.incrementUsage(referralCode);

            // Find the owner of the used referral code
            const usedCodeValidation =
              await ReferralStorage.validateReferralCode(referralCode);
            if (usedCodeValidation.valid && usedCodeValidation.referralCode) {
              const referrerEmail = usedCodeValidation.referralCode.ownerEmail;

              // Track usage analytics
              await ReferralStorage.trackEvent(
                usedCodeValidation.referralCode.id,
                "used",
                email,
                { planType },
              );

              // Generate a new referral code for the referrer
              const propagatedCode = await ReferralStorage.createReferralCode({
                ownerEmail: referrerEmail,
                sourceCodeId: usedCodeValidation.referralCode.id,
              });

              console.warn(
                "Generated propagated referral code for referrer:",
                propagatedCode.code,
              );

              // Track propagation analytics
              await ReferralStorage.trackEvent(
                propagatedCode.id,
                "generated",
                referrerEmail,
                {
                  source: "propagation",
                  originalCode: referralCode,
                },
              );

              // Send email to referrer about new code
              await EmailService.sendNewReferralCodeEmail(
                referrerEmail,
                propagatedCode.code,
                referralCode,
              );
            }
          }

          // TODO: Send confirmation email with enrollment details
          // TODO: Schedule tutor matching
        } catch (error) {
          console.error("Error processing referral codes:", error);
          // Don't fail the webhook for referral processing errors
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const failedPayment = event.data.object;
        console.warn("PaymentIntent failed:", failedPayment.id);

        // Handle failed payment
        // - Log failure
        // - Send failure notification
        // - Update enrollment status

        break;
      }

      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
