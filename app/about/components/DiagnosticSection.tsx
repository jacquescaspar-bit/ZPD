const DiagnosticSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="diagnostic"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div>
      <div className="flex items-start mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
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
        <div className="ml-4 md:ml-6 flex items-start">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            2.
          </h3>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white ml-2 md:ml-3">
            Diagnostic Discovery
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        Insights in hand, your tutor will schedule the Diagnostic Discovery
        session, aimed at understanding and defining your child&apos;s Zone of
        Proximal Development. Your tutor will evaluate your child&apos;s
        ability; identify their strengths, challenges and opportunities for
        optimal learning. This initial session establishes rapport and frames
        parents&apos; and teacher&apos;s goals from the students perspective,
        creating ownership of stated goals. This sets clear direction and
        motivation forward.
      </p>
    </div>
  </div>
);

export default DiagnosticSection;
