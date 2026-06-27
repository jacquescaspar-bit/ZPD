"use client";

import { useCallback, useState } from "react";
import { Copy } from "lucide-react";
import {
  TEACHER_EMAIL_INTRO,
  TEACHER_EMAIL_QUESTION_DISPLAY,
  getTeacherEmailClipboardText,
} from "@/enrol/lib/teacherEmailQuestion";

interface TeacherEmailPromptProps {
  showRequired?: boolean;
  className?: string;
}

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
};

const TeacherEmailPrompt = ({
  showRequired = true,
  className = "",
}: TeacherEmailPromptProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(getTeacherEmailClipboardText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const copyButtonClass =
    "flex-shrink-0 rounded-md text-gray-500 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:hover:text-indigo-400";

  return (
    <h4
      className={`text-base font-medium text-gray-800 dark:text-gray-200 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span>
          {TEACHER_EMAIL_INTRO}
          {showRequired ? <span className="text-red-500 ml-1">*</span> : null}
        </span>
        <button
          aria-label="Copy teacher email question to clipboard"
          className={copyButtonClass}
          type="button"
          onClick={() => {
            void handleCopy();
          }}
        >
          {copied ? (
            <span
              aria-live="polite"
              className="text-sm font-medium text-green-600 dark:text-green-400"
            >
              Copied
            </span>
          ) : (
            <Copy aria-hidden className="h-4 w-4" />
          )}
        </button>
      </div>
      <button
        aria-label="Copy teacher email question to clipboard"
        className="group mt-1 block w-full rounded-md text-left transition-colors hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:hover:text-indigo-300"
        type="button"
        onClick={() => {
          void handleCopy();
        }}
      >
        <span className="font-medium text-gray-800 group-hover:underline dark:text-gray-200">
          &apos;{TEACHER_EMAIL_QUESTION_DISPLAY}&apos;
        </span>
      </button>
    </h4>
  );
};

export default TeacherEmailPrompt;
