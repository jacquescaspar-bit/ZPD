"use client";

import { useState } from "react";
import Nav from "@/Nav";
import { Container } from "@/components/ui";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submission
    console.warn("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="relative">
      <Nav />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
      <div className="min-h-screen px-6 pt-16 pb-12 z-10">
        <Container size="md">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-4 text-gray-900 dark:text-white text-center"
            style={{ letterSpacing: "0.02em" }}
          >
            Contact Us
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            We'd love to hear from you
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">
                  Send a Message
                </h2>
                {submitted ? (
                  <div className="p-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                    Thank you! We'll get back to you soon.
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4">
                        Name
                      </label>
                      <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4">
                        Email
                      </label>
                      <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4">
                        Message
                      </label>
                      <textarea
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="pt-2">
                <h2 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">
                  Get in Touch
                </h2>
                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      className="hover:underline"
                      href="mailto:grow@zpdlearning.com"
                    >
                      grow@zpdlearning.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p>
                      ZPD Learning Pty Ltd
                      <br />
                      123 Learning Lane
                      <br />
                      Sydney NSW 2000
                      <br />
                      Australia
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p>+61 2 1234 5678 (placeholder)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              href="/"
            >
              ← Back to Home
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ContactPage;
