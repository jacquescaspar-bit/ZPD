import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { PromoCodeStorage } from "@/lib/promoStorage";
import { query } from "@/lib/db";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    // Get all promo codes with usage stats
    const result = await query(`
      SELECT
        code,
        discount_cents,
        description,
        max_uses,
        current_uses,
        expires_at,
        is_active,
        created_at,
        allowed_plans
      FROM promo_codes
      ORDER BY created_at DESC
    `);

    const promoCodes = result.rows.map((row) => ({
      code: row.code,
      discountCents: parseInt(row.discount_cents),
      description: row.description,
      maxUses: row.max_uses,
      currentUses: parseInt(row.current_uses ?? 0),
      expiresAt: row.expires_at,
      isActive: row.is_active,
      createdAt: row.created_at,
      allowedPlans: row.allowed_plans,
    }));

    return NextResponse.json({ promoCodes });
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return NextResponse.json(
      { error: "Failed to fetch promo codes" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const {
      code,
      discountCents,
      description,
      maxUses,
      expiresAt,
      allowedPlans,
    } = await request.json();

    if (!code || !discountCents || !description) {
      return NextResponse.json(
        { error: "Code, discount amount, and description are required" },
        { status: 400 },
      );
    }

    await PromoCodeStorage.createPromoCode({
      code: code.toUpperCase(),
      discountCents: parseInt(discountCents),
      description,
      maxUses: maxUses ? parseInt(maxUses) : null,
      expiresAt: expiresAt ?? null,
      allowedPlans,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating promo code:", error);
    return NextResponse.json(
      { error: "Failed to create promo code" },
      { status: 500 },
    );
  }
}
