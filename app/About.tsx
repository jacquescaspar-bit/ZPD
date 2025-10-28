const About = () => (
  <section
    className="min-h-[calc(var(--vh,1vh)*100-4rem)] flex flex-col justify-center bg-gray-50 dark:bg-gray-900 px-6"
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
        className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
        href="/about"
      >
        Learn More
      </a>
    </div>
  </section>
);

export default About;
