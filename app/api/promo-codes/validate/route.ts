import { type NextRequest, NextResponse } from "next/server";
import { PromoCodeStorage } from "@/lib/promoStorage";

export async function POST(request: NextRequest) {
  try {
    const { code, plan } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const validation = await PromoCodeStorage.validatePromoCode(code, plan);

    return NextResponse.json(validation);
  } catch (error) {
    console.error("Error validating promo code:", error);
    return NextResponse.json(
      { error: "Failed to validate promo code" },
      { status: 500 },
    );
  }
}
