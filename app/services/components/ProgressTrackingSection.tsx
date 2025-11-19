const ProgressTrackingSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="progress-tracking"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Comprehensive Progress Tracking
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          We believe that meaningful progress tracking goes beyond grades. Our
          multi-dimensional approach captures academic growth, skill
          development, and confidence building, providing clear insights for
          students, parents, and tutors to celebrate achievements and identify
          areas for continued focus.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Tracking Methods:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Weekly skill assessments</li>
              <li>Concept mastery evaluations</li>
              <li>Confidence and engagement surveys</li>
              <li>Portfolio of work samples</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Reporting Features:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Detailed progress reports every 4 weeks</li>
              <li>Real-time dashboard access for parents</li>
              <li>Achievement certificates and badges</li>
              <li>Personalised improvement recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProgressTrackingSection;
