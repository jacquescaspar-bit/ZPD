"use client";

import { useEffect, useState } from "react";
import { Plus, Ticket } from "lucide-react";
import type { PlanType } from "@/lib/constants";
import { PRICING } from "@/lib/constants";
import PageHeader from "@/admin/components/PageHeader";
import LoadingState from "@/admin/components/LoadingState";
import EmptyState from "@/admin/components/EmptyState";
import StatusBadge from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui";

interface PromoCode {
  code: string;
  discountCents: number;
  description: string;
  maxUses: number | null;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
  allowedPlans: string[];
}

const PromoCodesPage = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountDollars: "",
    description: "",
    maxUses: "",
    expiresAt: "",
    allowedPlans: ["trial", "online", "essential", "intensive"] as PlanType[],
  });

  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/promo-codes");
      if (!response.ok) {
        setPromoCodes([]);
        return;
      }
      const data = await response.json();
      setPromoCodes(data.promoCodes);
    } catch (error) {
      console.error("Error fetching promo codes:", error);
      setPromoCodes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPromoCodes();
  }, []);

  const handleCreatePromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code,
          discountCents: Math.round(parseFloat(formData.discountDollars) * 100),
          description: formData.description,
          maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
          expiresAt: formData.expiresAt || null,
          allowedPlans: formData.allowedPlans,
        }),
      });

      if (response.ok) {
        setFormData({
          code: "",
          discountDollars: "",
          description: "",
          maxUses: "",
          expiresAt: "",
          allowedPlans: ["trial", "online", "essential", "intensive"],
        });
        setShowCreateForm(false);
        void fetchPromoCodes();
      }
    } catch (error) {
      console.error("Error creating promo code:", error);
    }
  };

  const handleDeactivate = async (code: string) => {
    try {
      const response = await fetch(`/api/admin/promo-codes/${code}`, {
        method: "DELETE",
      });
      if (response.ok) void fetchPromoCodes();
    } catch (error) {
      console.error("Error deactivating promo code:", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <Button
            className="cursor-pointer"
            variant="primary"
            onClick={() => setShowCreateForm((open) => !open)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New promo code
          </Button>
        }
        description="Create and manage discount codes for campaigns and partnerships."
        title="Promo codes"
      />

      {showCreateForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Create promo code
          </h2>
          <form
            className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(e) => void handleCreatePromoCode(e)}
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Code
              </label>
              <input
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm uppercase"
                placeholder="TERMSTART"
                value={formData.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Discount (AUD)
              </label>
              <input
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                min="1"
                placeholder="50"
                step="0.01"
                type="number"
                value={formData.discountDollars}
                onChange={(e) =>
                  setFormData({ ...formData, discountDollars: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Description
              </label>
              <input
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                placeholder="$50 off your first term"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Max uses
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                placeholder="Unlimited"
                type="number"
                value={formData.maxUses}
                onChange={(e) =>
                  setFormData({ ...formData, maxUses: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Expires
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                type="date"
                value={formData.expiresAt}
                onChange={(e) =>
                  setFormData({ ...formData, expiresAt: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Allowed plans
              </p>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(PRICING) as PlanType[]).map((plan) => (
                  <label
                    key={plan}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm"
                  >
                    <input
                      checked={formData.allowedPlans.includes(plan)}
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            allowedPlans: [...formData.allowedPlans, plan],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            allowedPlans: formData.allowedPlans.filter(
                              (p) => p !== plan,
                            ),
                          });
                        }
                      }}
                    />
                    {PRICING[plan].name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 md:col-span-2">
              <Button
                className="cursor-pointer"
                type="submit"
                variant="primary"
              >
                Create code
              </Button>
              <Button
                className="cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <LoadingState label="Loading promo codes..." />
      ) : promoCodes.length === 0 ? (
        <EmptyState
          description="Create your first promo code for a launch campaign or partnership."
          icon={Ticket}
          title="No promo codes yet"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {promoCodes.map((promo) => (
              <li key={promo.code} className="px-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold text-slate-900">
                        {promo.code}
                      </p>
                      <StatusBadge tone={promo.isActive ? "success" : "danger"}>
                        {promo.isActive ? "Active" : "Inactive"}
                      </StatusBadge>
                      <StatusBadge tone="info">
                        ${(promo.discountCents / 100).toFixed(0)} off
                      </StatusBadge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {promo.description}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      {promo.currentUses}
                      {promo.maxUses ? ` / ${promo.maxUses}` : ""} uses
                      {promo.expiresAt &&
                        ` · Expires ${new Date(promo.expiresAt).toLocaleDateString("en-AU")}`}
                    </p>
                  </div>
                  {promo.isActive && (
                    <button
                      className="cursor-pointer text-sm font-medium text-rose-600 hover:text-rose-700"
                      type="button"
                      onClick={() => void handleDeactivate(promo.code)}
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PromoCodesPage;
