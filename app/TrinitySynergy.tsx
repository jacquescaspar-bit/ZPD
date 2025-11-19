const TrinitySynergy = () => (
  <section className="py-20 bg-white dark:bg-gray-800">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-6 text-gray-900 dark:text-white">
          Trinity Synergy
        </h2>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover how ZPD Learning fosters a powerful three-way partnership
          between parents, tutors, and children, creating a unified learning
          environment that accelerates growth and builds lasting confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
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
            Parents
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Active partners who provide emotional support, reinforce learning at
            home, and communicate goals to create a nurturing foundation for
            success.
          </p>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Tutors
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Expert educators who apply ZPD principles to guide students through
            challenging yet achievable tasks, adapting instruction for optimal
            growth.
          </p>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Children
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Empowered learners who actively participate, build confidence
            through guided challenges, and develop independent thinking skills
            in a supportive environment.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Together, this trinity creates a synergistic learning ecosystem where
          ZPD principles ensure that every child receives the perfect balance of
          challenge and support, leading to accelerated academic achievement and
          lifelong learning habits.
        </p>
      </div>
    </div>
  </section>
);

export default TrinitySynergy;
