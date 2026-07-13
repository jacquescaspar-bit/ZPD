import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { fulfillPaymentIntent } from "@/lib/paymentFulfillment";
import { validateWebhookRequest } from "@/lib/webhookSecurity";
import type Stripe from "stripe";

export function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "Stripe webhook endpoint is live. Stripe sends POST requests only.",
  });
}

export async function POST(request: NextRequest) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret || endpointSecret === "whsec_your_webhook_secret_here") {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 503 },
    );
  }
  try {
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

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.warn("PaymentIntent was successful!", paymentIntent.id);

        try {
          await fulfillPaymentIntent(paymentIntent);
        } catch (error) {
          console.error("Error fulfilling payment intent:", error);
          return NextResponse.json(
            { error: "Payment fulfillment failed" },
            { status: 500 },
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const failedPayment = event.data.object;
        console.warn("PaymentIntent failed:", {
          id: failedPayment.id,
          email: failedPayment.metadata.email,
          planType: failedPayment.metadata.planType,
          lastPaymentError: failedPayment.last_payment_error?.message,
        });
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
