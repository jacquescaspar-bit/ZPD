"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Container } from "@/components/ui";
import { formatAudWholeDollars, LOWEST_TERM_PLAN_PRICE } from "@/lib/constants";

const Hero = () => {
  const [hideCta, setHideCta] = useState(false);
  const [ctaThreshold, setCtaThreshold] = useState(0);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Calculate CTA threshold on mount
    const calculateThreshold = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        setCtaThreshold(rect.top + window.scrollY);
      }
    };
    // Delay to ensure layout is ready
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
      className="min-h-screen relative overflow-hidden z-10"
      style={{
        paddingTop: "0",
        paddingBottom: "var(--spacing-16)",
      }}
    >
      <Container
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        size="full"
      >
        <div className="text-center flex flex-col items-center justify-center relative z-10 animate-fade-in-up">
          {/* ZPD */}
          <div className="text-6xl sm:text-7xl md:text-9xl font-bold uppercase mb-4 text-center bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            ZPD
          </div>

          {/* Learning */}
          <div className="font-antipasto text-4xl sm:text-5xl md:text-6xl font-[200] text-center text-[var(--gray-700)] dark:text-[var(--gray-300)] mb-6">
            <span className="tracking-wide">
              <span className="text-black dark:text-white">Personalised </span>
              <span className="font-[400] text-[var(--primary)] dark:text-[var(--primary)]">
                Tutoring
              </span>
            </span>
          </div>

          <p className="mb-8 max-w-xl px-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Classroom-active tutors · Term-based plans from{" "}
            {formatAudWholeDollars(LOWEST_TERM_PLAN_PRICE)}
          </p>

          {/* CTA Button */}
          <div
            className={`mt-8 transition-opacity duration-500 ${hideCta ? "opacity-0" : "opacity-100"}`}
          >
            <Button
              ref={ctaRef}
              className="rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 tracking-wide px-6 sm:px-10 py-4 sm:py-5"
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
