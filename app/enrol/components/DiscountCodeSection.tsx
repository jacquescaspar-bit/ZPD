"use client";

import type { PlanType } from "@/lib/constants";

interface DiscountCodeSectionProps {
  selectedPlan: PlanType | null;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoStatus: string | null;
  appliedPromoValue: number;
  removePromo: () => void;
  onPromoCodeChange: (value: string) => void;
}

const DiscountCodeSection = ({
  selectedPlan,
  promoCode,
  setPromoCode,
  promoStatus,
  appliedPromoValue,
  removePromo,
  onPromoCodeChange,
}: DiscountCodeSectionProps) => {
  if (selectedPlan === "online") {
    return (
      <div className="border-t border-white/60 dark:border-gray-700 pt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Online plan is a fixed term price — referral, promo, and diagnostic
          credits do not apply.
        </p>
      </div>
    );
  }

  if (selectedPlan === "trial" || !selectedPlan) {
    return null;
  }

  return (
    <div className="border-t border-white/60 dark:border-gray-700 pt-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Referral or Promo Code
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          $50 off with a referral or promo code. Diagnostic Discovery credit (if
          eligible within 30 days) stacks on top. Referral and promo codes
          cannot be combined with each other.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Referral or promo code
        </label>
        <div className="relative">
          <input
            className={`w-full rounded-2xl border bg-white/90 dark:bg-gray-950/40 px-4 py-3 pr-10 text-gray-900 dark:text-white focus:outline-none shadow-sm ${
              appliedPromoValue > 0
                ? "border-green-500 dark:border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-500"
                : promoCode.trim() && appliedPromoValue === 0
                  ? "border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-500"
                  : "border-white/60 dark:border-gray-700 focus:ring-2 focus:ring-blue-400"
            }`}
            placeholder="Enter your code"
            type="text"
            value={promoCode}
            onChange={(event) => onPromoCodeChange(event.target.value)}
          />
          {appliedPromoValue > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 dark:text-green-400">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
          {promoCode.trim() && appliedPromoValue === 0 && (
            <button
              aria-label="Clear promo code"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 dark:text-red-400"
              type="button"
              onClick={() => setPromoCode("")}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {promoStatus && (promoCode.trim() || appliedPromoValue > 0) && (
        <div className="flex items-center justify-between rounded-2xl border border-blue-200/70 bg-blue-50/70 px-4 py-3 text-sm text-blue-800 shadow-inner dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
          <span>{promoStatus}</span>
          {appliedPromoValue > 0 && (
            <button
              className="ml-2 rounded px-1 text-xs text-gray-500 hover:text-gray-700"
              type="button"
              onClick={removePromo}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountCodeSection;
