export interface VisitorGeo {
  city: string | null;
  region: string | null;
  country: string | null;
  suburb: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface ServiceAreaCopy {
  headline: string;
  detail: string;
}

export interface GeoFooterLink {
  href: string;
  label: string;
}

export interface StateEducationCopy {
  seniorCertificate: string;
  curriculumShort: string;
  curriculumPhrase: string;
}

export interface GeoTutoringCopy {
  displayCity: string;
  heroTitle: string;
  heroSublineSuffix: string;
  tutorsNearSchoolsTitle: string;
  tutorsNearSchoolsBody: string;
  centreFaqQuestion: string;
  areasFaqAnswer: string;
  seoKeywords: string;
}

export const FALLBACK_SERVICE_AREA: ServiceAreaCopy = {
  headline: "Decentralised service across Australia",
  detail: "Available to families nationwide",
};

const LOCAL_DETAIL = "Online & in-home tutoring for families in your area";

const AU_STATE_NAMES: Record<string, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  WA: "Western Australia",
  SA: "South Australia",
  TAS: "Tasmania",
  ACT: "Australian Capital Territory",
  NT: "Northern Territory",
};

/** Capital and major metro areas where "greater {city}" copy applies. */
export const GREATER_CITIES = new Set([
  "adelaide",
  "ballarat",
  "bendigo",
  "brisbane",
  "cairns",
  "canberra",
  "central coast",
  "darwin",
  "geelong",
  "gold coast",
  "hobart",
  "launceston",
  "mackay",
  "melbourne",
  "newcastle",
  "perth",
  "rockhampton",
  "sunshine coast",
  "sydney",
  "toowoomba",
  "townsville",
  "wollongong",
]);

const formatStateName = (region: string): string =>
  AU_STATE_NAMES[region.toUpperCase()] ?? region;

const decodeHeader = (value: string | null): string | null => {
  if (!value) return null;
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
};

const parseCoordinate = (value: string | null): number | null => {
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const geoFromHeaders = (
  headerLookup: (name: string) => string | null,
): VisitorGeo => ({
  city: decodeHeader(
    headerLookup("x-vercel-ip-city") ?? headerLookup("cf-ipcity"),
  ),
  region: decodeHeader(
    headerLookup("x-vercel-ip-country-region") ?? headerLookup("cf-region"),
  ),
  country: decodeHeader(
    headerLookup("x-vercel-ip-country") ?? headerLookup("cf-ipcountry"),
  ),
  suburb: null,
  latitude: parseCoordinate(headerLookup("x-vercel-ip-latitude")),
  longitude: parseCoordinate(headerLookup("x-vercel-ip-longitude")),
});

export const formatServiceArea = (geo: VisitorGeo): ServiceAreaCopy => {
  const { suburb, city, region, country } = geo;

  if (country !== "AU") {
    return FALLBACK_SERVICE_AREA;
  }

  if (suburb) {
    return {
      headline: `Servicing ${suburb} and surrounds`,
      detail: LOCAL_DETAIL,
    };
  }

  if (city && isGreaterCity(city)) {
    return {
      headline: `Servicing all areas in greater ${city}`,
      detail: LOCAL_DETAIL,
    };
  }

  if (region) {
    return {
      headline: `Servicing all local areas in ${formatStateName(region)}`,
      detail: LOCAL_DETAIL,
    };
  }

  return FALLBACK_SERVICE_AREA;
};

export const STATE_EDUCATION_LINGO: Record<string, StateEducationCopy> = {
  NSW: {
    seniorCertificate: "HSC",
    curriculumShort: "NSW syllabus",
    curriculumPhrase: "NSW syllabus, NAPLAN, and HSC expectations",
  },
  VIC: {
    seniorCertificate: "VCE",
    curriculumShort: "Victorian Curriculum",
    curriculumPhrase: "Victorian Curriculum, NAPLAN, and VCE expectations",
  },
  QLD: {
    seniorCertificate: "QCE",
    curriculumShort: "Queensland curriculum",
    curriculumPhrase: "Queensland curriculum, NAPLAN, and QCE expectations",
  },
  SA: {
    seniorCertificate: "SACE",
    curriculumShort: "SACE",
    curriculumPhrase: "SACE, NAPLAN, and Stage 2 expectations",
  },
  WA: {
    seniorCertificate: "WACE",
    curriculumShort: "WA curriculum",
    curriculumPhrase: "WA curriculum, NAPLAN, and WACE expectations",
  },
  TAS: {
    seniorCertificate: "TCE",
    curriculumShort: "Tasmanian curriculum",
    curriculumPhrase: "Tasmanian curriculum, NAPLAN, and TCE expectations",
  },
  ACT: {
    seniorCertificate: "ACT SSC",
    curriculumShort: "ACT curriculum",
    curriculumPhrase: "ACT curriculum, NAPLAN, and Year 11–12 expectations",
  },
  NT: {
    seniorCertificate: "NTCE",
    curriculumShort: "NT curriculum",
    curriculumPhrase: "NT curriculum, NAPLAN, and NTCE expectations",
  },
};

/** Maps GREATER_CITIES slug → AU state/territory code for education copy. */
export const CITY_STATE: Record<string, string> = {
  adelaide: "SA",
  ballarat: "VIC",
  bendigo: "VIC",
  brisbane: "QLD",
  cairns: "QLD",
  canberra: "ACT",
  "central-coast": "NSW",
  darwin: "NT",
  geelong: "VIC",
  "gold-coast": "QLD",
  hobart: "TAS",
  launceston: "TAS",
  mackay: "QLD",
  melbourne: "VIC",
  newcastle: "NSW",
  perth: "WA",
  rockhampton: "QLD",
  "sunshine-coast": "QLD",
  sydney: "NSW",
  toowoomba: "QLD",
  townsville: "QLD",
  wollongong: "NSW",
};

const titleCase = (value: string): string =>
  value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const cityToSlug = (city: string): string =>
  city.trim().toLowerCase().replace(/\s+/g, "-");

export const slugToDisplayCity = (slug: string): string =>
  titleCase(slug.replace(/-/g, " "));

export const getGreaterCitySlugs = (): string[] =>
  [...GREATER_CITIES].map((city) => cityToSlug(city)).sort();

export const isKnownGeoCitySlug = (slug: string): boolean => slug in CITY_STATE;

export const isGreaterCity = (city: string): boolean =>
  GREATER_CITIES.has(city.trim().toLowerCase());

export const getStateEducationCopy = (stateCode: string): StateEducationCopy =>
  STATE_EDUCATION_LINGO[stateCode.toUpperCase()] ?? {
    seniorCertificate: "senior secondary",
    curriculumShort: "local curriculum",
    curriculumPhrase:
      "local curriculum, NAPLAN, and senior secondary expectations",
  };

const formatDisplayCity = (city: string | null): string | null => {
  if (!city) return null;
  const trimmed = city.trim();
  return trimmed ? titleCase(trimmed) : null;
};

export const getGeoFooterLink = (geo: VisitorGeo): GeoFooterLink => {
  const rawCity = geo.city?.trim();
  const displayCity = formatDisplayCity(rawCity ?? null);

  if (
    geo.country === "AU" &&
    rawCity &&
    displayCity &&
    isGreaterCity(rawCity)
  ) {
    return {
      href: `/tutoring/${cityToSlug(rawCity)}`,
      label: `${displayCity} tutoring`,
    };
  }

  return {
    href: "/enrol",
    label: "Tutors nearby",
  };
};

const AREAS_FAQ_ANSWER =
  "Everywhere there are schools and casual teachers looking to make a difference.";

export const getGeoTutoringCopy = (
  citySlug: string,
  geo?: VisitorGeo,
): GeoTutoringCopy => {
  const displayCity = slugToDisplayCity(citySlug);
  const stateCode = CITY_STATE[citySlug] ?? geo?.region?.toUpperCase() ?? "NSW";
  const education = getStateEducationCopy(stateCode);
  const suburb =
    geo?.suburb && geo.country === "AU" ? formatDisplayCity(geo.suburb) : null;
  const geoCitySlug = geo?.city ? cityToSlug(geo.city) : null;
  const heroSublineSuffix =
    suburb && geoCitySlug === citySlug
      ? `Servicing ${suburb} and surrounds · Online or in-home across greater ${displayCity}`
      : `Online or in-home across greater ${displayCity}`;

  return {
    displayCity,
    heroTitle: `Tutoring in ${displayCity}`,
    heroSublineSuffix,
    tutorsNearSchoolsTitle: `Tutors near ${displayCity} schools`,
    tutorsNearSchoolsBody: `Classroom-active casual and part-time teachers who understand ${education.curriculumPhrase} — online or in-home across greater ${displayCity}.`,
    centreFaqQuestion: `Do you have a tutoring centre in ${displayCity}?`,
    areasFaqAnswer: AREAS_FAQ_ANSWER,
    seoKeywords: `${displayCity} tutoring, ${education.seniorCertificate} tutor ${displayCity}, NAPLAN tutoring ${displayCity}, in-home tutoring ${displayCity}, online tutoring ${displayCity}`,
  };
};
