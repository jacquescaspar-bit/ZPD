"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button, Container } from "@/components/ui";

const Nav = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef("/");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [_hasMounted, setHasMounted] = useState(false);
  const [showCtaInNav, setShowCtaInNav] = useState(pathname !== "/");
  const [ctaThreshold, setCtaThreshold] = useState(0);
  const [vh, setVh] = useState(0);

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
    const updateVh = () => {
      setVh(
        window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight,
      );
    };
    updateVh();
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateVh);
    }
    window.addEventListener("resize", updateVh);
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateVh);
      }
      window.removeEventListener("resize", updateVh);
    };
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
      const threshold = vh / 2;
      if (scrollY > threshold) {
        // Note: showBackToTop logic removed as it's page-specific
      } else {
        // Note: showBackToTop logic removed as it's page-specific
      }
      const maxScroll = vh; // 100% vh for more gradual transition
      const opacity =
        pathname === "/" ? Math.min((scrollY / maxScroll) * 0.2, 0.2) : 0.2;
      setNavOpacity(opacity);
      if (pathname === "/") {
        if (ctaThreshold > 0) {
          setShowCtaInNav(scrollY > ctaThreshold - 64); // 64px = 4rem nav height
        }
      } else {
        setShowCtaInNav(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ctaThreshold, pathname, vh]);

  useEffect(() => {
    setIsOpen(false);
    prevPathnameRef.current = pathname || "/";
    // Set CTA visibility on navigation
    if (pathname !== "/") {
      setShowCtaInNav(true); // Always show CTA on non-home pages
    } else {
      // For homepage, check current scroll position
      const { scrollY } = window;
      if (ctaThreshold > 0) {
        setShowCtaInNav(scrollY > ctaThreshold - 64);
      } else {
        setShowCtaInNav(false);
      }
    }
  }, [pathname, ctaThreshold]);

  useEffect(() => {
    if (typeof window === "undefined" || !isMobile) return;
    const handleScroll = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="sticky top-0 z-20 py-4 min-h-16 relative transition-all duration-500 backdrop-blur-md">
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 ${pathname === "/" ? "transition-opacity duration-500" : ""}`}
            style={{ opacity: navOpacity }}
          />
          <Container
            className="flex items-center justify-between w-full relative z-10"
            size="full"
          >
            <a
              className="text-3xl md:text-4xl whitespace-nowrap leading-tight"
              href="/"
              style={{ fontFamily: "Antipasto", letterSpacing: "0.08em" }}
            >
              <span className="font-medium">ZPD</span>
              <span className="font-light ml-1">learning</span>
            </a>
            <div className="flex flex-row items-center space-x-6 md:space-x-8">
              {pathname === "/enrol" ? (
                <a
                  className="text-lg md:text-xl text-center leading-snug relative transition-all duration-300 font-bold after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:transform after:scale-x-100"
                  href="/enrol"
                  style={
                    {
                      fontFamily: "antipasto",
                      letterSpacing: "0.1em",
                      color: "var(--gray-800)",
                      "--after-bg": "var(--gray-800)",
                    } as React.CSSProperties
                  }
                >
                  Enrol
                </a>
              ) : showCtaInNav ? (
                <Button
                  className="px-3 md:px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-lg md:text-xl tracking-wide transition-all duration-300"
                  style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
                  onClick={() => (window.location.href = "/enrol")}
                >
                  Enrol
                </Button>
              ) : (
                <a
                  className="text-lg md:text-xl text-center leading-snug relative transition-all duration-300 font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"
                  href="/enrol"
                  style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
                >
                  Enrol
                </a>
              )}
              <a
                className={`text-lg md:text-xl leading-snug relative transition-colors duration-300 ${pathname === "/services" ? "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"} text-center`}
                href="/services"
                style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
              >
                Services
              </a>
              <a
                className={`text-lg md:text-xl leading-snug relative transition-colors duration-300 ${pathname === "/method" ? "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"} text-center`}
                href="/method"
                style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
              >
                Method
              </a>
              <a
                className={`text-lg md:text-xl leading-snug relative transition-colors duration-300 ${pathname === "/blog" ? "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"} text-center`}
                href="/blog"
                style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
              >
                Blog
              </a>
              <a
                className={`text-lg md:text-xl leading-snug relative transition-colors duration-300 ${pathname === "/faq" ? "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"} text-center`}
                href="/faq"
                style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
              >
                FAQ
              </a>
            </div>
          </Container>
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

      {/* Mobile Logo */}
      {/* Mobile Logo */}
      {isMobile && isOpen && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
          <a
            className="text-3xl whitespace-nowrap leading-tight"
            href="/"
            style={{ fontFamily: "antipasto", letterSpacing: "0.08em" }}
            onClick={() => setIsOpen(false)}
          >
            <span className="font-medium">ZPD</span>
            <span className="font-light ml-1">learning</span>
          </a>
        </div>
      )}

      {/* Mobile CTA - Show on all pages except enrol */}
      {isMobile && pathname !== "/enrol" && (
        <Button
          className={`fixed bottom-8 left-8 z-50 w-24 h-12 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm tracking-wide whitespace-nowrap leading-tight ${showCtaInNav ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
          onClick={() => (window.location.href = "/enrol")}
        >
          Enrol
        </Button>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed top-0 left-0 w-full backdrop-blur-md shadow-lg z-30 flex flex-col justify-start items-start space-y-4 pt-16 pb-4 pl-6 pr-6 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <a
            className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/" ? "font-bold text-gray-600 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
            href="/"
            style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/enrol" ? "font-bold text-gray-600 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
            href="/enrol"
            style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
            onClick={() => setIsOpen(false)}
          >
            Enrol
          </a>
          <a
            className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/services" ? "font-bold text-gray-600 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
            href="/services"
            style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/method" ? "font-bold text-gray-600 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
            href="/method"
            style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
            onClick={() => setIsOpen(false)}
          >
            Method
          </a>
          <a
            className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/blog" ? "font-bold text-gray-600 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
            href="/blog"
            style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </a>
          <a
            className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/faq" ? "font-bold text-gray-600 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-600 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
            href="/faq"
            style={{ fontFamily: "antipasto", letterSpacing: "0.1em" }}
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
        </div>
      )}
    </>
  );
};

export default Nav;
