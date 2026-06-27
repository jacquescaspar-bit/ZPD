import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CITY_STATE,
  getGeoTutoringCopy,
  getGreaterCitySlugs,
  getStateEducationCopy,
  isKnownGeoCitySlug,
  slugToDisplayCity,
} from "@/lib/geo";
import GeoTutoringContent from "@/tutoring/[city]/GeoTutoringContent";

interface CityTutoringPageProps {
  params: Promise<{ city: string }>;
}

export const generateStaticParams = () =>
  getGreaterCitySlugs().map((city) => ({ city }));

export const generateMetadata = async ({
  params,
}: CityTutoringPageProps): Promise<Metadata> => {
  const { city } = await params;

  if (!isKnownGeoCitySlug(city)) {
    return {};
  }

  const displayCity = slugToDisplayCity(city);
  const education = getStateEducationCopy(CITY_STATE[city]);
  const copy = getGeoTutoringCopy(city);

  return {
    title: `${displayCity} Tutoring — ${education.seniorCertificate} & NAPLAN | ZPD Learning`,
    description: `Term-based tutoring in ${displayCity} with classroom-active teachers. Diagnostic discovery from $110, online or in-home across greater ${displayCity}. ${education.curriculumPhrase}.`,
    keywords: copy.seoKeywords,
    openGraph: {
      title: `${displayCity} Tutoring — ZPD Learning`,
      description: `Classroom-active tutors, term-based plans, diagnostic-first. Greater ${displayCity} online and in-home.`,
      type: "website",
    },
  };
};

const CityTutoringPage = async ({ params }: CityTutoringPageProps) => {
  const { city } = await params;

  if (!isKnownGeoCitySlug(city)) {
    notFound();
  }

  return <GeoTutoringContent citySlug={city} />;
};

export default CityTutoringPage;
