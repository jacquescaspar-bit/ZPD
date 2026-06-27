"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight,
  CircleDollarSign,
  Gift,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHeader from "@/admin/components/PageHeader";
import PeriodSelect from "@/admin/components/PeriodSelect";
import StatCard from "@/admin/components/StatCard";
import LoadingState from "@/admin/components/LoadingState";
import EmptyState from "@/admin/components/EmptyState";
import StatusBadge from "@/admin/components/StatusBadge";
import { PRICING } from "@/lib/constants";

interface StatsData {
  period: string;
  overview: {
    totalEnrollments: number;
    totalRevenue: number;
    avgOrderValue: number;
    activeDays: number;
    referralEnrollments: number;
    enrollmentGrowth: string;
    revenueGrowth: string;
  };
  planDistribution: { plan: string; count: number }[];
  topPromoCodes: {
    code: string;
    discount: string;
    uses: number;
    enrollments: number;
    revenue: string;
  }[];
  recentEnrollments: {
    email: string;
    plan: string;
    amount: string;
    referralCode: string | null;
    createdAt: string;
  }[];
  dailyTrend: { date: string; enrollments: number; revenue: string }[];
  enrollmentFunnel: { step: string; count: number }[];
}

const formatMoney = (value: number) =>
  `$${value.toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const planLabel = (plan: string) =>
  PRICING[plan as keyof typeof PRICING]?.name ?? `${plan} plan`;

const StatsPage = () => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/stats?period=${period}`);
      if (!response.ok) {
        setData(null);
        return;
      }
      setData(await response.json());
    } catch (error) {
      console.error("Error fetching stats:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  if (loading) return <LoadingState label="Loading dashboard..." />;

  if (!data) {
    return (
      <EmptyState
        description="Check your database connection and admin session, then refresh."
        icon={TrendingUp}
        title="Unable to load dashboard"
      />
    );
  }

  const maxTrend = Math.max(...data.dailyTrend.map((d) => d.enrollments), 1);
  const funnelTotal = data.enrollmentFunnel.reduce(
    (sum, s) => sum + s.count,
    0,
  );

  return (
    <div className="space-y-8">
      <PageHeader
        actions={<PeriodSelect value={period} onChange={setPeriod} />}
        description="Revenue, enrollments, funnel health, and recent activity."
        title="Dashboard"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Enrollments"
          subtext={`${data.overview.referralEnrollments} via referral`}
          trend={`${data.overview.enrollmentGrowth}% vs previous period`}
          trendUp={Number(data.overview.enrollmentGrowth) >= 0}
          value={data.overview.totalEnrollments}
        />
        <StatCard
          icon={CircleDollarSign}
          label="Revenue"
          trend={`${data.overview.revenueGrowth}% vs previous period`}
          trendUp={Number(data.overview.revenueGrowth) >= 0}
          value={formatMoney(data.overview.totalRevenue)}
        />
        <StatCard
          icon={ArrowUpRight}
          label="Avg order value"
          value={formatMoney(data.overview.avgOrderValue)}
        />
        <StatCard
          icon={Gift}
          label="Active days"
          subtext="Days with at least one enrollment"
          value={data.overview.activeDays}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Enrollment trend
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Daily enrollments in the selected period
          </p>
          {data.dailyTrend.length === 0 ? (
            <p className="mt-8 text-sm text-slate-500">No enrollments yet.</p>
          ) : (
            <div className="mt-8 flex h-40 items-end gap-2">
              {data.dailyTrend.map((day) => (
                <div
                  key={day.date}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-lg bg-slate-900 transition-colors group-hover:bg-slate-700"
                    style={{
                      height: `${Math.max((day.enrollments / maxTrend) * 100, 8)}%`,
                    }}
                    title={`${day.enrollments} enrollments · $${day.revenue}`}
                  />
                  <span className="text-[10px] text-slate-400">
                    {new Date(day.date).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Live funnel
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Active incomplete enrollments
          </p>
          <div className="mt-6 space-y-4">
            {["plan", "payment", "insights"].map((step) => {
              const item = data.enrollmentFunnel.find((f) => f.step === step);
              const count = item?.count ?? 0;
              const pct =
                funnelTotal > 0 ? Math.round((count / funnelTotal) * 100) : 0;

              return (
                <div key={step}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium capitalize text-slate-700">
                      {step}
                    </span>
                    <span className="text-slate-500">
                      {count} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Recent enrollments
            </h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {data.recentEnrollments.map((enrollment) => (
              <li
                key={`${enrollment.email}-${enrollment.createdAt}`}
                className="px-6 py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {enrollment.email}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {planLabel(enrollment.plan)} · ${enrollment.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    {enrollment.referralCode ? (
                      <StatusBadge tone="success">
                        {enrollment.referralCode}
                      </StatusBadge>
                    ) : (
                      <StatusBadge>Direct</StatusBadge>
                    )}
                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(enrollment.createdAt).toLocaleDateString(
                        "en-AU",
                      )}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {data.recentEnrollments.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              No enrollments yet. Your first customer will show up here.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">Plan mix</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {data.planDistribution.map((plan) => (
              <li
                key={plan.plan}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-sm font-medium text-slate-700">
                  {planLabel(plan.plan)}
                </span>
                <span className="text-sm text-slate-500">
                  {plan.count} enrollments
                </span>
              </li>
            ))}
          </ul>
          {data.planDistribution.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              No plan data for this period.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
