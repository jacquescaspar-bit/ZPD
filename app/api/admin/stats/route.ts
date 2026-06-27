import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminApi";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "30d";

    // Calculate date range
    const now = new Date();
    let periodDays: number;

    switch (period) {
      case "7d":
        periodDays = 7;
        break;
      case "90d":
        periodDays = 90;
        break;
      default: // 30d
        periodDays = 30;
    }

    const startDate = new Date(
      now.getTime() - periodDays * 24 * 60 * 60 * 1000,
    );
    const lastPeriodStart = new Date(
      now.getTime() - periodDays * 2 * 24 * 60 * 60 * 1000,
    );

    // Get enrollment stats
    const enrollmentQuery = `
      SELECT
        COUNT(*) as total_enrollments,
        COUNT(CASE WHEN created_at >= $2 THEN 1 END) as recent_enrollments,
        SUM(amount_cents) as total_revenue,
        AVG(amount_cents) as avg_order_value,
        COUNT(DISTINCT CASE WHEN created_at >= $2 THEN DATE(created_at) END) as active_days
      FROM enrollments
      WHERE created_at >= $1
    `;

    const enrollmentResult = await query(enrollmentQuery, [
      startDate,
      lastPeriodStart,
    ]);
    const [enrollmentStats] = enrollmentResult.rows;

    // Get plan distribution
    const planQuery = `
      SELECT
        plan_type,
        COUNT(*) as count
      FROM enrollments
      WHERE created_at >= $1
      GROUP BY plan_type
      ORDER BY count DESC
    `;

    const planResult = await query(planQuery, [startDate]);

    // Get promo code performance
    const promoQuery = `
      SELECT
        pc.code,
        pc.discount_cents,
        pc.current_uses,
        pc.max_uses,
        COUNT(e.id) as enrollments_with_promo,
        SUM(e.amount_cents) as revenue_with_promo
      FROM promo_codes pc
      LEFT JOIN enrollments e ON e.referral_code_used = pc.code AND e.created_at >= $1
      WHERE pc.is_active = true
      GROUP BY pc.id, pc.code, pc.discount_cents, pc.current_uses, pc.max_uses
      ORDER BY pc.current_uses DESC
      LIMIT 5
    `;

    const promoResult = await query(promoQuery, [startDate]);

    const recentEnrollmentsResult = await query(
      `
      SELECT email, plan_type, amount_cents, referral_code_used, created_at
      FROM enrollments
      ORDER BY created_at DESC
      LIMIT 8
    `,
    );

    const dailyTrendResult = await query(
      `
      SELECT
        DATE(created_at) as date,
        COUNT(*) as enrollments,
        SUM(amount_cents) as revenue
      FROM enrollments
      WHERE created_at >= $1
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `,
      [startDate],
    );

    const funnelResult = await query(
      `
      SELECT current_step, COUNT(*) as count
      FROM enrollment_sessions
      WHERE expires_at >= NOW()
      GROUP BY current_step
    `,
    );

    const referralCountResult = await query(
      `
      SELECT COUNT(*) as count
      FROM enrollments
      WHERE created_at >= $1 AND referral_code_used IS NOT NULL
    `,
      [startDate],
    );

    // Calculate growth metrics
    const previousPeriodQuery = `
      SELECT COUNT(*) as prev_enrollments, SUM(amount_cents) as prev_revenue
      FROM enrollments
      WHERE created_at >= $1 AND created_at < $2
    `;

    const previousResult = await query(previousPeriodQuery, [
      lastPeriodStart,
      startDate,
    ]);
    const [previousStats] = previousResult.rows;

    const currentEnrollments = parseInt(enrollmentStats.total_enrollments) || 0;
    const previousEnrollments = parseInt(previousStats.prev_enrollments) || 0;
    const enrollmentGrowth =
      previousEnrollments > 0
        ? (
            ((currentEnrollments - previousEnrollments) / previousEnrollments) *
            100
          ).toFixed(1)
        : "0";

    const currentRevenue = parseInt(enrollmentStats.total_revenue) || 0;
    const previousRevenue = parseInt(previousStats.prev_revenue) || 0;
    const revenueGrowth =
      previousRevenue > 0
        ? (
            ((currentRevenue - previousRevenue) / previousRevenue) *
            100
          ).toFixed(1)
        : "0";

    return NextResponse.json({
      period,
      overview: {
        totalEnrollments: currentEnrollments,
        totalRevenue: currentRevenue / 100,
        avgOrderValue: (parseInt(enrollmentStats.avg_order_value) || 0) / 100,
        activeDays: parseInt(enrollmentStats.active_days) || 0,
        referralEnrollments: parseInt(referralCountResult.rows[0].count) || 0,
        enrollmentGrowth,
        revenueGrowth,
      },
      planDistribution: planResult.rows.map((row) => ({
        plan: row.plan_type,
        count: parseInt(row.count),
      })),
      topPromoCodes: promoResult.rows.map((row) => ({
        code: row.code,
        discount: (parseInt(row.discount_cents) / 100).toFixed(2),
        uses: parseInt(row.current_uses),
        maxUses: row.max_uses,
        enrollments: parseInt(row.enrollments_with_promo ?? 0),
        revenue: (parseInt(row.revenue_with_promo ?? 0) / 100).toFixed(2),
      })),
      recentEnrollments: recentEnrollmentsResult.rows.map((row) => ({
        email: row.email,
        plan: row.plan_type,
        amount: (parseInt(row.amount_cents) / 100).toFixed(2),
        referralCode: row.referral_code_used,
        createdAt: row.created_at,
      })),
      dailyTrend: dailyTrendResult.rows.map((row) => ({
        date: row.date,
        enrollments: parseInt(row.enrollments),
        revenue: (parseInt(row.revenue) / 100).toFixed(2),
      })),
      enrollmentFunnel: funnelResult.rows.map((row) => ({
        step: row.current_step,
        count: parseInt(row.count),
      })),
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
