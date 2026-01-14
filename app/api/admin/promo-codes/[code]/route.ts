import { type NextRequest, NextResponse } from "next/server";
import { PromoCodeStorage } from "@/lib/promoStorage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Promo code is required" },
        { status: 400 },
      );
    }

    await PromoCodeStorage.deactivatePromoCode(code);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deactivating promo code:", error);
    return NextResponse.json(
      { error: "Failed to deactivate promo code" },
      { status: 500 },
    );
  }
}
