import { useState, useEffect, useMemo, useCallback } from "react";
import type { PlanType } from "@/lib/constants";
import {
  DISCOUNT_ELIGIBLE_PLANS,
  REFERRAL_VALUE,
  type PromoCode,
} from "@/enrol/constants";
import type { DiscountKind } from "@/lib/discountResolution";

export interface PromoAdjustment {
  label: string;
  amount: number;
}

export interface ReferralCode {
  id: string;
  code: string;
  allowedPlans: string[];
}

export interface UseReferralSystemReturn {
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoStatus: string | null;
  appliedPromoValue: number;
  appliedPromoKind: DiscountKind | null;
  referralLink: string | null;
  applyReferral: (code: string, message?: string) => Promise<boolean>;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromo: () => void;
  copyReferralLink: () => void;
  promoAdjustments: PromoAdjustment[];
  calculateFinalAmount: (basePriceCents: number) => number;
  validateCode: (code: string) => Promise<void>;
  refreshDiscount: () => Promise<void>;
}

const planAcceptsDiscounts = (plan: PlanType | null): plan is PlanType =>
  Boolean(plan) && DISCOUNT_ELIGIBLE_PLANS.includes(plan as PlanType);

export const useReferralSystem = (
  selectedPlan: PlanType | null,
  initialPromoCode?: string,
  checkoutEmail?: string,
): UseReferralSystemReturn => {
  const [promoCode, setPromoCode] = useState(initialPromoCode ?? "");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [appliedPromoValue, setAppliedPromoValue] = useState(0);
  const [appliedPromoKind, setAppliedPromoKind] = useState<DiscountKind | null>(
    null,
  );
  const referralLink: string | null = null;

  const normalizedCheckoutEmail = checkoutEmail?.trim() ?? undefined;

  const applyResolution = useCallback(
    (result: {
      finalAmountCents: number;
      planPriceCents: number;
      discount: {
        kind: DiscountKind;
        amountCents: number;
        label: string;
        code?: string;
      };
    }) => {
      const { discount } = result;
      if (discount.kind === "none" || discount.amountCents <= 0) {
        setAppliedPromoValue(0);
        setAppliedPromoKind(null);
        if (!promoCode.trim()) {
          setPromoStatus(null);
        }
        return;
      }

      setAppliedPromoValue(discount.amountCents);
      setAppliedPromoKind(discount.kind);

      if (discount.kind === "diagnostic_credit") {
        setPromoStatus(
          `${discount.label} applied ($${(discount.amountCents / 100).toFixed(0)} off). One offer per purchase.`,
        );
        if (discount.code) {
          setPromoCode(discount.code);
        } else if (!promoCode.trim()) {
          // leave field empty for auto credit
        }
      } else if (discount.code) {
        setPromoCode(discount.code);
        setPromoStatus(`${discount.label} applied!`);
      }
    },
    [promoCode],
  );

  const resolveFromServer = useCallback(
    async (code?: string): Promise<boolean> => {
      if (!planAcceptsDiscounts(selectedPlan)) {
        setAppliedPromoValue(0);
        setAppliedPromoKind(null);
        if (selectedPlan === "online") {
          setPromoStatus(
            "Discounts do not apply to the Online plan — fixed term price only.",
          );
        }
        return false;
      }

      try {
        const response = await fetch("/api/discounts/resolve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planType: selectedPlan,
            email: normalizedCheckoutEmail,
            code: code?.trim() ? code.trim() : undefined,
          }),
        });

        if (!response.ok) {
          setPromoStatus("Could not validate discount. Try again.");
          return false;
        }

        const result = await response.json();
        applyResolution(result);

        if (code?.trim() && result.discount?.kind === "none") {
          setPromoStatus("Invalid Referral / Promo code");
          return false;
        }

        if (
          code?.trim() &&
          result.discount?.kind === "diagnostic_credit" &&
          result.discount?.code !== code.trim().toUpperCase()
        ) {
          setPromoStatus(
            `Diagnostic credit applied ($${(result.discount.amountCents / 100).toFixed(0)}). Entered code was not used — one offer per purchase.`,
          );
        }

        return result.discount?.kind !== "none";
      } catch (error) {
        console.error("Error resolving discount:", error);
        setPromoStatus("Could not validate discount. Try again.");
        return false;
      }
    },
    [selectedPlan, normalizedCheckoutEmail, applyResolution],
  );

  const refreshDiscount = useCallback(async () => {
    if (!planAcceptsDiscounts(selectedPlan)) {
      setAppliedPromoValue(0);
      setAppliedPromoKind(null);
      return;
    }
    await resolveFromServer(promoCode.trim() || undefined);
  }, [selectedPlan, promoCode, resolveFromServer]);

  // Auto-apply diagnostic credit when email + eligible plan
  useEffect(() => {
    if (!planAcceptsDiscounts(selectedPlan) || !normalizedCheckoutEmail) {
      return;
    }
    void resolveFromServer(promoCode.trim() || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when plan/email change
  }, [selectedPlan, normalizedCheckoutEmail]);

  // URL ?ref=
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref && planAcceptsDiscounts(selectedPlan)) {
      setPromoCode(ref.trim().toUpperCase());
      void resolveFromServer(ref.trim().toUpperCase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan]);

  useEffect(() => {
    if (
      appliedPromoKind &&
      appliedPromoKind !== "none" &&
      selectedPlan &&
      !planAcceptsDiscounts(selectedPlan)
    ) {
      setAppliedPromoValue(0);
      setPromoCode("");
      setAppliedPromoKind(null);
      setPromoStatus(
        selectedPlan === "online"
          ? "Discounts removed — not available on the Online plan."
          : "Discount removed — not compatible with selected plan.",
      );
    }
  }, [selectedPlan, appliedPromoKind]);

  const applyReferral = useCallback(
    async (code: string, _message?: string): Promise<boolean> => {
      setPromoCode(code.toUpperCase());
      const ok = await resolveFromServer(code);
      if (ok) {
        setPromoStatus(
          `Referral thank-you applied! That's $${(REFERRAL_VALUE / 100).toFixed(0)} off your term.`,
        );
      }
      return ok;
    },
    [resolveFromServer],
  );

  const applyPromoCode = useCallback(
    (code: string): Promise<boolean> => {
      setPromoCode(code.toUpperCase());
      return resolveFromServer(code);
    },
    [resolveFromServer],
  );

  const validateCode = useCallback(
    async (code: string): Promise<void> => {
      if (!code.trim()) {
        setPromoStatus(null);
        await resolveFromServer(undefined);
        return;
      }

      if (!planAcceptsDiscounts(selectedPlan)) {
        setPromoStatus(
          selectedPlan === "online"
            ? "Discounts do not apply to the Online plan."
            : "Discounts are only available on Essential and Intensive plans.",
        );
        return;
      }

      await resolveFromServer(code);
    },
    [selectedPlan, resolveFromServer],
  );

  const removePromo = useCallback(() => {
    setPromoCode("");
    setAppliedPromoValue(0);
    setAppliedPromoKind(null);
    setPromoStatus(null);
    // Re-apply diagnostic credit if still eligible
    if (planAcceptsDiscounts(selectedPlan) && normalizedCheckoutEmail) {
      void resolveFromServer(undefined);
    }
  }, [selectedPlan, normalizedCheckoutEmail, resolveFromServer]);

  const copyReferralLink = useCallback(() => {
    if (referralLink && navigator?.clipboard?.writeText) {
      void navigator.clipboard.writeText(referralLink).catch(console.error);
      setPromoStatus("Referral link copied! Share it with friends and family.");
      return;
    }

    setPromoStatus(
      "Your personal referral link is created after payment — you'll find it on the next screen and in your email.",
    );
  }, [referralLink]);

  const promoAdjustments = useMemo(() => {
    const list: PromoAdjustment[] = [];
    if (
      appliedPromoValue > 0 &&
      appliedPromoKind &&
      appliedPromoKind !== "none"
    ) {
      let label = "Discount";
      if (appliedPromoKind === "promo" && promoCode) {
        label = `Promo code (${promoCode})`;
      } else if (appliedPromoKind === "referral" && promoCode) {
        label = `Referral thank-you (${promoCode})`;
      } else if (appliedPromoKind === "diagnostic_credit") {
        label = "Diagnostic Discovery credit";
      }
      list.push({ label, amount: appliedPromoValue });
    }
    return list;
  }, [appliedPromoValue, promoCode, appliedPromoKind]);

  const calculateFinalAmount = useCallback(
    (basePriceCents: number) =>
      Math.max(100, basePriceCents - appliedPromoValue),
    [appliedPromoValue],
  );

  return {
    promoCode,
    setPromoCode,
    promoStatus,
    appliedPromoValue,
    appliedPromoKind,
    referralLink,
    applyReferral,
    applyPromoCode,
    removePromo,
    copyReferralLink,
    promoAdjustments,
    calculateFinalAmount,
    validateCode,
    refreshDiscount,
  };
};

// Re-export for type consumers that imported PromoCode from this module path
export type { PromoCode };
