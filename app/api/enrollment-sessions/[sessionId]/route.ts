import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/enrollment-sessions/[sessionId] - Retrieve session
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 },
      );
    }

    const result = await query(
      `
      SELECT id, session_id, email, stripe_payment_intent_id, enrollment_data, insights_data, current_step, progress_status, created_at, updated_at, expires_at
      FROM enrollment_sessions
      WHERE session_id = $1 AND expires_at > NOW()
    `,
      [sessionId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Session not found or expired" },
        { status: 404 },
      );
    }

    const [session] = result.rows;

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error("Error retrieving enrollment session:", error);
    return NextResponse.json(
      { error: "Failed to retrieve enrollment session" },
      { status: 500 },
    );
  }
}

// PUT /api/enrollment-sessions/[sessionId] - Update session
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;
    const body = await request.json();

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 },
      );
    }

    // Check if session exists and is not expired
    const existingResult = await query(
      `
      SELECT id, insights_data, progress_status
      FROM enrollment_sessions
      WHERE session_id = $1 AND expires_at > NOW()
    `,
      [sessionId],
    );

    if (existingResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Session not found or expired" },
        { status: 404 },
      );
    }

    const existingSession = existingResult.rows[0] as {
      insights_data: Record<string, unknown>;
      progress_status: Record<string, unknown>;
    };

    // Validate update fields
    const {
      email,
      stripePaymentIntentId,
      enrollmentData,
      insightsData,
      currentStep,
      progressStatus,
    } = body;

    if (currentStep && !["plan", "payment", "insights"].includes(currentStep)) {
      return NextResponse.json(
        { error: "currentStep must be one of: plan, payment, insights" },
        { status: 400 },
      );
    }

    if (
      email &&
      (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Build update query dynamically
    const updateFields = [];
    const params = [];
    let paramIndex = 1;

    if (email !== undefined) {
      updateFields.push(`email = $${paramIndex}`);
      params.push(email);
      paramIndex++;
    }

    if (stripePaymentIntentId !== undefined) {
      updateFields.push(`stripe_payment_intent_id = $${paramIndex}`);
      params.push(stripePaymentIntentId);
      paramIndex++;
    }

    if (enrollmentData !== undefined) {
      updateFields.push(`enrollment_data = $${paramIndex}`);
      params.push(JSON.stringify(enrollmentData));
      paramIndex++;
    }

    if (insightsData !== undefined) {
      const mergedInsightsData = {
        ...(existingSession.insights_data ?? {}),
        ...(insightsData as Record<string, unknown>),
      };
      updateFields.push(`insights_data = $${paramIndex}`);
      params.push(JSON.stringify(mergedInsightsData));
      paramIndex++;
    }

    if (currentStep !== undefined) {
      updateFields.push(`current_step = $${paramIndex}`);
      params.push(currentStep);
      paramIndex++;
    }

    if (progressStatus !== undefined) {
      const mergedProgressStatus = {
        ...(existingSession.progress_status ?? {}),
        ...(progressStatus as Record<string, unknown>),
      };
      updateFields.push(`progress_status = $${paramIndex}`);
      params.push(JSON.stringify(mergedProgressStatus));
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    // Add updated_at
    updateFields.push(`updated_at = NOW()`);

    // Execute update
    const updateQuery = `
      UPDATE enrollment_sessions
      SET ${updateFields.join(", ")}
      WHERE session_id = $${paramIndex}
      RETURNING id, session_id, email, stripe_payment_intent_id, enrollment_data, insights_data, current_step, progress_status, created_at, updated_at, expires_at
    `;
    params.push(sessionId);

    const result = await query(updateQuery, params);
    const [session] = result.rows;

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error("Error updating enrollment session:", error);
    return NextResponse.json(
      { error: "Failed to update enrollment session" },
      { status: 500 },
    );
  }
}

// DELETE /api/enrollment-sessions/[sessionId] - Delete/cleanup expired session
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 },
      );
    }

    // Delete the session (works for both expired and active sessions)
    const result = await query(
      `
      DELETE FROM enrollment_sessions
      WHERE session_id = $1
      RETURNING id
    `,
      [sessionId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting enrollment session:", error);
    return NextResponse.json(
      { error: "Failed to delete enrollment session" },
      { status: 500 },
    );
  }
}
