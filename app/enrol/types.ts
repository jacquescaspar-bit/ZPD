import type { PlanType } from "@/lib/constants";

export type Step = "plan" | "payment" | "review";

export interface EnrollmentFormProps {
  initialPlan?: PlanType | null;
  initialPromoCode?: string;
  initialStep?: Step;
  onPaymentProcessingChange?: (isProcessing: boolean) => void;
}

export interface ReferralCode {
  id: string;
  code: string;
  ownerEmail: string;
  createdAt: string; // ISO date string
  usedCount: number;
  isActive: boolean;
  allowedPlans: PlanType[];
  sourceCodeId?: string; // ID of the code that generated this one
}

export interface ReferralCodeValidation {
  valid: boolean;
  reason?: string;
  referralCode?: ReferralCode;
}

export interface ReferralCodeCreation {
  ownerEmail: string;
  sourceCodeId?: string;
  allowedPlans?: PlanType[];
}
