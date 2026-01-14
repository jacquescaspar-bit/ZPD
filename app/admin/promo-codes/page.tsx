"use client";

import { useState, useEffect } from "react";
import type { PlanType } from "@/lib/constants";
import { PRICING } from "@/lib/constants";

interface PromoCode {
  code: string;
  discountCents: number;
  description: string;
  maxUses: number | null;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  allowedPlans: string[];
}

const PromoCodesPage = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountCents: "",
    description: "",
    maxUses: "",
    expiresAt: "",
    allowedPlans: ["trial", "online", "essential", "intensive"] as PlanType[],
  });

  useEffect(() => {
    void fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
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

  const handleCreatePromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code,
          discountCents: parseInt(formData.discountCents),
          description: formData.description,
          maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
          expiresAt: formData.expiresAt || null,
          allowedPlans: formData.allowedPlans,
        }),
      });

      if (response.ok) {
        setFormData({
          code: "",
          discountCents: "",
          description: "",
          maxUses: "",
          expiresAt: "",
          allowedPlans: ["trial", "online", "essential", "intensive"],
        });
        setShowCreateForm(false);
        void fetchPromoCodes();
      } else {
        console.error("Error creating promo code");
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

      if (response.ok) {
        void fetchPromoCodes();
      } else {
        console.error("Error deactivating promo code");
      }
    } catch (error) {
      console.error("Error deactivating promo code:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Promo Codes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage promotional codes and discounts.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
            onClick={() => setShowCreateForm(true)}
          >
            Add Promo Code
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Create New Promo Code
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => void handleCreatePromoCode(e)}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Code
                </label>
                <input
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="SUMMER2024"
                  type="text"
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
                <label className="block text-sm font-medium text-gray-700">
                  Discount (cents)
                </label>
                <input
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="1000"
                  type="number"
                  value={formData.discountCents}
                  onChange={(e) =>
                    setFormData({ ...formData, discountCents: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="$10 off your first term"
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed Plans
              </label>
              <div className="space-y-2">
                {(Object.keys(PRICING) as PlanType[]).map((plan) => (
                  <label key={plan} className="flex items-center">
                    <input
                      checked={formData.allowedPlans.includes(plan)}
                      className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
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
                    <span className="ml-2 text-sm text-gray-700">
                      {PRICING[plan].name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Uses (optional)
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="100"
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) =>
                    setFormData({ ...formData, maxUses: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expires At (optional)
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                type="button"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Promo Codes Table */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {promoCodes.map((promo) => (
            <li key={promo.code} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {promo.code}
                    </p>
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        promo.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {promo.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{promo.description}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    ${(promo.discountCents / 100).toFixed(2)} off
                    {promo.maxUses &&
                      ` • ${promo.currentUses}/${promo.maxUses} uses`}
                    {promo.expiresAt &&
                      ` • Expires ${new Date(promo.expiresAt).toLocaleDateString()}`}
                  </div>
                </div>
                {promo.isActive && (
                  <button
                    className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium"
                    onClick={() => void handleDeactivate(promo.code)}
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {promoCodes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No promo codes found. Create your first one above.
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodesPage;
