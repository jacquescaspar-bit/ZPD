const TeacherInsightSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="teacher-insight"
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
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
            3.
          </h3>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white ml-3">
            Teacher Insight
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Our experienced educators analyze the assessment data to gain deep
        insights into your child&apos;s learning patterns, cognitive strengths,
        and potential challenges. Drawing from years of expertise in ZPD
        methodology, teachers identify the optimal learning strategies and
        intervention points that will accelerate progress. This expert analysis
        ensures that every aspect of the tutoring approach is precisely
        calibrated to your child&apos;s unique needs and developmental stage.
      </p>
    </div>
  </div>
);

export default TeacherInsightSection;
