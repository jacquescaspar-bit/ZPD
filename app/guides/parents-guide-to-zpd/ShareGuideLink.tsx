"use client";

import { useState, useCallback } from "react";
import { SITE_URL } from "@/lib/constants";

const SHARE_URL = `${SITE_URL}/guides/parents-guide-to-zpd`;

const ShareGuideLink = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
    } catch {
      const input = document.createElement("textarea");
      input.value = SHARE_URL;
      input.setAttribute("readonly", "");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <p className="text-xs text-gray-500 mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <button
        className="inline-flex flex-wrap items-center justify-center gap-x-1 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded"
        type="button"
        onClick={() => {
          void handleCopy();
        }}
      >
        <span>Share:</span>
        <span className="underline decoration-dotted underline-offset-2 break-all">
          {SHARE_URL}
        </span>
      </button>
      {copied ? (
        <span
          aria-live="polite"
          className="font-medium text-indigo-600 dark:text-indigo-400"
        >
          Copied!
        </span>
      ) : null}
    </p>
  );
};

export default ShareGuideLink;
