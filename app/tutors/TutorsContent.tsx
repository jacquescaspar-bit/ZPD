"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarCheck,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const parentHighlights = [
  {
    title: "Classroom-active teachers",
    body: "Our tutors are casually or part-time engaged in local schools — not uni students winging it or retirees guessing at the syllabus. They understand current curriculum, teaching methods, and what your child faces daily.",
    icon: GraduationCap,
    accent: "from-indigo-600 to-indigo-700",
  },
  {
    title: "Rigorously vetted",
    body: "Every tutor holds a current Working With Children Check, brings at least two years of tutoring experience, and participates in ongoing professional development before they work with families.",
    icon: ShieldCheck,
    accent: "from-indigo-600 to-indigo-700",
  },
  {
    title: "Planned before sessions",
    body: "We gather parent insights, school context, and goals before tutoring begins — then build a learning sequence your tutor delivers and refines. Not improvised homework help week to week.",
    icon: BookOpen,
    accent: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Term momentum",
    body: "Same tutor, same weekly rhythm, compounding progress. Term plans foster the parent–tutor–student partnership that moves learning forward.",
    icon: CalendarCheck,
    accent: "from-indigo-600 to-indigo-700",
  },
];

const joinBenefits = [
  "Competitive per-session contractor pay",
  "No client-hunting or unpaid admin",
  "Session planning and parent intake handled for you",
  "Matched families — online or in-home near schools you know",
  "Current WWCC required — you join a vetted tutor network",
  "Term plans — families commit to a sequence, not one-off gigs",
];

const blogLinks = [
  {
    href: "/blog/tutor-fit-not-just-subject",
    label: "Finding the right tutor fit",
  },
  {
    href: "/blog/classroom-active-tutors",
    label: "Teachers still in classrooms",
  },
  {
    href: "/blog/is-tutoring-the-right-fit",
    label: "Is tutoring the right fit?",
  },
];

const TutorsContent = () => {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => scrollToSection(hash), 100);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <PageShell>
      <Nav />

      <div className="relative z-10 px-6 pt-16 pb-12">
        <Container size="lg">
          {/* Hero */}
          <section className="text-center pb-12">
            <h1
              className="text-4xl sm:text-6xl font-semibold mb-4 text-gray-900 dark:text-white leading-tight"
              style={{ letterSpacing: "0.02em" }}
            >
              Our tutors
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Structured support in the Zone of Proximal Development — for
              families choosing tutoring, and teachers who want to join our
              network.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <button
                className="group rounded-2xl border border-gray-200/80 bg-white/95 dark:bg-gray-800/95 dark:border-gray-700/80 p-6 sm:p-8 text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                type="button"
                onClick={() => scrollToSection("our-tutors")}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md">
                  <Users aria-hidden className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  For parents
                </p>
                <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Choosing tutoring for your child?
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Learn who teaches with ZPD and what to expect from a term
                  plan.
                </p>
                <span className="inline-block mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  Learn more &rarr;
                </span>
              </button>

              <button
                className="group rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-stone-50 dark:from-indigo-950/60 dark:via-gray-800/95 dark:to-stone-950/60 dark:border-indigo-700/80 p-6 sm:p-8 text-left shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                type="button"
                onClick={() => scrollToSection("join")}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md">
                  <GraduationCap aria-hidden className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  For teachers
                </p>
                <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Classroom teacher?
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Tutor with us — we run the plan, parents, and business side.
                </p>
                <span className="inline-block mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  Join our network &rarr;
                </span>
              </button>
            </div>
          </section>
        </Container>

        {/* Join band */}
        <section className="scroll-mt-24 relative overflow-hidden" id="join">
          <div className="absolute inset-0 bg-indigo-700" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 0%, transparent 45%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)",
            }}
          />
          <Container className="relative py-14 sm:py-16" size="md">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2
                className="text-2xl sm:text-4xl font-light mb-4"
                style={{
                  fontFamily: "var(--font-antipasto)",
                  letterSpacing: "0.08em",
                }}
              >
                Teach in the zone
              </h2>
              <p className="text-indigo-100 mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                We run the plan, the parents, and the business. You teach.
              </p>
              <ul className="text-left max-w-lg mx-auto space-y-3 mb-10">
                {joinBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm sm:text-base text-indigo-50"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                className="inline-flex items-center justify-center rounded-full bg-white text-indigo-700 px-8 py-3.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                href="/contact?role=tutor"
              >
                Express interest
              </Link>
              <p className="mt-4 text-sm text-indigo-200">
                Casual or part-time classroom teachers · WWCC required
              </p>
            </div>
          </Container>
        </section>

        {/* Parent section */}
        <Container className="py-16 sm:py-20" size="lg">
          <section className="scroll-mt-24" id="our-tutors">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4"
                style={{
                  fontFamily: "var(--font-antipasto)",
                  letterSpacing: "0.08em",
                }}
              >
                Who teaches with ZPD
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
                A decentralised network of classroom-active teachers across
                Australia — online or in-home — combining local insight with
                nationwide reach.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {parentHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200/80 bg-white/95 dark:bg-gray-800/95 dark:border-gray-700/80 p-6 sm:p-7 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
                    >
                      <Icon aria-hidden className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white/90 dark:bg-gray-800/90 dark:border-gray-700/80 p-6 sm:p-8 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Read more about our approach
              </h3>
              <ul className="space-y-3">
                {blogLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline text-sm sm:text-base font-medium"
                      href={link.href}
                    >
                      <BookOpen aria-hidden className="h-4 w-4 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Container>

        {/* Bottom CTA */}
        <section className="px-6 pb-8">
          <Container size="md">
            <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 px-6 py-12 text-center shadow-xl dark:border-gray-700/80 dark:bg-gray-800/95 sm:px-10 sm:py-14">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5 bg-[var(--primary)]"
              />
              <h2
                className="font-antipasto mb-3 text-3xl font-light text-gray-900 dark:text-white sm:text-4xl"
                style={{ letterSpacing: "0.08em" }}
              >
                Ready to start?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base text-gray-600 dark:text-gray-400 sm:text-lg leading-relaxed">
                Begin with a diagnostic discovery session — we&apos;ll learn
                about your child and build a plan before tutoring starts.
              </p>
              <Link
                className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-8 py-4 text-lg font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                href="/enrol?plan=trial"
              >
                Start with a Diagnostic
              </Link>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Classroom teacher interested in tutoring with us?{" "}
                <button
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  type="button"
                  onClick={() => scrollToSection("join")}
                >
                  See Join above
                </button>
              </p>
            </div>
          </Container>
        </section>
      </div>
    </PageShell>
  );
};

export default TutorsContent;
