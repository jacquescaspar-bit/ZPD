const AssessmentSection = ({ showNumber = true }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="assessment"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div>
      <div className="flex items-start mb-8">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
        <div className="ml-8 sm:ml-6 flex items-start">
          {showNumber && (
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
              1.
            </h3>
          )}
          <h3
            className={`text-3xl font-semibold text-gray-900 dark:text-white ${showNumber ? "ml-3" : ""}`}
          >
            Intake & Matching
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        We begin with a thorough evaluation of your child&apos;s current
        academic standing, learning style, strengths, and areas for improvement.
        Our certified tutors conduct diagnostic assessments and review previous
        academic records to understand their unique learning profile and
        identify the optimal Zone of Proximal Development (ZPD) for targeted
        growth.
      </p>
    </div>
  </div>
);

export default AssessmentSection;
