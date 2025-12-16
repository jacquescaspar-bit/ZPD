import type { Metadata } from "next";
import EnrollmentForm from "@/enrol/components/EnrollmentForm";
import EnrollmentAnalytics from "@/enrol/components/EnrollmentAnalytics";
import type { PlanType } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Enrol with ZPD Tutoring | Start Your Learning Journey",
  description:
    "Begin your personalised tutoring journey with ZPD. Our conversational enrolment process makes getting started simple and tailored to your needs.",
  keywords:
    "enrol ZPD tutoring, start tutoring, personalised learning enrolment, Sydney HSC tutoring enrolment",
  openGraph: {
    title: "Enrol with ZPD Tutoring",
    description:
      "Start your personalised tutoring journey today with our simple enrolment process.",
    type: "website",
  },
};

const planKeys: PlanType[] = ["online", "essential", "intensive"];

const getInitialPlan = (planParam?: string): PlanType => {
  if (!planParam) return "essential";
  const normalised = planParam.toLowerCase();
  return planKeys.find((plan) => plan === normalised) ?? "essential";
};

const EnrollPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; ref?: string }>;
}) => {
  const params = await searchParams;
  const initialPlan = getInitialPlan(params?.plan);
  const initialPromoCode = params?.ref;
  return (
    <div className="relative">
      <EnrollmentAnalytics />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 -z-10" />
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center">
            <p className="uppercase tracking-[0.35em] text-xs text-emerald-600 dark:text-emerald-300 mb-4">
              Enrolment
            </p>
            <h1
              className="text-5xl font-light mb-6 text-gray-900 dark:text-white"
              style={{ letterSpacing: "0.1em" }}
            >
              Start Your Learning Journey
            </h1>
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Let's find the perfect tutoring solution for your child through
              our guided enrolment form.
            </p>
            <div className="mt-10 inline-flex items-center gap-4 rounded-full bg-white/70 dark:bg-gray-900/60 px-6 py-3 shadow-xl border border-white/60 dark:border-gray-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                Secure • Personalised • Term-ready
              </span>
            </div>
          </section>

          {/* Enrollment Form */}
          <section>
            <EnrollmentForm
              initialPlan={initialPlan}
              initialPromoCode={initialPromoCode}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;
