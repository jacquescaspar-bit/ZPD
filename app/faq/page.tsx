import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | ZPD Learning - Frequently Asked Questions",
  description:
    "Find answers to common questions about ZPD tutoring, our approach, pricing, and how we support families and tutors in Sydney.",
  keywords:
    "ZPD FAQ, tutoring questions, Sydney HSC tutoring FAQ, ATAR tutor FAQ",
  openGraph: {
    title: "ZPD Learning FAQ",
    description:
      "Answers to your questions about personalized tutoring and ZPD approach.",
    type: "website",
  },
};

const FAQPage = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1
            className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
            style={{ letterSpacing: "0.1em" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
            Everything you need to know about ZPD Learning
          </p>
        </section>

        {/* Why Choose ZPD Section */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800 rounded-2xl mb-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose ZPD Learning?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                  For Families
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Personalized learning plans tailored to your child's needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Progress tracking through our parent portal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Direct communication with certified tutors
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      14-day satisfaction guarantee
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Flexible scheduling around your family's needs
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-6">
                  For Tutors
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Competitive compensation and performance incentives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Access to exclusive ZPD training and resources
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Flexible scheduling with guaranteed hours
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Professional development opportunities
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-4">
          {/* Existing FAQs from pricing page */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              Why term commitment?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Term-based pricing ensures consistent tutoring and allows us to
              provide the best rates for committed families. It enables us to
              carefully match tutors and develop comprehensive learning plans.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              Can tutors contact families directly?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              No, all communication goes through our platform to maintain
              quality standards and ensure consistent support. This mediated
              approach protects both families and tutors.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              What if we go on holidays?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Sessions can be rescheduled within the term. We work around your
              schedule and can pause sessions during holidays or busy periods.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              Is GST included in the prices?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Yes, all prices are in AUD and include GST. No hidden fees or
              surprise charges.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              Can I change tutors mid-term?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Yes, if needed. We match based on your child's needs and learning
              style, and ensure continuity of their educational progress.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              What subjects are covered?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              All HSC subjects plus primary and secondary levels. Multi-subject
              packages allow flexibility for comprehensive academic support.
            </p>
          </details>

          {/* Additional typical FAQs */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              What is the ZPD approach?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              ZPD (Zone of Proximal Development) is a scientifically proven
              method where learning occurs in the optimal challenge zone - not
              too easy, not too hard. Our tutors assess and adapt to keep
              students in this sweet spot for maximum growth.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              How are tutors selected and trained?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              All tutors are certified educators with subject expertise and
              undergo rigorous ZPD-specific training. We carefully match tutors
              based on teaching style, subject knowledge, and your child's
              learning preferences.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              What ages and year levels do you support?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              We support students from primary school through HSC and university
              preparation. Our approach adapts to different developmental stages
              while maintaining the core ZPD methodology.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              How do you measure progress?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Progress is tracked through regular assessments, parent feedback,
              and our proprietary ZPD metrics. You'll receive detailed progress
              reports and can access real-time updates through our parent
              portal.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              Do you offer online or in-person tutoring?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              We offer both online and in-person options in the Sydney area.
              Online sessions use interactive whiteboards and screen sharing for
              an engaging experience comparable to in-person learning.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              What if my child has learning difficulties?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Our ZPD approach is particularly effective for students with
              learning difficulties. We conduct comprehensive assessments and
              work with specialists to create tailored strategies that build
              confidence and skills progressively.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              How quickly can we start?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Most families can start within 1-2 weeks. We begin with a
              diagnostic assessment, then match you with the perfect tutor and
              create a customized learning plan.
            </p>
          </details>

          <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
              What makes ZPD different from other tutoring?
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Unlike traditional tutoring that focuses on content delivery, ZPD
              uses scientific learning theory to optimize challenge levels. This
              results in faster progress, better retention, and increased
              confidence.
            </p>
          </details>
        </section>
      </div>
    </div>
  </div>
);

export default FAQPage;
