import type { Metadata } from "next";
import InsightsCollectionClient from "@/enrol/insights/InsightsCollectionClient";

export const metadata: Metadata = {
  title: "ZPD Learning Insights | Complete Your Enrolment",
  description:
    "Provide additional insights to help us create the perfect tutoring program for your child. Share details about their learning style, goals, and preferences.",
  keywords:
    "ZPD tutoring insights, personalised learning, student profile, tutoring enrolment, learning assessment, Sydney tutoring",
  openGraph: {
    title: "ZPD Learning Insights | Complete Your Enrolment",
    description:
      "Help us create the perfect tutoring program by sharing insights about your child's learning style and goals.",
    type: "website",
  },
};

interface InsightsPageProps {
  searchParams: Promise<{ session?: string; token?: string }>;
}

const InsightsPage = async ({ searchParams }: InsightsPageProps) => {
  const { session, token } = await searchParams;
  return (
    <InsightsCollectionClient
      initialSessionId={session}
      initialSessionToken={token}
    />
  );
};

export default InsightsPage;
