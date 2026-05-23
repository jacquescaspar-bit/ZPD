"use client";

import React, { useEffect } from "react";
import Nav from "@/Nav";

const LegalPage = () => {
  const sections = [
    { id: "privacy", title: "Privacy Policy" },
    { id: "terms", title: "Terms of Service" },
    { id: "refund", title: "Refund Policy" },
    { id: "child", title: "Child Protection" },
  ];

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Nav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
          Legal
        </h1>

        <nav className="mb-12 flex flex-wrap gap-6 text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              className="text-blue-600 hover:underline"
              href={`#${s.id}`}
            >
              {s.title}
            </a>
          ))}
        </nav>

        <section className="mb-16 scroll-mt-8" id="privacy">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Privacy Policy
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            ZPD Learning Pty Ltd collects personal information including student
            details, parent/guardian contact, academic records, and assessment
            data to deliver personalised tutoring services to children aged
            5-18.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            We comply with the Australian Privacy Principles (APPs) under the
            Privacy Act 1988 (Cth). Data is stored securely in Australia, used
            only for service delivery, and never sold. Parents may access,
            correct, or request deletion of data by contacting
            grow@zpdlearning.com.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Third-party processors (e.g., Stripe for payments, Supabase for
            database) are bound by confidentiality agreements. We retain records
            for 7 years as required by law.
          </p>
        </section>

        <section className="mb-16 scroll-mt-8" id="terms">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Terms of Service
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            These terms govern enrolment in ZPD Learning's tutoring programs.
            Services are provided subject to availability and assessment
            suitability. Parents/guardians warrant they have authority to enrol
            the child and consent to all program activities.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Fees are payable as per the selected plan. ZPD Learning reserves the
            right to adjust schedules or tutors with reasonable notice.
            Liability is limited to the extent permitted by Australian Consumer
            Law (ACL). We do not guarantee specific academic outcomes.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Disputes are governed by the laws of New South Wales, Australia. By
            enrolling, you accept these terms and our policies.
          </p>
        </section>

        <section className="mb-16 scroll-mt-8" id="refund">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Refund Policy
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            In accordance with the Australian Consumer Law (ACCC), consumers
            have rights to refunds for services not provided with due care and
            skill or not fit for purpose.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Unused prepaid sessions may be refunded on a pro-rata basis within
            14 days of written request, minus any non-refundable deposits or
            administrative fees. No refunds for sessions already delivered or
            missed without 24 hours notice.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Refunds for major failures or ACL breaches will be processed
            promptly. Contact support for claims. We aim to resolve issues
            fairly and transparently.
          </p>
        </section>

        <section className="mb-16 scroll-mt-8" id="child">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Child Protection
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            ZPD Learning is committed to child safety. All tutors undergo
            Working With Children Checks (WWCC).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            As a tutoring service for children, we have mandatory reporting
            obligations under state/territory laws (e.g., Children and Young
            Persons (Care and Protection) Act 1998 (NSW)). Staff must report
            reasonable suspicions of significant harm to the relevant child
            protection authority (e.g., DCJ or equivalent).
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Parents/guardians provide consent for sessions. We do not provide
            one-on-one unsupervised online sessions without safeguards. Any
            concerns should be reported immediately to grow@zpdlearning.com or
            authorities.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
