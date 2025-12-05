"use client";

import { useEffect } from "react";
import { enrollmentEvents } from "@/lib/analytics";

export default function EnrollmentAnalytics() {
  // Track enrollment page visit
  useEffect(() => {
    enrollmentEvents.enrollPageVisit();
  }, []);

  return null; // This component only handles analytics, no UI
}