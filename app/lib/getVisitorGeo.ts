import { headers } from "next/headers";
import { geoFromHeaders, type VisitorGeo } from "@/lib/geo";
import { enrichVisitorGeo } from "@/lib/resolveSuburb";

export const getVisitorGeo = async (): Promise<VisitorGeo> => {
  const headerStore = await headers();
  const geo = geoFromHeaders((name) => headerStore.get(name));
  return enrichVisitorGeo(geo);
};
