// Site configuration
export const SITE_NAME = "ZPD Learning";
export const SITE_URL = "https://zpdlearning.com";
export const SUPPORT_EMAIL = "grow@zpdlearning.com";
export const SUPPORT_PHONE = "1300990443";
export const SUPPORT_PHONE_DISPLAY = "1300 990 443";

export const LEGAL_ENTITY_NAME = "Squanch Systems";
export const LEGAL_ABN = "74 198 215 420";
/** Registered ABN address — not shown publicly; use ServiceAreaText instead. */
export const LEGAL_REGISTERED_ADDRESS =
  "1/135 O'Donnell St, North Bondi NSW 2026, Australia";
export const LEGAL_TRADING_AS = `${LEGAL_ENTITY_NAME} (trading as ${SITE_NAME})`;

// Currency configuration for Australia
export const CURRENCY = "aud";

// Pricing configuration (in cents)
export const PRICING = {
  trial: {
    name: "Diagnostic Discovery",
    price: 11000, // $110.00 AUD (diagnostic discovery session)
    sessionsPerTerm: 1,
  },
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

const TERM_PLAN_KEYS = [
  "online",
  "essential",
  "intensive",
] as const satisfies readonly PlanType[];

/** Lowest term-plan price in whole dollars (excludes diagnostic trial). */
export const LOWEST_TERM_PLAN_PRICE =
  Math.min(...TERM_PLAN_KEYS.map((key) => PRICING[key].price)) / 100;

export const formatAudWholeDollars = (dollars: number): string =>
  dollars.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
