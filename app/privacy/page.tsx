import type { Metadata } from "next";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import LegalContactInfo from "@/components/LegalContactInfo";
import { LEGAL_TRADING_AS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | ZPD Learning",
  description:
    "Learn how ZPD Learning collects, uses, and protects your personal information in accordance with Australian privacy laws.",
  keywords:
    "privacy policy, data protection, Australian privacy law, ZPD Learning privacy",
  openGraph: {
    title: "Privacy Policy - ZPD Learning",
    description:
      "Our commitment to protecting your privacy and personal information.",
    type: "website",
  },
};

const PrivacyPage = () => (
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
            Privacy Policy
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            How we collect, use, and protect your personal information
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Last updated: 19 June 2026
          </p>
        </section>

        {/* Content Section */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
            <p className="text-base">
              This Privacy Policy describes how {LEGAL_TRADING_AS}{" "}
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
              uses, and protects your personal information in accordance with
              the Privacy Act 1988 (Cth) and other applicable Australian privacy
              laws.
            </p>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-base font-medium mt-6 mb-2">
              Personal Information
            </h3>
            <p>
              We collect personal information you provide directly to us,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Name, email address, phone number, and address for enrolment and
                communication
              </li>
              <li>Student information for tutoring session planning</li>
              <li>Payment information processed securely through Stripe</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Educational Data
            </h3>
            <p>To provide effective tutoring services, we collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Session notes and progress tracking for educational purposes
              </li>
              <li>Assessment results and learning goals</li>
              <li>
                Communication records between tutors, students, and parents
              </li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Technical Information
            </h3>
            <p>
              We automatically collect certain information when you use our
              website:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Website usage data through Google Analytics 4</li>
              <li>IP address, browser type, and device information</li>
              <li>Email communications and preferences</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p>We use your information for the following purposes:</p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Service Delivery
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide tutoring services and process payments</li>
              <li>To match students with appropriate tutors</li>
              <li>To schedule and conduct tutoring sessions</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">Communication</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                To communicate about sessions, progress, and account updates
              </li>
              <li>To send important notifications and reminders</li>
              <li>To respond to your inquiries and support requests</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Improvement and Compliance
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>To improve our services through analytics and feedback</li>
              <li>
                To comply with legal obligations and child protection
                requirements
              </li>
              <li>To maintain accurate records for quality assurance</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">Data Retention</h2>
            <p>We retain your information for the following periods:</p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Retention Periods
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Personal information:</strong> 7 years after last
                interaction
              </li>
              <li>
                <strong>Payment data:</strong> 7 years for tax compliance
                purposes
              </li>
              <li>
                <strong>Session data and communications:</strong> 2 years for
                quality assurance
              </li>
              <li>
                <strong>Analytics data:</strong> Anonymized after 26 months
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Third-Party Services
            </h2>
            <p>
              We use the following third-party services to operate our business:
            </p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Payment Processing
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Stripe:</strong> For secure payment processing (PCI DSS
                compliant)
              </li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Analytics and Communication
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Google Analytics 4:</strong> For website analytics (with
                IP anonymization enabled)
              </li>
              <li>
                <strong>SendGrid:</strong> For email communications and
                newsletters
              </li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">
              Authentication and Infrastructure
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Clerk:</strong> For user authentication and account
                management
              </li>
              <li>
                <strong>Pusher:</strong> For real-time notifications
              </li>
              <li>
                <strong>PostgreSQL:</strong> For secure data storage
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">Your Rights</h2>
            <p>Under Australian privacy law, you have the following rights:</p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Access and Control
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <h3 className="text-base font-medium mt-6 mb-2">Complaints</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Lodge a complaint with the Office of the Australian Information
                Commissioner
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Access controls and user authentication</li>
              <li>Regular security audits and updates</li>
              <li>Secure data storage practices</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              International Data Transfers
            </h2>
            <p>
              Some of our third-party service providers may transfer data
              outside Australia. We ensure these transfers comply with
              Australian privacy laws through appropriate safeguards, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Standard contractual clauses</li>
              <li>Adequacy decisions where applicable</li>
              <li>Binding corporate rules</li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Children's Privacy
            </h2>
            <p>
              We are committed to protecting children's privacy. Our practices
              include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Collecting only information necessary for tutoring services
              </li>
              <li>
                Complying with all child protection laws and mandatory reporting
                requirements
              </li>
              <li>Obtaining parental consent for data collection</li>
              <li>
                Limiting access to children's data to authorised personnel only
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-8 mb-4">
              Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar technologies for website functionality
              and analytics. You can control cookie preferences through your
              browser settings.
            </p>

            <h3 className="text-base font-medium mt-6 mb-2">
              Types of Cookies We Use
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Essential cookies:</strong> Required for website
                functionality
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how you
                use our site
              </li>
              <li>
                <strong>Preference cookies:</strong> Remember your settings and
                preferences
              </li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you
              of significant changes via email or website notice.
            </p>

            <h2>Contact Us</h2>
            <p className="mb-4">
              For privacy-related inquiries or to exercise your rights:
            </p>
            <LegalContactInfo role="Privacy Officer" />
          </div>
        </section>
      </div>
    </div>
  </PageShell>
);

export default PrivacyPage;
