"use client";

import { useState, useEffect } from "react";
import Hero from "@/Hero";
import About from "@/About";
import Parents from "@/Parents";
import Tutors from "@/Tutors";
import Contact from "@/Contact";

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(0);

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

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
    <div className="min-h-screen flex flex-col relative">
      {/* Full-screen background behind navigation */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />

      {/* Hero Section */}
      <Hero />

      {/* Sections */}
      <About />
      <Parents />
      <Tutors />
      <Contact />

      {/* Back to Top Button */}
      <button
        aria-label="Back to top"
        className="fixed bottom-8 right-6 w-12 h-12 bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 border border-white/20 text-gray-900 dark:text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50"
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
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
        >
          <polyline points="18,15 12,9 6,15" />
        </svg>
      </button>
    </div>
  );
};

export default Home;
