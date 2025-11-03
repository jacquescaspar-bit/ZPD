const ParentsPage = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-white dark:bg-gray-800 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          For Parents
        </h1>

        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                Every child learns differently. Our tutors tailor sessions to
                your child&apos;s unique needs and pace.
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
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Personalised Learning in Detail
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            At ZPD Learning, we recognize that no two students are alike. Our
            personalized learning approach begins with a comprehensive
            assessment of your child&apos;s current knowledge, learning style,
            strengths, and areas for improvement. This allows us to create a
            customized curriculum that matches their individual needs and
            interests.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Whether your child is a visual learner who benefits from diagrams
            and charts, an auditory learner who responds well to explanations
            and discussions, or a kinesthetic learner who needs hands-on
            activities, our tutors adapt their teaching methods accordingly. We
            also consider factors like attention span, motivation levels, and
            preferred pace of learning.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            This tailored approach ensures that your child receives the right
            level of challenge – not too easy to be boring, not too difficult to
            be frustrating – maximizing engagement and learning outcomes.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Comprehensive Progress Tracking
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            We believe that informed parents are empowered parents. That&apos;s
            why we provide detailed progress reports after each session,
            including what was covered, your child&apos;s performance, and
            specific areas of strength and improvement. These reports help you
            understand your child&apos;s learning journey and celebrate their
            achievements.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            In addition to session-by-session updates, we conduct regular
            assessments to measure overall progress. These evaluations help us
            adjust our teaching strategies and ensure that your child is
            consistently moving forward. You&apos;ll receive quarterly summary
            reports that highlight key milestones, skill development, and
            recommendations for continued growth.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Our transparent communication keeps you involved in your
            child&apos;s education, allowing you to provide additional support
            at home and collaborate with teachers for a cohesive learning
            experience.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Expert Guidance You Can Trust
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Our tutors are not just subject matter experts – they are
            educational specialists trained in child development and effective
            teaching methodologies. Each tutor undergoes rigorous screening and
            continuous professional development to stay current with the latest
            educational research and best practices.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Beyond academic knowledge, our tutors excel at building
            relationships with students, creating safe environments where
            children feel comfortable asking questions and taking risks. They
            use proven techniques like scaffolding (providing temporary support
            that is gradually removed) and positive reinforcement to build
            confidence and foster a genuine love for learning.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            With our expert guidance, your child will develop not just
            subject-specific skills, but also critical thinking,
            problem-solving, and study habits that will serve them throughout
            their academic career and beyond.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Partnering with Parents for Success
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            We view parents as essential partners in the learning process.
            Regular parent-tutor conferences allow us to align our efforts with
            your goals and expectations. We also provide resources and tips for
            supporting learning at home, ensuring that the benefits of tutoring
            extend beyond our sessions.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Whether your child needs help catching up, enrichment opportunities,
            test preparation, or support for learning differences, we&apos;re
            here to help. Contact us today to discuss how ZPD Learning can
            support your child&apos;s educational journey.
          </p>
        </section>

        <div className="text-center">
          <a
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300"
            href="/"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ParentsPage;
