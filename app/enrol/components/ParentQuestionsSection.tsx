"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { steps } from "@/enrol/insights/questions/steps";
import ParentQuestionsContent from "@/enrol/components/ParentQuestionsContent";
import ParentQuestionsNavigation from "@/enrol/components/ParentQuestionsNavigation";
import SubmissionConfirmation from "@/enrol/components/SubmissionConfirmation";

type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

interface ParentQuestionsHeaderProps {
  isTeacherQuestion: boolean;
  isDocumentUpload: boolean;
  isReviewQuestion: boolean;
  currentQuestionIndex: number;
}

const ParentQuestionsHeader: React.FC<ParentQuestionsHeaderProps> = ({
  isTeacherQuestion,
  isDocumentUpload,
  isReviewQuestion,
  currentQuestionIndex,
}) => {
  const currentStep = steps[currentQuestionIndex];
  const isSchedulingQuestion = currentStep?.type === "scheduling";

  return (
    <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {isDocumentUpload
              ? "Teacher Insight & Documents"
              : isTeacherQuestion
                ? "Email this to your child's teacher(s)"
                : isSchedulingQuestion
                  ? "Schedule your tutoring sessions"
                  : isReviewQuestion
                    ? "Review your responses"
                    : "Tell us about your child as a learner"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isDocumentUpload
              ? "Professional teacher insights provide the targeted expertise needed for curriculum-aligned, effective tutoring."
              : isTeacherQuestion
                ? "Teacher insights complement parental perspectives to provide a complete picture of your child's learning journey."
                : isSchedulingQuestion
                  ? "Help us find the best times for your child's tutoring sessions."
                  : isReviewQuestion
                    ? "Please review your responses below. Make sure everything looks correct before submitting."
                    : "Your insights as a parent are invaluable in helping us understand your child's unique learning style and needs."}
          </p>
        </div>
      </div>
    </div>
  );
};

interface ParentQuestionsProgressIndicatorProps {
  isEditing: boolean;
  autoSaveStatus?: AutoSaveStatus;
  justSaved: boolean;
  progressPercentage: number;
  hasContent: boolean;
}

const ParentQuestionsProgressIndicator: React.FC<
  ParentQuestionsProgressIndicatorProps
> = ({
  isEditing,
  autoSaveStatus,
  justSaved,
  progressPercentage,
  hasContent,
}) => (
  <div className="absolute top-4 right-4 z-10">
    <div className="flex items-center justify-end gap-2 w-24">
      <span
        className={`text-xs font-medium flex-shrink-0 ${
          isEditing
            ? "text-orange-600 dark:text-orange-400"
            : autoSaveStatus === "saving"
              ? "text-blue-600 dark:text-blue-400"
              : hasContent
                ? justSaved
                  ? "text-green-700 dark:text-green-300 font-semibold"
                  : "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-500"
        }`}
      >
        {isEditing
          ? "Editing..."
          : autoSaveStatus === "saving"
            ? "Saving..."
            : hasContent
              ? "Saved"
              : ""}
      </span>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex-shrink-0 w-8 text-right">
        {progressPercentage}%
      </span>
    </div>
  </div>
);

interface ParentQuestionsSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  attachments: File[];
  handleAttachmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (name: string) => void;
  autoSaveStatus?: AutoSaveStatus;
  onValidationChange?: (data: {
    isValid: boolean;
    isReviewStep: boolean;
  }) => void;
}

const ParentQuestionsSection = ({
  notes,
  setNotes,
  attachments,
  handleAttachmentChange,
  removeAttachment,
  autoSaveStatus,
  onValidationChange,
}: ParentQuestionsSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [_completedQuestions, setCompletedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasClickedResolveIssues, setHasClickedResolveIssues] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const editTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll to center section in viewport when question changes
  useEffect(() => {
    // Position the section below the navbar (accounting for 4rem navbar height)
    if (sectionRef.current) {
      const navbarHeight = 64; // 4rem = 64px
      const elementTop =
        sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - navbarHeight - 16; // Additional 16px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [currentQuestionIndex]);
  // Extract question texts from steps
  const questions = steps.map((step) => step.text);

  const daysOfWeek = useMemo(
    () => [
      "Mondays",
      "Tuesdays",
      "Wednesdays",
      "Thursdays",
      "Fridays",
      "Saturdays",
      "Sundays",
    ],
    [],
  );

  // State for question responses
  const [questionResponses, setQuestionResponses] = useState<
    Record<string, string | string[]>
  >({});
  const hasLoadedInitialData = useRef(false);

  // Load responses from notes if available (only once)
  useEffect(() => {
    if (!hasLoadedInitialData.current && notes) {
      try {
        const parsed = JSON.parse(notes);
        if (typeof parsed === "object" && parsed.responses) {
          setQuestionResponses(parsed.responses);
          hasLoadedInitialData.current = true;
        }
      } catch {
        // If not JSON, treat as legacy format
      }
    }
  }, [notes]);

  // Save responses to notes
  useEffect(() => {
    const data = {
      responses: questionResponses,
      timestamp: new Date().toISOString(),
    };
    setNotes(JSON.stringify(data));
  }, [questionResponses, setNotes]);

  // Calculate progress percentage (6 sections × 16.67% each)
  const calculateProgress = () => {
    let completedSections = 0;

    // Section 1: Parent goals
    const goalsStep = steps.find((s) => s.type === "parent_goals");
    if (
      goalsStep &&
      questionResponses[goalsStep.id] &&
      typeof questionResponses[goalsStep.id] === "string" &&
      (questionResponses[goalsStep.id] as string).trim() !== ""
    ) {
      completedSections++;
    }

    // Section 2: Parent academic
    const academicStep = steps.find((s) => s.type === "parent_academic");
    if (
      academicStep &&
      questionResponses[academicStep.id] &&
      typeof questionResponses[academicStep.id] === "string" &&
      (questionResponses[academicStep.id] as string).trim() !== ""
    ) {
      completedSections++;
    }

    // Section 3: Parent availability
    const availabilityStep = steps.find(
      (s) => s.type === "parent_availability",
    );
    if (
      availabilityStep &&
      questionResponses[availabilityStep.id] &&
      typeof questionResponses[availabilityStep.id] === "string" &&
      (questionResponses[availabilityStep.id] as string).trim() !== ""
    ) {
      completedSections++;
    }

    // Section 4: Document upload text
    const docStep = steps.find((s) => s.type === "document_upload");
    if (
      docStep &&
      questionResponses[docStep.id] &&
      typeof questionResponses[docStep.id] === "string" &&
      (questionResponses[docStep.id] as string).trim() !== ""
    ) {
      completedSections++;
    }

    // Section 5: Document upload files
    if (attachments.length > 0) {
      completedSections++;
    }

    // Section 6: Scheduling
    const schedStep = steps.find((s) => s.type === "scheduling");
    if (
      schedStep &&
      questionResponses[schedStep.id] &&
      Array.isArray(questionResponses[schedStep.id]) &&
      (questionResponses[schedStep.id] as string[]).length > 0
    ) {
      completedSections++;
    }

    return Math.round((completedSections / 6) * 100);
  };

  const progressPercentage = calculateProgress();

  // Notify parent when validation status changes
  useEffect(() => {
    if (onValidationChange) {
      const isReviewStep = steps[currentQuestionIndex]?.type === "review";
      onValidationChange({
        isValid: progressPercentage === 100,
        isReviewStep,
      });
    }
  }, [progressPercentage, currentQuestionIndex, onValidationChange]);

  // Check if there's any content entered
  const hasContent = Object.values(questionResponses).some((response) =>
    Array.isArray(response) ? response.length > 0 : response?.trim(),
  );

  // Detect transition from editing to saved
  useEffect(() => {
    if (!isEditing && autoSaveStatus === "saved") {
      setJustSaved(true);
      const timer = setTimeout(() => setJustSaved(false), 2000); // Highlight for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isEditing, autoSaveStatus]);

  // Cleanup edit timer on unmount
  useEffect(
    () => () => {
      if (editTimerRef.current) {
        clearTimeout(editTimerRef.current);
      }
    },
    [],
  );

  const updateQuestionResponse = (
    questionIndex: number | string,
    response: string | string[],
  ) => {
    setQuestionResponses((prev) => ({
      ...prev,
      [questionIndex]: response,
    }));
  };

  const currentStep = steps[currentQuestionIndex];
  const isDocumentUpload = currentStep?.type === "document_upload";
  const isReviewQuestion = currentStep?.type === "grouped_review";
  const isTeacherQuestion = currentStep?.type === "document_upload";

  if (isSubmitted) {
    return (
      <section
        ref={sectionRef}
        className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]"
      >
        <SubmissionConfirmation />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]"
    >
      {/* Progress bar - Subtle top border */}
      <div className="px-4">
        <div className="w-full h-0.5 overflow-hidden rounded-t-2xl">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <ParentQuestionsHeader
        currentQuestionIndex={currentQuestionIndex}
        isDocumentUpload={isDocumentUpload}
        isReviewQuestion={isReviewQuestion}
        isTeacherQuestion={isTeacherQuestion}
      />
      <ParentQuestionsProgressIndicator
        autoSaveStatus={autoSaveStatus}
        hasContent={hasContent}
        isEditing={isEditing}
        justSaved={justSaved}
        progressPercentage={progressPercentage}
      />
      <ParentQuestionsContent
        agreedToTerms={agreedToTerms}
        attachments={attachments}
        currentQuestionIndex={currentQuestionIndex}
        daysOfWeek={daysOfWeek}
        editTimerRef={editTimerRef}
        handleAttachmentChange={handleAttachmentChange}
        hasClickedResolveIssues={hasClickedResolveIssues}
        isDocumentUpload={isDocumentUpload}
        isReviewQuestion={isReviewQuestion}
        isTeacherQuestion={isTeacherQuestion}
        questionResponses={questionResponses}
        removeAttachment={removeAttachment}
        setAgreedToTerms={setAgreedToTerms}
        setIsEditing={setIsEditing}
        updateQuestionResponse={updateQuestionResponse}
      />
      <ParentQuestionsNavigation
        _hasClickedResolveIssues={hasClickedResolveIssues}
        agreedToTerms={agreedToTerms}
        attachments={attachments}
        currentQuestionIndex={currentQuestionIndex}
        isReviewQuestion={isReviewQuestion}
        isTeacherQuestion={isTeacherQuestion}
        questionResponses={questionResponses}
        questionsLength={questions.length}
        setAgreedToTerms={setAgreedToTerms}
        setCompletedQuestions={setCompletedQuestions}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setHasClickedResolveIssues={setHasClickedResolveIssues}
        onSubmit={() => setIsSubmitted(true)}
      />
    </section>
  );
};

export default ParentQuestionsSection;
