"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Six weeks in, she stopped dreading maths homework. That's the bit I cared about.",
    author: "Parent of a Year 9 student",
    role: "Sydney",
  },
  {
    quote:
      "The tutor explained things in plain language — I finally understood what she was working on each week.",
    author: "Parent of a Year 7 student",
    role: "Melbourne",
  },
  {
    quote:
      "I get stuck less now. They don't just hand me the answer — they help me work it out.",
    author: "Year 10 student",
    role: "Online tutoring",
  },
  {
    quote:
      "His report wasn't glowing, but for the first time he could tell me what he was learning. That felt like progress.",
    author: "Parent of a Year 8 student",
    role: "Brisbane",
  },
  {
    quote:
      "We'd tried a few things that didn't stick. This one fit — same tutor, same time each week, no drama getting started.",
    author: "Parent of twin Year 5 students",
    role: "Canberra",
  },
  {
    quote:
      "When I don't get it, they break it into smaller steps. Maths still isn't my favourite — but I'm not scared of it anymore.",
    author: "Year 5 student",
    role: "In-home tutoring",
  },
];

const ROTATE_MS = 12000;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + testimonials.length) % testimonials.length);
  }, []);

  const goNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(goNext, ROTATE_MS);
    return () => clearInterval(timer);
  }, [goNext, isPaused, prefersReducedMotion]);

  const current = testimonials[currentIndex];

  return (
    <section
      className="relative z-10 flex min-h-screen flex-col justify-center bg-white/70 px-6 backdrop-blur-sm dark:bg-gray-900/70"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto w-full max-w-3xl py-16 text-center">
        <h2
          className="font-antipasto mb-3 text-4xl font-light text-gray-900 dark:text-white sm:text-5xl"
          style={{ letterSpacing: "0.08em" }}
        >
          What Families Say
        </h2>
        <p className="mb-12 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          Confidence, clarity, and tutors who actually understand your child.
        </p>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.article
              key={currentIndex}
              animate={{ opacity: 1, x: 0 }}
              className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 p-8 shadow-lg dark:border-gray-700/80 dark:bg-gray-800/90 sm:p-10"
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }
              }
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }
              }
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.45 }}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
              />
              <blockquote className="text-xl leading-relaxed text-gray-700 dark:text-gray-200 sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <footer className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
                  <span className="text-sm font-semibold text-white">
                    {current.author.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {current.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {current.role}
                  </p>
                </div>
              </footer>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
              type="button"
              onClick={goPrev}
            >
              Prev
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  aria-current={index === currentIndex ? "true" : undefined}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "scale-125 bg-[var(--gradient-start)]"
                      : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                  }`}
                  type="button"
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
              type="button"
              onClick={goNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
