import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ZPD Tutoring Pricing | Term-Based Plans for Sydney HSC & ATAR Success",
  description:
    "Lock in your tutor for the term and save with ZPD's Australian pricing. GST included, upfront payment for 10-week terms. Sydney HSC tutoring, ATAR tutor Sydney.",
  keywords:
    "Sydney HSC tutoring, ATAR tutor Sydney, term-based tutoring pricing, ZPD tutoring Australia, GST included tutoring",
  openGraph: {
    title: "ZPD Tutoring Pricing | Term-Based Plans",
    description:
      "Term-based pricing with GST included. Best rates for commitment. Sydney HSC & ATAR tutoring.",
    type: "website",
  },
};

// eslint-disable-next-line max-lines-per-function
const PricingPage = () => (
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
            Lock in Your Tutor for the Term & Save
          </h1>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Term-based pricing • GST incl. • Best rates for commitment
          </p>
        </section>

        {/* Paid Trial Card */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-8 text-center shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Diagnostic + Trial Session
              </h2>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                $129
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                One-time • 90 min assessment + custom ZPD plan + full credit
                applied if enrolling in a term package within 7 days
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                Book Trial Session
              </button>
            </div>
          </div>
        </section>

        {/* Term Packages */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Choose Your Term Package
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Essential */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Essential
                </h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  $790
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  10 sessions/term upfront (~$79/hr)
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      1 subject
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Standard tutor
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Online only
                    </span>
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                  Select Essential
                </button>
              </div>

              {/* Core - Most Popular */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-green-500 dark:border-green-400 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Core ★
                </h3>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  $1,340
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  20 sessions/term upfront (~$67/hr)
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Multi-subject
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      ATAR/HSC specialist tutor
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Fortnightly reports
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Priority scheduling
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Free trial credit included
                    </span>
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                  Select Core
                </button>
              </div>

              {/* Advanced */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Advanced
                </h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  $1,890
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  30 sessions/term upfront (~$63/hr)
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Unlimited within term
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Dedicated 99+ ATAR tutor
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Weekly parent calls
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      In-person metro option
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Exam resources pack
                    </span>
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                  Select Advanced
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-4 text-left text-gray-900 dark:text-white">
                      Feature
                    </th>
                    <th className="p-4 text-center text-gray-900 dark:text-white">
                      Essential
                    </th>
                    <th className="p-4 text-center text-gray-900 dark:text-white">
                      Core
                    </th>
                    <th className="p-4 text-center text-gray-900 dark:text-white">
                      Advanced
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-4 text-gray-900 dark:text-white">
                      Sessions per term
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      10
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      20
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      30
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <td className="p-4 text-gray-900 dark:text-white">
                      Subjects
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      1 subject
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      Multi-subject
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      Unlimited
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600">
                    <td className="p-4 text-gray-900 dark:text-white">
                      Effective $/hr
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      $79
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      $67
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      $63
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <td className="p-4 text-gray-900 dark:text-white">
                      Support
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      Email
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      Priority
                    </td>
                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      Weekly calls
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Families & Tutors Stay */}
        <section className="py-16 bg-blue-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Families & Tutors Stay
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
                      Loyalty discounts for long-term commitment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Parent portal for progress tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Mediated communication with tutors
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      14-day happiness guarantee
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
                      Guaranteed students through term commitments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Performance bonuses and incentives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Exclusive ZPD tools and resources
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Non-circumvention protection
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What Parents Say
            </h2>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  &quot;Our daughter&apos;s ATAR improved by 15 points with ZPD
                  tutoring. The term commitment gave us peace of mind and the
                  best value.&quot;
                </blockquote>
                <cite className="text-gray-600 dark:text-gray-400">
                  - Sarah M., North Sydney
                </cite>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                <button className="w-3 h-3 bg-green-500 rounded-full" />
                <button className="w-3 h-3 bg-gray-300 rounded-full" />
                <button className="w-3 h-3 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  Why term commitment?
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Term-based pricing ensures consistent tutoring and allows us
                  to provide the best rates for committed families.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  Can tutors contact us directly?
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  No, all communication goes through our platform to maintain
                  quality and prevent direct arrangements.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  What if we go on holidays?
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Sessions can be rescheduled within the term. We work around
                  your schedule.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  Is GST included in the prices?
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Yes, all prices are in AUD and include GST. No hidden fees.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  Can I change tutors mid-term?
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Yes, if needed. We match based on your child&apos;s needs and
                  ensure continuity.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  What subjects are covered?
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  All HSC subjects plus primary and secondary levels.
                  Multi-subject packages allow flexibility.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default PricingPage;
