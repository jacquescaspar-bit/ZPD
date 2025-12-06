"use client";

import { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";

const antipasto = localFont({
  src: [
    {
      path: "../public/antipasto/Antipasto_extralight.otf",
      weight: "200",
    },
    {
      path: "../public/antipasto/Antipasto_regular.otf",
      weight: "400",
    },
    {
      path: "../public/antipasto/Antipasto_extrabold.otf",
      weight: "800",
    },
  ],
});

const Hero = () => {
  const [hideCta, setHideCta] = useState(false);
  const [ctaThreshold, setCtaThreshold] = useState(0);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
    <main className="min-h-screen md:min-h-[calc(var(--vh,1vh)*100-4rem)] flex flex-col justify-center items-center px-6 relative overflow-hidden z-10">
      <div className="text-center flex flex-col items-center justify-center relative z-10 animate-fade-in-up">
        {/* ZPD */}
        <div className="text-6xl sm:text-7xl md:text-9xl font-bold uppercase mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ZPD
        </div>

        {/* Learning */}
        <div
          className={`${antipasto.className} text-4xl sm:text-5xl md:text-6xl font-[200] text-center text-gray-700 dark:text-gray-300 mb-8`}
        >
          <span className="tracking-wide">
            where{" "}
            <span className="font-[400] text-blue-600 dark:text-blue-400">
              learning
            </span>{" "}
            happens
          </span>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-8 transition-opacity duration-500 ${hideCta ? "opacity-0" : "opacity-100"}`}
        >
          <a
            ref={ctaRef}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg tracking-wide inline-block"
            href="/enrol"
            id="cta-button"
          >
            Enrol
          </a>
        </div>
      </div>
    </main>
  );
};

export default Hero;
