import Link from "next/link";
import { SECTION_BAND_LIGHT } from "@/lib/sectionBands";

const EnrolCta = () => (
  <section
    className={`relative z-10 px-6 py-16 sm:py-20 ${SECTION_BAND_LIGHT}`}
    id="enrol-cta"
  >
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 px-6 py-12 text-center shadow-lg dark:border-gray-700/80 dark:bg-gray-800/90 sm:px-10 sm:py-14">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
      />
      <h2
        className="font-antipasto mb-3 text-3xl font-light text-gray-900 dark:text-white sm:text-4xl"
        style={{ letterSpacing: "0.08em" }}
      >
        Ready to start?
      </h2>
      <p className="mx-auto mb-8 max-w-xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
        Begin with a diagnostic discovery session — we&apos;ll learn about your
        child and build a plan before tutoring starts.
      </p>
      <Link
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-4 text-lg font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)] focus-visible:ring-offset-2"
        href="/enrol"
        id="enrol-cta-button"
      >
        Enrol Now
      </Link>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Referred by a family? They can share their code at checkout for $100 off
        Essential or Intensive plans.
      </p>
    </div>
  </section>
);

export default EnrolCta;
