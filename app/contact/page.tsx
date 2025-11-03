const ContactPage = () => (
  <div className="relative">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen bg-white dark:bg-gray-800 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white text-center"
          style={{ letterSpacing: "0.1em" }}
        >
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-left">
            <h2
              className="text-3xl font-normal mb-6 text-gray-900 dark:text-white"
              style={{ letterSpacing: "0.08em" }}
            >
              Get in Touch
            </h2>
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
              Ready to start your child&apos;s learning journey? Reach out to us
              for more information or to schedule a consultation.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="text-3xl mr-6">📧</span>
                <span className="text-xl text-gray-600 dark:text-gray-300">
                  info@zpdlearning.com
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-3xl mr-6">📞</span>
                <span className="text-xl text-gray-600 dark:text-gray-300">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-3xl mr-6">📍</span>
                <span className="text-xl text-gray-600 dark:text-gray-300">
                  123 Learning Street, Education City
                </span>
              </div>
            </div>
          </div>
          <div className="text-left">
            <form className="space-y-6">
              <div>
                <label
                  className="block text-lg font-light text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="name"
                  placeholder="Your full name"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-light text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  placeholder="your.email@example.com"
                  type="email"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-light text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  id="message"
                  placeholder="Tell us about your child's learning needs..."
                  rows={4}
                />
              </div>
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16">
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

export default ContactPage;
