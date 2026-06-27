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
    const period = searchParams.get("period") ?? "30d"; // 7d, 30d, 90d

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default: // 30d
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get referral analytics
    const analyticsQuery = `
      SELECT
        event_type,
        COUNT(*) as count,
        DATE(created_at) as date
      FROM referral_analytics
      WHERE created_at >= $1
      GROUP BY event_type, DATE(created_at)
      ORDER BY date DESC, event_type
    `;

    const analyticsResult = await pool.query(analyticsQuery, [startDate]);

    // Get top referrers
    const topReferrersQuery = `
      SELECT
        rc.owner_email,
        COUNT(ra.id) as referrals_generated,
        SUM(CASE WHEN ra.event_type = 'used' THEN 1 ELSE 0 END) as referrals_used
      FROM referral_codes rc
      LEFT JOIN referral_analytics ra ON rc.id = ra.referral_code_id
      WHERE rc.created_at >= $1
      GROUP BY rc.owner_email
      ORDER BY referrals_generated DESC
      LIMIT 10
    `;

    const topReferrersResult = await pool.query(topReferrersQuery, [startDate]);

    // Get enrollment stats
    const enrollmentQuery = `
      SELECT
        COUNT(*) as total_enrollments,
        COUNT(CASE WHEN referral_code_used IS NOT NULL THEN 1 END) as referral_enrollments,
        SUM(amount_cents) as total_revenue,
        AVG(amount_cents) as avg_order_value
      FROM enrollments
      WHERE created_at >= $1
    `;

    const enrollmentResult = await pool.query(enrollmentQuery, [startDate]);
    const [enrollmentStats] = enrollmentResult.rows;

    // Process analytics data
    const analyticsByDate: Record<string, AnalyticsEntry> = {};
    analyticsResult.rows.forEach((row) => {
      const [date] = row.date.toISOString().split("T");
      analyticsByDate[date] ??= { date, generated: 0, used: 0, converted: 0 };
      analyticsByDate[date][row.event_type as EventType] = parseInt(row.count);
    });

    const analytics = Object.values(analyticsByDate);

    return NextResponse.json({
      period,
      analytics,
      topReferrers: topReferrersResult.rows,
      summary: {
        totalEnrollments: parseInt(enrollmentStats.total_enrollments) || 0,
        referralEnrollments:
          parseInt(enrollmentStats.referral_enrollments) || 0,
        totalRevenue: (parseInt(enrollmentStats.total_revenue) || 0) / 100, // Convert cents to dollars
        avgOrderValue: (parseInt(enrollmentStats.avg_order_value) || 0) / 100,
        conversionRate:
          (enrollmentStats.total_enrollments ?? 0) > 0
            ? (
                ((enrollmentStats.referral_enrollments ?? 0) /
                  (enrollmentStats.total_enrollments ?? 0)) *
                100
              ).toFixed(1)
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
