const ZPDApproachSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="zpd-approach"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          ZPD Approach
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Our foundation is built on Lev Vygotsky&apos;s Zone of Proximal
          Development theory, which identifies the optimal learning zone where
          students can achieve more with guidance than they could independently.
          We don&apos;t just teach content—we strategically scaffold learning
          experiences that push students beyond their comfort zone while
          ensuring success.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              What it means:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Tasks that are challenging but achievable with support</li>
              <li>Gradual reduction of guidance as competence grows</li>
              <li>Focus on potential rather than current ability</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Benefits:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Accelerated learning without frustration</li>
              <li>Building confidence through achievable challenges</li>
              <li>Developing independent problem-solving skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ZPDApproachSection;
