import type { Metadata } from "next";
import EnrollPageClient from "@/enrol/EnrollPageClient";
import type { PlanType } from "@/lib/constants";

export const metadata: Metadata = {
  description:
    "Term-based tutoring across Australia — start with a $110 diagnostic discovery, then choose online or in-home plans. GST included, upfront payment.",
  keywords:
    "tutoring pricing, ZPD Learning Australia, diagnostic discovery session, term tutoring plans, GST included tutoring, enrol ZPD Learning, personalised learning enrolment",
  openGraph: {
    title: "ZPD Learning Pricing & Enrolment | Choose Your Plan",
    description:
      "Start with a diagnostic discovery session, then term plans online or in-home. GST included. Australia-wide.",
    type: "website",
  },
};

const planKeys: PlanType[] = ["trial", "online", "essential", "intensive"];

const getInitialPlan = (planParam?: string): PlanType | undefined => {
  if (!planParam) return undefined;
  const normalised = planParam.toLowerCase();
  return planKeys.find((plan) => plan === normalised);
};

const EnrollPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; ref?: string; step?: string }>;
}) => {
  const params = await searchParams;
  const initialPlan = getInitialPlan(params?.plan);
  const initialPromoCode = params?.ref;
  const initialStep =
    params?.step === "payment"
      ? "payment"
      : params?.step === "review"
        ? "review"
        : "plan";

  return (
    <EnrollPageClient
      initialPlan={initialPlan}
      initialPromoCode={initialPromoCode}
      initialStep={initialStep}
    />
  );
};

export default EnrollPage;
