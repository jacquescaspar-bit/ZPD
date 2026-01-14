import { type NextRequest, NextResponse } from "next/server";
import { ReferralStorage } from "@/lib/referralStorage";
import type { ReferralCodeCreation } from "@/enrol/types";
import type { PlanType } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body: ReferralCodeCreation = await request.json();

    if (!body.ownerEmail) {
      return NextResponse.json(
        { error: "ownerEmail is required" },
        { status: 400 },
      );
    }

    const referralCode = await ReferralStorage.createReferralCode(body);

    return NextResponse.json({
      success: true,
      referralCode,
    });
  } catch (error: unknown) {
    console.error("Error creating referral code:", error);
    return NextResponse.json(
      { error: "Failed to create referral code" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const email = searchParams.get("email");
    const planType = searchParams.get("planType");

    if (code) {
      // Validate a specific code
      const validation = await ReferralStorage.validateReferralCode(
        code,
        planType ? (planType as PlanType) : undefined,
      );
      return NextResponse.json(validation);
    }

    if (email) {
      // Get codes for a specific owner
      const codes = await ReferralStorage.getReferralCodesByOwner(email);
      return NextResponse.json({ codes });
    }

    return NextResponse.json(
      { error: "Missing code or email parameter" },
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
