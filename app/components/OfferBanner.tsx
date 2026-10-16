"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const OFFER_STORAGE_KEY = "zpd_offer_code";

/** Codes the homepage banner will advertise. Validated server-side at checkout. */
const BANNER_CODES: Record<string, string> = {
  GUIDE50: "50% off your first Diagnostic: $55 instead of $110",
};

const OfferBanner = () => {
  const [offer, setOffer] = useState<{ code: string; href: string } | null>(
    null,
  );

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

  if (!offer) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 shadow-lg md:relative md:shadow-none bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-4 py-2.5 text-center text-sm text-white">
      <span className="font-semibold">{BANNER_CODES[offer.code]}</span>{" "}
      <span className="opacity-90">
        with code <strong>{offer.code}</strong>, applied automatically.
      </span>{" "}
      <Link
        className="ml-1 inline-block rounded-full bg-white/20 px-3 py-0.5 font-medium underline-offset-2 hover:bg-white/30"
        href={offer.href}
      >
        Book now
      </Link>
    </div>
  );
};

export default OfferBanner;
