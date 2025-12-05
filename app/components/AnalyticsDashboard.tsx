"use client";

import React, { useState, useEffect } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeLabel, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change !== undefined && (
          <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% {changeLabel || 'from last month'}
          </p>
        )}
      </div>
      {icon && <div className="text-gray-400">{icon}</div>}
    </div>
  </div>
);

interface FunnelStep {
  name: string;
  count: number;
  percentage: number;
  dropoff: number;
}

const ConversionFunnel: React.FC<{ steps: FunnelStep[] }> = ({ steps }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Conversion Funnel
    </h3>
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step.name} className="flex items-center space-x-4">
          <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">
            {step.name}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {step.count} users ({step.percentage}%)
              </span>
              {index > 0 && (
                <span className="text-sm text-red-600">
                  -{step.dropoff}% dropoff
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${step.percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock data - in a real implementation, this would come from GA4 API
  const mockData = {
    metrics: {
      pageViews: { value: 12450, change: 12.5 },
      uniqueVisitors: { value: 8234, change: 8.2 },
      enrollmentStarts: { value: 456, change: 15.3 },
      completions: { value: 234, change: 22.1 },
      revenue: { value: 18750, change: 18.7 },
      avgSessionDuration: { value: '4:32', change: 5.1 },
    },
    funnel: [
      { name: 'Page Visits', count: 12450, percentage: 100, dropoff: 0 },
      { name: 'Widget Start', count: 8920, percentage: 71.6, dropoff: 28.4 },
      { name: 'Assessment', count: 6780, percentage: 54.4, dropoff: 17.2 },
      { name: 'Value Demo', count: 5430, percentage: 43.6, dropoff: 10.8 },
      { name: 'Pricing', count: 4320, percentage: 34.7, dropoff: 8.9 },
      { name: 'Payment', count: 3450, percentage: 27.7, dropoff: 7.0 },
      { name: 'Complete', count: 2340, percentage: 18.8, dropoff: 8.9 },
    ],
    planDistribution: [
      { name: 'Standard Plan', count: 1456, percentage: 62.4 },
      { name: 'Premium Plan', count: 884, percentage: 37.6 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track enrollment performance and conversion metrics
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Page Views"
            value={mockData.metrics.pageViews.value.toLocaleString()}
            change={mockData.metrics.pageViews.change}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          />
          <MetricCard
            title="Unique Visitors"
            value={mockData.metrics.uniqueVisitors.value.toLocaleString()}
            change={mockData.metrics.uniqueVisitors.change}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          <MetricCard
            title="Enrollment Starts"
            value={mockData.metrics.enrollmentStarts.value}
            change={mockData.metrics.enrollmentStarts.change}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          />
          <MetricCard
            title="Completions"
            value={mockData.metrics.completions.value}
            change={mockData.metrics.completions.change}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <MetricCard
            title="Revenue"
            value={`$${mockData.metrics.revenue.value.toLocaleString()}`}
            change={mockData.metrics.revenue.change}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
          />
          <MetricCard
            title="Avg. Session Duration"
            value={mockData.metrics.avgSessionDuration.value}
            change={mockData.metrics.avgSessionDuration.change}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConversionFunnel steps={mockData.funnel} />

          {/* Plan Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Plan Distribution
            </h3>
            <div className="space-y-4">
              {mockData.planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      plan.name === 'Premium Plan' ? 'bg-purple-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {plan.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {plan.count}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      ({plan.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Implementation Notes
          </h3>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>
              <strong>Google Analytics 4 Integration:</strong> This dashboard shows mock data.
              In production, it would connect to the GA4 API to fetch real-time analytics data.
            </p>
            <p>
              <strong>Real-time Updates:</strong> Data would be refreshed periodically or use
              GA4's real-time reporting API for live metrics.
            </p>
            <p>
              <strong>Custom Events:</strong> All enrollment events are tracked with custom
              parameters for detailed funnel analysis.
            </p>
            <p>
              <strong>Privacy Compliance:</strong> Analytics only run with user consent,
              respecting GDPR/CCPA requirements for Australian users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;