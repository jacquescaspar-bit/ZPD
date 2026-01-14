import { PRICING, type PlanType } from "@/lib/constants";
import type { Step } from "@/enrol/types";

export const stepTitles: Record<Step, string> = {
  plan: "Choose your plan",
  payment: "Payment",
  review: "Review and Confirm",
};

export const planDescriptions: Record<
  PlanType,
  { title: string; blurb: string; highlights: string[] }
> = {
  trial: {
    title: "Discovery",
    blurb: "One-time • Diagnostic Discovery Session • Customised ZPD Plan",
    highlights: [
      "One time offer",
      "Diagnostic Discovery",
      "Credit applied to Essential or Intensive plan within 30 days",
    ],
  },
  online: {
    title: "Online",
    blurb: "10 online sessions per term • 1 subject",
    highlights: ["Virtual Delivery", "Email Support", "Great starter option"],
  },
  essential: {
    title: "Essential",
    blurb: "10 sessions per term • 2 subjects • Priority support",
    highlights: [
      "ATAR Specialist Tutors",
      "Discovery session credit included",
      "Most Popular",
    ],
  },
  intensive: {
    title: "Intensive",
    blurb: "20 sessions per term • Unlimited subjects",
    highlights: [
      "Direct Phone Support",
      "Fast-tracked Progress",
      "Best for Year 11/12",
    ],
  },
};

export const getPlanCards = () =>
  (["trial", "online", "essential", "intensive"] as PlanType[]).map(
    (planKey) => {
      const config = PRICING[planKey];
      const description = planDescriptions[planKey];
      return {
        id: planKey,
        price: (config.price / 100).toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
          minimumFractionDigits: 0,
        }),
        sessionsPerTerm: config.sessionsPerTerm,
        title: description.title,
        blurb: description.blurb,
        highlights: description.highlights,
      };
    },
  );
