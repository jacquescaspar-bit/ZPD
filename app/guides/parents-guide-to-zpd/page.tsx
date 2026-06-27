import type { Metadata } from "next";
import GuideContent from "@/guides/parents-guide-to-zpd/GuideContent";

export const metadata: Metadata = {
  title: "A Parent's Guide to ZPD | ZPD Learning",
  description:
    "Plain-language guide to the Zone of Proximal Development — how to spot the right level of challenge for your child and what to look for in tutoring.",
  openGraph: {
    title: "A Parent's Guide to the Zone of Proximal Development",
    description:
      "How to spot the gap between what your child can do alone and what they can do with the right support.",
    type: "article",
  },
};

const ParentsGuidePage = () => <GuideContent />;

export default ParentsGuidePage;
