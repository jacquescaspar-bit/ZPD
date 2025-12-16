"use client";

import React, { useEffect, useMemo, useState } from "react";
import PaymentForm from "@/enrol/components/PaymentForm";
import type { EnrollmentPaymentData } from "@/enrol/components/PaymentForm";
import { PRICING, type PlanType } from "@/lib/constants";

const MAX_NOTES_LENGTH = 8000;

const planDescriptions: Record<
  PlanType,
  { title: string; blurb: string; highlights: string[] }
> = {
  online: {
    title: "Online",
    blurb: "10 online sessions per term • 1 subject",
    highlights: ["Virtual delivery", "Email support", "Great starter option"],
  },
  essential: {
    title: "Essential",
    blurb: "10 sessions per term • 2 subjects • Priority support",
    highlights: [
      "ATAR specialist tutors",
      "Trial credit included",
      "Most popular",
    ],
  },
  intensive: {
    title: "Intensive",
    blurb: "20 sessions per term • Unlimited subjects",
    highlights: [
      "Direct phone support",
      "Fast-tracked progress",
      "Best for Year 11/12",
    ],
  },
};

const SECTION_CARD_CLASS =
  "rounded-3xl border border-white/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 shadow-2xl backdrop-blur-lg";

interface EnrollmentFormProps {
  initialPlan: PlanType;
  initialPromoCode?: string;
}

const REFERRAL_VALUE = 30000; // $300
const LUCKY_VALUE = 20000; // $200

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  initialPlan,
  initialPromoCode,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(initialPlan);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState(initialPromoCode ?? "");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [appliedPromoValue, setAppliedPromoValue] = useState(0);
  const [appliedPromoKind, setAppliedPromoKind] = useState<
    "referral" | "discount" | null
  >(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("ref");
      if (ref && appliedPromoValue === 0) {
        applyReferral(ref.trim().toUpperCase());
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = `REF-${Math.random()
        .toString(36)
        .toUpperCase()
        .slice(2, 8)}`;
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("ref", code);
        url.searchParams.set("plan", selectedPlan);
        const fullLink = url.toString();
        setReferralLink(fullLink);
      } catch {
        // ignore URL errors in non-browser environments
      }
    }
  }, []);

  const planCards = useMemo(
    () =>
      (["online", "essential", "intensive"] as PlanType[]).map((planKey) => {
        const config = PRICING[planKey];
        const description = planDescriptions[planKey];
        return {
          id: planKey,
          price: (config.price / 100).toLocaleString("en-AU", {
            style: "currency",
            currency: "AUD",
            minimumFractionDigits: 0,
          }),
          sessionsPerTerm: config.sessionsPerTerm,
          title: description.title,
          blurb: description.blurb,
          highlights: description.highlights,
        };
      }),
    [],
  );

  const handleAttachmentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;
    setAttachments(Array.from(event.target.files));
  };

  const removeAttachment = (name: string) => {
    setAttachments((prev) => prev.filter((file) => file.name !== name));
  };

  const isPaymentReady =
    Boolean(notes.trim()) &&
    Boolean(parentName.trim()) &&
    Boolean(email.trim()) &&
    Boolean(phone.trim());

  const enrollmentData: EnrollmentPaymentData = {
    parentName,
    email,
    phone,
    notes,
    attachmentNames: attachments.map((file) => file.name),
  };

  const selectedPlanLabel = useMemo(() => {
    const data = PRICING[selectedPlan];
    const description = planDescriptions[selectedPlan];
    return `${description.title} • ${(data.price / 100).toLocaleString(
      "en-AU",
      {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 0,
      },
    )}`;
  }, [selectedPlan]);

  const applyReferral = (code: string, message?: string) => {
    setPromoCode(code);
    setAppliedPromoValue(REFERRAL_VALUE);
    setAppliedPromoKind("referral");
    setPromoStatus(
      message || "Referral thank-you applied! That's $300 off your term.",
    );
  };

  const applyDiscount = (code: string, message?: string) => {
    setPromoCode(code);
    setAppliedPromoValue(LUCKY_VALUE);
    setAppliedPromoKind("discount");
    setPromoStatus(
      message || "Discount unlocked! A further $200 has been taken off.",
    );
  };

  const basePriceCents = PRICING[selectedPlan].price;
  const finalAmountCents = Math.max(100, basePriceCents - appliedPromoValue);

  const promoAdjustments = useMemo(() => {
    const list: { label: string; amount: number }[] = [];
    if (appliedPromoValue && promoCode) {
      list.push({
        label:
          appliedPromoKind === "discount"
            ? `Lucky discount (${promoCode})`
            : `Referral thank-you (${promoCode})`,
        amount: appliedPromoValue,
      });
    }
    return list;
  }, [appliedPromoValue, promoCode, appliedPromoKind]);

  const summaryContent = (
    <div className="rounded-2xl border border-white/60 dark:border-gray-700 bg-gradient-to-br from-indigo-50/80 via-white/70 to-purple-50/80 dark:from-gray-900/70 dark:via-slate-900/40 dark:to-purple-950/40 p-5 space-y-4 shadow-inner">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Summary of your enrolment
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Check everything looks right before confirming payment.
        </p>
      </div>
      <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-gray-900 dark:text-white">
            Plan:
          </span>
          <span className="text-right">{selectedPlanLabel}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="font-semibold text-gray-900 dark:text-white">
            Parent contact:
          </span>
          <span className="text-right">
            {parentName || "—"} • {email || "—"} • {phone || "—"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 dark:text-white">
            Notes:
          </span>
          <span className="leading-relaxed">
            {notes
              ? `${notes.substring(0, 140)}${notes.length > 140 ? "…" : ""}`
              : "No details added yet"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 dark:text-white">
            Files attached:
          </span>
          <span>
            {attachments.length > 0
              ? attachments.map((file) => file.name).join(", ")
              : "None"}
          </span>
        </div>
        <div className="pt-3 border-t border-white/60 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Base plan</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              AUD ${(basePriceCents / 100).toFixed(2)}
            </span>
          </div>
          {promoAdjustments.length > 0 ? (
            <div className="mt-2 space-y-1">
              {promoAdjustments.map((adj) => (
                <div
                  key={adj.label}
                  className="flex justify-between text-emerald-600 dark:text-emerald-300"
                >
                  <span>- {adj.label}</span>
                  <span>- AUD ${(adj.amount / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Have a referral or want a surprise discount? Add it above to save.
            </p>
          )}
          <div className="flex justify-between text-base font-semibold text-green-600 dark:text-green-400 mt-3">
            <span>Total today</span>
            <span>AUD ${(finalAmountCents / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-16">
      {statusMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-green-200/70 bg-green-50/80 dark:bg-green-950/40 dark:border-green-900 px-6 py-4 text-green-900 dark:text-green-200 shadow-lg">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-sm sm:text-base font-medium">{statusMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200/70 bg-red-50/80 dark:bg-red-950/40 dark:border-red-900 px-6 py-4 text-red-900 dark:text-red-200 shadow-lg">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          <p className="text-sm sm:text-base font-medium">{errorMessage}</p>
        </div>
      )}

      <section className={`${SECTION_CARD_CLASS} p-8 space-y-6`}>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Tell us about your child
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share anything—learning goals, strengths, challenges, or anecdotes.
            You can also reference any files you upload below.
          </p>
        </div>
        <textarea
          className="w-full rounded-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-inner min-h-[220px]"
          maxLength={MAX_NOTES_LENGTH}
          placeholder="Share anything (including descriptions of work samples or reports) that will help us understand your child's learning needs and goals..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Single open text field • up to {MAX_NOTES_LENGTH.toLocaleString()}{" "}
            characters
          </span>
          <span>
            {notes.length}/{MAX_NOTES_LENGTH}
          </span>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload files (optional)
          </label>
          <input
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-500/20 dark:file:text-emerald-200"
            type="file"
            onChange={handleAttachmentChange}
          />
          {attachments.length > 0 && (
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {attachments.map((file) => (
                <li
                  key={file.name}
                  className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-gray-700 bg-white/80 dark:bg-gray-900/50 px-4 py-3 shadow-sm"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    className="text-xs font-semibold text-rose-600 dark:text-rose-300 hover:underline"
                    type="button"
                    onClick={() => removeAttachment(file.name)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className={`${SECTION_CARD_CLASS} p-8 space-y-5`}>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Referral or Discount Code
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Share ZPD with friends and family to unlock referral savings.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Referral link
            </label>
            <div className="flex">
              <input
                readOnly
                className="flex-1 border-r-0 rounded-l-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-3 py-2 h-10 text-sm text-gray-500 dark:text-gray-400"
                value={referralLink || ""}
              />
              <button
                className="flex justify-center items-center text-center rounded-r-2xl px-4 py-2 h-10 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-200 bg-white/90 dark:bg-gray-950/40 border border-white/60 dark:border-gray-700 border-l-0"
                type="button"
                onClick={() => {
                  if (!referralLink) {
                    // Generate a referral code for the URL only
                    const code = `REF-${Math.random()
                      .toString(36)
                      .toUpperCase()
                      .slice(2, 8)}`;
                    try {
                      if (typeof window !== "undefined") {
                        const url = new URL(window.location.href);
                        url.searchParams.set("ref", code);
                        url.searchParams.set("plan", selectedPlan);
                        const fullLink = url.toString();
                        setReferralLink(fullLink);
                        if (
                          navigator &&
                          navigator.clipboard &&
                          navigator.clipboard.writeText
                        ) {
                          navigator.clipboard
                            .writeText(fullLink)
                            .then(() => {
                              setPromoStatus(
                                "Referral link generated and copied to your clipboard!",
                              );
                            })
                            .catch(() => {
                              setPromoStatus(
                                "Referral link generated. Copy and share it with up to two families.",
                              );
                            });
                        } else {
                          setPromoStatus(
                            "Referral link generated. Copy and share it with up to two families.",
                          );
                        }
                      }
                    } catch {
                      // ignore URL errors in non-browser environments
                    }
                  } else {
                    // Just copy existing link
                    if (
                      navigator &&
                      navigator.clipboard &&
                      navigator.clipboard.writeText
                    ) {
                      navigator.clipboard
                        .writeText(referralLink)
                        .then(() => {
                          setPromoStatus(
                            "Referral link copied to your clipboard!",
                          );
                        })
                        .catch(() => {
                          setPromoStatus(
                            "Referral link ready. Copy and share it with up to two families.",
                          );
                        });
                    } else {
                      setPromoStatus(
                        "Referral link ready. Copy and share it with up to two families.",
                      );
                    }
                  }
                }}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Referral or discount code
            </label>
            <div className="flex gap-2">
              {/* Promo code input */}
              <input
                className="flex-1 rounded-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-sm"
                placeholder="Paste a code or generate one below"
                type="text"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
              />
              {/* Apply/Remove button */}
              <button
                className={`rounded-2xl px-4 py-2 text-sm font-semibold inline-flex items-center justify-center ${
                  appliedPromoValue > 0 || promoCode.trim()
                    ? "bg-emerald-500 text-white shadow-lg transition-colors duration-200 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed shadow-none"
                }`}
                disabled={appliedPromoValue === 0 && !promoCode.trim()}
                type="button"
                onClick={() => {
                  if (appliedPromoValue > 0) {
                    setAppliedPromoValue(0);
                    setPromoCode("");
                    setAppliedPromoKind(null);
                    setPromoStatus("");
                  } else {
                    if (!promoCode.trim()) return;
                    applyReferral(
                      promoCode.trim().toUpperCase(),
                      "Referral code applied! $300 has been taken off your term.",
                    );
                  }
                }}
              >
                {appliedPromoValue > 0 ? "Remove" : "Apply"}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {appliedPromoValue === 0 && (
              <button
                className={`rounded-2xl px-4 py-2 text-xs font-semibold inline-flex items-center gap-2 ${
                  appliedPromoValue > 0
                    ? "border-gray-300 bg-gray-100 text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed shadow-none"
                    : "border border-emerald-500 bg-white text-emerald-700 shadow-md transition-colors duration-200 hover:bg-emerald-50 hover:border-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none dark:bg-gray-900 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950/20"
                }`}
                disabled={appliedPromoValue > 0}
                type="button"
                onClick={() => {
                  if (promoCode.trim() === "") {
                    const lucky = `LUCKY-${Math.random()
                      .toString(36)
                      .toUpperCase()
                      .slice(2, 7)}`;
                    setPromoCode(lucky);
                  }
                }}
              >
                I'm feeling lucky
              </button>
            )}
          </div>
        </div>
        {promoStatus && (
          <div className="rounded-2xl border border-emerald-200/70 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-900/40 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200 shadow-inner">
            {promoStatus}
          </div>
        )}
      </section>

      <section className={`${SECTION_CARD_CLASS} p-8 space-y-8`}>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Choose your plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Mirrors the cards on our pricing page so you always know what you’re
            selecting.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {planCards.map((plan) => {
            const isSelected = plan.id === selectedPlan;
            const cardClasses = isSelected
              ? "border-emerald-500 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-100/80 dark:from-emerald-900/40 dark:via-gray-900/60 dark:to-green-900/30 shadow-emerald-200/60 dark:shadow-emerald-900/30 ring-2 ring-emerald-200/60 dark:ring-emerald-500/30"
              : "border-white/50 dark:border-gray-700/60 bg-white/85 dark:bg-gray-900/40 hover:border-emerald-200/80 dark:hover:border-emerald-500/40 shadow-sm hover:shadow-lg";
            const priceClasses = isSelected
              ? "text-3xl font-bold text-green-600 dark:text-green-400"
              : "text-2xl font-semibold text-gray-500 dark:text-gray-400";
            return (
              <button
                key={plan.id}
                className={`relative text-left rounded-3xl border-2 p-6 transition-all duration-300 ${cardClasses}`}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
              >
                {isSelected && (
                  <span className="absolute -top-3 right-6 rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold tracking-[0.3em] text-white shadow-lg">
                    SELECTED
                  </span>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {plan.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.blurb}
                    </p>
                  </div>
                </div>
                <div className={`${priceClasses} mb-2`}>{plan.price}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.sessionsPerTerm} sessions / term
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </section>

      <section className={`${SECTION_CARD_CLASS} p-8 space-y-6`}>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Payment details
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We&apos;ll send confirmations to the contact below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Parent or guardian name
            </label>
            <input
              className="w-full rounded-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-sm"
              placeholder="Jordan Lee"
              type="text"
              value={parentName}
              onChange={(event) => setParentName(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              className="w-full rounded-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-sm"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              className="w-full rounded-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-sm"
              placeholder="+61 400 000 000"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>

        <PaymentForm
          adjustments={promoAdjustments}
          amountOverrideCents={finalAmountCents}
          enrollmentData={enrollmentData}
          isReady={isPaymentReady}
          planType={selectedPlan}
          submitLabel="Confirm & Pay"
          summarySlot={summaryContent}
          onPaymentError={(message) => {
            setErrorMessage(message);
            setStatusMessage(null);
          }}
          onPaymentSuccess={() => {
            setStatusMessage(
              "Payment successful! You’ll receive a confirmation email shortly.",
            );
            setErrorMessage(null);
          }}
        />

        {!isPaymentReady && (
          <p className="text-sm text-amber-600">
            Add enrolment details plus contact information to enable payment.
          </p>
        )}
      </section>
    </div>
  );
};

export default EnrollmentForm;
