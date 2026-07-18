import type { Metadata } from "next";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import LegalContactInfo from "@/components/LegalContactInfo";
import { LEGAL_TRADING_AS, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | ZPD Learning",
  description:
    "Read our terms of service for tutoring services, including payment terms, service conditions, and user responsibilities.",
  keywords:
    "terms of service, terms and conditions, tutoring agreement, ZPD terms",
  openGraph: {
    title: "Terms of Service - ZPD Learning",
    description: "Terms and conditions for using our tutoring services.",
    type: "website",
  },
};

const TermsPage = () => (
  <PageShell>
    <Nav />
    <div className="px-6 pt-16 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center pb-12">
          <h1
            className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            Terms of Service
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Terms and conditions for using our tutoring services
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Last updated: 18 July 2026
          </p>
        </section>

        {/* Content Section */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
            <p className="text-base">
              These Terms of Service (&quot;Terms&quot;) govern your use of the
              tutoring services provided by {LEGAL_TRADING_AS} (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;). By enrolling in our services,
              you agree to be bound by these Terms.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">Services</h2>
            <p>
              We provide personalized tutoring services using the Zone of
              Proximal Development (ZPD) approach. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                One-on-one tutoring sessions tailored to individual learning
                needs
              </li>
              <li>Progress tracking and regular assessments</li>
              <li>Parental support and communication</li>
              <li>Educational planning and goal setting</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              User Eligibility
            </h2>
            <p>
              To use our services, you must meet the following requirements:
            </p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Account Requirements
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Be a parent, guardian, or authorised representative of the
                student
              </li>
              <li>
                Provide accurate and complete information during enrolment
              </li>
              <li>Maintain up-to-date contact information</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Supervision Requirements
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Ensure the student is supervised during all online sessions
              </li>
              <li>
                Be present and available for communication during tutoring
                sessions
              </li>
              <li>Take responsibility for the student's safety and conduct</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">Payment Terms</h2>

            <h3 className="text-base font-medium mt-6 mb-2">Payment Methods</h3>
            <p>
              We accept the following payment methods through our secure Stripe
              payment processor:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>American Express</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">Currency</h3>
            <p>All payments are processed in Australian Dollars (AUD).</p>

            <h3 className="text-base font-medium mt-6 mb-2">Payment Timing</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Full payment required at time of enrolment for single sessions
              </li>
              <li>
                Recurring payments for multi-session packages due as scheduled
              </li>
              <li>Late payments may result in temporary service suspension</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">Failed Payments</h3>
            <p>
              We will attempt to retry failed payments up to 3 times over a
              7-day period. If payment cannot be processed successfully,
              services may be suspended until payment is resolved.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Pricing, Offers and Discounts
            </h2>
            <p>
              Published plan prices are in Australian dollars and include GST
              unless stated otherwise. Current list prices are shown at checkout
              on the enrolment page.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Diagnostic Discovery credit:</strong> The Diagnostic
                Discovery session fee may be credited toward an Essential or
                Intensive plan within 30 days of that session, once per
                email/family, applied automatically at checkout when eligible.
              </li>
              <li>
                <strong>Online plan:</strong> Fixed term price. Referral codes,
                promotional codes, and diagnostic credits do not apply.
              </li>
              <li>
                <strong>One offer per purchase:</strong> Referral codes,
                promotional codes, and diagnostic credits cannot be combined.
                Where more than one offer is eligible, the single highest-value
                eligible offer is applied. Not valid in conjunction with any
                other offer unless we expressly say otherwise.
              </li>
              <li>
                <strong>Referrals:</strong> A valid referral code typically
                provides $50 off Essential or Intensive for the referred family.
                The referrer receives a personal $50 reward code for their next
                Essential or Intensive term (credit, not cash), subject to the
                reward&apos;s terms.
              </li>
              <li>
                We may modify or withdraw offers at any time. Offers do not
                affect your rights under Australian Consumer Law.
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Service Conditions
            </h2>

            <h3 className="text-base font-medium mt-6 mb-2">
              Scheduling and Attendance
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                All sessions must be scheduled in advance through our booking
                system
              </li>
              <li>Cancellations require a minimum of 24 hours notice</li>
              <li>
                Late cancellations or no-shows may forfeit the session fee
              </li>
              <li>Make-up sessions are offered at our discretion</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">Tutor Changes</h3>
            <p>
              We reserve the right to change assigned tutors if necessary for
              service quality or availability reasons. We will:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide reasonable notice of any changes</li>
              <li>Ensure replacement tutors meet our quality standards</li>
              <li>Offer consultation sessions to ensure compatibility</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Technical Requirements
            </h3>
            <p>For online tutoring sessions, you must ensure:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>A stable internet connection with sufficient bandwidth</li>
              <li>A computer or device with working camera and microphone</li>
              <li>Updated web browser and necessary software</li>
              <li>A quiet, private space for effective learning</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Refunds and Consumer Rights
            </h2>
            <p>
              Refunds are processed in accordance with our Refund Policy. Please
              note that your rights under Australian Consumer Law cannot be
              excluded or restricted, including rights to refunds for major
              failures in service delivery.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Liability and Responsibility
            </h2>

            <h3 className="text-base font-medium mt-6 mb-2">Tutor Status</h3>
            <p>
              All tutors engaged by {SITE_NAME} are independent contractors, not
              employees. While we take reasonable steps to ensure service
              quality, we accept no liability for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Tutor actions or conduct outside of scheduled sessions</li>
              <li>Indirect or consequential losses</li>
              <li>Loss of educational progress or outcomes</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Parental Responsibility
            </h3>
            <p>Parents and guardians are responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Supervising their child during all tutoring sessions</li>
              <li>Ensuring a safe and appropriate learning environment</li>
              <li>
                Communicating any concerns about tutor conduct immediately
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Child Protection and Safety
            </h2>
            <p>
              Child safety is our highest priority. All tutors hold current
              Working With Children Check clearances and we comply with all
              mandatory reporting requirements under Australian child protection
              legislation.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Privacy Protection
            </h2>
            <p>
              Your personal information is collected, used, and protected in
              accordance with our Privacy Policy and the Australian Privacy
              Principles under the Privacy Act 1988 (Cth).
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Intellectual Property
            </h2>
            <p>
              All educational materials, content, and resources provided as part
              of our tutoring services are protected by copyright and
              intellectual property laws. These materials are provided for your
              personal, non-commercial use only.
            </p>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Reproduce, distribute, or share materials without permission
              </li>
              <li>Create derivative works or adaptations</li>
              <li>Use materials for commercial purposes</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Termination of Services
            </h2>

            <h3 className="text-base font-medium mt-6 mb-2">
              Termination by You
            </h3>
            <p>
              You may terminate services at any time by providing written
              notice. Refunds will be processed according to our Refund Policy.
            </p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Termination by Us
            </h3>
            <p>We reserve the right to terminate services immediately if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You breach these Terms of Service</li>
              <li>Payment is not received as required</li>
              <li>We determine the service is no longer suitable</li>
              <li>Safety or child protection concerns arise</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">Governing Law</h2>
            <p>
              These Terms are governed by the laws of New South Wales,
              Australia. Any disputes will be resolved through the appropriate
              Australian courts or dispute resolution processes.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Changes to Terms
            </h2>
            <p>
              We may update these Terms periodically to reflect changes in our
              services, technology, or legal requirements. We will notify you of
              material changes via email or website notice. Continued use of our
              services constitutes acceptance of updated Terms.
            </p>

            <h2>Contact Information</h2>
            <div className="mt-4">
              <LegalContactInfo />
            </div>
          </div>
        </section>
      </div>
    </div>
  </PageShell>
);

export default TermsPage;
