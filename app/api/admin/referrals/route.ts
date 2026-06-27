import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import pool from "@/lib/db";

type EventType = "generated" | "used" | "converted";

interface AnalyticsEntry {
  date: string;
  generated: number;
  used: number;
  converted: number;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "30d";

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const analyticsResult = await pool.query(
      `
      SELECT
        event_type,
        COUNT(*) as count,
        DATE(created_at) as date
      FROM referral_analytics
      WHERE created_at >= $1
      GROUP BY event_type, DATE(created_at)
      ORDER BY date DESC, event_type
    `,
      [startDate],
    );

    const topReferrersResult = await pool.query(
      `
      SELECT
        rc.owner_email,
        COUNT(DISTINCT rc.id) as referrals_generated,
        SUM(CASE WHEN ra.event_type = 'used' THEN 1 ELSE 0 END) as referrals_used
      FROM referral_codes rc
      LEFT JOIN referral_analytics ra ON rc.id = ra.referral_code_id AND ra.created_at >= $1
      WHERE rc.created_at >= $1
      GROUP BY rc.owner_email
      ORDER BY referrals_used DESC, referrals_generated DESC
      LIMIT 10
    `,
      [startDate],
    );

    const enrollmentResult = await pool.query(
      `
      SELECT
        COUNT(*) as total_enrollments,
        COUNT(CASE WHEN referral_code_used IS NOT NULL THEN 1 END) as referral_enrollments,
        SUM(amount_cents) as total_revenue,
        SUM(CASE WHEN referral_code_used IS NOT NULL THEN amount_cents ELSE 0 END) as referral_revenue,
        AVG(amount_cents) as avg_order_value
      FROM enrollments
      WHERE created_at >= $1
    `,
      [startDate],
    );

    const [enrollmentStats] = enrollmentResult.rows;

    const analyticsByDate: Record<string, AnalyticsEntry> = {};
    analyticsResult.rows.forEach((row) => {
      const [date] = row.date.toISOString().split("T");
      analyticsByDate[date] ??= { date, generated: 0, used: 0, converted: 0 };
      analyticsByDate[date][row.event_type as EventType] = parseInt(row.count);
    });

    const totalEnrollments = parseInt(enrollmentStats.total_enrollments) || 0;
    const referralEnrollments =
      parseInt(enrollmentStats.referral_enrollments) || 0;

    return NextResponse.json({
      period,
      analytics: Object.values(analyticsByDate),
      topReferrers: topReferrersResult.rows.map((row) => ({
        owner_email: row.owner_email,
        referrals_generated: parseInt(row.referrals_generated),
        referrals_used: parseInt(row.referrals_used ?? 0),
      })),
      summary: {
        totalEnrollments,
        referralEnrollments,
        totalRevenue: (parseInt(enrollmentStats.total_revenue) || 0) / 100,
        referralRevenue:
          (parseInt(enrollmentStats.referral_revenue) || 0) / 100,
        avgOrderValue: (parseInt(enrollmentStats.avg_order_value) || 0) / 100,
        conversionRate:
          totalEnrollments > 0
            ? ((referralEnrollments / totalEnrollments) * 100).toFixed(1)
            : "0",
      },
    });
  } catch (error) {
    console.error("Error fetching referral analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
