const SupportingParentsSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="supporting-parents"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Comprehensive Parent Support
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          We believe that successful tutoring extends beyond session time.
          Parents are essential partners in their child&apos;s educational
          journey, which is why we provide extensive resources, communication
          channels, and guidance to help parents support learning at home
          effectively.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Communication:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm list-disc ml-4">
              <li>Weekly progress emails</li>
              <li>Session summary reports</li>
              <li>Direct tutor-parent messaging</li>
              <li>Parent-teacher conferences</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Resources:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm list-disc ml-4">
              <li>Home practice guides</li>
              <li>Learning strategy workshops</li>
              <li>Educational resource library</li>
              <li>Parent support webinars</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Tools:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm list-disc ml-4">
              <li>Parent dashboard access</li>
              <li>Goal tracking tools</li>
              <li>Practice assignment calendar</li>
              <li>Achievement sharing platform</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SupportingParentsSection;
