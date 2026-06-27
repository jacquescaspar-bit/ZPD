import { getServiceArea } from "@/lib/getServiceArea";

interface ServiceAreaTextProps {
  className?: string;
  headlineClassName?: string;
  detailClassName?: string;
}

const ServiceAreaText = async ({
  className = "",
  headlineClassName = "",
  detailClassName = "text-sm opacity-80",
}: ServiceAreaTextProps) => {
  const serviceArea = await getServiceArea();

  return (
    <div className={className}>
      <p className={headlineClassName}>{serviceArea.headline}</p>
      <p className={detailClassName}>{serviceArea.detail}</p>
    </div>
  );
};

export default ServiceAreaText;
