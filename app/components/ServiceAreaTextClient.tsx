"use client";

import { useEffect, useState } from "react";
import { FALLBACK_SERVICE_AREA, type ServiceAreaCopy } from "@/lib/geo";

interface GeoResponse {
  serviceArea: ServiceAreaCopy;
}

interface ServiceAreaTextClientProps {
  className?: string;
  headlineClassName?: string;
  detailClassName?: string;
}

const fallback = FALLBACK_SERVICE_AREA;

const ServiceAreaTextClient = ({
  className = "",
  headlineClassName = "",
  detailClassName = "text-sm text-gray-500 dark:text-gray-400",
}: ServiceAreaTextClientProps) => {
  const [serviceArea, setServiceArea] = useState<ServiceAreaCopy>(fallback);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/geo");
        if (!response.ok) return;
        const data = (await response.json()) as GeoResponse;
        if (!cancelled && data.serviceArea) {
          setServiceArea(data.serviceArea);
        }
      } catch {
        // Keep fallback copy
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={className}>
      <p className={headlineClassName}>{serviceArea.headline}</p>
      <p className={detailClassName}>{serviceArea.detail}</p>
    </div>
  );
};

export default ServiceAreaTextClient;
