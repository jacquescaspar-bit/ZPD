import type { Metadata } from "next";
import GuideContent from "@/guides/parents-guide-to-zpd/GuideContent";

export const metadata: Metadata = {
  title: "Is Tutoring the Right Fit? A Parent's Guide | ZPD Learning",
  description:
    "Before you pay for a term of tutoring: how to spot when work is too hard or too easy, five questions to ask any tutor, and what good support looks like.",
  openGraph: {
    title: "Is tutoring actually the right fit?",
    description:
      "A short guide for parents — what to ask before you commit to a term.",
    type: "article",
  },
};

const ParentsGuidePage = () => <GuideContent />;

export default ParentsGuidePage;
