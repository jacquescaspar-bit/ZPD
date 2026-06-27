"use client";

import { useCallback, useEffect, useState } from "react";
import { Filter, UserPlus } from "lucide-react";
import PageHeader from "@/admin/components/PageHeader";
import LoadingState from "@/admin/components/LoadingState";
import EmptyState from "@/admin/components/EmptyState";
import StatusBadge from "@/admin/components/StatusBadge";

interface Session {
  id: string;
  sessionId: string;
  email: string | null;
  stripePaymentIntentId: string | null;
  currentStep: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  isExpired: boolean;
}

const stepTone = (step: string) => {
  if (step === "insights") return "success" as const;
  if (step === "payment") return "warning" as const;
  return "info" as const;
};

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [funnel, setFunnel] = useState<{ step: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("");
  const [expired, setExpired] = useState("false");
  const [total, setTotal] = useState(0);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (currentStep) params.set("currentStep", currentStep);
      if (expired) params.set("expired", expired);

      const response = await fetch(`/api/admin/sessions?${params}`);
      if (!response.ok) {
        setSessions([]);
        return;
      }

      const data = await response.json();
      setSessions(data.sessions);
      setFunnel(data.funnel);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [currentStep, expired]);

  useEffect(() => {
    void fetchSessions();
  }, [fetchSessions]);

  const activeTotal = funnel.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Track parents who started enrolling but haven't finished yet."
        title="Enrollment funnel"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {["plan", "payment", "insights"].map((step) => {
          const item = funnel.find((f) => f.step === step);
          const count = item?.count ?? 0;
          const pct =
            activeTotal > 0 ? Math.round((count / activeTotal) * 100) : 0;

          return (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium capitalize text-slate-500">
                Stuck at {step}
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {count}
              </p>
              <p className="mt-1 text-sm text-slate-500">{pct}% of active</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Filter className="h-4 w-4" />
          Filters
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <select
            className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
          >
            <option value="">All steps</option>
            <option value="plan">Plan selection</option>
            <option value="payment">Payment</option>
            <option value="insights">Insights</option>
          </select>
          <select
            className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            value={expired}
            onChange={(e) => setExpired(e.target.value)}
          >
            <option value="false">Active sessions</option>
            <option value="true">Expired sessions</option>
            <option value="">All sessions</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingState label="Loading funnel sessions..." />
      ) : sessions.length === 0 ? (
        <EmptyState
          description={`No ${expired === "true" ? "expired" : "active"} sessions match your filters.`}
          icon={UserPlus}
          title="No sessions found"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {sessions.length} of {total} sessions
            </p>
          </div>
          <ul className="divide-y divide-slate-100">
            {sessions.map((session) => (
              <li key={session.id} className="px-6 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {session.email ?? "No email yet"}
                    </p>
                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {session.sessionId}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone={stepTone(session.currentStep)}>
                      {session.currentStep}
                    </StatusBadge>
                    {session.isExpired ? (
                      <StatusBadge tone="danger">Expired</StatusBadge>
                    ) : (
                      <StatusBadge tone="success">Active</StatusBadge>
                    )}
                    <span className="text-xs text-slate-400">
                      Updated{" "}
                      {new Date(session.updatedAt).toLocaleString("en-AU")}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SessionsPage;
