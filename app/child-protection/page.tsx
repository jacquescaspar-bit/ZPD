import type { Metadata } from "next";
import Nav from "@/Nav";
import ContentSection from "@/child-protection/ContentSection";

export const metadata: Metadata = {
  title: "Child Protection & Safety | ZPD Tutoring Services",
  description:
    "Learn about our child protection policies, Working With Children Check requirements, and commitment to child safety.",
  keywords:
    "child protection, child safety, WWCC, working with children check, mandatory reporting",
  openGraph: {
    title: "Child Protection & Safety - ZPD Tutoring Services",
    description:
      "Our commitment to child safety and protection in tutoring services.",
    type: "website",
  },
};

const ChildProtectionPage = () => (
  <div className="relative">
    <Nav />
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen px-6 pt-16 pb-12 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center pb-12">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            Child Protection & Safety
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Our unwavering commitment to child safety and protection
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Last updated: {/* PLACEHOLDER: Last Updated Date */} [Current Date]
          </p>
        </section>

        {/* Content Section */}
        <ContentSection />
      </div>
    </div>
  </div>
);

export default ChildProtectionPage;
