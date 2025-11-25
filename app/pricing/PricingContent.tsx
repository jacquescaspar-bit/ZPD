import PricingCard from "@/pricing/components/PricingCard";

const PricingContent = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          Pricing Plans
        </h1>

        <div className="text-center mb-16">
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Choose the perfect tutoring plan for your child&apos;s learning
            journey. All plans include our ZPD-based personalized approach with
            certified tutors and comprehensive progress tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <PricingCard
            description="Perfect for students building core skills"
            features={[
              "1-on-1 tutoring sessions",
              "ZPD-based lesson planning",
              "Progress reports",
              "Parent-teacher communication",
              "Flexible scheduling",
            ]}
            period="per session"
            popular={false}
            price="$80"
            title="Foundation"
          />
          <PricingCard
            popular
            description="For students ready to advance quickly"
            features={[
              "1-on-1 tutoring sessions",
              "ZPD-based lesson planning",
              "Progress reports & analytics",
              "Parent-teacher communication",
              "Flexible scheduling",
              "Homework assistance",
              "Test preparation support",
            ]}
            period="per session"
            price="$120"
            title="Accelerated"
          />
          <PricingCard
            description="Comprehensive support for maximum growth"
            features={[
              "1-on-1 tutoring sessions",
              "ZPD-based lesson planning",
              "Detailed progress analytics",
              "Weekly parent consultations",
              "Flexible scheduling",
              "Homework assistance",
              "Test preparation & strategies",
              "Study skills development",
              "24/7 support access",
            ]}
            period="per session"
            popular={false}
            price="$160"
            title="Intensive"
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-8 text-gray-900 dark:text-white">
            Package Deals
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                10-Session Package
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Save 10% with our most popular package
              </p>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                $1,080{" "}
                <span className="text-lg font-normal">($108/session)</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Regular price: $1,200
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                20-Session Package
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Save 15% with our comprehensive package
              </p>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                $2,040{" "}
                <span className="text-lg font-normal">($102/session)</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Regular price: $2,400
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
            All plans include our commitment to your child&apos;s success
            through personalized ZPD-based learning that adapts to their unique
            needs and pace.
          </p>
          <a
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            href="/contact"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default PricingContent;
