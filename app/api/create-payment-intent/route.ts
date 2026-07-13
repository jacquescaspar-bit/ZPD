import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { query } from "@/lib/db";
import { PRICING, CURRENCY, type PlanType } from "@/lib/constants";
import { REFERRAL_VALUE } from "@/enrol/constants";
import { ReferralStorage } from "@/lib/referralStorage";
import { PromoCodeStorage } from "@/lib/promoStorage";

export async function POST(request: NextRequest) {
  try {
    const {
      planType,
      enrollmentData,
      amountOverride,
      appliedReferralCode,
      appliedPromoCode,
    } = await request.json();

    if (!planType || !PRICING[planType as keyof typeof PRICING]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const plan = PRICING[planType as keyof typeof PRICING];
    const checkoutEmail = enrollmentData?.email?.toLowerCase().trim();

    if (planType === "trial" && checkoutEmail) {
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

    const referralCode =
      typeof appliedReferralCode === "string" && appliedReferralCode.trim()
        ? appliedReferralCode.trim().toUpperCase()
        : undefined;
    const promoCode =
      typeof appliedPromoCode === "string" && appliedPromoCode.trim()
        ? appliedPromoCode.trim().toUpperCase()
        : undefined;

    if (referralCode && promoCode) {
      return NextResponse.json(
        { error: "Only one discount code can be applied per checkout." },
        { status: 400 },
      );
    }

    let discountCents = 0;
    let validatedReferralCode: string | undefined;
    let validatedPromoCode: string | undefined;

    if (referralCode) {
      const validation = await ReferralStorage.validateReferralCode(
        referralCode,
        planType as PlanType,
        checkoutEmail,
      );
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.reason ?? "Invalid referral code" },
          { status: 400 },
        );
      }
      discountCents = REFERRAL_VALUE;
      validatedReferralCode = referralCode;
    } else if (promoCode) {
      const validation = await PromoCodeStorage.validatePromoCode(
        promoCode,
        planType as PlanType,
        checkoutEmail,
      );
      if (!validation.valid || !validation.promoCode) {
        return NextResponse.json(
          { error: validation.reason ?? "Invalid promo code" },
          { status: 400 },
        );
      }
      const { discountCents: promoDiscount } = validation.promoCode;
      discountCents = promoDiscount;
      validatedPromoCode = promoCode;
    }

    const finalAmount = Math.max(100, plan.price - discountCents);

    if (typeof amountOverride === "number" && Number.isFinite(amountOverride)) {
      const rounded = Math.round(amountOverride);
      const clientAmount = Math.max(100, Math.min(plan.price, rounded));
      if (clientAmount !== finalAmount) {
        return NextResponse.json(
          { error: "Discount amount mismatch. Please refresh and try again." },
          { status: 400 },
        );
      }
    }

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
        email: checkoutEmail ?? "",
        phone: enrollmentData?.phone ?? "",
        notes: notesPreview,
        attachment_count: attachmentCount.toString(),
        referralCode: validatedReferralCode ?? "",
        promoCode: validatedPromoCode ?? "",
      },
      description: `${plan.name} - ZPD Learning Enrolment`,
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
