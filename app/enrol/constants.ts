import type { PlanType } from "@/lib/constants";

export const MAX_NOTES_LENGTH = 8000;

export const REFERRAL_VALUE = 10000; // $100

export const SECTION_CARD_CLASS =
  "rounded-3xl border border-white/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 shadow-2xl backdrop-blur-lg";

export interface PromoCode {
  discountCents: number;
  description: string;
  maxUses: number | null;
  expiresAt: string | null;
  isActive: boolean;
  allowedPlans?: PlanType[];
}

export const PROMO_CODES: Record<string, PromoCode> = {
  WELCOME25: {
    discountCents: 2500, // $25
    description: "$25 off your first term",
    maxUses: 100,
    expiresAt: "2024-12-31",
    isActive: true,
  },
  FRIENDS10: {
    discountCents: 1000, // $10
    description: "$10 referral bonus",
    maxUses: null, // unlimited
    expiresAt: null,
    isActive: true,
  },
  BACKTOSCHOOL: {
    discountCents: 5000, // $50
    description: "$50 off back-to-school special",
    maxUses: 50,
    expiresAt: "2024-03-01",
    isActive: true,
  },
};
