"use client";

import React from "react";

interface GuidanceSectionProps {
  guidance: string;
  isGuidanceExpanded: boolean;
  setIsGuidanceExpanded: (expanded: boolean) => void;
}

const GuidanceSection = ({
  guidance,
  isGuidanceExpanded,
  setIsGuidanceExpanded,
}: GuidanceSectionProps) => (
  <>
    <button
      aria-controls="guidance-content"
      aria-expanded={isGuidanceExpanded}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={() => setIsGuidanceExpanded(!isGuidanceExpanded)}
    >
      <span>💡</span>
      <span>
        {isGuidanceExpanded ? "Hide considerations" : "Show considerations"}
      </span>
      <svg
        className={`w-4 h-4 transition-transform ${isGuidanceExpanded ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 9l-7 7-7-7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isGuidanceExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
      }`}
      id="guidance-content"
    >
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-2">
        {/* eslint-disable react/no-danger */}
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: guidance }}
        />
      </div>
    </div>
  </>
);

export default GuidanceSection;
