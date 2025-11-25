const TrinitySynergySection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="trinity-synergy"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Trinity Synergy
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          At the heart of effective learning lies the powerful synergy between
          parents, teachers, and students. This trinity partnership creates a
          supportive ecosystem where each role is equally vital in nurturing
          academic growth and personal development. Parents provide the
          foundation of values and encouragement, teachers offer expert guidance
          and knowledge, and students bring their unique perspectives and
          potential to the learning journey. Our Zone of Proximal Development
          (ZPD) method and expert tutors facilitate this partnership by bridging
          knowledge gaps and fostering collaborative learning environments that
          empower all participants.
        </p>
      </div>
    </div>
  </div>
);

export default TrinitySynergySection;
