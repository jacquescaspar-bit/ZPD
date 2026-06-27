import type { Metadata } from "next";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import ZPDPost from "@/blog/components/ZPDPost";
import PersonalisedLearningPost from "@/blog/components/PersonalisedLearningPost";
import CertifiedTutorsPost from "@/blog/components/CertifiedTutorsPost";
import ProgressTrackingPost from "@/blog/components/ProgressTrackingPost";
import EducationalPhilosophyPost from "@/blog/components/EducationalPhilosophyPost";
import ScienceBehindZPDPost from "@/blog/components/ScienceBehindZPDPost";
import TutorMatchingPost from "@/blog/components/TutorMatchingPost";
import SupportingParentsPost from "@/blog/components/SupportingParentsPost";
import AboutZPDPost from "@/blog/components/AboutZPDPost";
import InvisibleLadderPost from "@/blog/components/InvisibleLadderPost";
import ExperiencedTutorsPost from "@/blog/components/ExperiencedTutorsPost";
import TriangleTutoringPost from "@/blog/components/TriangleTutoringPost";
import MagicTrickPost from "@/blog/components/MagicTrickPost";
import BlogNavigation from "@/blog/components/BlogNavigation";

export const metadata: Metadata = {
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
  <PageShell>
    <Nav />
    <div className="px-6 pt-16 pb-12">
      <div className="space-y-6">
        <section className="text-center pb-20">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            ZPD Learning Blog
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Exploring the fascinating world of how kids actually learn best.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogNavigation />
            </div>
          </aside>

          <main className="lg:col-span-3">
            <InvisibleLadderPost />

            <AboutZPDPost />

            <SupportingParentsPost />

            <TutorMatchingPost />

            <ScienceBehindZPDPost />

            <EducationalPhilosophyPost />

            <ProgressTrackingPost />

            <CertifiedTutorsPost />

            <PersonalisedLearningPost />

            <ZPDPost />

            <ExperiencedTutorsPost />

            <TriangleTutoringPost />

            <MagicTrickPost />
          </main>
        </div>

        <div className="text-center">
          <a
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            href="/"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  </PageShell>
);

export default BlogPage;
