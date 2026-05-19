"use client";

import React, { useState } from "react";
import ParentQuestionsSection from "@/enrol/components/ParentQuestionsSection";


type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

interface ReviewStepProps {
  statusMessage: string | null;
  errorMessage: string | null;
  notes: string;
  setNotes: (notes: string) => void;
  attachments: File[];
  handleAttachmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (name: string) => void;
  referralLink: string | null;
  copyReferralLink: () => void;
  setStatusMessage: (message: string | null) => void;
  autoSaveStatus?: AutoSaveStatus;
  onProgressUpdate?: (progress: {
    parentDetailsCompleted: boolean;
    referralProgramCompleted: boolean;
  }) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  showTermsCheckbox?: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  statusMessage,
  errorMessage,
  notes,
  setNotes,
  attachments,
  handleAttachmentChange,
  removeAttachment,
  referralLink,
  copyReferralLink,
  setStatusMessage: _setStatusMessage,
  autoSaveStatus,
  onProgressUpdate,
  onSubmit,
  isSubmitting = false,
  showTermsCheckbox: _showTermsCheckbox = true,
}) => {
  const [referralLinkCopied, setReferralLinkCopied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [validationData, setValidationData] = useState({
    isValid: false,
    isReviewStep: false,
  });

  // Update progress when states change
  React.useEffect(() => {
    if (onProgressUpdate) {
      const parentDetailsCompleted = notes.trim() !== "";
      onProgressUpdate({
        parentDetailsCompleted,
        referralProgramCompleted: referralLinkCopied,
      });
    }
  }, [notes, referralLinkCopied, onProgressUpdate]);

  // Wrapper for copyReferralLink to track completion
  const handleCopyReferralLink = () => {
    copyReferralLink();
    setReferralLinkCopied(true);
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-green-200/70 bg-green-50/80 dark:bg-green-950/40 dark:border-green-900 px-6 py-4 text-green-900 dark:text-green-200 shadow-lg">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-sm sm:text-base font-medium">{statusMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200/70 bg-red-50/80 dark:bg-red-950/40 dark:border-red-900 px-6 py-4 text-red-900 dark:text-red-200 shadow-lg">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          <p className="text-sm sm:text-base font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Combined Questions Section */}
      <ParentQuestionsSection
        attachments={attachments}
        autoSaveStatus={autoSaveStatus}
        handleAttachmentChange={handleAttachmentChange}
        notes={notes}
        removeAttachment={removeAttachment}
        setNotes={setNotes}
        onValidationChange={setValidationData}
      />

      {/* Terms and Privacy Agreement - Only show when all fields are valid and on review step */}
      {validationData.isValid && validationData.isReviewStep && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              checked={agreedToTerms}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              type="checkbox"
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <div className="text-sm">
              <span className="text-gray-900 dark:text-white">
                I agree to the{" "}
                <a
                  className="text-blue-600 hover:text-blue-500 underline"
                  href="/terms"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="text-blue-600 hover:text-blue-500 underline"
                  href="/privacy-policy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </div>
          </label>
        </div>
      )}

      {/* Submit Button - Only show when all fields are valid and on review step */}
      {validationData.isValid && validationData.isReviewStep && (
        <div className="mt-6 flex justify-center">
          <button
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            disabled={isSubmitting}
            onClick={() => {
              if (!agreedToTerms) {
                console.warn(
                  "Please agree to the terms and privacy policy before submitting.",
                );
                return;
              }
              onSubmit?.();
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Insights"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
