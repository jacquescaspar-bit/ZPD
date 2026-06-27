import { getGeoFooterLink } from "@/lib/geo";
import { getVisitorGeo } from "@/lib/getVisitorGeo";

const GeoFooterLink = async () => {
  const footerLink = getGeoFooterLink(await getVisitorGeo());

  return (
    <a
      className="text-gray-400 hover:text-white transition-colors"
      href={footerLink.href}
    >
      {footerLink.label}
    </a>
  );
};

export default GeoFooterLink;
