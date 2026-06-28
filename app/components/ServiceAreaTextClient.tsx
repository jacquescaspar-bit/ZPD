import { FALLBACK_SERVICE_AREA } from "@/lib/geo";

interface ServiceAreaTextClientProps {
  className?: string;
  headlineClassName?: string;
  detailClassName?: string;
}

const ServiceAreaTextClient = ({
  className = "",
  headlineClassName = "",
  detailClassName = "text-sm text-gray-500 dark:text-gray-400",
}: ServiceAreaTextClientProps) => (
  <div className={className}>
    <p className={headlineClassName}>{FALLBACK_SERVICE_AREA.headline}</p>
    <p className={detailClassName}>{FALLBACK_SERVICE_AREA.detail}</p>
  </div>
);

export default ServiceAreaTextClient;
