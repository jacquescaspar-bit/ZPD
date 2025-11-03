"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [showCtaInNav, setShowCtaInNav] = useState(false);
  const [ctaThreshold, setCtaThreshold] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    checkMobile();
    setHasMounted(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Calculate CTA threshold after Hero mounts
    const calculateThreshold = () => {
      const cta = document.getElementById("cta-button");
      if (cta) {
        const rect = cta.getBoundingClientRect();
        setCtaThreshold(rect.top + window.scrollY);
      }
    };
    // Delay to ensure Hero is rendered
    setTimeout(calculateThreshold, 200);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const { scrollY } = window;
      const vh = window.innerHeight;
      const threshold = vh / 2;
      if (scrollY > threshold) {
        // Note: showBackToTop logic removed as it's page-specific
      } else {
        // Note: showBackToTop logic removed as it's page-specific
      }
      const maxScroll = Number(vh); // 100% vh for more gradual transition
      const opacity = Math.min((scrollY / maxScroll) * 0.3, 0.3);
      setNavOpacity(opacity);
      if (ctaThreshold > 0) {
        setShowCtaInNav(scrollY > ctaThreshold - 64); // 64px = 4rem nav height
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ctaThreshold]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || !isMobile) return;
    const handleScroll = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const menuOpacity = 0.3;

  return hasMounted ? (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav
          className="sticky top-0 z-20 backdrop-blur-md px-6 py-4 min-h-16 relative transition-all duration-500"
          style={{
            backgroundColor: `rgba(${isDark ? "0, 0, 0" : "255, 255, 255"}, ${navOpacity})`,
          }}
        >
          <div className="flex items-center justify-between w-full">
            <a
              className="text-4xl whitespace-nowrap"
              href="/"
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
            <div className="flex flex-row items-center space-x-6">
              <button
                className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 text-sm tracking-wide ${showCtaInNav ? "opacity-100" : "opacity-0"}`}
                type="button"
              >
                Book Now
              </button>
              <a
                className={`text-2xl ${pathname === "/parents" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300 text-center`}
                href="/parents"
                style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
              >
                Parents
              </a>
              <a
                className={`text-2xl ${pathname === "/tutors" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300 text-center`}
                href="/tutors"
                style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
              >
                Tutors
              </a>
              <a
                className={`text-2xl ${pathname === "/about" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300 text-center`}
                href="/about"
                style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
              >
                About
              </a>
              <a
                className={`text-2xl ${pathname === "/contact" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300 text-center`}
                href="/contact"
                style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          className="fixed left-6 top-4 z-50 transition-opacity duration-500"
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
      )}

      {/* Mobile CTA */}
      {isMobile && (
        <button
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-24 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm tracking-wide whitespace-nowrap flex items-center justify-center ${showCtaInNav ? "opacity-100" : "opacity-0"}`}
        >
          Book Now
        </button>
      )}

      {/* Mobile Logo */}
      {/* Mobile Logo */}
      {isMobile && isOpen && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
          <a
            className="text-4xl whitespace-nowrap"
            href="/"
            style={{ letterSpacing: "0.07em" }}
            onClick={() => setIsOpen(false)}
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
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed top-0 left-0 w-full backdrop-blur-md shadow-lg z-30 flex flex-col justify-start items-start space-y-4 pt-16 pb-4 pl-6 pr-6 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{
            backgroundColor: `rgba(${isDark ? "0, 0, 0" : "255, 255, 255"}, ${menuOpacity})`,
          }}
        >
          <a
            className={`text-2xl ${pathname === "/parents" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300`}
            href="/parents"
            style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            onClick={() => setIsOpen(false)}
          >
            Parents
          </a>
          <a
            className={`text-2xl ${pathname === "/tutors" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300`}
            href="/tutors"
            style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            onClick={() => setIsOpen(false)}
          >
            Tutors
          </a>
          <a
            className={`text-2xl ${pathname === "/about" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300`}
            href="/about"
            style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            className={`text-2xl ${pathname === "/contact" ? "font-normal text-blue-600 dark:text-blue-400" : "font-light text-gray-900 dark:text-white"} hover:text-gray-700 dark:hover:text-gray-300`}
            href="/contact"
            style={{ fontFamily: "antipasto", letterSpacing: "0.12em" }}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </>
  ) : null;
};

export default Nav;
