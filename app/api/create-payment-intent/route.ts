import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { query } from "@/lib/db";
import { PRICING, CURRENCY, type PlanType } from "@/lib/constants";
import {
  resolveDiscount,
  resolutionAppliedCode,
} from "@/lib/discountResolution";

export async function POST(request: NextRequest) {
  try {
    const {
      planType,
      enrollmentData,
      amountOverride,
      appliedReferralCode,
      appliedPromoCode,
      appliedDiscountCode,
    } = await request.json();

    if (!planType || !PRICING[planType as keyof typeof PRICING]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const plan = PRICING[planType as keyof typeof PRICING];
    const checkoutEmail = enrollmentData?.email?.toLowerCase().trim();

    if (!checkoutEmail) {
      return NextResponse.json(
        { error: "Email is required for checkout." },
        { status: 400 },
      );
    }

    if (planType === "trial") {
      try {
        const existingTrial = await query(
          `SELECT 1 FROM enrollments
           WHERE LOWER(email) = LOWER($1) AND plan_type = 'trial'
           LIMIT 1`,
          [checkoutEmail],
        );

        if (existingTrial.rows.length > 0) {
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
      }
    }

    const codeCandidate =
      (typeof appliedDiscountCode === "string" && appliedDiscountCode.trim()
        ? appliedDiscountCode.trim()
        : undefined) ??
      (typeof appliedReferralCode === "string" && appliedReferralCode.trim()
        ? appliedReferralCode.trim()
        : undefined) ??
      (typeof appliedPromoCode === "string" && appliedPromoCode.trim()
        ? appliedPromoCode.trim()
        : undefined);

    if (
      typeof appliedReferralCode === "string" &&
      appliedReferralCode.trim() &&
      typeof appliedPromoCode === "string" &&
      appliedPromoCode.trim()
    ) {
      return NextResponse.json(
        { error: "Only one discount code can be applied per checkout." },
        { status: 400 },
      );
    }

    const resolution = await resolveDiscount({
      planType: planType as PlanType,
      email: checkoutEmail,
      code: codeCandidate,
    });

    if (
      codeCandidate &&
      planType !== "online" &&
      !resolutionAppliedCode(resolution, codeCandidate)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid or ineligible discount code for this plan. Remove the code or try another plan.",
        },
        { status: 400 },
      );
    }

    const finalAmount = resolution.finalAmountCents;

    if (typeof amountOverride === "number" && Number.isFinite(amountOverride)) {
      const clientAmount = Math.max(100, Math.round(amountOverride));
      if (clientAmount !== finalAmount) {
        return NextResponse.json(
          {
            error: "Discount amount mismatch. Please refresh and try again.",
            expectedAmount: finalAmount,
          },
          { status: 400 },
        );
      }
    }

    const notesPreview = (enrollmentData?.notes ?? "").slice(0, 500);
    const attachmentCount = enrollmentData?.attachmentNames?.length ?? 0;
    const codeLine = resolution.discounts.find(
      (d) => d.kind === "referral" || d.kind === "promo",
    );
    const creditLine = resolution.discounts.find(
      (d) => d.kind === "diagnostic_credit",
    );

    const paymentIntent = await stripe().paymentIntents.create({
      amount: finalAmount,
      currency: CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planType,
        parentName: enrollmentData?.parentName ?? "",
        email: checkoutEmail,
        phone: enrollmentData?.phone ?? "",
        notes: notesPreview,
        attachment_count: attachmentCount.toString(),
        referralCode:
          codeLine?.kind === "referral" ? (codeLine.code ?? "") : "",
        promoCode: codeLine?.kind === "promo" ? (codeLine.code ?? "") : "",
        discountKind: resolution.discountKind,
        discountCents: String(resolution.totalDiscountCents),
        creditSourceEnrollmentId: creditLine?.creditSourceEnrollmentId ?? "",
        creditCents: creditLine ? String(creditLine.amountCents) : "0",
        codeDiscountCents: codeLine ? String(codeLine.amountCents) : "0",
      },
      description: `${plan.name} - ZPD Learning Enrolment`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: finalAmount,
      currency: CURRENCY,
      planName: plan.name,
      discounts: resolution.discounts,
      totalDiscountCents: resolution.totalDiscountCents,
      discountKind: resolution.discountKind,
    });
  } catch (error: unknown) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
