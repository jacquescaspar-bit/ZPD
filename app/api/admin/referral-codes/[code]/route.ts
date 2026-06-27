import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { ReferralStorage } from "@/lib/referralStorage";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ code: string }> },
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { code } = await context.params;
    await ReferralStorage.deactivateReferralCode(code);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deactivating referral code:", error);
    return NextResponse.json(
      { error: "Failed to deactivate referral code" },
      { status: 500 },
    );
  }
}
