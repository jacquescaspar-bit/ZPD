import { SITE_URL } from "@/lib/constants";
import type { PlanType } from "@/lib/constants";

export function buildReferralEnrolLink(
  code: string,
  plan: PlanType = "essential",
): string {
  const url = new URL("/enrol", SITE_URL);
  url.searchParams.set("ref", code);
  url.searchParams.set("plan", plan);
  return url.toString();
}
