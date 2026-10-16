"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  META_PIXEL_ID,
  isMarketingEnabled,
  captureMarketingParams,
} from "@/lib/analytics";

/**
 * Loads Meta Pixel only when marketing consent is granted and
 * NEXT_PUBLIC_META_PIXEL_ID is set. Fires PageView after init.
 */
const MetaPixel = () => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    captureMarketingParams();

    const sync = () => setAllowed(isMarketingEnabled());
    sync();

    window.addEventListener("zpd-marketing-consent", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("zpd-marketing-consent", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!META_PIXEL_ID || !allowed) {
    return null;
  }

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
          `.trim(),
        }}
        id="meta-pixel"
        strategy="afterInteractive"
      />
      <noscript>
        <img
          alt=""
          height="1"
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          style={{ display: "none" }}
          width="1"
        />
      </noscript>
    </>
  );
};

export default MetaPixel;
