const PersonalisedPlansSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="personalised-plans"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
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
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Personalised Learning Plans
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          No two students are alike, which is why we create individualised
          learning plans that adapt to each student&apos;s unique needs, goals,
          and learning style. Our comprehensive assessment process ensures that
          every plan is tailored for maximum effectiveness and engagement.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Assessment Process:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm list-disc ml-4">
              <li>Initial diagnostic evaluation</li>
              <li>Learning style analysis</li>
              <li>Goal setting session</li>
              <li>Baseline performance metrics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Plan Components:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm list-disc ml-4">
              <li>Weekly learning objectives</li>
              <li>Customised curriculum pacing</li>
              <li>Preferred teaching methodologies</li>
              <li>Progress milestones</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Adaptation:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm list-disc ml-4">
              <li>Regular plan reviews</li>
              <li>Adjustments based on progress</li>
              <li>Incorporation of student feedback</li>
              <li>Flexible scheduling options</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonalisedPlansSection;
