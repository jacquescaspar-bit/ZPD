const Stats = () => (
  <section
    className="min-h-screen flex flex-col justify-center bg-white dark:bg-gray-900 px-6 z-10"
    id="stats"
  >
    <div className="max-w-6xl text-center mx-auto py-16">
      <h2
        className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
        style={{ letterSpacing: "0.1em" }}
      >
        Our Impact
      </h2>
      <div className="grid md:grid-cols-4 gap-8">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="text-5xl font-bold text-blue-500 mb-4">500+</div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Students Helped
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Across all grade levels and subjects
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="text-5xl font-bold text-purple-500 mb-4">97%</div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Student Satisfaction
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Students reporting positive tutoring experiences
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="text-5xl font-bold text-green-500 mb-4">50+</div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Certified Tutors
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Experienced educators on our team
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="text-5xl font-bold text-pink-500 mb-4">4.9</div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Average Rating
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Out of 5 stars from parents and students
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Stats;
