import { FALLBACK_SERVICE_AREA } from "@/lib/geo";

interface ServiceAreaTextProps {
  className?: string;
  headlineClassName?: string;
  detailClassName?: string;
}

const ServiceAreaText = ({
  className = "",
  headlineClassName = "",
  detailClassName = "text-sm opacity-80",
}: ServiceAreaTextProps) => (
  <div className={className}>
    <p className={headlineClassName}>{FALLBACK_SERVICE_AREA.headline}</p>
    <p className={detailClassName}>{FALLBACK_SERVICE_AREA.detail}</p>
  </div>
);

export default ServiceAreaText;
