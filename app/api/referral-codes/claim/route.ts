import { type NextRequest, NextResponse } from "next/server";
import { ensurePurchaserReferralCode } from "@/lib/purchaserReferral";

export async function POST(request: NextRequest) {
  try {
    const { email, paymentIntentId, planType, amountCents } =
      await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return NextResponse.json(
        { error: "paymentIntentId is required" },
        { status: 400 },
      );
    }

    const referralCode = await ensurePurchaserReferralCode({
      email,
      paymentIntentId,
      planType,
      amountCents,
    });

    if (!referralCode) {
      return NextResponse.json(
        { error: "Referral code not available yet" },
        { status: 404 },
      );
    }

    return NextResponse.json({ referralCode });
  } catch (error) {
    console.error("Error claiming referral code:", error);
    return NextResponse.json(
      { error: "Failed to claim referral code" },
      { status: 500 },
    );
  }
}
