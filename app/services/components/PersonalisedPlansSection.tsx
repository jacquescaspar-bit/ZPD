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
          learning plans featuring weekly learning objectives, customised
          curriculum pacing, preferred teaching methodologies, and progress
          milestones that adapt to each student&apos;s unique needs, goals, and
          learning style. Our comprehensive assessment process ensures that
          every plan is tailored for maximum effectiveness and engagement, with
          regular plan reviews to maintain optimal progress.
        </p>
      </div>
    </div>
  </div>
);

export default PersonalisedPlansSection;
