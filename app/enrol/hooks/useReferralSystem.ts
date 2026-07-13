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
  checkoutEmail?: string,
): UseReferralSystemReturn => {
  const [promoCode, setPromoCode] = useState(initialPromoCode ?? "");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [appliedPromoValue, setAppliedPromoValue] = useState(0);
  const [appliedPromoKind, setAppliedPromoKind] = useState<
    "referral" | "promo" | null
  >(null);
  const referralLink: string | null = null;

  const normalizedCheckoutEmail = checkoutEmail?.trim() ?? undefined;

  const validateReferralCode = useCallback(
    async (
      code: string,
    ): Promise<{
      valid: boolean;
      reason?: string;
      referralCode?: ReferralCode;
    }> => {
      try {
        const params = new URLSearchParams({
          code,
          planType: selectedPlan ?? "",
        });
        if (normalizedCheckoutEmail) {
          params.set("checkoutEmail", normalizedCheckoutEmail);
        }

        const response = await fetch(
          `/api/referral-codes?${params.toString()}`,
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
    [selectedPlan, normalizedCheckoutEmail],
  );

  const applyReferral = useCallback(
    async (code: string, message?: string): Promise<boolean> => {
      const validation = await validateReferralCode(code);

      if (!validation.valid || !validation.referralCode) {
        setPromoStatus(validation.reason ?? "Invalid referral code");
        return false;
      }

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

  useEffect(() => {
    if (
      appliedPromoKind === "referral" &&
      selectedPlan &&
      !["essential", "intensive"].includes(selectedPlan)
    ) {
      setAppliedPromoValue(0);
      setPromoCode("");
      setAppliedPromoKind(null);
      setPromoStatus(
        "Referral code removed - not compatible with selected plan.",
      );
    }
  }, [selectedPlan, appliedPromoKind]);

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
          body: JSON.stringify({
            code,
            plan: selectedPlan,
            email: normalizedCheckoutEmail,
          }),
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
    [selectedPlan, normalizedCheckoutEmail],
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

      const promoValidation = await validatePromoCode(code);
      if (promoValidation.valid) {
        if (promoValidation.promoCode) {
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
          await applyPromoCode(code);
          return;
        }
      }

      const referralValidation = await validateReferralCode(code);
      if (referralValidation.valid) {
        if (referralValidation.referralCode) {
          const { allowedPlans } = referralValidation.referralCode;
          if (selectedPlan && !allowedPlans.includes(selectedPlan)) {
            setPromoStatus(
              `This code is valid, but is compatible only with the following plans: ${allowedPlans.join(", ")}`,
            );
            return;
          }
          await applyReferral(
            code,
            "Referral thank-you applied! That's $100 off your term.",
          );
          return;
        }
      }

      setPromoStatus(
        promoValidation.reason ??
          referralValidation.reason ??
          "Invalid Referral / Promo code",
      );
    },
    [
      selectedPlan,
      validatePromoCode,
      validateReferralCode,
      applyPromoCode,
      applyReferral,
    ],
  );

  useEffect(() => {
    if (!promoCode || !appliedPromoKind) return;

    const revalidate = async () => {
      if (appliedPromoKind === "referral") {
        const validation = await validateReferralCode(promoCode);
        if (!validation.valid) {
          setAppliedPromoValue(0);
          setPromoCode("");
          setAppliedPromoKind(null);
          setPromoStatus(
            validation.reason ?? "Referral code is no longer valid.",
          );
        }
      } else if (appliedPromoKind === "promo") {
        const validation = await validatePromoCode(promoCode);
        if (!validation.valid) {
          setAppliedPromoValue(0);
          setPromoCode("");
          setAppliedPromoKind(null);
          setPromoStatus(validation.reason ?? "Promo code is no longer valid.");
        }
      }
    };

    void revalidate();
  }, [
    normalizedCheckoutEmail,
    promoCode,
    appliedPromoKind,
    validateReferralCode,
    validatePromoCode,
  ]);

  const removePromo = useCallback(() => {
    setAppliedPromoValue(0);
    setPromoCode("");
    setAppliedPromoKind(null);
    setPromoStatus(null);
  }, []);

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
