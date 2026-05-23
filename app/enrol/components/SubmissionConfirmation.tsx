"use client";

import React, { useState } from "react";

interface SubmissionConfirmationProps {
  onClose?: () => void;
  referralCode?: string;
}

const SubmissionConfirmation = ({
  onClose,
  referralCode: propReferralCode,
}: SubmissionConfirmationProps) => {
  const [copied, setCopied] = useState(false);
  const [generatedCode] = useState(
    () =>
      propReferralCode ??
      `REF-${Math.random().toString(36).toUpperCase().slice(2, 8)}`,
  );

  const referralCode = propReferralCode ?? generatedCode;

  const handleCopy = () => {
    if (referralCode && navigator?.clipboard) {
      void navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg p-6 sm:p-8 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="mb-6">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Submission Successful!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Thank you for completing your enrolment insights. We've received your
          responses and uploaded documents.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-blue-950 dark:text-blue-50 mb-3">
          What's Next?
        </h3>
        <ul className="text-left text-blue-950 dark:text-blue-50 space-y-2">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            You'll receive a confirmation email shortly from
            grow@zpdlearning.com
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            Our team will review your submission within 2-3 business days
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            We'll match you with the perfect tutor based on your child's needs
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            We'll reach out to you to schedule your first session
          </li>
        </ul>
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Questions? Contact us at{" "}
            <a
              className="text-blue-600 hover:text-blue-500 underline"
              href="mailto:grow@zpdlearning.com"
            >
              grow@zpdlearning.com
            </a>
          </p>
        </div>
      </div>

      {referralCode && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 mb-6 w-full max-w-md">
          <div className="text-center">
            <div className="text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-1">
              Earn $100 for every successful referral
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-emerald-50 tracking-wider mb-3 break-all">
              {referralCode}
            </div>
            <button
              className="px-5 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy code"}
            </button>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">
              Share with friends — they save $100 too
            </p>
          </div>
        </div>
      )}

      {onClose && (
        <button
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          onClick={onClose}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default SubmissionConfirmation;
