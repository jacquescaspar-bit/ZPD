export interface ServiceAreaCopy {
  headline: string;
  detail: string;
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
  detail: "Online & in-home tutoring for families in your area",
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

export const getStateEducationCopy = (stateCode: string): StateEducationCopy =>
  STATE_EDUCATION_LINGO[stateCode.toUpperCase()] ?? {
    seniorCertificate: "senior secondary",
    curriculumShort: "local curriculum",
    curriculumPhrase:
      "local curriculum, NAPLAN, and senior secondary expectations",
  };

const AREAS_FAQ_ANSWER =
  "Everywhere there are schools and casual teachers looking to make a difference.";

export const getGeoTutoringCopy = (citySlug: string): GeoTutoringCopy => {
  const displayCity = slugToDisplayCity(citySlug);
  const stateCode = CITY_STATE[citySlug] ?? "NSW";
  const education = getStateEducationCopy(stateCode);
  const heroSublineSuffix = `Online or in-home across greater ${displayCity}`;

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
