"use client";

import React, { useState } from "react";

interface ParentQuestionsNavigationProps {
  currentQuestionIndex: number;
  questionsLength: number;
  isTeacherQuestion: boolean;
  isReviewQuestion: boolean;
  questionResponses: Record<string, string | string[]>;
  attachments: File[];
  _hasClickedResolveIssues: boolean;
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
  _isTeacherQuestion,
  isReviewQuestion,
  questionResponses,
  attachments,
  _hasClickedResolveIssues,
  setCompletedQuestions,
  setCurrentQuestionIndex,
  setHasClickedResolveIssues,
  onSubmit,
  agreedToTerms = false,
  setAgreedToTerms: _setAgreedToTerms,
}: ParentQuestionsNavigationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      // Convert files to base64 for email attachments
      const _emailAttachments = await Promise.all(
        attachments.map(async (file) => {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          // Remove the data: prefix to get just the base64 content
          const [, base64Content] = base64.split(",");

          return {
            content: base64Content,
            filename: file.name,
            type: file.type,
            disposition: "attachment",
          };
        }),
      );

      // Create email content with responses
      const responsesHtml = Object.entries(questionResponses)
        .filter(([key]) => key !== "5") // Exclude review step
        .map(([stepIndex, response]) => {
          const stepNum = parseInt(stepIndex) + 1;
          let responseText = "";
          if (typeof response === "string") {
            responseText = response;
          } else if (Array.isArray(response)) {
            responseText = response.join(", ");
          }
          return `<div><strong>Step ${stepNum}:</strong> ${responseText}</div>`;
        })
        .join("");

      const _html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #059669;">New Enrolment Insights Submission</h1>
          <p>A parent has completed their enrolment insights. Here are their responses:</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${responsesHtml}
          </div>
          ${attachments.length > 0 ? "<p><strong>Attachments:</strong> See attached files for uploaded documents.</p>" : "<p><strong>No attachments uploaded.</strong></p>"}
          <p>Please review this submission and proceed with tutor matching.</p>
          <p>The ZPD Tutoring Team</p>
        </div>
      `;

      const formData = new FormData();
      formData.append("responses", JSON.stringify(questionResponses));

      // Append actual file objects to form data
      attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });

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
      // TODO: Show error message to user
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
    <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                // Scroll to checkbox
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
                // Not all questions valid - resolve issues
                setHasClickedResolveIssues(true);
                const firstInvalidStep = findFirstInvalidStep();
                if (firstInvalidStep !== -1) {
                  setCurrentQuestionIndex(firstInvalidStep);
                }
              }
            } else {
              // Mark current question as completed if it has content
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
  );
};

export default ParentQuestionsNavigation;
