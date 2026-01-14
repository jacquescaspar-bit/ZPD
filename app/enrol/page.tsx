import type { Metadata } from "next";
import EnrollPageClient from "@/enrol/EnrollPageClient";
import type { PlanType } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "ZPD Tutoring Pricing & Enrollment | Choose Your Plan for Sydney HSC & ATAR Success",
  description:
    "Choose from term packages or one-off sessions with ZPD's Australian pricing. GST included, upfront payment. Sydney HSC tutoring, ATAR tutor Sydney. Start your personalised tutoring journey today.",
  keywords:
    "Sydney HSC tutoring, ATAR tutor Sydney, tutoring pricing, ZPD tutoring Australia, GST included tutoring, discovery session, enrol ZPD tutoring, start tutoring, personalised learning enrolment",
  openGraph: {
    title: "ZPD Tutoring Pricing & Enrollment | Choose Your Plan",
    description:
      "Flexible pricing with term packages and one-off options. GST included. Best rates for Sydney HSC & ATAR tutoring. Start your journey today.",
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
  const initialStep = params?.step === "payment" ? "payment" : "plan";

  return (
    <EnrollPageClient
      initialPlan={initialPlan}
      initialPromoCode={initialPromoCode}
      initialStep={initialStep}
    />
  );
};

export default EnrollPage;
