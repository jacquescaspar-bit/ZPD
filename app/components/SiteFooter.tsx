import FooterInstallApp from "@/components/FooterInstallApp";
import GeoFooterLink from "@/components/GeoFooterLink";
import ServiceAreaText from "@/components/ServiceAreaText";
import {
  LEGAL_ABN,
  LEGAL_ENTITY_NAME,
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/lib/constants";

const SiteFooter = () => (
  <footer className="bg-gray-900 dark:bg-black text-white py-12">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">{SITE_NAME}</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>{LEGAL_ENTITY_NAME}</li>
            <li>ABN {LEGAL_ABN}</li>
            <li>
              Personalised tutoring in the
              <br />
              Zone of Proximal Development
            </li>
          </ul>
          <FooterInstallApp />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/enrol"
              >
                Enrol
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/about"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/tutors"
              >
                Tutors
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/tutors#join"
              >
                Teach with us
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/guides/parents-guide-to-zpd"
              >
                Parent&apos;s guide to ZPD
              </a>
            </li>
            <li>
              <GeoFooterLink />
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/blog"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <a className="hover:text-white transition-colors" href="/legal">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
          </a>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/legal#privacy"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/legal#terms"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/legal#refund"
              >
                Refund Policy
              </a>
            </li>
            <li>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="/legal#child"
              >
                Child Protection
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <div className="text-sm text-gray-400 space-y-3">
            <ServiceAreaText
              detailClassName="text-gray-500 text-sm"
              headlineClassName="text-gray-300"
            />
            <p>
              <a
                className="hover:text-white transition-colors"
                href={`tel:${SUPPORT_PHONE}`}
              >
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a
                className="hover:text-white transition-colors"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} {LEGAL_ENTITY_NAME}. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
