"use client";

import React from "react";
import type { Step } from "@/enrol/types";
import { stepTitles } from "@/enrol/data";

interface StepNavigationProps {
  currentStep: Step;
  steps: Step[];
  onStepChange: (step: Step) => void;
  canProceedToPlan: boolean;
  canProceedToPayment: boolean;
  canProceedToReview: boolean;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  nextButtonText?: string;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  steps,
  onStepChange,
  canProceedToPlan,
  canProceedToPayment,
  canProceedToReview,
  onPrevStep,
  onNextStep,
  canGoBack = false,
  canGoForward = false,
  nextButtonText = "Continue",
}) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="flex flex-col items-center justify-center mb-8 space-y-3">
      {/* Icons Row */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center w-10">
              <button
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                  index <= currentStepIndex
                    ? "bg-emerald-500 text-white shadow-lg"
                    : index === currentStepIndex + 1 &&
                        ((step === "plan" && canProceedToPlan) ||
                          (step === "payment" && canProceedToPayment) ||
                          (step === "review" && canProceedToReview))
                      ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-200"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={
                  !(
                    index <= currentStepIndex ||
                    (index === currentStepIndex + 1 &&
                      ((step === "plan" && canProceedToPlan) ||
                        (step === "payment" && canProceedToPayment) ||
                        (step === "review" && canProceedToReview)))
                  )
                }
                onClick={() => {
                  // Allow going back to previous steps or forward to completed steps
                  if (
                    index <= currentStepIndex ||
                    (index === currentStepIndex + 1 &&
                      ((step === "plan" && canProceedToPlan) ||
                        (step === "payment" && canProceedToPayment) ||
                        (step === "review" && canProceedToReview)))
                  ) {
                    onStepChange(step);
                  }
                }}
              >
                {index + 1}
              </button>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-20 h-0.5 transition-colors duration-200 ${
                  index < currentStepIndex ? "bg-emerald-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Labels Row */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={`label-${step}`}>
            <div className="flex flex-col items-center w-10">
              <span
                className={`text-xs text-center leading-tight ${
                  index <= currentStepIndex
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {stepTitles[step]}
              </span>
            </div>
            {index < steps.length - 1 && <div className="w-20" />}
          </React.Fragment>
        ))}
      </div>

      {/* Navigation Buttons */}
      {(onPrevStep ?? onNextStep) && (
        <div className="flex justify-between items-center pt-4">
          <button
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
              !canGoBack
                ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            disabled={!canGoBack}
            onClick={onPrevStep}
          >
            ← Back
          </button>

          <div className="flex gap-2">
            {onNextStep && currentStep !== "review" && (
              <button
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  !canGoForward
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500"
                    : "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                }`}
                disabled={!canGoForward}
                onClick={onNextStep}
              >
                {nextButtonText} →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepNavigation;
