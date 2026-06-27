import { unstable_cache } from "next/cache";
import type { VisitorGeo } from "@/lib/geo";

const NOMINATIM_USER_AGENT =
  "ZPDLearning/1.0 (https://zpdlearning.com; contact: grow@zpdlearning.com)";

const SUBURB_KEYS = [
  "suburb",
  "town",
  "neighbourhood",
  "city_district",
  "village",
  "hamlet",
  "locality",
] as const;

type NominatimAddress = Partial<
  Record<(typeof SUBURB_KEYS)[number] | "city", string>
>;

interface NominatimReverseResponse {
  address?: NominatimAddress;
}

const pickSuburb = (address: NominatimAddress | undefined): string | null => {
  if (!address) return null;

  for (const key of SUBURB_KEYS) {
    const value = address[key]?.trim();
    if (value) return value;
  }

  return null;
};

const fetchSuburbFromNominatim = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "json");
  url.searchParams.set("lat", latitude.toString());
  url.searchParams.set("lon", longitude.toString());
  url.searchParams.set("zoom", "18");
  url.searchParams.set("addressdetails", "1");

  const response = await fetch(url, {
    headers: {
      "User-Agent": NOMINATIM_USER_AGENT,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(4000),
    next: { revalidate: 86_400 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as NominatimReverseResponse;
  return pickSuburb(data.address);
};

const getCachedSuburb = unstable_cache(
  (latitude: number, longitude: number) =>
    fetchSuburbFromNominatim(latitude, longitude),
  ["visitor-suburb"],
  { revalidate: 86_400 },
);

export const resolveSuburb = (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  const lat = Number(latitude.toFixed(3));
  const lon = Number(longitude.toFixed(3));
  return getCachedSuburb(lat, lon);
};

export const enrichVisitorGeo = async (
  geo: VisitorGeo,
): Promise<VisitorGeo> => {
  if (geo.country !== "AU") return geo;

  if (geo.latitude === null || geo.longitude === null) return geo;

  try {
    const suburb = await resolveSuburb(geo.latitude, geo.longitude);
    if (suburb) {
      return { ...geo, suburb };
    }
  } catch {
    // Nominatim or cache failures should not break page renders.
  }

  return geo;
};
