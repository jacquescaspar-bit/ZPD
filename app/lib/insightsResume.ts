import { SITE_URL } from "@/lib/constants";

export const buildInsightsResumeUrl = (sessionId: string): string =>
  `${SITE_URL}/enrol/insights?session=${encodeURIComponent(sessionId)}`;
