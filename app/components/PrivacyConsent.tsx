"use client";

import React, { useState, useEffect } from "react";
import { privacyEvents, enableAnalytics, disableAnalytics, isAnalyticsEnabled } from "@/lib/analytics";

interface PrivacyConsentProps {
  onConsentChange?: (consented: boolean) => void;
}

const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onConsentChange }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    enableAnalytics();
    privacyEvents.consentGranted(['analytics', 'marketing', 'functional']);
    setShowBanner(false);
    onConsentChange?.(true);
  };

  const handleAcceptEssential = () => {
    disableAnalytics();
    privacyEvents.consentGranted(['functional']);
    privacyEvents.consentRevoked(['analytics', 'marketing']);
    setShowBanner(false);
    onConsentChange?.(false);
  };

  const handleCustomize = () => {
    setShowDetails(true);
  };

  const handleCustomConsent = (preferences: Record<string, boolean>) => {
    privacyEvents.cookiePreferences(preferences);

    const consentedItems: string[] = [];
    const revokedItems: string[] = [];

    Object.entries(preferences).forEach(([key, value]) => {
      if (value) {
        consentedItems.push(key);
      } else {
        revokedItems.push(key);
      }
    });

    if (consentedItems.length > 0) {
      privacyEvents.consentGranted(consentedItems);
    }
    if (revokedItems.length > 0) {
      privacyEvents.consentRevoked(revokedItems);
    }

    // Enable/disable analytics based on analytics preference
    if (preferences.analytics) {
      enableAnalytics();
      onConsentChange?.(true);
    } else {
      disableAnalytics();
      onConsentChange?.(false);
    }

    setShowBanner(false);
    setShowDetails(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 p-4">
      <div className="max-w-4xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                We value your privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We use cookies and similar technologies to improve your experience, analyze site usage, and assist in our marketing efforts.
                By continuing to use our site, you agree to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleCustomize}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <CookieCustomization onSubmit={handleCustomConsent} onCancel={() => setShowDetails(false)} />
        )}
      </div>
    </div>
  );
};

interface CookieCustomizationProps {
  onSubmit: (preferences: Record<string, boolean>) => void;
  onCancel: () => void;
}

const CookieCustomization: React.FC<CookieCustomizationProps> = ({ onSubmit, onCancel }) => {
  const [preferences, setPreferences] = useState({
    functional: true, // Essential cookies
    analytics: false,
    marketing: false,
  });

  const handleToggle = (key: string) => {
    if (key === 'functional') return; // Functional cookies are always required
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSubmit = () => {
    onSubmit(preferences);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Customize Your Cookie Preferences
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Essential Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Required for the website to function properly. Cannot be disabled.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.functional}
            disabled
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Analytics Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Help us understand how visitors interact with our website.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handleToggle('analytics')}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Marketing Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Used to deliver personalized advertisements and marketing content.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.marketing}
            onChange={() => handleToggle('marketing')}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default PrivacyConsent;