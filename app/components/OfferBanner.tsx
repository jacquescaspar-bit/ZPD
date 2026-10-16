"use client";

import { useEffect, useState } from "react";

/** Codes announced by a toast when landing with ?code=… (e.g. from a QR scan).
 * Nothing is prefilled: the visitor types the code at checkout, where it is
 * validated server-side. */
const TOAST_CODES: Record<string, string> = {
  GET50: "Enter GET50 at checkout for 50% off your Discovery diagnostic",
};

const OfferBanner = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const code = (new URLSearchParams(window.location.search).get("code") ?? "")
      .trim()
      .toUpperCase();
    const text = TOAST_CODES[code];
    if (!text) return;
    setMessage(text);
    const t = window.setTimeout(() => setMessage(null), 12000);
    return () => window.clearTimeout(t);
  }, []);

  if (!message) return null;

  return (
    <div
      aria-live="polite"
      className="fixed left-1/2 top-20 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-gray-900/95 p-4 text-sm text-white shadow-xl"
      role="status"
    >
      <span className="flex-1 font-medium">{message}</span>
      <button
        aria-label="Dismiss"
        className="-mt-1 px-1 text-xl leading-none opacity-70 hover:opacity-100"
        type="button"
        onClick={() => setMessage(null)}
      >
        ×
      </button>
    </div>
  );
};

export default OfferBanner;
