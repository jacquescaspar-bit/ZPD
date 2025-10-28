"use client";

import { useState, useEffect } from "react";
import Hero from "@/Hero";
import About from "@/About";
import Parents from "@/Parents";
import Tutors from "@/Tutors";
import Contact from "@/Contact";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(0);
  const [navOpacity, setNavOpacity] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
      const maxScroll = Number(vh); // 100% vh for more gradual transition
      const opacity = Math.min((scrollY / maxScroll) * 0.3, 0.3);
      setNavOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuOpacity = 0.3;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Full-screen background behind navigation */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />

      {/* Sticky Navigation */}
      <nav
        className="sticky top-0 z-20 backdrop-blur-md px-6 py-4 min-h-16 relative transition-all duration-500"
        style={{
          backgroundColor: `rgba(${isDark ? "0, 0, 0" : "255, 255, 255"}, ${navOpacity})`,
        }}
      >
        <div className="flex items-end justify-between w-full">
          <a
            className={`text-4xl whitespace-nowrap ${isMobile ? "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" : "-mt-3"}`}
            href="#"
            style={{ letterSpacing: "0.07em" }}
          >
            <span className="font-normal" style={{ fontFamily: "antipasto" }}>
              ZPD
            </span>
            <span
              className="font-light"
              style={{ fontFamily: "antipasto", letterSpacing: "0.056em" }}
            >
              {" "}
              learning
            </span>
          </a>
          <div
            className={`absolute right-6 bottom-4 flex flex-row items-baseline space-x-6 transition-opacity duration-500 ${isMobile ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <a
              className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-center"
              href="#contact"
              style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            >
              Contact
            </a>
            <a
              className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-center"
              href="#tutors"
              style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            >
              Tutors
            </a>
            <a
              className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-center"
              href="#parents"
              style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            >
              Parents
            </a>
            <a
              className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-center"
              href="#about"
              style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            >
              About
            </a>
            <a
              className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-center"
              href="#contact"
              style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            >
              Book
            </a>
          </div>
        </div>
        <button
          className={`absolute left-6 top-1/2 -translate-y-1/2 transition-opacity duration-500 ${isMobile ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-6 relative">
            <span
              className={`absolute top-1.5 left-0 w-6 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : ""}`}
            />
            <span
              className={`absolute bottom-1.5 left-0 w-6 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 w-full backdrop-blur-md shadow-lg z-30 flex flex-col justify-start items-start space-y-4 py-4 pl-6 pr-6 transition-opacity duration-300 md:opacity-0 md:pointer-events-none ${isMobile && isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          backgroundColor: `rgba(${isDark ? "0, 0, 0" : "255, 255, 255"}, ${menuOpacity})`,
        }}
      >
        <a
          className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          href="#contact"
          style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
          onClick={() => setIsOpen(false)}
        >
          Book
        </a>
        <a
          className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          href="#about"
          style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
          onClick={() => setIsOpen(false)}
        >
          About
        </a>
        <a
          className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          href="#parents"
          style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
          onClick={() => setIsOpen(false)}
        >
          Parents
        </a>
        <a
          className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          href="#tutors"
          style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
          onClick={() => setIsOpen(false)}
        >
          Tutors
        </a>
        <a
          className="text-2xl font-light text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          href="#contact"
          style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
      </div>

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
        className="fixed bottom-8 right-8 w-14 h-14 bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/30 border border-white/20 text-gray-900 dark:text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50"
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
