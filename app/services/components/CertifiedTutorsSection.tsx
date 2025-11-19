const CertifiedTutorsSection = () => (
  <div
    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    id="certified-tutors"
    style={{ scrollMarginTop: "5rem" }}
  >
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
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
      <div className="flex-1">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Certified & Experienced Tutors
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Our tutors are more than just subject matter experts—they are
          certified educators with specialised training in ZPD-based tutoring.
          Each tutor undergoes rigorous screening and continuous professional
          development to ensure they can provide the highest quality educational
          experience.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Qualifications:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>Teaching certification or equivalent</li>
              <li>Subject matter expertise</li>
              <li>Minimum 2 years tutoring experience</li>
              <li>Background check clearance</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
              Training:
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc ml-4">
              <li>ZPD methodology certification</li>
              <li>Differentiated instruction techniques</li>
              <li>Progress monitoring systems</li>
              <li>Parent communication skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CertifiedTutorsSection;
