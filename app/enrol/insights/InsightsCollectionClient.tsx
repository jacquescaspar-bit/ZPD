"use client";

import React, { useState, useEffect } from "react";
import Nav from "@/Nav";
import ReviewStep from "@/enrol/components/ReviewStep";
import { useAutoSave } from "@/enrol/hooks/useAutoSave";
import PostPurchaseHero from "@/enrol/components/PostPurchaseHero";
import SubmissionConfirmation from "@/enrol/components/SubmissionConfirmation";

interface InsightsCollectionClientProps {
  initialSessionId?: string;
}

const InsightsCollectionClient: React.FC<InsightsCollectionClientProps> = ({
  initialSessionId,
} = {}) => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // ReviewStep state
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  // Auto-save hook - only active when we have a session
  const { status: autoSaveStatus, error: autoSaveError } = useAutoSave({
    sessionId: currentSessionId ?? "",
    data: { notes },
    delay: 2500, // 2.5 seconds delay
  });

  // Load session data on mount
  useEffect(() => {
    const loadSession = async () => {
      const sessionId =
        initialSessionId ?? sessionStorage.getItem("enrollmentSessionId");
      if (sessionId && !currentSessionId) {
        try {
          const response = await fetch(`/api/enrollment-sessions/${sessionId}`);
          if (response.ok) {
            const data = await response.json();
            setCurrentSessionId(sessionId);
            if (data.session.insightsData?.notes) {
              setNotes(data.session.insightsData.notes);
            }
            if (data.session.insightsData?.responses) {
              setResponses(data.session.insightsData.responses);
            }
          }
        } catch (err) {
          console.error("Error loading session:", err);
        }
      }
    };
    void loadSession();
  }, [initialSessionId, currentSessionId]);

  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleAttachmentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (name: string) => {
    setAttachments((prev) => prev.filter((file) => file.name !== name));
  };

  const copyReferralLink = () => {
    setStatusMessage("Referral link functionality not yet implemented");
  };

  const handleSubmit = async () => {
    if (!currentSessionId) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("responses", JSON.stringify(responses));
      attachments.forEach((file, _index) => {
        formData.append(`attachments`, file);
      });

      const response = await fetch("/api/submit-insights", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const code = `REF-${Math.random().toString(36).toUpperCase().slice(2, 8)}`;
        setReferralCode(code);
        setSubmissionSuccess(true);
      } else {
        setStatusMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatusMessage("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="relative">
        <Nav />
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10 flex items-center justify-center">
          <SubmissionConfirmation referralCode={referralCode ?? undefined} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Nav />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10">
        <div className="space-y-6">
          {/* Hero Section */}
          <section className="text-center pb-8">
            <h1
              className="text-4xl sm:text-6xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white text-center"
              style={{ letterSpacing: "0.02em" }}
            >
              <div className="flex flex-col gap-1">
                <span>Your Learning Journey</span>
                <span>Has Begun</span>
              </div>
            </h1>
            <PostPurchaseHero />
            {process.env.NODE_ENV === "development" && (
              <button
                className="mt-4 px-3 py-1 text-xs bg-gray-800 text-white rounded opacity-60 hover:opacity-100"
                onClick={() => {
                  setReferralCode(
                    `REF-TEST${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
                  );
                  setSubmissionSuccess(true);
                }}
              >
                Test Success Screen
              </button>
            )}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl text-left">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    fillRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Your Data is Secure
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    We take your privacy seriously. All information provided is
                    encrypted, securely stored, and used solely to personalise
                    your child's learning experience. We comply with Australian
                    privacy laws and never share your data with third parties
                    without your explicit consent, per our{" "}
                    <a
                      className="underline hover:text-blue-600 dark:hover:text-blue-300"
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Review Step */}
          <section id="tasks-section">
            <ReviewStep
              attachments={attachments}
              autoSaveStatus={autoSaveStatus}
              copyReferralLink={copyReferralLink}
              errorMessage={autoSaveError}
              handleAttachmentChange={handleAttachmentChange}
              isSubmitting={isSubmitting}
              notes={notes}
              referralLink={null} // Not applicable for insights page
              removeAttachment={removeAttachment}
              setNotes={setNotes}
              setStatusMessage={setStatusMessage}
              statusMessage={statusMessage}
              onSubmit={() => {
                void handleSubmit();
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default InsightsCollectionClient;
