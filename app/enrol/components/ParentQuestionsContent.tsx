"use client";

/* eslint-disable max-lines */

import React, { useEffect, useRef } from "react";
import DocumentUploadSection from "@/enrol/components/DocumentUploadSection";
import GuidanceSection from "@/enrol/components/GuidanceSection";
import TeacherEmailPrompt from "@/enrol/components/TeacherEmailPrompt";
import { steps } from "@/enrol/insights/questions/steps";
import type { InsightAttachmentRecord } from "@/lib/insightsAttachments";

interface ParentQuestionsContentProps {
  currentQuestionIndex: number;
  isTeacherQuestion: boolean;
  isDocumentUpload: boolean;
  isReviewQuestion: boolean;
  sessionId: string | null;
  attachments: InsightAttachmentRecord[];
  uploadingCount?: number;
  uploadError?: string | null;
  handleAttachmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (attachmentId: string) => void;
  questionResponses: Record<string, string | string[]>;
  daysOfWeek: string[];
  hasClickedResolveIssues: boolean;
  updateQuestionResponse: (
    questionIndex: number | string,
    response: string | string[],
  ) => void;
  setIsEditing: (editing: boolean) => void;
  editTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  agreedToTerms?: boolean;
  setAgreedToTerms?: (agreed: boolean) => void;
}

// Validation function for individual questions
const getValidationMessage = (
  step: { id: number; type: string },
  questionResponses: Record<string, string | string[]>,
  attachments: InsightAttachmentRecord[],
): string | null => {
  const stepId = step.id;
  const stepType = step.type;

  if (
    stepType === "parent_goals" ||
    stepType === "parent_academic" ||
    stepType === "parent_availability"
  ) {
    // Text responses
    const response = questionResponses[stepId];
    if (typeof response !== "string" || response.trim() === "") {
      return "Response required";
    }
  } else if (stepType === "document_upload") {
    // Document upload step
    const response = questionResponses[stepId];
    if (
      typeof response !== "string" ||
      response.trim() === "" ||
      attachments.length === 0
    ) {
      if (typeof response !== "string" || response.trim() === "") {
        return "Response required";
      }
      if (attachments.length === 0) {
        return "File upload required";
      }
    }
  } else if (stepType === "scheduling") {
    // Scheduling checkboxes
    const response = questionResponses[stepId];
    if (!Array.isArray(response) || response.length === 0) {
      return "Selection required";
    }
  }
  return null;
};

// eslint-disable-next-line max-lines-per-function
const ParentQuestionsContent = ({
  currentQuestionIndex,
  isTeacherQuestion,
  isDocumentUpload: _isDocumentUpload,
  isReviewQuestion: _isReviewQuestion,
  sessionId: _sessionId,
  attachments,
  uploadingCount = 0,
  uploadError = null,
  handleAttachmentChange,
  removeAttachment,
  questionResponses,
  daysOfWeek,
  hasClickedResolveIssues,
  updateQuestionResponse,
  setIsEditing,
  editTimerRef,
  agreedToTerms = false,
  setAgreedToTerms,
}: ParentQuestionsContentProps) => {
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const currentStep = steps[currentQuestionIndex];
  const currentQuestion = currentStep.text;
  const validationMessage = getValidationMessage(
    currentStep,
    questionResponses,
    attachments,
  );

  // Only scroll to top of content area when question changes (not on initial load)
  useEffect(() => {
    if (contentAreaRef.current && currentQuestionIndex > 0) {
      contentAreaRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentQuestionIndex]);

  // Update select all checkbox indeterminate state
  useEffect(() => {
    if (selectAllRef.current) {
      const selectedDays =
        (questionResponses[currentStep.id] as string[]) || [];
      const allSelected = selectedDays.length === daysOfWeek.length;
      const noneSelected = selectedDays.length === 0;
      selectAllRef.current.indeterminate = !allSelected && !noneSelected;
    }
  }, [questionResponses, daysOfWeek, currentStep]);

  return (
    <div
      ref={contentAreaRef}
      className="flex-1 overflow-y-auto p-4 flex flex-col"
    >
      <div className="flex flex-col flex-1">
        {!isTeacherQuestion && (
          <>
            <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 flex-shrink-0 mb-4">
              {currentQuestion}
              <span className="text-red-500 ml-1">
                *
                {validationMessage && hasClickedResolveIssues
                  ? ` ${validationMessage.toLowerCase()}`
                  : ""}
              </span>
            </h4>
          </>
        )}
        {currentStep.type === "document_upload" ? (
          <>
            <div className="space-y-3">
              {/* Titles row - independent of input areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TeacherEmailPrompt />
                <h4 className="hidden md:block text-base font-medium text-gray-800 dark:text-gray-200">
                  Please upload the Term Overview, most recent Report Card and
                  any samples of school/homework.
                  <span className="text-red-500 ml-1">*</span>
                </h4>
              </div>

              {/* Input areas row - perfectly aligned regardless of title height */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="flex flex-col">
                  <div className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-3 focus-within:ring-1 focus-within:ring-gray-400 shadow-sm overflow-hidden flex-1">
                    <textarea
                      className="force-ltr content-editable-fix w-full bg-transparent text-gray-900 dark:text-white focus:outline-none resize-none h-full"
                      dir="ltr"
                      placeholder="Please enter your teacher's response to the question above..."
                      style={{ direction: "ltr", textAlign: "left" }}
                      value={
                        (questionResponses[currentStep.id] as string) || ""
                      }
                      onChange={(e) => {
                        setIsEditing(true);
                        updateQuestionResponse(currentStep.id, e.target.value);
                        if (editTimerRef.current)
                          clearTimeout(editTimerRef.current);
                        editTimerRef.current = setTimeout(
                          () => setIsEditing(false),
                          2000,
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="md:hidden text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Please upload the Term Overview, most recent Report Card and
                    any samples of school/homework.
                    <span className="text-red-500 ml-1">*</span>
                  </h4>
                  <DocumentUploadSection
                    attachments={attachments}
                    handleAttachmentChange={handleAttachmentChange}
                    removeAttachment={removeAttachment}
                    uploadError={uploadError}
                    uploadingCount={uploadingCount}
                  />
                </div>
              </div>
            </div>

            {/* Guidance sections - full width below inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="max-w-[92.5%] text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Considerations
                </div>
                <div style={{ paddingLeft: "1.2em", textIndent: "-1.2em" }}>
                  {`Teacher insights are crucial for creating an effective tutoring programme. Please reach out to your child's teacher and ask them the question above. Their professional assessment, combined with the uploaded documents and your parental insights, will help us develop targeted support for your child's learning needs.

In the text area above, please enter your teacher's response verbatim. This will help us understand:
  • Specific concepts or topics that may need additional attention
  • Areas where your child excels or struggles
  • Skills requiring reinforcement or extension
  • Any individual learning preferences or needs`}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                <div className="h-[1.25rem] mb-1" />
                <div style={{ paddingLeft: "1.2em", textIndent: "-1.2em" }}>
                  {`Please upload the following documents to provide context for your child's current abilities:
  • Term Overview: Shows the curriculum and learning objectives for the upcoming term
  • Most recent Report Card: Indicates current academic performance and achievements
  • Work samples: Recent assignments, homework sheets, or projects that demonstrate your child's current ability

These documents help us assess your child's starting point and create a personalized tutoring plan that builds on their existing strengths.`}
                </div>
              </div>
            </div>
          </>
        ) : currentStep.type === "scheduling" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pl-3">
              <label className="flex items-center space-x-2">
                <input
                  ref={selectAllRef}
                  checked={
                    ((questionResponses[currentStep.id] as string[]) || [])
                      .length === daysOfWeek.length
                  }
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  type="checkbox"
                  onChange={() => {
                    const selectedDays =
                      (questionResponses[currentStep.id] as string[]) || [];
                    const allSelected =
                      selectedDays.length === daysOfWeek.length;
                    if (allSelected) {
                      updateQuestionResponse(currentStep.id, []);
                    } else {
                      updateQuestionResponse(currentStep.id, daysOfWeek);
                    }
                    setIsEditing(true);
                    if (editTimerRef.current)
                      clearTimeout(editTimerRef.current);
                    editTimerRef.current = setTimeout(
                      () => setIsEditing(false),
                      2000,
                    );
                  }}
                />
                <span className="text-base text-gray-800 dark:text-gray-200 font-semibold">
                  Select All
                </span>
              </label>
              {daysOfWeek.map((day) => {
                const selectedDays =
                  (questionResponses[currentStep.id] as string[]) || [];
                return (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      checked={selectedDays.includes(day)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      type="checkbox"
                      onChange={(e) => {
                        const newSelected = e.target.checked
                          ? [...selectedDays, day]
                          : selectedDays.filter((d) => d !== day);
                        updateQuestionResponse(5, newSelected);
                        setIsEditing(true);
                        if (editTimerRef.current)
                          clearTimeout(editTimerRef.current);
                        editTimerRef.current = setTimeout(
                          () => setIsEditing(false),
                          2000,
                        );
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {day}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="space-y-3">
              <div className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-3 focus-within:ring-1 focus-within:ring-gray-400 shadow-sm overflow-hidden">
                <textarea
                  className="force-ltr content-editable-fix w-full bg-transparent text-gray-900 dark:text-white focus:outline-none min-h-[100px] resize-none"
                  dir="ltr"
                  placeholder="Please provide any additional context about your preferred tutoring days (e.g., specific time preferences, conflicts, or other scheduling issues)..."
                  style={{ direction: "ltr", textAlign: "left" }}
                  value={
                    (questionResponses[`${currentStep.id}_notes`] as string) ||
                    ""
                  }
                  onChange={(e) => {
                    setIsEditing(true);
                    updateQuestionResponse(
                      `${currentStep.id}_notes`,
                      e.target.value,
                    );
                    if (editTimerRef.current)
                      clearTimeout(editTimerRef.current);
                    editTimerRef.current = setTimeout(
                      () => setIsEditing(false),
                      2000,
                    );
                  }}
                />
              </div>
              <GuidanceSection
                guidance={steps[currentQuestionIndex].guidance}
              />
            </div>
          </div>
        ) : currentStep.type === "parent_goals" ||
          currentStep.type === "parent_academic" ||
          currentStep.type === "parent_availability" ? (
          <div className="space-y-3">
            <div className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-3 focus-within:ring-1 focus-within:ring-gray-400 shadow-sm overflow-hidden">
              <textarea
                className="force-ltr content-editable-fix w-full bg-transparent text-gray-900 dark:text-white focus:outline-none min-h-[150px] resize-none"
                dir="ltr"
                placeholder="Your answer here..."
                style={{ direction: "ltr", textAlign: "left" }}
                value={(questionResponses[currentStep.id] as string) || ""}
                onChange={(e) => {
                  setIsEditing(true);
                  updateQuestionResponse(currentStep.id, e.target.value);
                  if (editTimerRef.current) clearTimeout(editTimerRef.current);
                  editTimerRef.current = setTimeout(
                    () => setIsEditing(false),
                    2000,
                  );
                }}
              />
            </div>
            <GuidanceSection guidance={steps[currentQuestionIndex].guidance} />
          </div>
        ) : currentStep.type === "grouped_review" ? (
          steps[currentQuestionIndex].type === "grouped_review" ? (
            <div className="space-y-6">
              {/* Parental Insights */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Parental Insights
                </h3>
                <div className="space-y-3">
                  {steps
                    .filter((step) =>
                      [
                        "parent_goals",
                        "parent_academic",
                        "parent_availability",
                      ].includes(step.type),
                    )
                    .map((step) => {
                      const response = questionResponses[step.id];
                      const hasResponse =
                        response &&
                        (typeof response === "string"
                          ? response.trim() !== ""
                          : response.length > 0);
                      return (
                        <div key={step.id}>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {step.text}
                          </div>
                          <div className="ml-4 mt-2 text-gray-700 dark:text-gray-300">
                            {hasResponse ? (
                              typeof response === "string" ? (
                                response
                              ) : (
                                response.join(", ")
                              )
                            ) : (
                              <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                                <svg
                                  className="w-4 h-4 text-red-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                                Response required
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* Teacher Insight & Documents */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Teacher Insight & Documents
                </h3>
                <div className="space-y-4">
                  {/* Teacher Insight */}
                  <div className="text-gray-700 dark:text-gray-300">
                    <TeacherEmailPrompt showRequired={false} />
                    {(() => {
                      const docStep = steps.find(
                        (s) => s.type === "document_upload",
                      );
                      const response = docStep
                        ? questionResponses[docStep.id]
                        : null;
                      return response && (response as string).trim() !== "" ? (
                        <div className="ml-4 mt-2">{response as string}</div>
                      ) : (
                        <div className="ml-4 mt-2">
                          <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                            <svg
                              className="w-4 h-4 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                clipRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                fillRule="evenodd"
                              />
                            </svg>
                            Response required
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                  {/* Uploaded Documents */}
                  <div className="text-gray-700 dark:text-gray-300">
                    <div className="mb-2 font-medium">
                      Please upload the Term Overview, most recent Report Card
                      and any samples of school/homework.
                    </div>
                    {attachments.length > 0 ? (
                      <div className="ml-4 mt-2">
                        <ul className="list-disc list-inside space-y-1">
                          {attachments.map((att) => (
                            <li key={att.id}>{att.filename}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="ml-4 mt-2">
                        <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                          <svg
                            className="w-4 h-4 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              fillRule="evenodd"
                            />
                          </svg>
                          Attachments required
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Scheduling
                </h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <div className="mb-2 font-medium">
                    {(() => {
                      const schedStep = steps.find(
                        (s) => s.type === "scheduling",
                      );
                      return schedStep
                        ? schedStep.text
                        : "Select your preferred days for tutoring sessions";
                    })()}
                  </div>
                  {(() => {
                    const schedStep = steps.find(
                      (s) => s.type === "scheduling",
                    );
                    const response = schedStep
                      ? questionResponses[schedStep.id]
                      : null;
                    return response && (response as string[]).length > 0 ? (
                      <div className="ml-4 mt-2">
                        {(response as string[]).join(", ")}
                      </div>
                    ) : (
                      <div className="ml-4 mt-2">
                        <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                          <svg
                            className="w-4 h-4 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              fillRule="evenodd"
                            />
                          </svg>
                          Selection required
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Privacy Message and Terms Agreement */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Your information is treated with the utmost confidentiality.
                  We use the details you provide solely to plan and deliver
                  exceptional, personalized tutoring services. Information
                  shared with our tutors is generalized and used only when
                  necessary for effective service delivery.
                </p>
                <label className="flex items-center justify-end gap-3 cursor-pointer">
                  <span className="text-sm text-gray-900 dark:text-white text-right">
                    I agree to the{" "}
                    <a
                      className="text-blue-400 hover:text-blue-300 underline"
                      href="/terms"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="text-blue-400 hover:text-blue-300 underline"
                      href="/privacy-policy"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                  <input
                    checked={agreedToTerms}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    type="checkbox"
                    onChange={(e) => setAgreedToTerms?.(e.target.checked)}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {steps
                .filter((step) => step.type !== "grouped_review")
                .map((step, index) => {
                  const response = questionResponses[step.id];
                  const hasResponse =
                    response &&
                    (typeof response === "string"
                      ? response.trim() !== ""
                      : response.length > 0);
                  return (
                    <div
                      key={step.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                    >
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Question {index + 1}: {step.text}
                      </h5>
                      <div
                        className={`text-gray-700 dark:text-gray-300 ${!hasResponse ? "text-red-600 dark:text-red-400 font-medium" : ""}`}
                      >
                        {hasResponse ? (
                          typeof response === "string" ? (
                            response
                          ) : (
                            response.join(", ")
                          )
                        ) : (
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                clipRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                fillRule="evenodd"
                              />
                            </svg>
                            No response provided
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )
        ) : (
          <div className="space-y-3">
            <div className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-3 focus-within:ring-1 focus-within:ring-gray-400 shadow-sm overflow-hidden">
              <textarea
                className="force-ltr content-editable-fix w-full bg-transparent text-gray-900 dark:text-white focus:outline-none min-h-[150px] resize-none"
                dir="ltr"
                placeholder={
                  currentStep.type === "parent_academic"
                    ? "Most engaging subject / topic:\nLeast engaging subject / topic:\nMost challenging subject / topic:\nLeast challenging subject / topic:"
                    : ""
                }
                value={(questionResponses[currentStep.id] as string) || ""}
                onChange={(e) => {
                  setIsEditing(true);
                  updateQuestionResponse(currentStep.id, e.target.value);
                  if (editTimerRef.current) clearTimeout(editTimerRef.current);
                  editTimerRef.current = setTimeout(
                    () => setIsEditing(false),
                    2000,
                  );
                }}
              />
            </div>
            <GuidanceSection guidance={steps[currentQuestionIndex].guidance} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentQuestionsContent;
