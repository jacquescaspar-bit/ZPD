"use client";

import React, { useState } from "react";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import EnrollmentForm from "@/enrol/components/EnrollmentForm";
import EnrollmentAnalytics from "@/enrol/components/EnrollmentAnalytics";
import PostPurchaseHero from "@/enrol/components/PostPurchaseHero";
import type { PlanType } from "@/lib/constants";
import type { Step } from "@/enrol/types";

const EnrollPageClient: React.FC<{
  initialPlan: PlanType | undefined;
  initialPromoCode: string | undefined;
  initialStep: Step;
}> = ({ initialPlan, initialPromoCode, initialStep }) => {
  const [_hideComparisonTable, setHideComparisonTable] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(initialStep);

  return (
    <PageShell>
      <Nav />
      <EnrollmentAnalytics />
      <div className="px-6 pt-16 pb-12">
        <div className="space-y-6">
          {/* Hero Section */}
          <section
            className={`text-center ${currentStep === "review" ? "pb-8" : "pb-20"}`}
          >
            <h1
              className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center"
              style={{ letterSpacing: "0.02em" }}
            >
              {currentStep === "review" ? (
                <div className="flex flex-col gap-1">
                  <span>Your Learning Journey</span>
                  <span>Has Begun</span>
                </div>
              ) : (
                "Start Your Learning Journey"
              )}
            </h1>
            <div
              className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-semibold mt-2 sm:mt-4 w-full leading-relaxed"
              style={{ letterSpacing: "0.01em" }}
            >
              {currentStep === "review" ? (
                <PostPurchaseHero />
              ) : (
                <p>
                  Term-Based Pricing for Primary, Secondary & ATAR Tutoring
                  Success
                </p>
              )}
            </div>
            {currentStep === "review" && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl text-left">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Your Data is Secure
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      We take your privacy seriously. All information provided
                      is encrypted, securely stored, and used solely to
                      personalise your child's learning experience. We comply
                      with Australian privacy laws and never share your data
                      with third parties without your explicit consent, per our{" "}
                      <a
                        className="underline hover:text-blue-600 dark:hover:text-blue-300"
                        href="/privacy-policy"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Enrollment Form */}
          <section id="tasks-section">
            <EnrollmentForm
              initialPlan={initialPlan}
              initialPromoCode={initialPromoCode}
              initialStep={initialStep}
              onPaymentProcessingChange={setHideComparisonTable}
              onStepChange={setCurrentStep}
            />
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default EnrollPageClient;
