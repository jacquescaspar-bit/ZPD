"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import PageHeader from "@/admin/components/PageHeader";
import LoadingState from "@/admin/components/LoadingState";
import EmptyState from "@/admin/components/EmptyState";
import StatusBadge from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui";
import { PRICING } from "@/lib/constants";

interface Enrollment {
  id: string;
  email: string;
  planType: string;
  amountCents: number;
  referralCodeUsed: string | null;
  stripePaymentIntentId: string;
  status: string;
  createdAt: string;
}

const planLabel = (plan: string) =>
  PRICING[plan as keyof typeof PRICING]?.name ?? plan;

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [hasReferral, setHasReferral] = useState("");
  const [total, setTotal] = useState(0);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (email) params.set("email", email);
      if (plan) params.set("plan", plan);
      if (hasReferral) params.set("hasReferral", hasReferral);

      const response = await fetch(`/api/admin/enrollments?${params}`);
      if (!response.ok) {
        setEnrollments([]);
        return;
      }

      const data = await response.json();
      setEnrollments(data.enrollments);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }, [email, plan, hasReferral]);

  useEffect(() => {
    void fetchEnrollments();
  }, [fetchEnrollments]);

  return (
    <div className="space-y-6">
      <PageHeader
        description={`${total} completed enrollment${total === 1 ? "" : "s"} in the system.`}
        title="Enrollments"
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Search by email"
              type="search"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <select
            className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="">All plans</option>
            {Object.keys(PRICING).map((planKey) => (
              <option key={planKey} value={planKey}>
                {PRICING[planKey as keyof typeof PRICING].name}
              </option>
            ))}
          </select>
          <select
            className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            value={hasReferral}
            onChange={(e) => setHasReferral(e.target.value)}
          >
            <option value="">All sources</option>
            <option value="true">With referral</option>
            <option value="false">Direct</option>
          </select>
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            className="cursor-pointer"
            size="sm"
            variant="outline"
            onClick={() => void fetchEnrollments()}
          >
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingState label="Loading enrollments..." />
      ) : enrollments.length === 0 ? (
        <EmptyState
          description="Completed payments will appear here once Stripe webhooks are processing."
          icon={Users}
          title="No enrollments found"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {enrollment.email}
                      </p>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        {enrollment.stripePaymentIntentId.slice(0, 20)}...
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {planLabel(enrollment.planType)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      ${(enrollment.amountCents / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {enrollment.referralCodeUsed ? (
                        <StatusBadge tone="success">
                          {enrollment.referralCodeUsed}
                        </StatusBadge>
                      ) : (
                        <StatusBadge>Direct</StatusBadge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(enrollment.createdAt).toLocaleString("en-AU")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentsPage;
