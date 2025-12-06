import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRICING, CURRENCY } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { planType, enrollmentData, amountOverride } = await request.json();

    if (!planType || !PRICING[planType as keyof typeof PRICING]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const plan = PRICING[planType as keyof typeof PRICING];

    let finalAmount: number = plan.price;
    if (
      typeof amountOverride === "number" &&
      Number.isFinite(amountOverride)
    ) {
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
      },
      description: `${plan.name} - ZPD Tutoring Enrollment`,
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
