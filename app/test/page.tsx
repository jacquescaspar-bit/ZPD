import type { Metadata } from "next";
import EnrollPageClient from "@/enrol/EnrollPageClient";
import type { PlanType } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Test Page - ZPD Learning",
  description: "Test page for development purposes.",
};

const planKeys: PlanType[] = ["trial", "online", "essential", "intensive"];

const getInitialPlan = (planParam?: string): PlanType | undefined => {
  if (!planParam) return undefined;
  const normalised = planParam.toLowerCase();
  return planKeys.find((plan) => plan === normalised);
};

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; ref?: string; step?: string }>;
}) => {
  const params = await searchParams;
  const initialPlan = getInitialPlan(params?.plan);
  const initialPromoCode = params?.ref;
  const initialStep = "review";

  return (
    <EnrollPageClient
      initialPlan={initialPlan}
      initialPromoCode={initialPromoCode}
      initialStep={initialStep}
    />
  );
};

export default TestPage;
