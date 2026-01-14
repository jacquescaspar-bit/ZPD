"use client";

import React from "react";
import { MAX_NOTES_LENGTH, SECTION_CARD_CLASS } from "@/enrol/constants";

interface ReviewStepProps {
  statusMessage: string | null;
  errorMessage: string | null;
  notes: string;
  setNotes: (notes: string) => void;
  attachments: File[];
  handleAttachmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (name: string) => void;
  referralLink: string | null;
  copyReferralLink: () => void;
  setStatusMessage: (message: string | null) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  statusMessage,
  errorMessage,
  notes,
  setNotes,
  attachments,
  handleAttachmentChange,
  removeAttachment,
  referralLink,
  copyReferralLink,
  setStatusMessage,
}) => (
  <div className="space-y-6">
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

    {/* Additional Details Section - Shows if notes are empty */}
    {!notes.trim() && (
      <section className={`${SECTION_CARD_CLASS} p-4 space-y-4`}>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Tell us about your child's needs
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Help us customize their learning experience. Your unique referral
            code will be sent to your email shortly!
          </p>
        </div>
        <textarea
          className="w-full rounded-2xl border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-inner min-h-[120px]"
          maxLength={MAX_NOTES_LENGTH}
          placeholder="Share anything that will help us understand your child's learning needs and goals..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        {notes.length > MAX_NOTES_LENGTH && (
          <div className="text-sm text-red-600 dark:text-red-400">
            Maximum 8000 characters - {notes.length}/8000
          </div>
        )}

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
        <button
          className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition-colors duration-200"
          onClick={() => {
            // Here you could submit to an API or just update local state
            setStatusMessage(
              "Details submitted successfully! We'll use this to customize your child's learning experience.",
            );
          }}
        >
          Submit Details
        </button>
      </section>
    )}

    {/* Referral Program Section - Shows after successful payment */}
    <section className={`${SECTION_CARD_CLASS} p-8 space-y-6`}>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          🎉 Refer a Friend & Save Big
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You've received a unique referral code via email! Share it with
          friends and family. When they use your code to enrol in Essential or
          Intensive plans, you'll receive a new referral code to share. This
          creates a chain of referrals where everyone saves $100!
        </p>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">↗</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Referral Link
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share this link to earn $200 off your next term
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            readOnly
            className="flex-1 border border-white/60 dark:border-gray-700 bg-white/90 dark:bg-gray-950/40 px-4 py-3 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none shadow-sm text-sm"
            value={referralLink ?? ""}
          />
          <button
            className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-colors duration-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            type="button"
            onClick={copyReferralLink}
          >
            Copy Link
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Get $100 off for each successful referral
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Your referrals get $100 off Essential/Intensive
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              Referral chain propagates infinitely
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-700 dark:text-gray-300">
              New codes generated automatically
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ReviewStep;
