"use client";

import React from "react";

interface TeacherQuestionsSectionProps {
  teacherQuestions: string;
  handleCopyTeacherQuestions: () => Promise<void>;
  handleDownloadTeacherQuestions: () => void;
}

const TeacherQuestionsSection: React.FC<TeacherQuestionsSectionProps> = ({
  teacherQuestions,
  handleCopyTeacherQuestions,
  handleDownloadTeacherQuestions,
}) => (
  <div className="flex-1">
    <div className="bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/30 dark:to-blue-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 relative flex-1 flex flex-col">
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="p-1 hover:bg-white/10 rounded"
          title="Copy to clipboard"
          onClick={() => {
            handleCopyTeacherQuestions().catch((error) => {
              console.error("Failed to copy teacher questions:", error);
            });
          }}
        >
          <svg
            className="text-gray-600 dark:text-gray-400"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
        <button
          className="p-1 hover:bg-white/10 rounded"
          title="Download as text file"
          onClick={handleDownloadTeacherQuestions}
        >
          <svg
            className="text-gray-600 dark:text-gray-400"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </button>
      </div>
      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-900 dark:text-white h-full overflow-y-auto">
        {teacherQuestions}
      </pre>
    </div>
  </div>
);

export default TeacherQuestionsSection;
