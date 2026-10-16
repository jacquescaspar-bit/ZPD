"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const OFFER_STORAGE_KEY = "zpd_offer_code";

/** Codes the homepage banner will advertise. Validated server-side at checkout. */
const BANNER_CODES: Record<string, string> = {
  GET50: "GET50 applied: 50% off your first diagnostic",
};

const OfferBanner = () => {
  const [offer, setOffer] = useState<{ code: string; href: string } | null>(
    null,
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    let code = (search.get("code") ?? search.get("promo") ?? "")
      .trim()
      .toUpperCase();
    try {
      if (code && BANNER_CODES[code]) {
        sessionStorage.setItem(OFFER_STORAGE_KEY, code);
      } else {
        code = sessionStorage.getItem(OFFER_STORAGE_KEY) ?? "";
      }
    } catch {
      // storage unavailable; banner still works from the URL
    }
    if (!BANNER_CODES[code]) return;
    const params = new URLSearchParams({ plan: "trial", promo: code });
    search.forEach((value, key) => {
      if (key.startsWith("utm_")) params.set(key, value);
    });
    setOffer({ code, href: `/enrol?${params.toString()}` });
  }, []);

  if (!offer || !visible) return null;

  return (
    <div
      aria-live="polite"
      className="fixed left-1/2 top-20 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-gray-900/95 p-4 text-sm text-white shadow-xl"
      role="status"
    >
      <div className="flex items-start gap-3">
        <span className="flex-1 font-semibold">{BANNER_CODES[offer.code]}</span>
        <button
          aria-label="Dismiss"
          className="-mt-1 px-1 text-xl leading-none opacity-70 hover:opacity-100"
          type="button"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
      <Link
        className="mt-3 block rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-4 py-2.5 text-center font-semibold text-white shadow hover:opacity-95"
        href={offer.href}
      >
        Book my $55 diagnostic
      </Link>
    </div>
  );
};

export default OfferBanner;
