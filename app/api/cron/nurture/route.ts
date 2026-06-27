import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { EmailService } from "@/lib/email";
import { SITE_URL } from "@/lib/constants";

const authorizeCron = (request: NextRequest): boolean => {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
};

const recordNurtureSent = async (
  email: string,
  emailType: string,
  referenceId?: string,
) => {
  try {
    await query(
      `INSERT INTO nurture_emails_sent (email, email_type, reference_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (email, email_type) DO NOTHING`,
      [email, emailType, referenceId ?? null],
    );
  } catch {
    // Table may not exist until migration runs — log and continue
    console.warn("nurture_emails_sent insert skipped (run migration 004)");
  }
};

const wasNurtureSent = async (
  email: string,
  emailType: string,
): Promise<boolean> => {
  try {
    const result = await query(
      `SELECT 1 FROM nurture_emails_sent WHERE email = $1 AND email_type = $2 LIMIT 1`,
      [email, emailType],
    );
    return (result.rowCount ?? 0) > 0;
  } catch {
    return false;
  }
};

export async function POST(request: NextRequest) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    abandonedCart: 0,
    postDiagnostic: 0,
    errors: 0,
  };

  try {
    const abandoned = await query(
      `
      SELECT session_id, email, enrollment_data
      FROM enrollment_sessions
      WHERE email IS NOT NULL
        AND current_step = 'payment'
        AND updated_at < NOW() - INTERVAL '24 hours'
        AND updated_at > NOW() - INTERVAL '7 days'
        AND NOT EXISTS (
          SELECT 1 FROM enrollments e
          WHERE LOWER(e.email) = LOWER(enrollment_sessions.email)
            AND e.created_at >= enrollment_sessions.created_at
        )
      LIMIT 50
    `,
    );

    for (const row of abandoned.rows as {
      session_id: string;
      email: string;
      enrollment_data: { selectedPlan?: string };
    }[]) {
      const emailType = `abandoned_cart_${row.session_id}`;
      if (await wasNurtureSent(row.email, emailType)) continue;

      const plan = row.enrollment_data?.selectedPlan ?? "trial";
      const resumeUrl = `${SITE_URL}/enrol?plan=${plan}&step=payment`;
      const sent = await EmailService.sendAbandonedEnrollmentEmail(
        row.email,
        resumeUrl,
      );
      if (sent) {
        await recordNurtureSent(row.email, emailType, row.session_id);
        results.abandonedCart += 1;
      } else {
        results.errors += 1;
      }
    }

    const diagnostics = await query(
      `
      SELECT e.email
      FROM enrollments e
      WHERE e.plan_type = 'trial'
        AND e.created_at BETWEEN NOW() - INTERVAL '4 days' AND NOW() - INTERVAL '3 days'
        AND NOT EXISTS (
          SELECT 1 FROM enrollments e2
          WHERE LOWER(e2.email) = LOWER(e.email)
            AND e2.plan_type IN ('essential', 'intensive', 'online')
            AND e2.created_at > e.created_at
        )
      LIMIT 50
    `,
    );

    for (const row of diagnostics.rows as { email: string }[]) {
      const emailType = "post_diagnostic_3d";
      if (await wasNurtureSent(row.email, emailType)) continue;

      const sent = await EmailService.sendPostDiagnosticFollowUpEmail(
        row.email,
      );
      if (sent) {
        await recordNurtureSent(row.email, emailType);
        results.postDiagnostic += 1;
      } else {
        results.errors += 1;
      }
    }
  } catch (error) {
    console.error("Nurture cron error:", error);
    return NextResponse.json(
      { error: "Nurture cron failed", results },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, results });
}
