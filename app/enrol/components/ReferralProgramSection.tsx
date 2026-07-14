"use client";

import React from "react";
import { SECTION_CARD_CLASS } from "@/enrol/constants";

interface ReferralProgramSectionProps {
  referralLink: string | null;
  handleCopyReferralLink: () => void;
}

const ReferralProgramSection: React.FC<ReferralProgramSectionProps> = ({
  referralLink,
  handleCopyReferralLink,
}) => (
  <section className={`${SECTION_CARD_CLASS} p-8 space-y-6`}>
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        🎉 Refer a Friend & Save Big
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        You've received a unique referral code via email! Share it with friends
        and family. When they use your code to enrol in Essential or Intensive
        plans, you'll receive a new referral code to share. This creates a chain
        of referrals where everyone saves $100!
      </p>
    </div>

    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-800/50">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">↗</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Referral Link
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Share this link to earn $200 off your next term
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          readOnly
          className="flex-1 border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-4 py-3 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm text-sm"
          value={referralLink ?? ""}
        />
        <button
          className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold hover:bg-indigo-600 transition-colors duration-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          type="button"
          onClick={handleCopyReferralLink}
        >
          Copy Link
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-indigo-500">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Get $100 off for each successful referral
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-500">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Your referrals get $100 off Essential/Intensive
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-500">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Referral chain propagates infinitely
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-500">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            New codes generated automatically
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default ReferralProgramSection;
