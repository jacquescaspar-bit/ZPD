import ZPDApproachSection from "@/services/components/ZPDApproachSection";
import PersonalisedPlansSection from "@/services/components/PersonalisedPlansSection";
import CertifiedTutorsSection from "@/services/components/CertifiedTutorsSection";
import SupportingParentsSection from "@/services/components/SupportingParentsSection";
import TutorMatchingSection from "@/services/components/TutorMatchingSection";
import TrinitySynergySection from "@/services/components/TrinitySynergySection";

const ServicesContent = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          The ZPD Difference
        </h1>

        <div className="space-y-16">
          <div className="text-center mb-16">
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              At ZPD Learning, we offer comprehensive tutoring services designed
              around the Zone of Proximal Development (ZPD) principle. Our
              expert tutors provide personalised education that challenges
              students just enough to foster growth, building confidence and
              academic excellence through tailored learning experiences.
            </p>
          </div>

          <ZPDApproachSection />
          <PersonalisedPlansSection />
          <CertifiedTutorsSection />
          <SupportingParentsSection />
          <TutorMatchingSection />
          <TrinitySynergySection />

          <div className="text-center mt-16">
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
              Our mission is to bridge the gap between what students can do
              independently and what they can achieve with the right support,
              fostering growth, confidence, and a lifelong love of learning.
            </p>
          </div>
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
  </div>
);

export default ServicesContent;
