import { useCallback, useEffect, useState } from "react";
import { buildReferralEnrolLink } from "@/lib/referralLinks";
import type { PlanType } from "@/lib/constants";

type ReferralLoadState = "idle" | "loading" | "ready" | "pending";

interface UsePurchaserReferralCodeOptions {
  email: string | null;
  paymentIntentId?: string | null;
  planType?: PlanType;
  enabled?: boolean;
}

export function usePurchaserReferralCode({
  email,
  paymentIntentId,
  planType = "essential",
  enabled = true,
}: UsePurchaserReferralCodeOptions) {
  const [state, setState] = useState<ReferralLoadState>("idle");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !email) return;

    let cancelled = false;

    const resolveCode = (code: string) => {
      if (cancelled) return;
      setReferralCode(code);
      setReferralLink(buildReferralEnrolLink(code, planType));
      setState("ready");
    };

    const tryClaim = async (): Promise<boolean> => {
      if (!paymentIntentId) return false;

      try {
        const response = await fetch("/api/referral-codes/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            paymentIntentId,
            planType,
          }),
        });

        if (!response.ok) return false;

        const data = await response.json();
        if (data.referralCode?.code) {
          resolveCode(data.referralCode.code as string);
          return true;
        }
      } catch (error) {
        console.error("Error claiming referral code:", error);
      }

      return false;
    };

    const loadReferralCode = async () => {
      setState("loading");

      const maxAttempts = 12;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (cancelled) return;
        if (await tryClaim()) return;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (!cancelled) {
        setState("pending");
      }
    };

    void loadReferralCode();

    return () => {
      cancelled = true;
    };
  }, [email, paymentIntentId, planType, enabled]);

  const copyReferralLink = useCallback(async () => {
    if (!referralLink || !navigator?.clipboard) return false;
    try {
      await navigator.clipboard.writeText(referralLink);
      return true;
    } catch {
      return false;
    }
  }, [referralLink]);

  const copyReferralCode = useCallback(async () => {
    if (!referralCode || !navigator?.clipboard) return false;
    try {
      await navigator.clipboard.writeText(referralCode);
      return true;
    } catch {
      return false;
    }
  }, [referralCode]);

  return {
    state,
    referralCode,
    referralLink,
    copyReferralLink,
    copyReferralCode,
  };
}
