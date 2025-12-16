"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PRICING, type PlanType } from "@/lib/constants";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
}

const stripePromise = loadStripe(publishableKey);

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
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  summarySlot?: React.ReactNode;
  submitLabel?: string;
  isReady?: boolean;
  amountOverrideCents?: number;
  adjustments?: { label: string; amount: number }[];
}

const PaymentFormContent: React.FC<PaymentFormProps> = ({
  planType,
  enrollmentData,
  onPaymentSuccess,
  onPaymentError,
  summarySlot,
  submitLabel = "Pay Now",
  isReady = true,
  amountOverrideCents,
  adjustments = [],
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const plan = PRICING[planType];
  const finalAmountCents =
    typeof amountOverrideCents === "number"
      ? Math.max(0, Math.min(plan.price, Math.round(amountOverrideCents)))
      : plan.price;
  const baseAmountDisplay = (plan.price / 100).toFixed(2);
  const finalAmountDisplay = (finalAmountCents / 100).toFixed(2);

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    setClientSecret(null);
    createPaymentIntent();
  }, [planType, finalAmountCents]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          enrollmentData,
          amountOverride: finalAmountCents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
    } catch (error: any) {
      onPaymentError(error.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: enrollmentData.parentName,
              email: enrollmentData.email,
              phone: enrollmentData.phone,
            },
          },
        },
      );

      if (error) {
        onPaymentError(error.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (error: any) {
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

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            <div className="mt-4 space-y-1 text-sm">
              {adjustments.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between text-gray-600 dark:text-gray-300"
                >
                  <span>{item.label}</span>
                  <span>- AUD ${(item.amount / 100).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-base font-semibold text-green-600 dark:text-green-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total today</span>
                <span>AUD ${finalAmountDisplay}</span>
              </div>
            </div>
          )}
          {adjustments.length === 0 && (
            <div className="flex justify-between text-base font-semibold text-green-600 dark:text-green-400 mt-4">
              <span>Total today</span>
              <span>AUD ${finalAmountDisplay}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {summarySlot}

        <button
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          disabled={!stripe || isProcessing || !clientSecret || !isReady}
          type="submit"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            submitLabel || `Pay AUD $${finalAmountDisplay}`
          )}
        </button>
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
