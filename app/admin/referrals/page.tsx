"use client";

import { useState, useEffect, useCallback } from "react";

interface ReferralAnalytics {
  period: string;
  analytics: {
    date: string;
    generated: number;
    used: number;
    converted: number;
  }[];
  topReferrers: {
    owner_email: string;
    referrals_generated: number;
    referrals_used: number;
  }[];
  summary: {
    totalEnrollments: number;
    referralEnrollments: number;
    totalRevenue: number;
    avgOrderValue: number;
    conversionRate: string;
  };
}

const ReferralsPage = () => {
  const [data, setData] = useState<ReferralAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const fetchReferralData = useCallback(async () => {
    try {
      const response = await fetch(`/api/analytics/referrals?period=${period}`);
      if (!response.ok) {
        setData(null);
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching referral data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    void fetchReferralData();
  }, [period, fetchReferralData]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-red-600">Error loading data</div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Referral Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Track referral performance and top referrers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={period}
            onChange={(e) => setPeriod(e.target.value as "7d" | "30d" | "90d")}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Enrollments
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.summary.totalEnrollments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500">
                    Referral Enrollments
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.summary.referralEnrollments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">$</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500">
                    Revenue from Referrals
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${data.summary.totalRevenue.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">%</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500">
                    Conversion Rate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.summary.conversionRate}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Referrers */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Top Referrers
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {data.topReferrers.map((referrer, index) => (
              <li key={referrer.owner_email} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {referrer.owner_email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {referrer.referrals_generated} codes generated,{" "}
                        {referrer.referrals_used} used
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {referrer.referrals_used} successful referrals
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {data.topReferrers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No referral activity in the selected period.
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {data.analytics.slice(0, 10).map((day) => (
              <li key={day.date} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-6 text-sm text-gray-500">
                    <span>Generated: {day.generated}</span>
                    <span>Used: {day.used}</span>
                    <span>Converted: {day.converted}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {data.analytics.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No activity in the selected period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
