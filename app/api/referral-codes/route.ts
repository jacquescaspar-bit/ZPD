import { type NextRequest, NextResponse } from "next/server";
import { ReferralStorage } from "@/lib/referralStorage";
import type { PlanType } from "@/lib/constants";

export function POST() {
  return NextResponse.json(
    { error: "Referral code creation requires admin access" },
    { status: 403 },
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const email = searchParams.get("email");
    const planType = searchParams.get("planType");
    const checkoutEmail = searchParams.get("checkoutEmail");

    if (email) {
      return NextResponse.json(
        { error: "Listing referral codes by email requires admin access" },
        { status: 403 },
      );
    }

    if (code) {
      const validation = await ReferralStorage.validateReferralCode(
        code,
        planType ? (planType as PlanType) : undefined,
        checkoutEmail ?? undefined,
      );
      return NextResponse.json(validation);
    }

    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 },
    );
  } catch (error: unknown) {
    console.error("Error fetching referral codes:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral codes" },
      { status: 500 },
    );
  }
}
