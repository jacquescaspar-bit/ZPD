"use client";

import React from "react";

interface ProgressSection {
  id: string;
  title: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  sections: ProgressSection[];
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  sections,
  className = "",
}) => {
  const completedCount = sections.filter((section) => section.completed).length;
  const totalCount = sections.length;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      className={`rounded-3xl border border-white/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 shadow-2xl backdrop-blur-lg p-6 ${className}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Enrolment Progress
          </h2>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {completedCount}/{totalCount} Complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full rounded-full h-3 overflow-hidden">
          <div className="absolute inset-0 px-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(progressPercentage)}%
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            Complete
          </span>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-colors"
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  section.completed
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                }`}
              >
                {section.completed ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  section.completed
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {section.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
