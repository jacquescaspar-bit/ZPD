"use client";

import React, { useState, useEffect } from "react";
import Nav from "@/Nav";
import ReviewStep from "@/enrol/components/ReviewStep";
import { useAutoSave } from "@/enrol/hooks/useAutoSave";
import { useInsightAttachments } from "@/enrol/hooks/useInsightAttachments";
import { SUPPORT_EMAIL } from "@/lib/constants";
import PostPurchaseHero from "@/enrol/components/PostPurchaseHero";
import SubmissionConfirmation from "@/enrol/components/SubmissionConfirmation";
import ReferralShareCard from "@/enrol/components/ReferralShareCard";
import {
  getEnrollmentSessionHeaders,
  storeEnrollmentSessionAccess,
} from "@/enrol/lib/enrollmentSessionClient";
import type { PlanType } from "@/lib/constants";

interface InsightsCollectionClientProps {
  initialSessionId?: string;
  initialSessionToken?: string;
}

const InsightsCollectionClient: React.FC<InsightsCollectionClientProps> = ({
  initialSessionId,
  initialSessionToken,
} = {}) => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const [notes, setNotes] = useState("");
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [sessionLoadError, setSessionLoadError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [planType, setPlanType] = useState<PlanType>("essential");
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  const { status: autoSaveStatus, error: autoSaveError } = useAutoSave({
    sessionId: currentSessionId ?? "",
    data: { notes },
    delay: 2500,
    enabled: isSessionLoaded && Boolean(currentSessionId),
  });

  const {
    attachments,
    uploadingCount,
    error: uploadError,
    handleAttachmentChange,
    removeAttachment,
  } = useInsightAttachments({ sessionId: currentSessionId });

  useEffect(() => {
    const loadSession = async () => {
      const sessionId =
        initialSessionId ?? sessionStorage.getItem("enrollmentSessionId");
      const storedPaymentIntentId = sessionStorage.getItem(
        "enrollmentPaymentIntentId",
      );
      const storedEmail = sessionStorage.getItem("enrollmentEmail");
      const storedPlan = sessionStorage.getItem("enrollmentPlan");

      if (storedPaymentIntentId) {
        setPaymentIntentId(storedPaymentIntentId);
      }
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
      if (
        storedPlan &&
        ["trial", "online", "essential", "intensive"].includes(storedPlan)
      ) {
        setPlanType(storedPlan as PlanType);
      }

      if (sessionId && initialSessionToken) {
        storeEnrollmentSessionAccess(sessionId, initialSessionToken);
      }

      if (sessionId) {
        try {
          const response = await fetch(
            `/api/enrollment-sessions/${sessionId}`,
            {
              headers: getEnrollmentSessionHeaders(initialSessionToken),
            },
          );
          if (response.ok) {
            const data = await response.json();
            setCurrentSessionId(sessionId);
            setSessionLoadError(null);
            storeEnrollmentSessionAccess(sessionId, initialSessionToken);

            if (data.session.email) {
              setUserEmail(data.session.email);
              sessionStorage.setItem("enrollmentEmail", data.session.email);
            }
            if (data.session.stripePaymentIntentId) {
              setPaymentIntentId(data.session.stripePaymentIntentId);
              sessionStorage.setItem(
                "enrollmentPaymentIntentId",
                data.session.stripePaymentIntentId,
              );
            }
            if (data.session.enrollmentData?.plan) {
              setPlanType(data.session.enrollmentData.plan as PlanType);
              sessionStorage.setItem(
                "enrollmentPlan",
                data.session.enrollmentData.plan,
              );
            }
            if (data.session.insightsData?.notes) {
              setNotes(data.session.insightsData.notes);
            }
            if (data.session.insightsData?.responses) {
              setResponses(data.session.insightsData.responses);
            }
          } else {
            const onLocalhost =
              typeof window !== "undefined" &&
              window.location.hostname === "localhost";
            setSessionLoadError(
              onLocalhost
                ? `This session isn't in your local database — often because the email link pointed at zpdlearning.com while you tested on localhost. Use a fresh Skip payment test, or open http://localhost:3000/enrol/insights?session=… from your latest test.`
                : `This onboarding link has expired or is invalid. Email ${SUPPORT_EMAIL} and we'll help.`,
            );
          }
        } catch (err) {
          console.error("Error loading session:", err);
          setSessionLoadError(
            `We couldn't load your saved progress. Try again or contact ${SUPPORT_EMAIL}.`,
          );
        }
      }

      setIsSessionLoaded(true);
    };
    void loadSession();
  }, [initialSessionId, initialSessionToken]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const copyReferralLink = () => {
    setStatusMessage(
      "Your referral link appears on this page once your code is ready.",
    );
  };

  const handleSubmit = async () => {
    if (!currentSessionId) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("responses", JSON.stringify(responses));
      formData.append("sessionId", currentSessionId);
      if (userEmail) formData.append("email", userEmail);

      const response = await fetch("/api/submit-insights", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
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
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900" />
        <div className="z-10 flex min-h-screen items-center justify-center px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-lg">
            <SubmissionConfirmation
              email={userEmail}
              paymentIntentId={paymentIntentId}
              planType={planType}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Nav />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900" />
      <div className="z-10 min-h-screen px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="pb-8 text-center">
            <h1
              className="mb-2 text-center text-4xl font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-6xl"
              style={{ letterSpacing: "0.02em" }}
            >
              <div className="flex flex-col gap-1">
                <span>Your Learning Journey</span>
                <span>Has Begun</span>
              </div>
            </h1>
            <PostPurchaseHero />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
              Your answers and uploaded documents save automatically. You can
              leave and return anytime using the link in your confirmation email
              — thorough responses matter more than fast ones.
            </p>
            {sessionLoadError ? (
              <p className="mx-auto mt-4 max-w-2xl text-sm text-red-600 dark:text-red-400">
                {sessionLoadError}
              </p>
            ) : null}
            {userEmail && (
              <div className="mx-auto mt-6 flex justify-center">
                <ReferralShareCard
                  email={userEmail}
                  paymentIntentId={paymentIntentId}
                  planType={planType}
                />
              </div>
            )}
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-left dark:border-blue-800 dark:bg-blue-950/30">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400"
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
                  <h3 className="mb-1 text-sm font-semibold text-blue-900 dark:text-blue-100">
                    Your Data is Secure
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    We take your privacy seriously. All information provided is
                    encrypted, securely stored, and used solely to personalise
                    your child&apos;s learning experience. We comply with
                    Australian privacy laws and never share your data with third
                    parties without your explicit consent, per our{" "}
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

          <section id="tasks-section">
            {isSessionLoaded ? (
              <ReviewStep
                attachments={attachments}
                autoSaveStatus={autoSaveStatus}
                copyReferralLink={copyReferralLink}
                errorMessage={autoSaveError ?? uploadError}
                handleAttachmentChange={handleAttachmentChange}
                isSubmitting={isSubmitting}
                notes={notes}
                referralLink={null}
                removeAttachment={(attachmentId) => {
                  void removeAttachment(attachmentId);
                }}
                sessionId={currentSessionId}
                setNotes={setNotes}
                setStatusMessage={setStatusMessage}
                statusMessage={statusMessage}
                uploadError={uploadError}
                uploadingCount={uploadingCount}
                userEmail={userEmail}
                onSubmit={() => {
                  handleSubmit().catch((error) => {
                    console.error("Submission error:", error);
                  });
                }}
              />
            ) : (
              <div className="flex justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default InsightsCollectionClient;
