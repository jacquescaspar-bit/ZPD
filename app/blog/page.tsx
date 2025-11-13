import type { Metadata } from "next";
import ZPDPost from "@/blog/components/ZPDPost";
import PersonalisedLearningPost from "@/blog/components/PersonalisedLearningPost";
import CertifiedTutorsPost from "@/blog/components/CertifiedTutorsPost";
import ProgressTrackingPost from "@/blog/components/ProgressTrackingPost";
import EducationalPhilosophyPost from "@/blog/components/EducationalPhilosophyPost";
import ScienceBehindZPDPost from "@/blog/components/ScienceBehindZPDPost";
import TutorMatchingPost from "@/blog/components/TutorMatchingPost";
import SupportingParentsPost from "@/blog/components/SupportingParentsPost";
import AboutZPDPost from "@/blog/components/AboutZPDPost";

export const metadata: Metadata = {
  title: "ZPD Learning Blog | Educational Insights & Tutoring Tips",
  description:
    "Discover expert insights on personalised learning, Zone of Proximal Development, and effective tutoring strategies. Australian-based educational blog for parents and tutors.",
  keywords:
    "ZPD learning, personalised tutoring, educational philosophy, Zone of Proximal Development, Australian education, tutoring tips",
  openGraph: {
    title: "ZPD Learning Blog | Educational Insights & Tutoring Tips",
    description:
      "Discover expert insights on personalised learning, Zone of Proximal Development, and effective tutoring strategies.",
    type: "website",
  },
};

const BlogPage = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          ZPD Learning Blog
        </h1>

        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-16 text-center">
          Exploring the fascinating world of how kids actually learn best.
        </p>

        <ZPDPost />

        <PersonalisedLearningPost />

        <CertifiedTutorsPost />

        <ProgressTrackingPost />

        <EducationalPhilosophyPost />

        <ScienceBehindZPDPost />

        <TutorMatchingPost />

        <SupportingParentsPost />

        <AboutZPDPost />

        <div className="text-center">
          <a
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            href="/"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default BlogPage;
