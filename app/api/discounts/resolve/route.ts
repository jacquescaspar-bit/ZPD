import { type NextRequest, NextResponse } from "next/server";
import { PRICING, type PlanType } from "@/lib/constants";
import { resolveDiscount } from "@/lib/discountResolution";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const planType = body.planType as PlanType | undefined;
    const email =
      typeof body.email === "string" ? body.email.trim() : undefined;
    const code = typeof body.code === "string" ? body.code.trim() : undefined;

    if (!planType || !PRICING[planType]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const result = await resolveDiscount({ planType, email, code });

    return NextResponse.json({
      planType: result.planType,
      planPriceCents: result.planPriceCents,
      finalAmountCents: result.finalAmountCents,
      discounts: result.discounts,
      totalDiscountCents: result.totalDiscountCents,
      discountKind: result.discountKind,
    });
  } catch (error) {
    console.error("Error resolving discount:", error);
    return NextResponse.json(
      { error: "Failed to resolve discount" },
      { status: 500 },
    );
  }
}
