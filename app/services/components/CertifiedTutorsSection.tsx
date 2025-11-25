const CertifiedTutorsSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="certified-tutors"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
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
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Certified, Experienced, Local Tutors
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Our tutors aren&apos;t just subject matter experts - they&apos;re
          actively engaged in local schools, bringing fresh insights from the
          classroom to every session. This ensures they understand the current
          curriculum and teaching methods your child encounters daily. Every
          tutor is rigorously vetted, participates in ongoing professional
          development, has at least 2 years of tutoring experience, and holds a
          current Working with Children Check.
        </p>
      </div>
    </div>
  </div>
);

export default CertifiedTutorsSection;
