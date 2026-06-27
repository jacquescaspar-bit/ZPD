import { type NextRequest, NextResponse } from "next/server";
import { formatServiceArea, geoFromHeaders, getGeoFooterLink } from "@/lib/geo";
import { enrichVisitorGeo } from "@/lib/resolveSuburb";

export async function GET(request: NextRequest) {
  const geo = geoFromHeaders((name) => request.headers.get(name));
  const enrichedGeo = await enrichVisitorGeo(geo);
  const serviceArea = formatServiceArea(enrichedGeo);

  return NextResponse.json({
    geo: enrichedGeo,
    serviceArea,
    footerLink: getGeoFooterLink(enrichedGeo),
  });
}
