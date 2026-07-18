"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PRICING, type PlanType } from "@/lib/constants";
import { getStripe } from "@/lib/stripe";
import type { PaymentRequest } from "@stripe/stripe-js";

const stripePromise = getStripe();

export interface EnrollmentPaymentData {
  parentName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  attachmentNames?: string[];
}

interface PaymentFormProps {
  planType: PlanType;
  enrollmentData: EnrollmentPaymentData;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string | null) => void;
  summarySlot?: React.ReactNode;
  submitLabel?: string;
  isReady?: boolean;
  missingFields?: string[];
  amountOverrideCents?: number;
  adjustments?: { label: string; amount: number }[];
  appliedReferralCode?: string;
  appliedPromoCode?: string;
  hasAttemptedSubmit: boolean;
  onSubmitAttempt: () => void;
  forceTestMode?: boolean;
}

/* eslint-disable max-lines-per-function */
const PaymentFormContent: React.FC<PaymentFormProps> = ({
  planType,
  enrollmentData,
  onPaymentSuccess,
  onPaymentError,
  summarySlot,
  submitLabel = "Pay Now",
  isReady = true,
  missingFields = [],
  amountOverrideCents,
  adjustments = [],
  appliedReferralCode,
  appliedPromoCode,
  onSubmitAttempt,
  forceTestMode = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [cardholderName, setCardholderName] = useState("");
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null,
  );

  const plan = PRICING[planType];
  const finalAmountCents =
    typeof amountOverrideCents === "number"
      ? Math.max(100, Math.min(plan.price, Math.round(amountOverrideCents)))
      : plan.price;
  const baseAmountDisplay = (plan.price / 100).toFixed(2);
  const finalAmountDisplay = (finalAmountCents / 100).toFixed(2);

  const isTestMode =
    forceTestMode ||
    (process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      (window.location.search.includes("test=true") ||
        window.location.search.includes("bypass=true")));

  const createPaymentIntent = useCallback(async () => {
    try {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && !isTestMode) {
        onPaymentError(
          "Stripe is not configured for this environment. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable card payments.",
        );
        return;
      }
      // Wait for email before calling the API — avoids sticky "Email is required" noise
      if (!enrollmentData.email?.trim()) {
        setClientSecret(null);
        return;
      }
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          enrollmentData,
          amountOverride: finalAmountCents,
          appliedReferralCode,
          appliedPromoCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
      onPaymentError(null);
    } catch (error: unknown) {
      onPaymentError(
        error instanceof Error
          ? error.message
          : "Failed to create payment intent",
      );
    }
  }, [
    planType,
    enrollmentData,
    finalAmountCents,
    onPaymentError,
    appliedReferralCode,
    appliedPromoCode,
    isTestMode,
  ]);

  useEffect(() => {
    setClientSecret(null);
    void createPaymentIntent();
  }, [createPaymentIntent]);

  // Clear validation error when fields become ready
  useEffect(() => {
    if (isReady) {
      setValidationError(null);
    }
  }, [isReady]);

  // Setup Apple Pay / Google Pay via Payment Request for mobile
  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "AU",
      currency: "aud",
      total: {
        label: "ZPD Enrolment",
        amount: finalAmountCents,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    void pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, finalAmountCents]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Mark that submit has been attempted
    onSubmitAttempt();

    // Clear any previous validation error
    setValidationError(null);

    // Check if required fields are filled
    if (!isReady) {
      const missingFieldsText =
        missingFields.length > 0
          ? `Missing fields: ${missingFields.join(", ")}. `
          : "";
      setValidationError(
        `${missingFieldsText}Please complete all fields to proceed with payment.`,
      );
      return;
    }

    if (!stripe || !elements) {
      onPaymentError("Payment form is still loading. Please wait a moment.");
      return;
    }

    if (!clientSecret) {
      onPaymentError(
        "Could not start payment. Refresh the page or check your connection.",
      );
      return;
    }

    setIsProcessing(true);

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (!cardNumber || !cardExpiry || !cardCvc) {
      onPaymentError("Card elements not found");
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: {
              name: cardholderName || enrollmentData.parentName,
              email: enrollmentData.email,
              phone: enrollmentData.phone,
            },
          },
        },
      );

      if (error) {
        onPaymentError(error.message ?? "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        setValidationError(null);
        onPaymentSuccess(paymentIntent.id);
      }
    } catch {
      onPaymentError("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  // Handle Apple Pay / mobile payment request
  const handlePaymentRequest = async () => {
    if (!paymentRequest || !clientSecret) return;

    setIsProcessing(true);
    onSubmitAttempt();

    paymentRequest.on("paymentmethod", async (ev) => {
      if (!stripe) {
        onPaymentError("Payment form is still loading. Please wait a moment.");
        return;
      }

      try {
        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false },
          );

        if (confirmError) {
          ev.complete("fail");
          onPaymentError(confirmError.message ?? "Payment failed");
          return;
        }

        let resolvedIntent = paymentIntent;
        if (resolvedIntent?.status === "requires_action") {
          const { error: actionError, paymentIntent: confirmedIntent } =
            await stripe.confirmCardPayment(clientSecret);
          if (actionError) {
            ev.complete("fail");
            onPaymentError(actionError.message ?? "Payment failed");
            return;
          }
          resolvedIntent = confirmedIntent;
        }

        if (resolvedIntent?.status === "succeeded") {
          ev.complete("success");
          onPaymentSuccess(resolvedIntent.id);
          return;
        }

        ev.complete("fail");
        onPaymentError("Payment could not be completed. Please try again.");
      } catch {
        ev.complete("fail");
        onPaymentError("Payment processing failed");
      } finally {
        setIsProcessing(false);
      }
    });

    try {
      // show may not return promise in types, but call it
      await (paymentRequest.show() as unknown as Promise<void>);
    } catch (prError: unknown) {
      const msg =
        prError instanceof Error ? prError.message : "Apple Pay not available";
      onPaymentError(msg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && !isTestMode && (
        <div className="rounded-2xl border border-amber-200/70 bg-amber-50/80 dark:bg-amber-950/30 dark:border-amber-900 px-6 py-4 text-amber-900 dark:text-amber-200 shadow-lg">
          <p className="text-sm sm:text-base font-medium">
            Stripe isn’t configured for this environment.
          </p>
          <p className="mt-2 text-sm text-amber-800/90 dark:text-amber-200/90">
            Add{" "}
            <code className="font-mono">
              NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            </code>{" "}
            (and server-side keys for the API routes) to your{" "}
            <code className="font-mono">.env.local</code> to enable card
            payments.
          </p>
        </div>
      )}
      <form
        className="space-y-6"
        onSubmit={(event) => void handleSubmit(event)}
      >
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Paying for
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Base
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                AUD ${baseAmountDisplay}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {plan.sessionsPerTerm} sessions / term
              </p>
            </div>
          </div>
          {adjustments.length > 0 && (
            <div className="mt-4 space-y-1">
              {adjustments.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between text-lg text-gray-600 dark:text-gray-300"
                >
                  <span>{item.label}</span>
                  <span>- AUD ${(item.amount / 100).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-lg font-semibold text-blue-600 dark:text-blue-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total today</span>
                <span>AUD ${finalAmountDisplay}</span>
              </div>
            </div>
          )}
          {adjustments.length === 0 && (
            <div className="flex justify-between text-lg font-semibold text-blue-600 dark:text-blue-400 mt-4">
              <span>Total today</span>
              <span>AUD ${finalAmountDisplay}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cardholder Name
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white mb-4"
            placeholder="Name on card"
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number <span className="text-red-500">*</span>
              </label>
              <div className="border rounded-lg p-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <CardNumberElement options={cardElementOptions} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry <span className="text-red-500">*</span>
                </label>
                <div className="border rounded-lg p-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <CardExpiryElement options={cardElementOptions} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVC <span className="text-red-500">*</span>
                </label>
                <div className="border rounded-lg p-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <CardCvcElement options={cardElementOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apple Pay for mobile / supported devices */}
        {paymentRequest && (
          <div className="pt-2">
            <div className="text-center mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                or
              </span>
            </div>
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
                style: {
                  paymentRequestButton: {
                    theme: "dark",
                    height: "48px",
                  },
                },
              }}
              onClick={handlePaymentRequest}
            />
            <p className="text-[10px] text-center text-gray-500 dark:text-gray-400 mt-1">
              Apple Pay available on supported devices
            </p>
          </div>
        )}

        {summarySlot}

        <div className="flex gap-3">
          <button
            className="flex-1 py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700"
            disabled={
              !stripe ||
              isProcessing ||
              !clientSecret ||
              !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            }
            type="submit"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing secure payment</span>
              </div>
            ) : (
              submitLabel || `Pay AUD $${finalAmountDisplay}`
            )}
          </button>
          {process.env.NODE_ENV === "development" && (
            <button
              className="flex-1 py-3 px-4 rounded-lg transition-colors font-medium bg-gray-500 text-white hover:bg-gray-600"
              type="button"
              onClick={() => {
                onSubmitAttempt();
                onPaymentSuccess(`test_payment_intent_${Date.now()}`);
              }}
            >
              Skip payment (testing)
            </button>
          )}
        </div>

        {validationError && (
          <p className="text-sm text-amber-600 text-center">
            {validationError}
          </p>
        )}
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Your payment information is secure and encrypted.
      </p>
    </div>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentFormContent {...props} />
  </Elements>
);

export default PaymentForm;
