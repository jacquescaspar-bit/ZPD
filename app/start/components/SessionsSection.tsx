const SessionsSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="sessions"
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
            5.
          </h3>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white ml-3">
            Sessions Commence
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Each tutoring session is dynamically structured to operate within your
        child&apos;s ZPD. Our certified tutors employ scaffolding techniques,
        providing just the right amount of support to help students master
        challenging concepts. Sessions combine direct instruction, guided
        practice, and independent problem-solving, gradually reducing support as
        competence grows. We incorporate engaging activities, real-world
        applications, and technology tools to maintain motivation and enhance
        understanding.
      </p>
    </div>
  </div>
);

export default SessionsSection;
