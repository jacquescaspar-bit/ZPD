import type { Metadata } from "next";
import Nav from "@/Nav";

export const metadata: Metadata = {
  title: "Refund Policy | ZPD Tutoring Services",
  description:
    "Learn about our refund policy for tutoring services, including eligibility criteria and processing times.",
  keywords: "refund policy, tutoring refunds, cancellation policy, ZPD refund",
  openGraph: {
    title: "Refund Policy - ZPD Tutoring Services",
    description:
      "Our refund policy and cancellation terms for tutoring services.",
    type: "website",
  },
};

const RefundPolicyPage = () => (
  <div className="relative">
    <Nav />
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <div className="min-h-screen px-6 pt-16 pb-12 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center pb-12">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            Refund Policy
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Our commitment to fair and transparent refund processes
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Last updated: {/* PLACEHOLDER: Last Updated Date */} [Current Date]
          </p>
        </section>

        {/* Content Section */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
            <p className="text-base">
              At {/* PLACEHOLDER: Business Name */} ZPD Tutoring Services, we
              strive to provide high-quality tutoring services. This refund
              policy outlines the circumstances under which refunds may be
              granted and our process for handling refund requests.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">Full Refunds</h2>
            <p>
              You are eligible for a full refund in the following circumstances:
            </p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Within Cooling-Off Period
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Within 7 days of purchase:</strong> If no tutoring
                sessions have commenced
              </li>
              <li>
                <strong>Cancellation before service:</strong> If you cancel
                before any tutoring has occurred
              </li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Service Unavailability
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Our inability to deliver:</strong> If we are unable to
                provide the agreed tutoring service due to unforeseen
                circumstances
              </li>
              <li>
                <strong>Technical issues:</strong> If we cannot resolve critical
                technical problems preventing service delivery
              </li>
              <li>
                <strong>Tutor unavailability:</strong> If we cannot provide a
                suitable replacement tutor
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Partial Refunds (50%)
            </h2>
            <p>You may be eligible for a 50% refund in these situations:</p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Late Cancellations
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>After cooling-off period:</strong> Cancellations made
                after 7 days but before the first session
              </li>
              <li>
                <strong>Tutor changes:</strong> When we need to change your
                assigned tutor and you choose to cancel
              </li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Special Circumstances
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Medical circumstances:</strong> With appropriate
                documentation showing inability to continue
              </li>
              <li>
                <strong>Significant life changes:</strong> Major changes in
                circumstances that prevent continuation
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">No Refunds</h2>
            <p>Refunds are not available in the following cases:</p>

            <h3 className="text-base font-medium mt-6 mb-2">
              After Service Commencement
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>After the first tutoring session has been completed</li>
              <li>For dissatisfaction with tutoring outcomes or progress</li>
              <li>
                For changes in personal circumstances after services have begun
              </li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Attendance and Notice
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>For no-shows or late cancellations without proper notice</li>
              <li>
                When sessions are missed due to student absence without
                rescheduling
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Australian Consumer Law Rights
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                <strong>Important Consumer Protection:</strong> Your rights
                under Australian Consumer Law cannot be excluded or restricted.
                If you believe you have a claim under consumer law for a major
                failure in our services, please contact us to discuss your
                options. Consumer law may provide additional rights beyond this
                policy.
              </p>
            </div>

            <h2 className="text-lg font-semibold mt-8 mb-4">Processing Time</h2>
            <p>
              All approved refunds will be processed within 10-14 business days
              of approval. Refunds will be issued to the original payment method
              with the following typical processing times:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Credit/debit cards:</strong> 3-5 business days to appear
                on your statement
              </li>
              <li>
                <strong>Bank transfers:</strong> 1-2 business days for funds to
                clear
              </li>
              <li>
                <strong>Digital wallets:</strong> Instant to 24 hours depending
                on provider
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              How to Request a Refund
            </h2>
            <p>To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Contact us promptly:</strong> Within the eligible
                timeframe for your refund type
              </li>
              <li>
                <strong>Provide details:</strong> Include your enrolment
                reference number and account information
              </li>
              <li>
                <strong>Explain your situation:</strong> Clearly describe the
                reason for your refund request
              </li>
              <li>
                <strong>Submit documentation:</strong> Provide any required
                supporting documentation (medical certificates, etc.)
              </li>
            </ol>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Refund Review Process
            </h2>
            <p>All refund requests are handled carefully to ensure fairness:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Initial review:</strong> Within 5 business days of
                receiving your request
              </li>
              <li>
                <strong>Additional information:</strong> We may request
                documentation to support your claim
              </li>
              <li>
                <strong>Decision notification:</strong> You will be notified of
                the outcome via email
              </li>
              <li>
                <strong>Processing:</strong> Approved refunds are processed
                within the stated timeframe
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Disputes and Appeals
            </h2>
            <p>If you disagree with our refund decision:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Internal appeal:</strong> Contact us to discuss your
                concerns and provide additional information
              </li>
              <li>
                <strong>External resolution:</strong> Seek resolution through
                relevant consumer protection agencies
              </li>
              <li>
                <strong>Legal rights:</strong> Your Australian Consumer Law
                rights remain unaffected
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Contact Information
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mt-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Refund Requests
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">
                  {/* PLACEHOLDER: Business Name */} ZPD Tutoring Services Pty
                  Ltd
                </p>
                <p>
                  {/* PLACEHOLDER: Business Address */} 123 Education Street,
                  Sydney NSW 2000, Australia
                </p>
                <p>{/* PLACEHOLDER: Business Phone */} +61 400 123 456</p>
                <p>
                  <strong>Email:</strong> {/* PLACEHOLDER: Refund Email */}{" "}
                  refunds@zpdtutoring.com
                </p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-8 mb-4">Policy Updates</h2>
            <p>
              This refund policy may be updated periodically to reflect changes
              in our services or legal requirements. We will:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Notify you of significant changes via email or website notice
              </li>
              <li>
                Ensure existing enrolments are not adversely affected by policy
                changes
              </li>
              <li>Post updates on our website with the effective date</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default RefundPolicyPage;
