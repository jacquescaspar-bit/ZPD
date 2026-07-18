import { useState, useEffect, useMemo, useCallback } from "react";
import type { PlanType } from "@/lib/constants";
import {
  DISCOUNT_ELIGIBLE_PLANS,
  REFERRAL_VALUE,
  type PromoCode,
} from "@/enrol/constants";
import type { DiscountKind, DiscountLine } from "@/lib/discountResolution";

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
  /** Code-side kind only (referral/promo), or diagnostic_credit if only credit, or null */
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

const lineLabel = (line: DiscountLine): string => {
  if (line.kind === "promo" && line.code) return `Promo code (${line.code})`;
  if (line.kind === "referral" && line.code) {
    return `Referral thank-you (${line.code})`;
  }
  if (line.kind === "diagnostic_credit") return "Diagnostic Discovery credit";
  return line.label;
};

export const useReferralSystem = (
  selectedPlan: PlanType | null,
  initialPromoCode?: string,
  checkoutEmail?: string,
): UseReferralSystemReturn => {
  const [promoCode, setPromoCode] = useState(initialPromoCode ?? "");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [discountLines, setDiscountLines] = useState<DiscountLine[]>([]);
  const referralLink: string | null = null;

  const normalizedCheckoutEmail = checkoutEmail?.trim() ?? undefined;

  const appliedPromoValue = useMemo(
    () => discountLines.reduce((sum, l) => sum + l.amountCents, 0),
    [discountLines],
  );

  const appliedPromoKind = useMemo((): DiscountKind | null => {
    const codeLine = discountLines.find(
      (d) => d.kind === "referral" || d.kind === "promo",
    );
    if (codeLine) return codeLine.kind;
    if (discountLines.some((d) => d.kind === "diagnostic_credit")) {
      return "diagnostic_credit";
    }
    return null;
  }, [discountLines]);

  const applyResolution = useCallback(
    (result: {
      finalAmountCents: number;
      planPriceCents: number;
      discounts?: DiscountLine[];
      totalDiscountCents?: number;
      discount?: { kind: DiscountKind; amountCents: number; label: string };
    }) => {
      let lines: DiscountLine[] = [];
      if (Array.isArray(result.discounts)) {
        lines = result.discounts;
      } else if (
        result.discount &&
        result.discount.kind !== "none" &&
        result.discount.amountCents > 0
      ) {
        lines = [
          {
            kind: result.discount.kind,
            amountCents: result.discount.amountCents,
            label: result.discount.label,
          },
        ];
      }

      setDiscountLines(lines);

      if (lines.length === 0) {
        if (!promoCode.trim()) setPromoStatus(null);
        return;
      }

      const credit = lines.find((l) => l.kind === "diagnostic_credit");
      const codeLine = lines.find(
        (l) => l.kind === "referral" || l.kind === "promo",
      );

      if (codeLine?.code) {
        setPromoCode(codeLine.code);
      }

      const parts: string[] = [];
      if (credit) {
        parts.push(
          `Diagnostic credit ($${(credit.amountCents / 100).toFixed(0)})`,
        );
      }
      if (codeLine) {
        parts.push(
          `${codeLine.kind === "referral" ? "Referral" : "Promo"} ($${(codeLine.amountCents / 100).toFixed(0)})`,
        );
      }
      setPromoStatus(
        parts.length > 1
          ? `${parts.join(" + ")} applied — both stack on this plan.`
          : `${parts[0]} applied.`,
      );
    },
    [promoCode],
  );

  const resolveFromServer = useCallback(
    async (code?: string): Promise<boolean> => {
      if (!planAcceptsDiscounts(selectedPlan)) {
        setDiscountLines([]);
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

        const lines: DiscountLine[] = result.discounts ?? [];
        const codeApplied = Boolean(
          code?.trim() &&
            lines.some(
              (d) =>
                (d.kind === "referral" || d.kind === "promo") &&
                d.code === code.trim().toUpperCase(),
            ),
        );

        if (code?.trim() && !codeApplied) {
          setPromoStatus("Invalid Referral / Promo code");
          // Keep diagnostic credit lines if any
          const creditOnly = lines.filter(
            (d) => d.kind === "diagnostic_credit",
          );
          setDiscountLines(creditOnly);
          return false;
        }

        return lines.length > 0;
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
      setDiscountLines([]);
      return;
    }
    await resolveFromServer(promoCode.trim() || undefined);
  }, [selectedPlan, promoCode, resolveFromServer]);

  useEffect(() => {
    if (!planAcceptsDiscounts(selectedPlan) || !normalizedCheckoutEmail) {
      return;
    }
    void resolveFromServer(promoCode.trim() || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan, normalizedCheckoutEmail]);

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
      discountLines.length > 0 &&
      selectedPlan &&
      !planAcceptsDiscounts(selectedPlan)
    ) {
      setDiscountLines([]);
      setPromoCode("");
      setPromoStatus(
        selectedPlan === "online"
          ? "Discounts removed — not available on the Online plan."
          : "Discount removed — not compatible with selected plan.",
      );
    }
  }, [selectedPlan, discountLines.length]);

  const applyReferral = useCallback(
    async (code: string, _message?: string): Promise<boolean> => {
      setPromoCode(code.toUpperCase());
      const ok = await resolveFromServer(code);
      if (ok) {
        setPromoStatus(
          `Referral thank-you applied ($${(REFERRAL_VALUE / 100).toFixed(0)}). Diagnostic credit stacks if eligible.`,
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
    setPromoStatus(null);
    if (planAcceptsDiscounts(selectedPlan) && normalizedCheckoutEmail) {
      void resolveFromServer(undefined);
    } else {
      setDiscountLines([]);
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

  const promoAdjustments = useMemo(
    () =>
      discountLines.map((line) => ({
        label: lineLabel(line),
        amount: line.amountCents,
      })),
    [discountLines],
  );

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

export type { PromoCode };
