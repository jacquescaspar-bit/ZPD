const TutorsPage = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          Our Tutors
        </h1>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
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
              <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                Certified Experts
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                All our tutors hold relevant certifications and have extensive
                experience in their subject areas, ensuring high-quality
                instruction.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
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
              <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                Personalised Approach
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We match tutors with students based on learning styles, goals,
                and personalities to create the most effective learning
                environment.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Our Certified Experts
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            At ZPD Learning, we believe that exceptional education requires
            exceptional educators. Our tutors are not just knowledgeable in
            their subjects – they are certified professionals with proven track
            records of helping students succeed. Each tutor undergoes a rigorous
            selection process that includes:
          </p>
          <ul className="list-disc list-inside text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li>
              <strong>Academic Excellence:</strong> Advanced degrees in their
              subject areas from accredited institutions
            </li>
            <li>
              <strong>Teaching Certifications:</strong> Specialized training in
              pedagogy, child development, and educational methodologies
            </li>
            <li>
              <strong>Subject Mastery:</strong> Deep expertise demonstrated
              through comprehensive assessments and practical evaluations
            </li>
            <li>
              <strong>Background Checks:</strong> Thorough verification to
              ensure safety and professionalism
            </li>
            <li>
              <strong>Teaching Experience:</strong> Minimum of 3 years of
              successful tutoring or classroom teaching experience
            </li>
          </ul>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Beyond credentials, we look for passion, patience, and the ability
            to connect with students of all ages and backgrounds. Our tutors
            stay current with the latest educational research and continuously
            refine their skills through ongoing professional development
            programs.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Rigorous Selection and Training
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Becoming a ZPD Learning tutor is no easy feat. Candidates must pass
            multiple rounds of interviews, demonstrate their teaching abilities
            through mock sessions, and complete our comprehensive training
            program. This program covers:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                ZPD Methodology
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Mastering the Zone of Proximal Development framework and its
                practical applications
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Assessment Techniques
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Evaluating student needs and tracking progress effectively
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Differentiated Instruction
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Adapting teaching methods to individual learning styles
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Communication Skills
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Building rapport with students and collaborating with parents
              </p>
            </div>
          </div>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Only those who demonstrate exceptional skill and dedication join our
            team, ensuring that every student receives instruction from a
            qualified expert.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Personalised Tutor Matching
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            We understand that the tutor-student relationship is crucial for
            learning success. That&apos;s why we take great care in matching
            tutors with students. Our matching process considers multiple
            factors to ensure optimal compatibility:
          </p>
          <ul className="list-disc list-inside text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li>
              <strong>Learning Style Compatibility:</strong> Visual, auditory,
              kinesthetic, or reading/writing preferences
            </li>
            <li>
              <strong>Personality Match:</strong> Ensuring the tutor and student
              can build a positive working relationship
            </li>
            <li>
              <strong>Academic Goals:</strong> Aligning tutor expertise with
              specific subject needs and objectives
            </li>
            <li>
              <strong>Age and Experience Level:</strong> Matching tutor
              experience with student grade level and maturity
            </li>
            <li>
              <strong>Schedule Availability:</strong> Finding tutors whose
              availability matches the student&apos;s needs
            </li>
          </ul>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            If a match doesn&apos;t work out initially, we provide complimentary
            re-matching to ensure every student finds their ideal tutor. Our
            goal is to create learning partnerships that inspire confidence and
            foster genuine academic growth.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Continuous Support and Development
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Our commitment to excellence doesn&apos;t end with hiring. We
            provide ongoing support to our tutors through:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Regular Training
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Monthly workshops on new teaching techniques and educational
                research
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Peer Collaboration
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Opportunities to share best practices and learn from colleagues
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Feedback Systems
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Regular performance reviews and constructive feedback for
                improvement
              </p>
            </div>
          </div>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            This comprehensive support system ensures that our tutors remain at
            the forefront of educational excellence, providing your child with
            the highest quality instruction available.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Why Our Tutors Make the Difference
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            What sets ZPD Learning tutors apart is their dedication to student
            success. They don&apos;t just teach subjects – they inspire
            curiosity, build confidence, and develop lifelong learning skills.
            Our tutors understand that education is about more than grades;
            it&apos;s about empowering students to reach their full potential
            and discover their passion for knowledge.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            With our expert tutors, your child will receive personalized
            attention in a supportive environment that celebrates progress and
            encourages growth. Contact us today to experience the difference
            that certified, caring educators can make in your child&apos;s
            educational journey.
          </p>
        </section>

        <div className="text-center">
          <a
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
            href="/"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default TutorsPage;
