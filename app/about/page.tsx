const AboutPage = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          About ZPD Learning
        </h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            What is the Zone of Proximal Development?
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            The Zone of Proximal Development (ZPD) is a groundbreaking concept
            introduced by the renowned psychologist Lev Vygotsky in the 1930s.
            It represents the difference between what a learner can accomplish
            independently and what they can achieve with the guidance of a more
            knowledgeable other. This &quot;zone&quot; is where optimal learning
            occurs – not too easy, not too hard, but just right for growth.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            At ZPD Learning, we apply this principle to create personalized
            tutoring experiences that push students beyond their comfort zones
            while providing the necessary support to ensure success. Our expert
            tutors act as guides, helping students master challenging concepts
            and build the confidence needed for academic excellence.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Our Educational Philosophy
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            We believe that every student has unique potential waiting to be
            unlocked. Traditional one-size-fits-all approaches often leave
            gifted students unchallenged and struggling students overwhelmed.
            ZPD Learning bridges this gap by offering individualized attention
            that adapts to each student&apos;s learning style, pace, and goals.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Our tutors are trained to identify each student&apos;s current
            abilities and design learning experiences that gently extend their
            capabilities. This approach not only improves academic performance
            but also fosters a genuine love for learning and builds lifelong
            skills like critical thinking, problem-solving, and self-confidence.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            The Science Behind Our Method
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Research in cognitive psychology and neuroscience supports the
            effectiveness of ZPD-based learning. Studies show that students who
            receive instruction within their proximal zone demonstrate:
          </p>
          <ul className="list-disc list-inside text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li>Faster skill acquisition and knowledge retention</li>
            <li>Increased motivation and engagement</li>
            <li>Improved problem-solving abilities</li>
            <li>Greater confidence in tackling new challenges</li>
            <li>
              Enhanced metacognitive skills (understanding how they learn)
            </li>
          </ul>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            By focusing on this optimal learning zone, we help students achieve
            more in less time while enjoying the process.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Our Commitment to Excellence
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            ZPD Learning is more than just tutoring – it&apos;s a partnership in
            education. We work closely with parents, teachers, and students to
            create comprehensive learning plans that align with school curricula
            while addressing individual needs and interests.
          </p>
          <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
            Our mission is to democratize access to high-quality education by
            making personalized tutoring available to all students, regardless
            of their background or location. We believe that with the right
            support, every child can reach their full potential and develop a
            passion for lifelong learning.
          </p>
        </section>

        <div className="text-center">
          <a
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            href="/"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
