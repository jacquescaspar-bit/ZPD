"use client";

import { useState, useEffect } from "react";

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;
      const vh = window.innerHeight;
      const threshold = vh / 2;
      if (scrollY > threshold) {
        const progress = Math.min((scrollY - threshold) / (vh / 2), 1);
        setShowBackToTop(progress);
      } else {
        setShowBackToTop(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      className="fixed bottom-8 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300/70 bg-white/85 text-gray-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-2xl dark:border-white/20 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900"
      style={{
        opacity: showBackToTop,
        pointerEvents: showBackToTop > 0 ? "auto" : "none",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg
        fill="none"
        height="20"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="20"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default BackToTop;
