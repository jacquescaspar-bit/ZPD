// Currency configuration for Australia
export const CURRENCY = "aud";

// Pricing configuration (in cents)
export const PRICING = {
  online: {
    name: "Online Plan",
    price: 75000, // $750.00 AUD per term
    sessionsPerTerm: 10,
  },
  essential: {
    name: "Essential Plan",
    price: 95000, // $950.00 AUD per term
    sessionsPerTerm: 10,
  },
  intensive: {
    name: "Intensive Plan",
    price: 170000, // $1,700.00 AUD per term
    sessionsPerTerm: 20,
  },
} as const;

export type PlanType = keyof typeof PRICING;
