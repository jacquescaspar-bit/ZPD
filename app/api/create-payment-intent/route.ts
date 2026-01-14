import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRICING, CURRENCY } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { planType, enrollmentData, amountOverride, appliedReferralCode } =
      await request.json();

    if (!planType || !PRICING[planType as keyof typeof PRICING]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const plan = PRICING[planType as keyof typeof PRICING];

    // Check if this is a trial plan and restrict to 1 purchase per email
    if (planType === "trial" && enrollmentData?.email) {
      try {
        // Search for existing successful payments for this email and trial plan
        // Note: Stripe doesn't support direct metadata filtering in list calls,
        // so we'll get recent payments and filter client-side
        const existingPayments = await stripe().paymentIntents.list({
          limit: 100, // Check recent payments
        });

        // Filter for successful payments with matching email and trial plan
        const successfulTrialPayments = existingPayments.data.filter(
          (payment) =>
            payment.status === "succeeded" &&
            payment.metadata?.planType === "trial" &&
            payment.metadata?.email === enrollmentData.email,
        );

        if (successfulTrialPayments.length > 0) {
          return NextResponse.json(
            {
              error:
                "This email address has already purchased a Diagnostic Discovery session. Each email address is limited to one purchase.",
            },
            { status: 400 },
          );
        }
      } catch (error) {
        console.error("Error checking existing trial purchases:", error);
        // Continue with payment creation if check fails, to avoid blocking legitimate purchases
      }
    }

    let finalAmount: number = plan.price;
    if (typeof amountOverride === "number" && Number.isFinite(amountOverride)) {
      const rounded = Math.round(amountOverride);
      finalAmount = Math.max(100, Math.min(plan.price, rounded));
    }

    // Create a PaymentIntent with the order amount and currency
    const notesPreview = (enrollmentData?.notes ?? "").slice(0, 500);
    const attachmentCount = enrollmentData?.attachmentNames?.length ?? 0;

    const paymentIntent = await stripe().paymentIntents.create({
      amount: finalAmount,
      currency: CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planType,
        parentName: enrollmentData?.parentName ?? "",
        email: enrollmentData?.email ?? "",
        phone: enrollmentData?.phone ?? "",
        notes: notesPreview,
        attachment_count: attachmentCount.toString(),
        referralCode: appliedReferralCode ?? "",
      },
      description: `${plan.name} - ZPD Tutoring Enrolment`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: finalAmount,
      currency: CURRENCY,
      planName: plan.name,
    });
  } catch (error: unknown) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
