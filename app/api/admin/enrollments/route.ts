import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const plan = searchParams.get("plan");
    const hasReferral = searchParams.get("hasReferral");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);
    const offset = parseInt(searchParams.get("offset") ?? "0");

    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (email) {
      conditions.push(`email ILIKE $${paramIndex}`);
      params.push(`%${email}%`);
      paramIndex++;
    }

    if (plan) {
      conditions.push(`plan_type = $${paramIndex}`);
      params.push(plan);
      paramIndex++;
    }

    if (hasReferral === "true") {
      conditions.push("referral_code_used IS NOT NULL");
    } else if (hasReferral === "false") {
      conditions.push("referral_code_used IS NULL");
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await query(
      `SELECT COUNT(*) as total FROM enrollments ${whereClause}`,
      params,
    );
    const total = parseInt(countResult.rows[0].total);

    const result = await query(
      `
      SELECT
        id,
        stripe_payment_intent_id,
        email,
        plan_type,
        referral_code_used,
        amount_cents,
        status,
        created_at
      FROM enrollments
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `,
      [...params, limit, offset],
    );

    return NextResponse.json({
      enrollments: result.rows.map((row) => ({
        id: row.id,
        stripePaymentIntentId: row.stripe_payment_intent_id,
        email: row.email,
        planType: row.plan_type,
        referralCodeUsed: row.referral_code_used,
        amountCents: parseInt(row.amount_cents),
        status: row.status,
        createdAt: row.created_at,
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 },
    );
  }
}
