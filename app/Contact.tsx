const Contact = () => (
  <section
    className="min-h-[calc(var(--vh,1vh)*100-4rem)] flex flex-col justify-center bg-white dark:bg-gray-900 px-6 z-10"
    id="contact"
  >
    <div className="max-w-4xl w-full mx-auto py-8">
      <h2
        className="text-4xl font-light mb-8 text-center text-gray-900 dark:text-white"
        style={{ letterSpacing: "0.1em" }}
      >
        Contact Us
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-left">
          <h3
            className="text-2xl font-normal mb-4 text-gray-900 dark:text-white"
            style={{ letterSpacing: "0.08em" }}
          >
            Get in Touch
          </h3>
          <p
            className="open-sans text-base font-light text-gray-700 dark:text-gray-300 mb-6"
            style={{ letterSpacing: "0.05em" }}
          >
            Ready to start your child&apos;s learning journey? Reach out to us
            for more information or to schedule a consultation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl mr-4">📧</span>
              <span className="open-sans text-lg font-light text-gray-700 dark:text-gray-300">
                info@zpdlearning.com
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-4">📞</span>
              <span className="open-sans text-lg font-light text-gray-700 dark:text-gray-300">
                (555) 123-4567
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-4">📍</span>
              <span className="open-sans text-lg font-light text-gray-700 dark:text-gray-300">
                123 Learning Street, Education City
              </span>
            </div>
          </div>
        </div>
        <div className="text-left">
          <form className="space-y-4">
            <div>
              <label
                className="open-sans block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="open-sans w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                placeholder="Your full name"
                type="text"
              />
            </div>
            <div>
              <label
                className="open-sans block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="open-sans w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                placeholder="your.email@example.com"
                type="email"
              />
            </div>
            <div>
              <label
                className="open-sans block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="open-sans w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                id="message"
                placeholder="Tell us about your child's learning needs..."
                rows={3}
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
