import Nav from "@/Nav";
import ProcessCarousel from "@/about/components/ProcessCarousel";

const StartContent = () => (
  <div className="relative">
    <Nav />
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen px-6 pt-16 pb-12 z-10">
      <div className="space-y-6">
        <section className="text-center pb-20">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            Success by Design
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
        </div>
      </div>
    </div>
  </div>
);

export default StartContent;
