import { useState, useEffect, useMemo, useCallback } from "react";
import type { PlanType } from "@/lib/constants";
import { REFERRAL_VALUE, type PromoCode } from "@/enrol/constants";

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
  appliedPromoKind: "referral" | "promo" | null;
  referralLink: string | null;
  applyReferral: (code: string, message?: string) => Promise<boolean>;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromo: () => void;
  copyReferralLink: () => void;
  promoAdjustments: PromoAdjustment[];
  calculateFinalAmount: (basePriceCents: number) => number;
  validateCode: (code: string) => Promise<void>;
}

export const useReferralSystem = (
  selectedPlan: PlanType | null,
  initialPromoCode?: string,
): UseReferralSystemReturn => {
  const [promoCode, setPromoCode] = useState(initialPromoCode ?? "");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [appliedPromoValue, setAppliedPromoValue] = useState(0);
  const [appliedPromoKind, setAppliedPromoKind] = useState<
    "referral" | "promo" | null
  >(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  const validateReferralCode = useCallback(
    async (
      code: string,
    ): Promise<{
      valid: boolean;
      reason?: string;
      referralCode?: ReferralCode;
    }> => {
      try {
        const response = await fetch(
          `/api/referral-codes?code=${encodeURIComponent(code)}&planType=${selectedPlan ?? ""}`,
        );

        if (!response.ok) {
          return { valid: false, reason: "Error validating referral code" };
        }

        const validation = await response.json();
        return validation;
      } catch (error) {
        console.error("Error validating referral code:", error);
        return { valid: false, reason: "Error validating referral code" };
      }
    },
    [selectedPlan],
  );

  const applyReferral = useCallback(
    async (code: string, message?: string): Promise<boolean> => {
      // First validate the referral code against the database
      const validation = await validateReferralCode(code);

      if (!validation.valid || !validation.referralCode) {
        setPromoStatus(validation.reason ?? "Invalid referral code");
        return false;
      }

      // Validate plan compatibility - referral codes only work for Essential and Intensive
      if (
        selectedPlan &&
        !validation.referralCode.allowedPlans.includes(selectedPlan)
      ) {
        setPromoStatus(
          "This referral code is not compatible with the selected plan. Referral discounts are available for Essential and Intensive plans only.",
        );
        return false;
      }

      setPromoCode(code);
      setAppliedPromoValue(REFERRAL_VALUE);
      setAppliedPromoKind("referral");
      setPromoStatus(
        message ?? "Referral thank-you applied! That's $100 off your term.",
      );
      return true;
    },
    [selectedPlan, validateReferralCode],
  );

  // Parse referral codes from URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("ref");
      if (ref && appliedPromoValue === 0) {
        applyReferral(ref.trim().toUpperCase()).catch((error) => {
          console.error("Error applying referral code from URL:", error);
        });
      }
    }
  }, [appliedPromoValue, applyReferral]);

  // Validate referral code compatibility when plan changes
  useEffect(() => {
    if (
      appliedPromoKind === "referral" &&
      selectedPlan &&
      !["essential", "intensive"].includes(selectedPlan)
    ) {
      // Remove invalid referral discount
      setAppliedPromoValue(0);
      setPromoCode("");
      setAppliedPromoKind(null);
      setPromoStatus(
        "Referral code removed - not compatible with selected plan.",
      );
    }
  }, [selectedPlan, appliedPromoKind]);

  // Generate referral link when selectedPlan changes
  useEffect(() => {
    if (typeof window !== "undefined" && selectedPlan) {
      const code = `REF-${Math.random()
        .toString(36)
        .toUpperCase()
        .slice(2, 8)}`;
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("ref", code);
        url.searchParams.set("plan", selectedPlan);
        const fullLink = url.toString();
        setReferralLink(fullLink);
      } catch {
        // ignore URL errors in non-browser environments
      }
    }
  }, [selectedPlan]);

  const validatePromoCode = useCallback(
    async (
      code: string,
    ): Promise<{ valid: boolean; reason?: string; promoCode?: PromoCode }> => {
      try {
        const response = await fetch("/api/promo-codes/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, plan: selectedPlan }),
        });

        if (!response.ok) {
          return { valid: false, reason: "Error validating promo code" };
        }

        const validation = await response.json();
        return validation;
      } catch (error) {
        console.error("Error validating promo code:", error);
        return { valid: false, reason: "Error validating promo code" };
      }
    },
    [selectedPlan],
  );

  const applyPromoCode = useCallback(
    async (code: string): Promise<boolean> => {
      const validation = await validatePromoCode(code);

      if (!validation.valid || !validation.promoCode) {
        setPromoStatus(validation.reason ?? "Invalid promo code");
        return false;
      }

      const { promoCode } = validation;
      setPromoCode(code.toUpperCase());
      setAppliedPromoValue(promoCode.discountCents);
      setAppliedPromoKind("promo");
      setPromoStatus(`${promoCode.description} applied!`);

      // Track promo code usage
      try {
        await fetch("/api/promo-codes/increment-usage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code.toUpperCase() }),
        });
      } catch (error) {
        console.error("Error tracking promo code usage:", error);
        // Don't fail the promo application for tracking errors
      }

      return true;
    },
    [validatePromoCode],
  );

  const validateCode = useCallback(
    async (code: string): Promise<void> => {
      if (!code.trim()) {
        setPromoStatus(null);
        return;
      }

      // Try promo code first
      const promoValidation = await validatePromoCode(code);
      if (promoValidation.valid) {
        if (promoValidation.promoCode) {
          // Check if compatible with selected plan
          const { allowedPlans } = promoValidation.promoCode;
          if (
            selectedPlan &&
            allowedPlans &&
            !allowedPlans.includes(selectedPlan)
          ) {
            setPromoStatus(
              `This code is valid, but is compatible only with the following plans: ${allowedPlans.join(", ")}`,
            );
            return;
          }
          // Valid and compatible - apply it
          await applyPromoCode(code);
          return;
        }
      }

      // Try referral code
      const referralValidation = await validateReferralCode(code);
      if (referralValidation.valid) {
        if (referralValidation.referralCode) {
          // Check if compatible with selected plan
          const { allowedPlans } = referralValidation.referralCode;
          if (selectedPlan && !allowedPlans.includes(selectedPlan)) {
            setPromoStatus(
              `This code is valid, but is compatible only with the following plans: ${allowedPlans.join(", ")}`,
            );
            return;
          }
          // Valid and compatible - apply it
          await applyReferral(
            code,
            "Referral thank-you applied! That's $100 off your term.",
          );
          return;
        }
      }

      // Invalid code
      setPromoStatus("Invalid Referral / Promo code");
    },
    [
      selectedPlan,
      validatePromoCode,
      validateReferralCode,
      applyPromoCode,
      applyReferral,
    ],
  );

  const removePromo = useCallback(() => {
    setAppliedPromoValue(0);
    setPromoCode("");
    setAppliedPromoKind(null);
    setPromoStatus(null);
  }, []);

  const copyReferralLink = useCallback(() => {
    if (!referralLink && selectedPlan) {
      const code = `REF-${Math.random()
        .toString(36)
        .toUpperCase()
        .slice(2, 8)}`;
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("ref", code);
        url.searchParams.set("plan", selectedPlan);
        const fullLink = url.toString();
        setReferralLink(fullLink);
        if (navigator?.clipboard?.writeText) {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          navigator.clipboard.writeText(fullLink).catch(() => {});
        }
      } catch {
        // ignore URL errors in non-browser environments
      }
    } else if (referralLink) {
      if (navigator?.clipboard?.writeText) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        navigator.clipboard.writeText(referralLink).catch(() => {});
      }
    }
    setPromoStatus("Referral link copied! Share it with friends and family.");
  }, [referralLink, selectedPlan]);

  const promoAdjustments = useMemo(() => {
    const list: PromoAdjustment[] = [];
    if (appliedPromoValue && promoCode) {
      list.push({
        label:
          appliedPromoKind === "promo"
            ? `Promo code (${promoCode})`
            : `Referral thank-you (${promoCode})`,
        amount: appliedPromoValue,
      });
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
  };
};
