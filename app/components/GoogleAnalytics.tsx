"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";

/**
 * Loads GA4 (gtag.js) only after analytics consent is granted via
 * PrivacyConsent. UTM params are read by GA automatically from the URL.
 */
const GoogleAnalytics = () => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(isAnalyticsEnabled());
    sync();
    window.addEventListener("zpd-analytics-consent", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("zpd-analytics-consent", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !allowed) {
    return null;
  }

  return (
    <>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
          `.trim(),
        }}
        id="ga-init"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleAnalytics;
