"use client";

/* eslint-disable max-lines-per-function */

import React, { useMemo, useState, useEffect } from "react";
import type { EnrollmentPaymentData } from "@/enrol/components/PaymentForm";
import PaymentDetails from "@/enrol/components/PaymentDetails";
import PlanSelection from "@/enrol/components/PlanSelection";
import { PRICING, type PlanType } from "@/lib/constants";
import { buildInsightsResumeUrl } from "@/lib/insightsResume";
import type { Step, EnrollmentFormProps } from "@/enrol/types";
import { planDescriptions } from "@/enrol/data";
import { useMobileCarousel } from "@/enrol/hooks/useMobileCarousel";
import { useReferralSystem } from "@/enrol/hooks/useReferralSystem";

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  initialPlan,
  initialPromoCode,
  initialStep = "plan",
  onPaymentProcessingChange,
  onStepChange,
}) => {
  const [currentStep, _setCurrentStep] = useState<Step>(initialStep);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(
    initialPlan ?? null,
  );
  const [notes] = useState("");
  const [attachments] = useState<File[]>([]);
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [_statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"processing" | "success">(
    "processing",
  );

  const {
    promoCode,
    setPromoCode,
    promoStatus,
    appliedPromoValue,
    appliedPromoKind,
    removePromo,
    promoAdjustments,
    calculateFinalAmount,
    validateCode,
  } = useReferralSystem(selectedPlan, initialPromoCode);

  const { isMobile, fadeOthers, setFadeOthers } = useMobileCarousel();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Set showHighlights to true when a plan is selected
  useEffect(() => {
    if (selectedPlan) {
      setShowHighlights(true);
    } else {
      setShowHighlights(false);
    }
  }, [selectedPlan]);

  // Set showHighlights to false when payment details have completed fading in
  useEffect(() => {
    if (selectedPlan && isDesktop && currentStep === "plan") {
      // Payment details fade in over 500ms, so hide highlights after 1000ms total
      const timer = setTimeout(() => setShowHighlights(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedPlan, isDesktop, currentStep]);

  // Notify parent when step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const isPaymentReady = Boolean(parentName.trim()) && Boolean(email.trim());

  const getMissingFields = () => {
    const missing: string[] = [];
    if (!parentName.trim()) missing.push("Full Name");
    if (!email.trim()) missing.push("Email");
    return missing;
  };

  const enrollmentData: EnrollmentPaymentData = {
    parentName,
    email,
    phone: phone.replace(/\D/g, ""), // Store only digits for API
    notes,
    attachmentNames: attachments.map((file) => file.name),
  };

  const selectedPlanLabel = useMemo(() => {
    if (!selectedPlan) return "No plan selected";
    const data = PRICING[selectedPlan];
    const description = planDescriptions[selectedPlan];
    return `${description.title} • ${(data.price / 100).toLocaleString(
      "en-AU",
      {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 0,
      },
    )}`;
  }, [selectedPlan]);

  const basePriceCents = selectedPlan ? PRICING[selectedPlan].price : 0;
  const finalAmountCents = calculateFinalAmount(basePriceCents);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Show loading screen
    setIsPaymentProcessing(true);
    setIsFadingOut(false);
    setPaymentStatus("processing");

    // Check if this is a test payment
    const isTestPayment = paymentIntentId.startsWith("test_payment_intent_");

    try {
      const sessionId = crypto.randomUUID();

      if (isTestPayment) {
        console.warn("🧪 TEST PAYMENT: Creating session without Stripe charge");
      }

      const enrollmentPayload = {
        sessionId,
        email,
        currentStep: "insights",
        enrollmentData: {
          plan: selectedPlan,
          parentName,
          email,
          phone,
          notes,
          attachmentNames: attachments.map((file) => file.name),
          finalAmountCents,
          promoCode: promoCode || undefined,
          appliedPromoValue,
          appliedPromoKind,
        },
        insightsData: {},
        progressStatus: {},
        stripePaymentIntentId: paymentIntentId,
      };

      // Create enrollment session
      const response = await fetch("/api/enrollment-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ?? "Failed to create enrollment session",
        );
      }

      const result = await response.json();

      sessionStorage.setItem("enrollmentSessionId", result.session.sessionId);
      sessionStorage.setItem("enrollmentPaymentIntentId", paymentIntentId);

      const resumeUrl = buildInsightsResumeUrl(
        result.session.sessionId,
        window.location.origin,
      );

      setPaymentStatus("success");
      window.location.href = resumeUrl;
    } catch (error) {
      console.error("Error creating enrollment session:", error);
      setIsPaymentProcessing(false);
      setPaymentStatus("processing");
      const isLocalPlaceholderDb = process.env.NODE_ENV === "development";
      setErrorMessage(
        isLocalPlaceholderDb
          ? "Payment succeeded in Stripe, but your local database is not connected. Update DATABASE_URL in .env.local (copy it from Vercel → Settings → Environment Variables), restart the dev server, then use Skip payment (testing) — or complete payment again."
          : "Payment succeeded but we could not save your session. Please contact grow@zpdlearning.com.",
      );
    }
  };

  // Notify parent when payment processing state changes
  useEffect(() => {
    onPaymentProcessingChange?.(isPaymentProcessing || isFadingOut);
  }, [isPaymentProcessing, isFadingOut, onPaymentProcessingChange]);

  const renderCurrentStep = () => {
    // Show loading screen during payment processing
    if (isPaymentProcessing) {
      return (
        <div
          className={`fixed inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center space-x-4">
            {paymentStatus === "processing" ? (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {paymentStatus === "processing"
                  ? "Processing Payment"
                  : "Payment Successful"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {paymentStatus === "processing"
                  ? "Please wait..."
                  : "Redirecting to confirmation..."}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M10 1L3 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V4l-7-3z"
                fillRule="evenodd"
              />
            </svg>
            <span>Secure & encrypted</span>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case "plan":
        return (
          <PlanSelection
            carouselHookValues={{
              isMobile,
              fadeOthers,
              setFadeOthers,
            }}
            paymentProps={
              selectedPlan
                ? {
                    parentName,
                    setParentName,
                    email,
                    setEmail,
                    phone,
                    setPhone,
                    selectedPlan,
                    promoCode,
                    setPromoCode,
                    promoStatus,
                    appliedPromoValue,
                    appliedPromoKind,
                    removePromo,
                    validateCode,
                    enrollmentData,
                    isPaymentReady,
                    missingFields: getMissingFields(),
                    onPaymentError: (message) => {
                      setErrorMessage(message);
                      setStatusMessage(null);
                    },
                    onPaymentSuccess: (paymentIntentId) => {
                      handlePaymentSuccess(paymentIntentId).catch((error) => {
                        console.error(
                          "Payment success handling failed:",
                          error,
                        );
                        setErrorMessage(
                          "An error occurred after payment. Please contact support.",
                        );
                      });
                    },
                    finalAmountCents,
                    promoAdjustments,
                    selectedPlanLabel,
                    notes,
                    attachments,
                    basePriceCents,
                    showHeader: true,
                    hasAttemptedSubmit,
                    onSubmitAttempt: () => setHasAttemptedSubmit(true),
                  }
                : undefined
            }
            selectedPlan={selectedPlan}
            showHighlights={showHighlights}
            onPlanSelect={setSelectedPlan}
          />
        );

      case "payment":
        return (
          <PaymentDetails
            appliedPromoKind={appliedPromoKind}
            appliedPromoValue={appliedPromoValue}
            attachments={attachments}
            basePriceCents={basePriceCents}
            email={email}
            enrollmentData={enrollmentData}
            finalAmountCents={finalAmountCents}
            hasAttemptedSubmit={hasAttemptedSubmit}
            isPaymentReady={isPaymentReady}
            missingFields={getMissingFields()}
            notes={notes}
            parentName={parentName}
            phone={phone}
            promoAdjustments={promoAdjustments}
            promoCode={promoCode}
            promoStatus={promoStatus}
            removePromo={removePromo}
            selectedPlan={selectedPlan}
            selectedPlanLabel={selectedPlanLabel}
            setEmail={setEmail}
            setParentName={setParentName}
            setPhone={setPhone}
            setPromoCode={setPromoCode}
            validateCode={validateCode}
            onPaymentError={(message) => {
              setErrorMessage(message);
              setStatusMessage(null);
            }}
            onPaymentSuccess={(paymentIntentId) => {
              handlePaymentSuccess(paymentIntentId).catch((error) => {
                console.error("Payment success handling failed:", error);
                setErrorMessage(
                  "An error occurred after payment. Please contact support.",
                );
              });
            }}
            onSubmitAttempt={() => setHasAttemptedSubmit(true)}
          />
        );

      case "review":
        return (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <p className="text-gray-700 dark:text-gray-300">
              Your onboarding questionnaire lives on a separate page after
              payment.
            </p>
            <a
              className="mt-4 inline-flex rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              href="/enrol/insights"
            >
              Go to onboarding
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && !isPaymentProcessing && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200/70 bg-red-50/80 px-6 py-4 text-red-900 shadow-lg dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          <p className="text-sm font-medium sm:text-base">{errorMessage}</p>
        </div>
      )}
      {renderCurrentStep()}
    </div>
  );
};

export default EnrollmentForm;
