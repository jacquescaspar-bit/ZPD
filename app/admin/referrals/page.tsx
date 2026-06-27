"use client";

import { useCallback, useEffect, useState } from "react";
import PageHeader from "@/admin/components/PageHeader";
import PeriodSelect from "@/admin/components/PeriodSelect";
import LoadingState from "@/admin/components/LoadingState";
import ReferralAnalyticsPanel from "@/admin/components/ReferralAnalyticsPanel";
import ReferralCodesPanel, {
  type ReferralCodeRow,
} from "@/admin/components/ReferralCodesPanel";

interface ReferralAnalytics {
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
}

const ReferralsPage = () => {
  const [tab, setTab] = useState<"analytics" | "codes">("analytics");
  const [data, setData] = useState<ReferralAnalytics | null>(null);
  const [codes, setCodes] = useState<ReferralCodeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [emailFilter, setEmailFilter] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/referrals?period=${period}`);
      if (!response.ok) {
        setData(null);
        return;
      }
      setData(await response.json());
    } catch (error) {
      console.error("Error fetching referral analytics:", error);
      setData(null);
    }
  }, [period]);

  const fetchCodes = useCallback(async () => {
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (emailFilter) params.set("email", emailFilter);

      const response = await fetch(`/api/admin/referral-codes?${params}`);
      if (!response.ok) {
        setCodes([]);
        return;
      }
      const result = await response.json();
      setCodes(result.referralCodes);
    } catch (error) {
      console.error("Error fetching referral codes:", error);
      setCodes([]);
    }
  }, [emailFilter]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchAnalytics(), fetchCodes()]);
    setLoading(false);
  }, [fetchAnalytics, fetchCodes]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll, period]);

  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/referral-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerEmail }),
      });

      if (response.ok) {
        setOwnerEmail("");
        void fetchCodes();
      }
    } catch (error) {
      console.error("Error creating referral code:", error);
    }
  };

  const handleDeactivate = async (code: string) => {
    try {
      const response = await fetch(`/api/admin/referral-codes/${code}`, {
        method: "DELETE",
      });
      if (response.ok) void fetchCodes();
    } catch (error) {
      console.error("Error deactivating referral code:", error);
    }
  };

  if (loading && !data) {
    return <LoadingState label="Loading referral data..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <div className="flex items-center gap-3">
            {tab === "analytics" && (
              <PeriodSelect value={period} onChange={setPeriod} />
            )}
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              <button
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tab === "analytics"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600"
                }`}
                type="button"
                onClick={() => setTab("analytics")}
              >
                Analytics
              </button>
              <button
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tab === "codes" ? "bg-slate-900 text-white" : "text-slate-600"
                }`}
                type="button"
                onClick={() => setTab("codes")}
              >
                Codes
              </button>
            </div>
          </div>
        }
        description="Track referral performance and manage $100 thank-you codes."
        title="Referrals"
      />

      {tab === "analytics" && data && <ReferralAnalyticsPanel data={data} />}

      {tab === "codes" && (
        <ReferralCodesPanel
          codes={codes}
          emailFilter={emailFilter}
          ownerEmail={ownerEmail}
          onCreateCode={(e) => void handleCreateCode(e)}
          onDeactivate={(code) => void handleDeactivate(code)}
          onEmailFilterChange={setEmailFilter}
          onOwnerEmailChange={setOwnerEmail}
        />
      )}
    </div>
  );
};

export default ReferralsPage;
