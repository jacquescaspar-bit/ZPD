const About = () => (
  <section
    className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-800 px-6 z-10"
    id="about"
  >
    <div className="max-w-4xl text-center mx-auto py-16">
      <h2
        className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
        style={{ letterSpacing: "0.1em" }}
      >
        About ZPD Learning
      </h2>
      <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
        ZPD Learning is built on the principle of the Zone of Proximal
        Development (ZPD), a concept developed by psychologist Lev Vygotsky. We
        provide personalised tutoring that helps students learn at the edge of
        their current abilities, guided by expert tutors who understand each
        child&apos;s unique learning style.
      </p>
      <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
        Our mission is to bridge the gap between what students can do
        independently and what they can achieve with the right support,
        fostering growth, confidence, and a lifelong love of learning.
      </p>
      <a
        className="inline-block mt-8 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 text-sm"
        href="/blog"
      >
        Read Our Blog
      </a>
    </div>
  </section>
);

export default About;
