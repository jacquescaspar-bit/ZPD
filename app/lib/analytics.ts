// Declare global gtag function
declare global {
  function gtag(...args: any[]): void;
}

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize GA4
export const initGA = () => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_features: false,
    });
  }
};

// Generic event tracking
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {},
) => {
  if (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID &&
    typeof gtag !== "undefined"
  ) {
    gtag("event", eventName, {
      ...parameters,
      custom_map: { dimension1: "user_journey_stage" },
    });
  }
};

// Page view tracking
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID &&
    typeof gtag !== "undefined"
  ) {
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Enrollment funnel events
export const enrollmentEvents = {
  // Page visits
  enrollPageVisit: () =>
    trackEvent("enroll_page_visit", {
      page_location: "/enrol",
      page_title: "Enrol with ZPD Tutoring",
    }),

  // Widget interactions
  widgetStart: () =>
    trackEvent("enrollment_widget_start", {
      event_category: "engagement",
      event_label: "enrollment_widget",
    }),

  // Step completions
  stepComplete: (step: string, stepNumber: number) =>
    trackEvent("enrollment_step_complete", {
      event_category: "funnel",
      event_label: step,
      value: stepNumber,
      custom_parameter_1: step,
    }),

  // Assessment completion
  assessmentComplete: (data: {
    childAge?: string;
    currentGrade?: string;
    subjects?: string[];
    goals?: string;
  }) =>
    trackEvent("assessment_complete", {
      event_category: "funnel",
      event_label: "assessment",
      child_age: data.childAge,
      current_grade: data.currentGrade,
      subjects_count: data.subjects?.length || 0,
      has_goals: Boolean(data.goals),
    }),

  // Value demo interaction
  valueDemoViewed: () =>
    trackEvent("value_demo_viewed", {
      event_category: "engagement",
      event_label: "value_demo",
    }),

  // Pricing interactions
  pricingViewed: () =>
    trackEvent("pricing_viewed", {
      event_category: "funnel",
      event_label: "pricing",
    }),

  planSelected: (planType: string, planPrice: number) =>
    trackEvent("plan_selected", {
      event_category: "ecommerce",
      event_label: planType,
      value: planPrice,
      currency: "AUD",
      items: [
        {
          item_name: planType,
          price: planPrice,
          quantity: 1,
          currency: "AUD",
        },
      ],
    }),

  // Payment events
  paymentStarted: (planType: string, amount: number) =>
    trackEvent("begin_checkout", {
      event_category: "ecommerce",
      event_label: "payment",
      value: amount,
      currency: "AUD",
      items: [
        {
          item_name: planType,
          price: amount,
          quantity: 1,
          currency: "AUD",
        },
      ],
    }),

  paymentCompleted: (planType: string, amount: number, transactionId: string) =>
    trackEvent("purchase", {
      event_category: "ecommerce",
      event_label: "payment_success",
      transaction_id: transactionId,
      value: amount,
      currency: "AUD",
      items: [
        {
          item_name: planType,
          price: amount,
          quantity: 1,
          currency: "AUD",
        },
      ],
    }),

  paymentFailed: (error: string) =>
    trackEvent("payment_failed", {
      event_category: "ecommerce",
      event_label: "payment_error",
      error_message: error,
    }),

  // User behavior metrics
  timeSpent: (step: string, timeInSeconds: number) =>
    trackEvent("time_spent", {
      event_category: "engagement",
      event_label: step,
      value: timeInSeconds,
      custom_parameter_1: step,
    }),

  chatbotInteraction: (interactionType: string, messageCount: number) =>
    trackEvent("chatbot_interaction", {
      event_category: "engagement",
      event_label: interactionType,
      value: messageCount,
    }),

  formAbandoned: (step: string, fieldsCompleted: number) =>
    trackEvent("form_abandoned", {
      event_category: "funnel",
      event_label: step,
      value: fieldsCompleted,
    }),

  // Return visitor tracking
  returnVisit: (daysSinceLastVisit: number) =>
    trackEvent("return_visit", {
      event_category: "engagement",
      event_label: "return_visitor",
      value: daysSinceLastVisit,
    }),

  // Business metrics
  revenueTracked: (amount: number, planType: string) =>
    trackEvent("revenue_generated", {
      event_category: "business",
      event_label: planType,
      value: amount,
      currency: "AUD",
    }),

  customerAcquisition: (source: string, cost: number) =>
    trackEvent("customer_acquired", {
      event_category: "business",
      event_label: source,
      value: cost,
      currency: "AUD",
    }),

  // Referral tracking
  referralUsed: (referralCode: string) =>
    trackEvent("referral_used", {
      event_category: "marketing",
      event_label: referralCode,
    }),

  referralGenerated: (referralCode: string) =>
    trackEvent("referral_generated", {
      event_category: "marketing",
      event_label: referralCode,
    }),
};

// Privacy and consent management
export const privacyEvents = {
  consentGranted: (consents: string[]) =>
    trackEvent("consent_granted", {
      event_category: "privacy",
      event_label: "consent_given",
      consent_types: consents.join(","),
    }),

  consentRevoked: (consents: string[]) =>
    trackEvent("consent_revoked", {
      event_category: "privacy",
      event_label: "consent_revoked",
      consent_types: consents.join(","),
    }),

  cookiePreferences: (preferences: Record<string, boolean>) =>
    trackEvent("cookie_preferences", {
      event_category: "privacy",
      event_label: "cookie_settings",
      ...preferences,
    }),
};

// Performance monitoring
export const performanceEvents = {
  pageLoadTime: (loadTime: number, page: string) =>
    trackEvent("page_load_time", {
      event_category: "performance",
      event_label: page,
      value: loadTime,
      custom_parameter_1: "load_time_ms",
    }),

  widgetLoadTime: (loadTime: number) =>
    trackEvent("widget_load_time", {
      event_category: "performance",
      event_label: "enrollment_widget",
      value: loadTime,
    }),

  apiResponseTime: (endpoint: string, responseTime: number) =>
    trackEvent("api_response_time", {
      event_category: "performance",
      event_label: endpoint,
      value: responseTime,
    }),
};

// A/B testing framework
export const experimentEvents = {
  experimentViewed: (experimentId: string, variant: string) =>
    trackEvent("experiment_viewed", {
      event_category: "experiment",
      event_label: experimentId,
      experiment_variant: variant,
    }),

  experimentConversion: (experimentId: string, variant: string, goal: string) =>
    trackEvent("experiment_conversion", {
      event_category: "experiment",
      event_label: experimentId,
      experiment_variant: variant,
      conversion_goal: goal,
    }),
};

// Utility functions
export const setUserProperties = (properties: Record<string, any>) => {
  if (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID &&
    typeof gtag !== "undefined"
  ) {
    gtag("config", GA_MEASUREMENT_ID, {
      custom_map: {
        dimension1: "user_journey_stage",
        dimension2: "enrollment_status",
        dimension3: "plan_type",
      },
      ...properties,
    });
  }
};

export const setUserId = (userId: string) => {
  if (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID &&
    typeof gtag !== "undefined"
  ) {
    gtag("config", GA_MEASUREMENT_ID, {
      user_id: userId,
    });
  }
};

// Check if analytics is enabled (for GDPR compliance)
export const isAnalyticsEnabled = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check for consent cookie or localStorage
  const consent = localStorage.getItem("analytics_consent");
  return consent === "granted";
};

export const enableAnalytics = () => {
  localStorage.setItem("analytics_consent", "granted");
  initGA();
};

export const disableAnalytics = () => {
  localStorage.setItem("analytics_consent", "revoked");
  // Note: GA4 doesn't have a direct disable method, but we can stop tracking
};
