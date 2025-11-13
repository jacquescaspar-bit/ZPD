const Parents = () => (
  <section
    className="min-h-[calc(var(--vh,1vh)*100-4rem)] flex flex-col justify-center bg-white dark:bg-gray-900 px-6 z-10"
    id="parents"
  >
    <div className="max-w-6xl text-center mx-auto py-16">
      <h2
        className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
        style={{ letterSpacing: "0.1em" }}
      >
        For Parents
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Personalised Learning
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Every child learns differently. Our tutors tailor sessions to your
            child&apos;s unique needs and pace.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Progress Tracking
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Regular updates and reports help you stay informed about your
            child&apos;s development and achievements.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Expert Guidance
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Our certified tutors use proven educational methods to build
            confidence and foster a love of learning.
          </p>
        </div>
      </div>
      <a
        className="inline-block mt-12 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300"
        href="/parents"
      >
        Learn More
      </a>
    </div>
  </section>
);

export default Parents;
