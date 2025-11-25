const ProgressSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="progress"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          6. Continuous Feedback
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          We maintain detailed progress records and regularly assess your
          child&apos;s development against learning objectives. Our tutors
          provide comprehensive feedback after each session, and we conduct
          periodic evaluations to adjust the learning plan as needed. Parents
          receive regular progress reports and insights into their child&apos;s
          growth, ensuring transparency and allowing for collaborative
          decision-making. This ongoing monitoring ensures that learning remains
          challenging yet achievable, maximizing growth within the ZPD.
        </p>
      </div>
    </div>
  </div>
);

export default ProgressSection;
