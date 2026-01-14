import Nav from "@/Nav";
import ProcessCarousel from "@/method/components/ProcessCarousel";

const StartContent = () => (
  <div className="relative">
    <Nav />
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen px-6 pt-16 pb-12 z-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="text-center pb-20">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            Start Here
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Our proven ZPD methodology for tutoring success.
          </p>
        </section>

        <div className="space-y-6">
          <ProcessCarousel />

          <div className="text-center">
            <p className="hidden md:block text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
              This systematic approach ensures consistent progress and
              measurable results, helping students build confidence and achieve
              academic excellence through personalized, evidence-based tutoring.
            </p>
            <p className="md:hidden text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
              Our systematic approach delivers consistent progress, building
              confidence through personalized tutoring.
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

export default StartContent;
