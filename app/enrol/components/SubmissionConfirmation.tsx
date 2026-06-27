"use client";

import ReferralShareCard from "@/enrol/components/ReferralShareCard";
import type { PlanType } from "@/lib/constants";

interface SubmissionConfirmationProps {
  onClose?: () => void;
  email?: string | null;
  paymentIntentId?: string | null;
  planType?: PlanType;
}

const SubmissionConfirmation = ({
  onClose,
  email,
  paymentIntentId,
  planType,
}: SubmissionConfirmationProps) => (
  <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
    <div className="mb-6">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
        <svg
          className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
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
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Submission Successful!
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Thank you for completing your enrolment insights. We&apos;ve received
        your responses and uploaded documents.
      </p>
    </div>

    <div className="mb-6 w-full max-w-md rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
      <h3 className="mb-3 text-lg font-semibold text-blue-950 dark:text-blue-50">
        What&apos;s Next?
      </h3>
      <ul className="space-y-2 text-left text-blue-950 dark:text-blue-50">
        <li className="flex items-start">
          <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
          You&apos;ll receive a confirmation email shortly from
          grow@zpdlearning.com
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
          Our team will review your submission within 2-3 business days
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
          We&apos;ll match you with the perfect tutor based on your child&apos;s
          needs
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
          We&apos;ll reach out to schedule your first session
        </li>
      </ul>
      <div className="mt-4 border-t border-blue-200 pt-4 dark:border-blue-700">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Questions? Contact us at{" "}
          <a
            className="text-blue-600 underline hover:text-blue-500"
            href="mailto:grow@zpdlearning.com"
          >
            grow@zpdlearning.com
          </a>
        </p>
      </div>
    </div>

    {email ? (
      <ReferralShareCard
        email={email}
        paymentIntentId={paymentIntentId}
        planType={planType}
      />
    ) : (
      <div className="mb-6 w-full max-w-md rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
        <p className="text-sm text-emerald-800 dark:text-emerald-200">
          Your personal referral code will arrive by email once enrolment is
          confirmed.
        </p>
      </div>
    )}

    {onClose && (
      <button
        className="mt-6 cursor-pointer rounded-lg bg-emerald-600 px-6 py-2 text-white transition-colors hover:bg-emerald-700"
        type="button"
        onClick={onClose}
      >
        Continue
      </button>
    )}
  </div>
);

export default SubmissionConfirmation;
