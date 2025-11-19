const TutorMatchingSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="tutor-matching"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
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
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Intelligent Tutor Matching
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Finding the right tutor-student match is crucial for success. Our
          sophisticated matching algorithm considers multiple factors to pair
          students with tutors who can best support their learning needs,
          personality, and goals. We don&apos;t just assign tutors randomly—we
          create optimal learning partnerships.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Matching Criteria:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Learning style compatibility</li>
              <li>Subject expertise alignment</li>
              <li>Personality and communication style</li>
              <li>Grade level and curriculum familiarity</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Process:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Detailed student profile assessment</li>
              <li>Tutor availability and preferences</li>
              <li>Trial session evaluation</li>
              <li>Ongoing compatibility monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TutorMatchingSection;
