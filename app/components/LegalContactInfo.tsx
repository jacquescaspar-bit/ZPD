import ServiceAreaText from "@/components/ServiceAreaText";
import {
  LEGAL_ABN,
  LEGAL_ENTITY_NAME,
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/lib/constants";

interface LegalContactInfoProps {
  role?: string;
}

const LegalContactInfo = ({ role }: LegalContactInfoProps) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
    {role ? (
      <p>
        <strong>{role}</strong>
      </p>
    ) : null}
    <p>{SITE_NAME}</p>
    <p>{LEGAL_ENTITY_NAME}</p>
    <p>ABN {LEGAL_ABN}</p>
    <ServiceAreaText detailClassName="text-sm text-gray-600 dark:text-gray-300" />
    <p>
      <a className="hover:underline" href={`tel:${SUPPORT_PHONE}`}>
        {SUPPORT_PHONE_DISPLAY}
      </a>
    </p>
    <p>
      <a className="hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
        {SUPPORT_EMAIL}
      </a>
    </p>
  </div>
);

export default LegalContactInfo;
