"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import ServiceAreaTextClient from "@/components/ServiceAreaTextClient";
import {
  LEGAL_ABN,
  LEGAL_ENTITY_NAME,
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/lib/constants";

const TUTOR_MESSAGE_PLACEHOLDER =
  "Subjects and year levels you teach, suburbs/regions you can reach (in-home or online), ABN status, and a sentence on why ZPD fits how you teach.";

const ContactContent = () => {
  const searchParams = useSearchParams();
  const isTutor = searchParams.get("role") === "tutor";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isTutor) {
      setFormData((prev) => ({ ...prev, role: "tutor" }));
    }
  }, [isTutor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        company: "",
        role: isTutor ? "tutor" : "",
      });
    } catch {
      setError(
        "Something went wrong. Please try again or email grow@zpdlearning.com.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <Nav />
      <div className="px-6 pt-16 pb-12">
        <Container size="md">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-4 text-gray-900 dark:text-white text-center"
            style={{ letterSpacing: "0.02em" }}
          >
            {isTutor ? "Tutor interest" : "Contact Us"}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            {isTutor
              ? "Tell us about your subjects, regions, and experience — we'll arrange a short call."
              : "We'd love to hear from you"}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">
                  Send a Message
                </h2>
                {submitted ? (
                  <div className="p-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                    <p className="font-medium mb-2">
                      Thank you! Your message has been sent.
                    </p>
                    <p className="text-sm">
                      We&apos;ll reply within 2–3 business days. A confirmation
                      has been sent to your email.
                    </p>
                    <button
                      className="mt-4 text-sm underline hover:no-underline"
                      type="button"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={(event) => {
                      void handleSubmit(event);
                    }}
                  >
                    <input
                      aria-hidden="true"
                      autoComplete="off"
                      className="hidden"
                      name="company"
                      tabIndex={-1}
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <div>
                      <label className="block text-base font-light text-gray-700 dark:text-gray-300 mb-2 pl-4">
                        Name
                      </label>
                      <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                        maxLength={100}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        maxLength={5000}
                        minLength={10}
                        name="message"
                        placeholder={
                          isTutor ? TUTOR_MESSAGE_PLACEHOLDER : undefined
                        }
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    {error ? (
                      <p
                        className="text-sm text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {error}
                      </p>
                    ) : null}
                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-2">
                <h2 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">
                  Get in Touch
                </h2>
                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  {isTutor ? (
                    <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-sm leading-relaxed">
                      <p className="font-medium text-indigo-900 dark:text-indigo-200 mb-2">
                        What happens next
                      </p>
                      <p className="text-indigo-800 dark:text-indigo-300">
                        Short call, no pressure. We&apos;ll walk through how
                        planning, matching, and contractor terms work.
                      </p>
                    </div>
                  ) : null}
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      className="hover:underline"
                      href={`tel:${SUPPORT_PHONE}`}
                    >
                      {SUPPORT_PHONE_DISPLAY}
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      className="hover:underline"
                      href={`mailto:${SUPPORT_EMAIL}`}
                    >
                      {SUPPORT_EMAIL}
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business</h3>
                    <p>
                      {SITE_NAME}
                      <br />
                      {LEGAL_ENTITY_NAME}
                      <br />
                      ABN {LEGAL_ABN}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Service area</h3>
                    <ServiceAreaTextClient />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default ContactContent;
