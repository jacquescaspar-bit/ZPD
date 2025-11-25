import Link from "next/link";

const Features = () => (
  <section
    className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-800 px-6 z-10"
    id="features"
  >
    <div className="max-w-6xl text-center mx-auto py-16">
      <h2
        className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
        style={{ letterSpacing: "0.1em" }}
      >
        The ZPD Difference
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <Link href="/services#certified-tutors">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Certified, Experienced, Local Tutors
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Our tutors are subject matter experts actively engaged in local
              schools, providing fresh insights into current curricula and
              teaching methods.
            </p>
          </div>
        </Link>
        <Link href="/services#personalised-plans">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Personalised Learning Plans
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Individualized learning plans featuring weekly objectives,
              customized curriculum pacing, preferred teaching methodologies,
              and adaptive progress milestones.
            </p>
          </div>
        </Link>
        <Link href="/services#supporting-parents">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Parent Coaching and Support Sessions
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Empowers parents to engage in their child&apos;s learning by
              translating complex content and cognitive sequences into
              accessible terms.
            </p>
          </div>
        </Link>
        <Link href="/services#trinity-synergy">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Trinity Synergy
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Effective learning thrives on synergy between parents, teachers,
              and students. The ZPD method and expert tutors bridge knowledge
              gaps.
            </p>
          </div>
        </Link>
        <Link href="/services#tutor-matching">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Tailored Tutoring for Every Age and Subject
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Comprehensive coverage from kindergarten basics to secondary exam
              preparation. A diverse tutor network spans all subjects and
              learning styles.
            </p>
          </div>
        </Link>
        <Link href="/services#zpd-approach">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              ZPD Approach
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Rooted in Lev Vygotsky&apos;s Zone of Proximal Development theory,
              targeting optimal learning zones where students&apos; achieve more
              with guidance.
            </p>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default Features;
