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
          Tailored Tuition for Every Age and Subject
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          From mastering &apos;Friends of Ten&apos; in kindergarten to acing
          final exams in secondary school, we&apos;ve got you covered. Our
          diverse network of tutors spans every subject, level and learning
          style, ensuring we expertly match your child with a tutor perfectly
          suited to their unique needs.
        </p>
      </div>
    </div>
  </div>
);

export default TutorMatchingSection;
