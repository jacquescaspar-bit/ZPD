import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature")!;

    let event: any;

    try {
      event = stripe().webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!", paymentIntent.id);

        // Here you would typically:
        // 1. Update your database with payment confirmation
        // 2. Send confirmation emails
        // 3. Create customer records
        // 4. Trigger enrollment workflow

        const { planType, childName, parentName, email, phone } =
          paymentIntent.metadata;

        console.log("Enrollment data:", {
          planType,
          childName,
          parentName,
          email,
          phone,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });

        // TODO: Implement enrollment completion logic here
        // - Save enrollment to database
        // - Send confirmation email
        // - Schedule tutor matching
        // - Create customer account

        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log("PaymentIntent failed:", failedPayment.id);

        // Handle failed payment
        // - Log failure
        // - Send failure notification
        // - Update enrollment status

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
