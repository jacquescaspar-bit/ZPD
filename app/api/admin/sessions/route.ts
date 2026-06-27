import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const currentStep = searchParams.get("currentStep");
    const expired = searchParams.get("expired");
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

    if (currentStep && ["plan", "payment", "insights"].includes(currentStep)) {
      conditions.push(`current_step = $${paramIndex}`);
      params.push(currentStep);
      paramIndex++;
    }

    if (expired === "true") {
      conditions.push("expires_at < NOW()");
    } else if (expired === "false") {
      conditions.push("expires_at >= NOW()");
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await query(
      `SELECT COUNT(*) as total FROM enrollment_sessions ${whereClause}`,
      params,
    );
    const total = parseInt(countResult.rows[0].total);

    const funnelResult = await query(
      `
      SELECT current_step, COUNT(*) as count
      FROM enrollment_sessions
      WHERE expires_at >= NOW()
      GROUP BY current_step
    `,
    );

    const result = await query(
      `
      SELECT
        id,
        session_id,
        email,
        stripe_payment_intent_id,
        current_step,
        created_at,
        updated_at,
        expires_at
      FROM enrollment_sessions
      ${whereClause}
      ORDER BY updated_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `,
      [...params, limit, offset],
    );

    return NextResponse.json({
      sessions: result.rows.map((row) => ({
        id: row.id,
        sessionId: row.session_id,
        email: row.email,
        stripePaymentIntentId: row.stripe_payment_intent_id,
        currentStep: row.current_step,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        expiresAt: row.expires_at,
        isExpired: new Date(row.expires_at) < new Date(),
      })),
      funnel: funnelResult.rows.map((row) => ({
        step: row.current_step,
        count: parseInt(row.count),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching enrollment sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 },
    );
  }
}
