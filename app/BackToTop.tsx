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
      className="fixed bottom-8 right-6 w-12 h-12 bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 border border-white/20 text-gray-900 dark:text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50"
      style={{
        opacity: showBackToTop,
        pointerEvents: showBackToTop > 0 ? "auto" : "none",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default BackToTop;
