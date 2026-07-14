const AssessmentSection = ({ showNumber = true }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="assessment"
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
          {showNumber && (
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              1.
            </h3>
          )}
          <h3
            className={`text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white ${showNumber ? "ml-2 md:ml-3" : ""}`}
          >
            Intake & Matching
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        We begin by collecting targeted insights from you about your goals and
        hopes for your child, along with observations of their abilities and
        challenges. We also seek input from their teacher to gain a fuller
        picture. These questions help us understand what matters most and match
        your child with the right tutor from the start.
      </p>
    </div>
  </div>
);

export default AssessmentSection;
