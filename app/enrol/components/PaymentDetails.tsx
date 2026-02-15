"use client";

/* eslint-disable max-lines */

import React, { useState, useEffect } from "react";
import PaymentForm from "@/enrol/components/PaymentForm";
import type { EnrollmentPaymentData } from "@/enrol/components/PaymentForm";
import { SECTION_CARD_CLASS } from "@/enrol/constants";
import type { PlanType } from "@/lib/constants";

interface ContactFormProps {
  parentName: string;
  setParentName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  hasAttemptedSubmit: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  parentName,
  setParentName,
  email,
  setEmail,
  phone,
  setPhone,
  hasAttemptedSubmit,
}) => {
  // Validation functions
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Australian phone validation - exactly 10 digits with valid area codes
    const digitsOnly = phone.replace(/[\s-]/g, "");
    if (!/^\d{10}$/.test(digitsOnly)) return false;

    // Check valid Australian area codes
    const areaCode = digitsOnly.substring(0, 2);
    const validAreaCodes = ["02", "03", "04", "07", "08"];

    return validAreaCodes.includes(areaCode);
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits to get clean number
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) return phone;

    // Format based on prefix
    if (digits.startsWith("04")) {
      // Mobile: #### ### ###
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    }
    // Landline: ## #### ####
    return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
  };

  // Validation states
  const emailValid = email.trim() === "" ? false : isValidEmail(email); // Required field, so empty is invalid
  const phoneValid = phone.trim() === "" ? null : isValidPhone(phone);
  const nameValid = parentName.trim() !== ""; // Required field, so empty is invalid

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            className={`w-full rounded-2xl border bg-white/90 dark:bg-gray-950/40 px-4 py-3 pr-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none shadow-sm ${
              nameValid === true
                ? "border-green-500 dark:border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-500"
                : nameValid === false && hasAttemptedSubmit
                  ? "border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-500"
                  : "border-white/60 dark:border-gray-700 focus:ring-2 focus:ring-emerald-400"
            }`}
            placeholder="Enter full name"
            type="text"
            value={parentName}
            onChange={(event) => setParentName(event.target.value)}
          />
          {nameValid === true && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            aria-describedby={emailValid === false ? "email-error" : undefined}
            aria-invalid={emailValid === false ? "true" : "false"}
            className={`w-full rounded-2xl border bg-white/90 dark:bg-gray-950/40 px-4 py-3 pr-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none shadow-sm ${
              emailValid === true
                ? "border-green-500 dark:border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-500"
                : emailValid === false && hasAttemptedSubmit
                  ? "border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-500"
                  : "border-white/60 dark:border-gray-700 focus:ring-2 focus:ring-emerald-400"
            }`}
            placeholder="Enter email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailValid === true && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
          {emailValid === false && hasAttemptedSubmit && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 dark:text-red-400">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {emailValid === false && hasAttemptedSubmit && (
          <span className="sr-only" id="email-error" role="alert">
            Email address is not valid. Please enter a valid email address.
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone
        </label>
        <div className="relative">
          <input
            aria-describedby={phoneValid === false ? "phone-error" : undefined}
            aria-invalid={phoneValid === false ? "true" : "false"}
            className={`w-full rounded-2xl border bg-white/90 dark:bg-gray-950/40 px-4 py-3 pr-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none shadow-sm ${
              phoneValid === true
                ? "border-green-500 dark:border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-500"
                : phoneValid === false && hasAttemptedSubmit
                  ? "border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-500"
                  : "border-white/60 dark:border-gray-700 focus:ring-2 focus:ring-emerald-400"
            }`}
            placeholder="Enter phone number (optional)"
            type="tel"
            value={phone}
            onBlur={(event) => {
              // Format on blur if it's a valid 10-digit number
              const digits = event.target.value.replace(/\D/g, "");
              if (digits.length === 10) {
                setPhone(formatPhoneNumber(digits));
              }
            }}
            onChange={(event) => {
              // Allow typing digits, spaces, and dashes
              const value = event.target.value.replace(/[^\d\s-]/g, "");
              setPhone(value);
            }}
          />
          {phoneValid === true && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
          {phoneValid === false && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 dark:text-red-400">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {phoneValid === false && (
          <span className="sr-only" id="phone-error" role="alert">
            Phone number is not valid. Please enter a valid Australian phone
            number starting with 02, 03, 04, 07, or 08. Spaces and dashes are
            allowed.
          </span>
        )}
      </div>
    </div>
  );
};

export interface PaymentDetailsProps {
  parentName: string;
  setParentName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  selectedPlan: PlanType | null;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoStatus: string | null;
  appliedPromoValue: number;
  appliedPromoKind: "referral" | "promo" | null;
  removePromo: () => void;
  validateCode: (code: string) => Promise<void>;
  enrollmentData: EnrollmentPaymentData;
  isPaymentReady: boolean;
  missingFields?: string[];
  onPaymentError: (message: string) => void;
  onPaymentSuccess: (paymentIntentId: string) => void;
  finalAmountCents: number;
  promoAdjustments: { label: string; amount: number }[];
  selectedPlanLabel: string;
  notes: string;
  attachments: File[];
  basePriceCents: number;
  showHeader?: boolean;
  hasAttemptedSubmit: boolean;
  onSubmitAttempt: () => void;
  forceTestMode?: boolean;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
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
  missingFields = [],
  onPaymentError,
  onPaymentSuccess,
  finalAmountCents,
  promoAdjustments,
  selectedPlanLabel: _selectedPlanLabel,
  notes: _notes,
  attachments: _attachments,
  basePriceCents: _basePriceCents,
  showHeader = true,
  hasAttemptedSubmit,
  onSubmitAttempt,
  forceTestMode = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [testModeEnabled, _setTestModeEnabled] = useState(forceTestMode);

  // Validate promo code when input changes
  const handlePromoCodeChange = async (code: string) => {
    setPromoCode(code);

    // If there's currently an applied promo and user is clearing/changing it, remove it
    if (appliedPromoValue > 0 && code.trim() === "") {
      removePromo();
      return;
    }

    // Validate the code (this will update promoStatus)
    await validateCode(code);
  };

  useEffect(() => {
    // Trigger fade-in animation after a short delay when plan is selected
    if (selectedPlan) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedPlan]);
  return (
    <section
      className={`${SECTION_CARD_CLASS} p-4 space-y-4 transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {showHeader && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Payment details
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your enrolment with secure payment.
          </p>
        </div>
      )}

      <ContactForm
        email={email}
        hasAttemptedSubmit={hasAttemptedSubmit}
        parentName={parentName}
        phone={phone}
        setEmail={setEmail}
        setParentName={setParentName}
        setPhone={setPhone}
      />

      {/* Discount Code Section - Merged at end of payment section */}
      <div className="border-t border-white/60 dark:border-gray-700 pt-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Referral or Promo Code
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Have a referral or promo code? Enter it here for $100 off.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Referral or promo code
            </label>
            <div className="relative">
              <input
                className={`w-full rounded-2xl border bg-white/90 dark:bg-gray-950/40 px-4 py-3 pr-10 text-gray-900 dark:text-white focus:outline-none shadow-sm ${
                  appliedPromoValue > 0
                    ? "border-green-500 dark:border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-500"
                    : promoCode.trim() && appliedPromoValue === 0
                      ? "border-red-500 dark:border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-500"
                      : "border-white/60 dark:border-gray-700 focus:ring-2 focus:ring-emerald-400"
                }`}
                placeholder="Enter your code"
                type="text"
                value={promoCode}
                onChange={(event) =>
                  void handlePromoCodeChange(event.target.value)
                }
              />
              {appliedPromoValue > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {promoCode.trim() && appliedPromoValue === 0 && (
                <button
                  aria-label="Clear promo code"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  type="button"
                  onClick={() => setPromoCode("")}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {promoStatus && promoCode.trim() && (
          <div className="rounded-2xl border border-emerald-200/70 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-900/40 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200 shadow-inner flex justify-between items-center">
            <span>{promoStatus}</span>
            {appliedPromoValue > 0 && (
              <button
                className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded px-1 ml-2"
                type="button"
                onClick={removePromo}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      <PaymentForm
        adjustments={promoAdjustments}
        amountOverrideCents={finalAmountCents}
        appliedReferralCode={
          appliedPromoKind === "referral" ? promoCode : undefined
        }
        enrollmentData={enrollmentData}
        forceTestMode={testModeEnabled}
        hasAttemptedSubmit={hasAttemptedSubmit}
        isReady={isPaymentReady}
        missingFields={missingFields}
        planType={selectedPlan as PlanType}
        submitLabel="Complete Payment"
        onPaymentError={onPaymentError}
        onPaymentSuccess={onPaymentSuccess}
        onSubmitAttempt={onSubmitAttempt}
      />

      {/* Trust & Security Section */}
      <div className="border-t border-white/60 dark:border-gray-700 pt-6 space-y-4">
        <div className="text-center space-y-4">
          {/* Security Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M10 1L3 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V4l-7-3z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="font-medium">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-5 h-5 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Powered by</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#635bff"
                  />
                </svg>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Stripe
                </span>
              </div>
            </div>
          </div>

          {/* Security Message */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              <span className="font-medium text-gray-900 dark:text-white">
                Your payment information is secure and encrypted.
              </span>
              <br />
              We never store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Test Button - Development Only */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <button
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            type="button"
            onClick={() => {
              // Auto-fill test data
              setParentName("Jacques Test");
              setEmail("jacquescaspar@gmail.com");
              setPhone("0408453241");
              // Immediately trigger payment success
              setTimeout(() => {
                onPaymentSuccess(`test_payment_intent_${Date.now()}`);
              }, 100);
            }}
          >
            🧪 Test Complete Payment Flow
          </button>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2 text-center">
            Auto-fills form and advances to post-payment UX
          </p>
        </div>
      )}
    </section>
  );
};

export default PaymentDetails;
