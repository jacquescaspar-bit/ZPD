import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/constants";

export const getDefaultSiteOrigin = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? SITE_URL;

/** Origin for resume links in emails and cron (production by default). */
export const buildInsightsResumeUrl = (
  sessionId: string,
  origin: string = getDefaultSiteOrigin(),
): string =>
  `${origin}/enrol/insights?session=${encodeURIComponent(sessionId)}`;

/** Prefer the browser/API request origin so local dev emails link to localhost. */
export const getRequestSiteOrigin = (request: NextRequest): string => {
  const origin = request.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) {
    const proto =
      request.headers.get("x-forwarded-proto") ??
      (host.includes("localhost") ? "http" : "https");
    return `${proto}://${host}`.replace(/\/$/, "");
  }

  return getDefaultSiteOrigin();
};
