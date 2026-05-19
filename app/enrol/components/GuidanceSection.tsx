"use client";

import React from "react";

interface GuidanceSectionProps {
  guidance: string;
}

const GuidanceSection = ({ guidance }: GuidanceSectionProps) => (
  <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Considerations</div>
    <div className="whitespace-pre-wrap" style={{ paddingLeft: '1.2em', textIndent: '-1.2em' }} dangerouslySetInnerHTML={{ __html: guidance }} />
  </div>
);

export default GuidanceSection;
