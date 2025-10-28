const Tutors = () => (
  <section
    className="min-h-[calc(var(--vh,1vh)*100-4rem)] flex flex-col justify-center bg-gray-50 dark:bg-gray-900 px-6"
    id="tutors"
  >
    <div className="max-w-6xl text-center mx-auto py-8">
      <h2
        className="text-4xl font-light mb-8 text-gray-900 dark:text-white"
        style={{ letterSpacing: "0.1em" }}
      >
        Our Tutors
      </h2>
      <p
        className="open-sans text-lg font-light leading-relaxed text-gray-700 dark:text-gray-300 mb-8"
        style={{ letterSpacing: "0.05em" }}
      >
        Our team of experienced educators is passionate about helping students
        reach their full potential. Each tutor is carefully selected for their
        expertise, patience, and ability to connect with learners of all ages.
      </p>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
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
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Certified Experts
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            All our tutors hold relevant certifications and have extensive
            experience in their subject areas, ensuring high-quality
            instruction.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Personalised Approach
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            We match tutors with students based on learning styles, goals, and
            personalities to create the most effective learning environment.
          </p>
        </div>
      </div>
      <a
        className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
        href="/tutors"
      >
        Learn More
      </a>
    </div>
  </section>
);

export default Tutors;
