"use client";

import React from "react";

interface SubmissionConfirmationProps {
  onClose?: () => void;
}

const SubmissionConfirmation = ({ onClose }: SubmissionConfirmationProps) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
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
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for completing your enrolment insights. We've received your
        responses and uploaded documents.
      </p>
    </div>

    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        What's Next?
      </h3>
      <ul className="text-left text-blue-800 dark:text-blue-200 space-y-2">
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
          You'll receive a confirmation email with next steps
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
          Your personalized learning plan will be created
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

export default SubmissionConfirmation;
