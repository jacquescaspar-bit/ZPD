"use client";

import React, { useState, useEffect, useRef } from "react";
import type { InsightAttachmentRecord } from "@/lib/insightsAttachments";

interface ParentQuestionsNavigationProps {
  currentQuestionIndex: number;
  questionsLength: number;
  isReviewQuestion: boolean;
  questionResponses: Record<string, string | string[]>;
  attachments: InsightAttachmentRecord[];
  sessionId: string | null;
  userEmail?: string | null;
  setCompletedQuestions: React.Dispatch<React.SetStateAction<Set<number>>>;
  setCurrentQuestionIndex: (index: number) => void;
  setHasClickedResolveIssues: (value: boolean) => void;
  onSubmit?: () => void;
  agreedToTerms?: boolean;
  setAgreedToTerms?: (agreed: boolean) => void;
}

const ParentQuestionsNavigation = ({
  currentQuestionIndex,
  questionsLength,
  isReviewQuestion,
  questionResponses,
  attachments,
  sessionId,
  userEmail,
  setCompletedQuestions,
  setCurrentQuestionIndex,
  setHasClickedResolveIssues,
  onSubmit,
  agreedToTerms = false,
}: ParentQuestionsNavigationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile sticky nav: show on scroll up, hide on scroll down (match scroll speed)
  const [navOffset, setNavOffset] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const handleScroll = (e?: Event) => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const target =
            (e?.target as HTMLElement) || document.scrollingElement;
          const currentScrollY =
            target instanceof HTMLElement ? target.scrollTop : window.scrollY;
          const delta = currentScrollY - lastScrollY.current;
          const navHeight = 72;

          let newOffset = navOffset;
          if (delta > 0) {
            newOffset = Math.min(navHeight, navOffset + delta * 1.2);
          } else {
            newOffset = Math.max(0, navOffset + delta * 1.2);
          }

          setNavOffset(Math.max(0, Math.min(navHeight, newOffset)));
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Listen on window + any inner scroll containers (overflow-y-auto)
    const containers: (Window | HTMLElement)[] = [window];
    const scrollables =
      document.querySelectorAll<HTMLElement>(".overflow-y-auto");
    scrollables.forEach((el) => containers.push(el));

    containers.forEach((c) =>
      c.addEventListener("scroll", handleScroll as EventListener, {
        passive: true,
      }),
    );

    return () => {
      containers.forEach((c) =>
        c.removeEventListener("scroll", handleScroll as EventListener),
      );
    };
  }, [navOffset]);

  const handleSubmit = async () => {
    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("responses", JSON.stringify(questionResponses));
      if (sessionId) formData.append("sessionId", sessionId);
      if (userEmail) formData.append("email", userEmail);

      const response = await fetch("/api/submit-insights", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit insights");
      }

      onSubmit();
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("responses", JSON.stringify({})); // blank form
      formData.append("testRecipient", "jacquescaspar@gmail.com");

      const response = await fetch("/api/submit-insights", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit test");
      }

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Test submit failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation logic for review step
  const validateReviewStep = () => {
    // Steps 0-2: non-blank text responses
    for (let i = 1; i <= 3; i++) {
      const response = questionResponses[i];
      if (typeof response !== "string" || response.trim() === "") {
        return false;
      }
    }
    // Step 3 (id=4): non-blank text response AND at least one file uploaded
    const { "4": step3Text } = questionResponses;
    if (
      typeof step3Text !== "string" ||
      step3Text.trim() === "" ||
      attachments.length === 0
    ) {
      return false;
    }
    // Step 4 (scheduling id=5): at least one checkbox selected
    const { "5": step5Checkboxes } = questionResponses;
    if (!Array.isArray(step5Checkboxes) || step5Checkboxes.length === 0) {
      return false;
    }
    return true;
  };

  // Find first invalid step for navigation
  const findFirstInvalidStep = () => {
    // Steps 0-2: non-blank text responses
    for (let i = 1; i <= 3; i++) {
      const response = questionResponses[i];
      if (typeof response !== "string" || response.trim() === "") {
        return i - 1; // return array index
      }
    }
    // Step 3 (id=4): non-blank text response AND at least one file uploaded
    const { "4": step3Text } = questionResponses;
    if (
      typeof step3Text !== "string" ||
      step3Text.trim() === "" ||
      attachments.length === 0
    ) {
      return 3;
    }
    // Step 4 (scheduling id=5): at least one checkbox selected
    const { "5": step5Checkboxes } = questionResponses;
    if (!Array.isArray(step5Checkboxes) || step5Checkboxes.length === 0) {
      return 4;
    }
    return -1; // All valid
  };

  const questionsOnlyValid = validateReviewStep();
  const allQuestionsValid = questionsOnlyValid && agreedToTerms;
  const isLastQuestion = currentQuestionIndex === questionsLength - 1;

  // Determine if we're on question 6 (second to last, before review)
  const isQuestion6 = currentQuestionIndex === 5;

  return (
    <div
      className="sm:static fixed bottom-0 left-0 right-0 z-50 flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sm:transform-none"
      style={{ transform: `translateY(${navOffset}px)` }}
    >
      <div className="flex justify-between items-center">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors min-w-[100px] ${
            currentQuestionIndex === 0
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          disabled={currentQuestionIndex === 0}
          onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }}
        >
          Previous
        </button>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {`${currentQuestionIndex + 1} of ${questionsLength}`}
        </span>
        <div className="flex items-center gap-2">
          {isReviewQuestion && (
            <button
              className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors min-w-[60px] sm:min-w-[100px] bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-75"
              disabled={isSubmitting}
              onClick={() => void handleTestSubmit()}
            >
              Test
            </button>
          )}
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors min-w-[100px] ${
              isReviewQuestion
                ? allQuestionsValid && !isSubmitting
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : questionsOnlyValid && !agreedToTerms
                    ? "bg-gray-400 text-white cursor-pointer hover:bg-gray-500"
                    : !questionsOnlyValid
                      ? "bg-amber-600 text-white hover:bg-amber-700 cursor-pointer"
                      : isSubmitting
                        ? "bg-emerald-600 text-white opacity-75 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
            disabled={isSubmitting}
            onClick={() => {
              if (isReviewQuestion) {
                if (allQuestionsValid) {
                  void handleSubmit();
                } else if (questionsOnlyValid && !agreedToTerms) {
                  const checkboxElement = document.querySelector(
                    'input[type="checkbox"]',
                  );
                  if (checkboxElement) {
                    checkboxElement.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                } else {
                  setHasClickedResolveIssues(true);
                  const firstInvalidStep = findFirstInvalidStep();
                  if (firstInvalidStep !== -1) {
                    setCurrentQuestionIndex(firstInvalidStep);
                  }
                }
              } else {
                const currentResponse = questionResponses[currentQuestionIndex];
                const hasContent =
                  currentResponse &&
                  (typeof currentResponse === "string"
                    ? currentResponse.trim() !== ""
                    : currentResponse.length > 0);

                if (hasContent) {
                  setCompletedQuestions(
                    (prev) => new Set([...prev, currentQuestionIndex]),
                  );
                }

                if (!isLastQuestion) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
              }
            }}
          >
            {isReviewQuestion
              ? isSubmitting
                ? "Submitting..."
                : allQuestionsValid
                  ? "Submit"
                  : questionsOnlyValid && !agreedToTerms
                    ? "Submit"
                    : "Resolve Issues"
              : isQuestion6
                ? "Review"
                : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentQuestionsNavigation;
