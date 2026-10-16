"use client";

import Link from "next/link";
import { useState } from "react";

const GuideCta = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message:
            "Guide request: please email me the PDF of 'Is tutoring actually the right fit?'",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(
          data.error ?? "Something went wrong. Please try again.",
        );
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section className="no-print mt-10 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-800/95 p-6 sm:p-8 shadow-sm text-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Want a hand working out the right level for your child?
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Start with a Discovery session. We learn about your child, check where
        they sit, and map out a plan. The $110 is credited to your term if you
        continue.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-6 py-2.5 font-medium text-white shadow hover:scale-105 transition-transform"
          href="/enrol?plan=trial"
        >
          Book a Discovery session
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 px-6 py-2.5 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          href="/contact"
        >
          Ask a question first
        </Link>
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Prefer a copy for later? Leave your email and we&apos;ll send the PDF.
        </p>
        {status === "sent" ? (
          <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-400">
            Thanks, it&apos;s on its way shortly.
          </p>
        ) : (
          <form
            className="mt-3 flex flex-col sm:flex-row gap-2 justify-center"
            onSubmit={(e) => void onSubmit(e)}
          >
            <input
              required
              aria-label="Your name"
              className="rounded-full border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-2 text-sm"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              aria-label="Your email"
              className="rounded-full border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-2 text-sm"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="rounded-full border border-gray-300 dark:border-gray-600 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-60"
              disabled={status === "sending"}
              type="submit"
            >
              {status === "sending" ? "Sending…" : "Email me the PDF"}
            </button>
          </form>
        )}
        {status === "error" ? (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        ) : null}
      </div>
    </section>
  );
};

export default GuideCta;
