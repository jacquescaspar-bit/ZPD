import ProcessCarousel from "@/start/components/ProcessCarousel";

const StartContent = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl sm:text-5xl font-light mb-2 sm:mb-4 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          Start Here
        </h1>

        <div className="space-y-12 sm:space-y-16">
          <div className="text-center mb-4">
            <p className="text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Our proven ZPD methodology for tutoring success.
            </p>
          </div>

          <ProcessCarousel />

          <div className="text-center mt-16">
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

export default StartContent;
