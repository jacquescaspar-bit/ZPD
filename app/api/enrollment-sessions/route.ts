import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// POST /api/enrollment-sessions - Create new enrollment session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const {
      sessionId,
      email,
      currentStep,
      enrollmentData,
      insightsData,
      progressStatus,
    } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "sessionId is required and must be a string" },
        { status: 400 },
      );
    }

    if (
      !currentStep ||
      !["plan", "payment", "insights"].includes(currentStep)
    ) {
      return NextResponse.json(
        {
          error:
            "currentStep is required and must be one of: plan, payment, insights",
        },
        { status: 400 },
      );
    }

    // Validate email format if provided
    if (
      email &&
      (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Insert new enrollment session
    const result = await query(
      `
      INSERT INTO enrollment_sessions (
        session_id,
        email,
        stripe_payment_intent_id,
        enrollment_data,
        insights_data,
        current_step,
        progress_status,
        expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW() + INTERVAL '30 days')
      RETURNING id, session_id, email, stripe_payment_intent_id, enrollment_data, insights_data, current_step, progress_status, created_at, updated_at, expires_at
    `,
      [
        sessionId,
        email ?? null,
        body.stripePaymentIntentId ?? null,
        JSON.stringify(enrollmentData ?? {}),
        JSON.stringify(insightsData ?? {}),
        currentStep,
        JSON.stringify(progressStatus ?? {}),
      ],
    );

    const [session] = result.rows;

    return NextResponse.json(
      {
        session: {
          id: session.id,
          sessionId: session.session_id,
          email: session.email,
          stripePaymentIntentId: session.stripe_payment_intent_id,
          enrollmentData: session.enrollment_data,
          insightsData: session.insights_data,
          currentStep: session.current_step,
          progressStatus: session.progress_status,
          createdAt: session.created_at,
          updatedAt: session.updated_at,
          expiresAt: session.expires_at,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating enrollment session:", error);

    // Handle unique constraint violation
    if (
      error instanceof Error &&
      error.message.includes("duplicate key value")
    ) {
      return NextResponse.json(
        { error: "Session ID already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create enrollment session" },
      { status: 500 },
    );
  }
}

// GET /api/enrollment-sessions - List sessions for admin (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const currentStep = searchParams.get("currentStep");
    const expired = searchParams.get("expired");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const offset = parseInt(searchParams.get("offset") ?? "0");

    // Build query with filters
    const whereConditions = [];
    const params = [];
    let paramIndex = 1;

    if (email) {
      whereConditions.push(`email = $${paramIndex}`);
      params.push(email);
      paramIndex++;
    }

    if (currentStep && ["plan", "payment", "insights"].includes(currentStep)) {
      whereConditions.push(`current_step = $${paramIndex}`);
      params.push(currentStep);
      paramIndex++;
    }

    if (expired === "true") {
      whereConditions.push(`expires_at < NOW()`);
    } else if (expired === "false") {
      whereConditions.push(`expires_at >= NOW()`);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // Get total count
    const countResult = await query(
      `
      SELECT COUNT(*) as total
      FROM enrollment_sessions
      ${whereClause}
    `,
      params,
    );

    const total = parseInt(countResult.rows[0].total);

    // Get sessions with pagination
    const result = await query(
      `
      SELECT id, session_id, email, stripe_payment_intent_id, enrollment_data, insights_data, current_step, progress_status, created_at, updated_at, expires_at
      FROM enrollment_sessions
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `,
      [...params, limit, offset],
    );

    const sessions = result.rows.map((row) => ({
      id: row.id,
      sessionId: row.session_id,
      email: row.email,
      stripePaymentIntentId: row.stripe_payment_intent_id,
      enrollmentData: row.enrollment_data,
      insightsData: row.insights_data,
      currentStep: row.current_step,
      progressStatus: row.progress_status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      expiresAt: row.expires_at,
    }));

    return NextResponse.json({
      sessions,
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
      { error: "Failed to fetch enrollment sessions" },
      { status: 500 },
    );
  }
}
