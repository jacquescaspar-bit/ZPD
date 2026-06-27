import { CircleDollarSign, Gift, Percent, Users } from "lucide-react";
import StatCard from "@/admin/components/StatCard";

interface ReferralAnalyticsPanelProps {
  data: {
    summary: {
      totalEnrollments: number;
      referralEnrollments: number;
      referralRevenue: number;
      conversionRate: string;
    };
    topReferrers: {
      owner_email: string;
      referrals_generated: number;
      referrals_used: number;
    }[];
    analytics: {
      date: string;
      generated: number;
      used: number;
    }[];
  };
}

const ReferralAnalyticsPanel = ({ data }: ReferralAnalyticsPanelProps) => (
  <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={Users}
        label="Referral enrollments"
        subtext={`${data.summary.totalEnrollments} total enrollments`}
        value={data.summary.referralEnrollments}
      />
      <StatCard
        icon={CircleDollarSign}
        label="Referral revenue"
        value={`$${data.summary.referralRevenue.toLocaleString("en-AU")}`}
      />
      <StatCard
        icon={Percent}
        label="Referral share"
        value={`${data.summary.conversionRate}%`}
      />
      <StatCard
        icon={Gift}
        label="Codes used"
        value={data.analytics.reduce((sum, day) => sum + day.used, 0)}
      />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Top referrers
          </h2>
        </div>
        <ul className="divide-y divide-slate-100">
          {data.topReferrers.map((referrer, index) => (
            <li key={referrer.owner_email} className="px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {referrer.owner_email}
                  </p>
                  <p className="text-xs text-slate-500">
                    {referrer.referrals_generated} generated ·{" "}
                    {referrer.referrals_used} used
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {data.topReferrers.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-slate-500">
            No referral activity in this period.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Daily activity
          </h2>
        </div>
        <ul className="divide-y divide-slate-100">
          {data.analytics.slice(0, 10).map((day) => (
            <li
              key={day.date}
              className="flex items-center justify-between px-6 py-4 text-sm"
            >
              <span className="text-slate-700">
                {new Date(day.date).toLocaleDateString("en-AU")}
              </span>
              <span className="text-slate-500">
                {day.generated} generated · {day.used} used
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default ReferralAnalyticsPanel;
