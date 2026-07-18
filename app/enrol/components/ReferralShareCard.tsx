"use client";

import { useState } from "react";
import { usePurchaserReferralCode } from "@/enrol/hooks/usePurchaserReferralCode";
import type { PlanType } from "@/lib/constants";

interface ReferralShareCardProps {
  email: string;
  paymentIntentId?: string | null;
  planType?: PlanType;
}

const ReferralShareCard = ({
  email,
  paymentIntentId,
  planType = "essential",
}: ReferralShareCardProps) => {
  const {
    state,
    referralCode,
    referralLink,
    copyReferralCode,
    copyReferralLink,
  } = usePurchaserReferralCode({
    email,
    paymentIntentId,
    planType,
  });
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  if (state === "loading" || state === "idle") {
    return (
      <div className="w-full max-w-md rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
          Preparing your referral code...
        </p>
        <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
          This usually takes a few seconds after payment.
        </p>
      </div>
    );
  }

  if (state === "pending" || !referralCode) {
    return (
      <div className="w-full max-w-md rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
          Your referral code is on its way
        </p>
        <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
          Check <span className="font-medium">{email}</span> — we send your
          personal code there as soon as enrolment is confirmed.
        </p>
      </div>
    );
  }

  const handleCopyCode = async () => {
    const ok = await copyReferralCode();
    if (ok) {
      setCopied("code");
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleCopyLink = async () => {
    const ok = await copyReferralLink();
    if (ok) {
      setCopied("link");
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
      <div className="text-center">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
          Earn $50 for every successful referral
        </p>
        <p className="font-mono text-2xl font-bold tracking-wider break-all text-blue-950 dark:text-blue-50 sm:text-3xl">
          {referralCode}
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
            type="button"
            onClick={() => void handleCopyCode()}
          >
            {copied === "code" ? "Copied!" : "Copy code"}
          </button>
          {referralLink && (
            <button
              className="cursor-pointer rounded-lg border border-blue-600 px-5 py-1.5 text-sm text-blue-800 transition-colors hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-blue-900/40"
              type="button"
              onClick={() => void handleCopyLink()}
            >
              {copied === "link" ? "Copied!" : "Copy link"}
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
          Share with friends — they save $50 on Essential or Intensive plans
        </p>
      </div>
    </div>
  );
};

export default ReferralShareCard;
