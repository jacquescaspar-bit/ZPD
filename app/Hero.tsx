"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Container } from "@/components/ui";
import { formatAudWholeDollars, LOWEST_TERM_PLAN_PRICE } from "@/lib/constants";
import { SECTION_BAND_HERO } from "@/lib/sectionBands";

const Hero = () => {
  const [hideCta, setHideCta] = useState(false);
  const [ctaThreshold, setCtaThreshold] = useState(0);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const calculateThreshold = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        setCtaThreshold(rect.top + window.scrollY);
      }
    };
    setTimeout(calculateThreshold, 100);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const { scrollY } = window;
      setHideCta(scrollY > ctaThreshold - 64);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ctaThreshold]);

  return (
    <main
      className={`relative z-10 min-h-screen overflow-hidden ${SECTION_BAND_HERO}`}
      style={{
        paddingTop: "0",
        paddingBottom: "var(--spacing-16)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-stone-100 dark:to-stone-900"
      />

      <Container
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size="full"
      >
        <div className="relative z-10 flex animate-fade-in-up flex-col items-center justify-center text-center">
          <div className="mb-4 text-center text-6xl font-bold uppercase text-[var(--primary)] sm:text-7xl md:text-9xl">
            ZPD
          </div>

          <div className="font-antipasto mb-6 text-center text-4xl font-[200] text-[var(--gray-700)] dark:text-[var(--gray-300)] sm:text-5xl md:text-6xl">
            <span className="tracking-wide">
              <span className="text-black dark:text-white">Personalised </span>
              <span className="font-[400] text-[var(--primary)]">Tutoring</span>
            </span>
          </div>

          <p className="mb-8 max-w-xl px-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Classroom-active tutors · Term-based plans from{" "}
            {formatAudWholeDollars(LOWEST_TERM_PLAN_PRICE)}
          </p>

          <div
            className={`mt-8 transition-opacity duration-500 ${hideCta ? "opacity-0" : "opacity-100"}`}
          >
            <Button
              ref={ctaRef}
              className="rounded-full px-6 py-4 tracking-wide shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:py-5"
              id="cta-button"
              size="lg"
              variant="gradient"
              onClick={() => (window.location.href = "/enrol")}
            >
              Enrol Now
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Hero;
