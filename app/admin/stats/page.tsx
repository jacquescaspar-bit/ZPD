"use client";

import { useState, useEffect, useCallback } from "react";

interface StatsData {
  period: string;
  overview: {
    totalEnrollments: number;
    totalRevenue: number;
    avgOrderValue: number;
    activeDays: number;
    enrollmentGrowth: string;
    revenueGrowth: string;
  };
  planDistribution: {
    plan: string;
    count: number;
  }[];
  topPromoCodes: {
    code: string;
    discount: string;
    uses: number;
    maxUses: number | null;
    enrollments: number;
    revenue: string;
  }[];
}

const StatsPage = () => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/stats?period=${period}`);
      if (!response.ok) {
        setData(null);
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    void fetchStats();
  }, [period, fetchStats]);

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
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of enrollment performance and key metrics.
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

      {/* Overview Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Enrollments
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.overview.totalEnrollments}
                  </dd>
                  <dd className="text-sm text-green-600">
                    {data.overview.enrollmentGrowth}% vs previous period
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
                  <span className="text-white text-sm font-bold">$</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${data.overview.totalRevenue.toFixed(2)}
                  </dd>
                  <dd className="text-sm text-green-600">
                    {data.overview.revenueGrowth}% vs previous period
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
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg Order Value
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${data.overview.avgOrderValue.toFixed(2)}
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
                  <span className="text-white text-sm font-bold">📅</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Days
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {data.overview.activeDays}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Distribution */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Plan Distribution
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {data.planDistribution.map((plan) => (
              <li key={plan.plan} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full" />
                    <p className="ml-3 text-sm font-medium text-gray-900 capitalize">
                      {plan.plan} Plan
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {plan.count} enrollments
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {data.planDistribution.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No enrollments in the selected period.
            </div>
          )}
        </div>
      </div>

      {/* Top Promo Codes */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Top Promo Codes
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {data.topPromoCodes.map((promo) => (
              <li key={promo.code} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">
                        {promo.code}
                      </p>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ${promo.discount} off
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {promo.uses}
                      {promo.maxUses ? `/${promo.maxUses}` : ""} uses •{" "}
                      {promo.enrollments} enrollments • ${promo.revenue} revenue
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {data.topPromoCodes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No promo code activity in the selected period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
