import { loadStripe, type Stripe as StripeClient } from "@stripe/stripe-js";
import Stripe from "stripe";

// Client-side Stripe instance
let stripePromise: Promise<StripeClient | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Server-side Stripe instance
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});
