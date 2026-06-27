import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { query } from "@/lib/db";
import { ReferralStorage } from "@/lib/referralStorage";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const activeOnly = searchParams.get("active") !== "false";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);
    const offset = parseInt(searchParams.get("offset") ?? "0");

    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (email) {
      conditions.push(`owner_email ILIKE $${paramIndex}`);
      params.push(`%${email}%`);
      paramIndex++;
    }

    if (activeOnly) {
      conditions.push("is_active = true");
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await query(
      `SELECT COUNT(*) as total FROM referral_codes ${whereClause}`,
      params,
    );
    const total = parseInt(countResult.rows[0].total);

    const result = await query(
      `
      SELECT
        id,
        code,
        owner_email,
        created_at,
        used_count,
        is_active,
        allowed_plans,
        source_code_id
      FROM referral_codes
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `,
      [...params, limit, offset],
    );

    return NextResponse.json({
      referralCodes: result.rows.map((row) => ({
        id: row.id,
        code: row.code,
        ownerEmail: row.owner_email,
        createdAt: row.created_at,
        usedCount: parseInt(row.used_count),
        isActive: row.is_active,
        allowedPlans: row.allowed_plans,
        sourceCodeId: row.source_code_id,
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching referral codes:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral codes" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { ownerEmail, allowedPlans } = await request.json();

    if (!ownerEmail || typeof ownerEmail !== "string") {
      return NextResponse.json(
        { error: "ownerEmail is required" },
        { status: 400 },
      );
    }

    const referralCode = await ReferralStorage.createReferralCode({
      ownerEmail: ownerEmail.toLowerCase().trim(),
      allowedPlans: allowedPlans ?? ["essential", "intensive"],
    });

    return NextResponse.json({ referralCode }, { status: 201 });
  } catch (error) {
    console.error("Error creating referral code:", error);
    return NextResponse.json(
      { error: "Failed to create referral code" },
      { status: 500 },
    );
  }
}
