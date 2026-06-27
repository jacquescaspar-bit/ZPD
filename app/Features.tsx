"use client";

import { useState, useEffect } from "react";

const items = [
  {
    id: "active-classroom-tutors",
    featured: true,
    title: "Tutors who teach in classrooms near you",
    teaser:
      "Casual teachers actively working in local schools — curriculum-relevant, WWCC-cleared, and connected to what's happening in classrooms near you.",
    detail: [
      "Our tutors are classroom-active — not uni students winging it or retirees guessing at the syllabus. They're actively engaged in local schools, so they understand current curriculum, teaching methods, and assessment expectations your child faces daily.",
      "Every tutor is rigorously vetted, holds a current Working With Children Check, participates in ongoing professional development, and brings at least two years of tutoring experience.",
      "Our decentralised network spans Australia — online or in-home — combining local insight with nationwide reach.",
    ],
    iconPath:
      "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
  },
  {
    id: "planned-before-sessions",
    title: "We plan before we tutor",
    teaser:
      "Before the first session, we gather parent insights, school and teacher context, and build a tailored learning sequence — not improvised week to week.",
    detail: [
      "Our diagnostic discovery and insights intake capture your child's goals, challenges, and learning style. We elicit input from schools and teachers where possible, so plans reflect what's actually happening in the classroom.",
      "Learning sequences are built before tutoring begins and reviewed regularly throughout the term.",
      "We use AI to organise intake data and refine sequences after each session — informed by student work, parent feedback, and tutor notes. Technology supports the plan; your tutor delivers the learning. Tutors remain responsible for instruction, judgement, and the relationship with your child. No shortcuts around understanding or effort.",
    ],
    iconPath:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    id: "term-commitment",
    title: "Term plans that build momentum",
    teaser:
      "We don't do pay-as-you-go. Term plans build momentum and foster the parent–tutor–student partnership that moves learning forward.",
    detail: [
      "One-off sessions encourage transactional tutoring. We ask families to commit to a term because it signals investment — from you and from us.",
      "That commitment enables the three-way partnership between parents, tutors, and students that sits at the heart of effective learning.",
      "Same tutor, same weekly rhythm, compounding progress. Parents stay engaged; tutors can plan ahead; students build habits rather than starting cold each time.",
    ],
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: "parent-coaching",
    title: "Parent coaching in plain language",
    teaser:
      "We translate what your child is working on into terms you can engage with — so you can take a genuine interest in their schoolwork, not guess at progress.",
    detail: [
      "Educational jargon creates distance between parents and children. Our coaching sessions demystify the content and cognitive sequence your child is navigating — what they're learning, why it matters, and how you can support without becoming the teacher.",
      "You'll learn effective questions to ask, what progress looks like at each stage, and how to stay connected to the learning journey without pressure or confusion.",
    ],
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    id: "zpd-by-design",
    title: "ZPD isn't our gimmick — it's our method",
    teaser:
      "Scaffolded learning at the edge of what your child can do with support — deliberate in every plan and session, not a marketing label.",
    detail: [
      "Our approach is rooted in Lev Vygotsky's Zone of Proximal Development: the space where students achieve more with guidance than alone.",
      "We target challenging yet achievable tasks, gradually reduce scaffolding as competence grows, and emphasise potential over current ability.",
      "Rather than dumping content, we design experiences that extend comfort zones while guaranteeing success — building confidence, independence, and problem-solving along the way. We name it ZPD because it shapes how we plan, teach, and measure progress.",
    ],
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

const Features = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (expandedId && Math.abs(currentScrollY - lastScrollY) > 80) {
        setExpandedId(null);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedId, lastScrollY]);

  return (
    <section
      className="relative z-10 px-6 py-20 sm:py-24 bg-gray-100/90 backdrop-blur-sm dark:bg-gray-900/95"
      id="features"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-12 text-center">
          <h2
            className="font-antipasto mb-3 text-4xl font-light text-gray-900 dark:text-white sm:text-5xl"
            style={{ letterSpacing: "0.08em" }}
          >
            The ZPD Difference
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Five ways we put the ZPD into practice. Tap any point to read more.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <article
                key={item.id}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white/90 text-left shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 ${
                  item.featured
                    ? "border-[var(--gradient-start)]/30 dark:border-[var(--gradient-start)]/40"
                    : "border-gray-200/80 dark:border-gray-700/80"
                } ${isExpanded ? "shadow-xl" : ""}`}
                onClick={() => toggleExpand(item.id)}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
                />
                <div className="flex items-start gap-5 p-6 sm:p-7">
                  <div
                    className={`flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] shadow-md ${
                      item.featured ? "h-14 w-14" : "h-12 w-12"
                    }`}
                  >
                    <svg
                      aria-hidden
                      className={`text-white ${item.featured ? "h-7 w-7" : "h-6 w-6"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d={item.iconPath}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`font-semibold text-gray-900 dark:text-white ${
                          item.featured
                            ? "text-xl sm:text-2xl"
                            : "text-lg sm:text-xl"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span
                        aria-hidden
                        className={`mt-1 flex-shrink-0 text-gray-400 transition-transform duration-200 dark:text-gray-500 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.teaser}
                    </p>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isExpanded
                          ? "max-h-[900px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                        {item.detail.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-base leading-relaxed text-gray-600 dark:text-gray-300"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                    {!isExpanded && (
                      <p className="mt-3 text-sm text-gray-400 transition-colors group-hover:text-[var(--gradient-start)] dark:text-gray-500 dark:group-hover:text-[var(--gradient-end)]">
                        Read more
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
