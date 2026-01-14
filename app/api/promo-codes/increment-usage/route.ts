import { type NextRequest, NextResponse } from "next/server";
import { PromoCodeStorage } from "@/lib/promoStorage";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    await PromoCodeStorage.incrementUsage(code);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error incrementing promo code usage:", error);
    return NextResponse.json(
      { error: "Failed to increment promo code usage" },
      { status: 500 },
    );
  }
}
