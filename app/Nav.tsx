"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button, Container } from "@/components/ui";
import { NAV_ITEMS, NavLink } from "@/NavLinks";

const Nav = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef("/");
  const [isOpen, setIsOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [showCtaInNav, setShowCtaInNav] = useState(pathname !== "/");
  const [ctaThreshold, setCtaThreshold] = useState(0);
  const [bottomCtaInView, setBottomCtaInView] = useState(false);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    if (typeof window === "undefined" || pathname !== "/") {
      setBottomCtaInView(false);
      return;
    }

    const observeBottomCta = () => {
      const bottomCta = document.getElementById("enrol-cta-button");
      if (!bottomCta) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setBottomCtaInView(entry.isIntersecting);
        },
        { threshold: 0 },
      );

      observer.observe(bottomCta);
      return observer;
    };

    let observer = observeBottomCta();
    const retryTimer = window.setTimeout(() => {
      observer ??= observeBottomCta();
    }, 500);

    return () => {
      window.clearTimeout(retryTimer);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateCtaVisibility = () => {
      if (pathname !== "/") {
        setShowCtaInNav(true);
        return;
      }

      const pastHero = ctaThreshold > 0 && window.scrollY > ctaThreshold - 64;
      setShowCtaInNav(pastHero && !bottomCtaInView);
    };

    const handleScroll = () => {
      const { scrollY } = window;
      const maxScroll = vh;
      const opacity =
        pathname === "/" ? Math.min((scrollY / maxScroll) * 0.2, 0.2) : 0.2;
      setNavOpacity(opacity);
      updateCtaVisibility();
    };

    updateCtaVisibility();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bottomCtaInView, ctaThreshold, pathname, vh]);

  useEffect(() => {
    setIsOpen(false);
    prevPathnameRef.current = pathname || "/";
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || !isOpen) return;
    const handleScroll = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-20 py-4 min-h-16 relative transition-all duration-500 backdrop-blur-md">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 ${pathname === "/" ? "transition-opacity duration-500" : ""}`}
          style={{ opacity: navOpacity }}
        />
        <Container
          className="flex items-center justify-between w-full relative z-10"
          size="full"
        >
          <a
            className="text-3xl md:text-4xl whitespace-nowrap leading-tight text-gray-900 dark:text-white"
            href="/"
            style={{
              fontFamily: "var(--font-antipasto)",
              letterSpacing: "0.08em",
            }}
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
                    fontFamily: "var(--font-antipasto)",
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
                style={{
                  fontFamily: "var(--font-antipasto)",
                  letterSpacing: "0.1em",
                }}
                onClick={() => (window.location.href = "/enrol")}
              >
                Enrol
              </Button>
            ) : (
              <a
                className="text-lg md:text-xl text-center leading-snug relative transition-all duration-300 font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"
                href="/enrol"
                style={{
                  fontFamily: "var(--font-antipasto)",
                  letterSpacing: "0.1em",
                }}
              >
                Enrol
              </a>
            )}
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                pathname={pathname || "/"}
                size="desktop"
              />
            ))}
          </div>
        </Container>
      </nav>

      {/* Mobile Hamburger */}
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="md:hidden fixed left-6 top-4 z-50 transition-opacity duration-500"
        type="button"
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

      {/* Mobile Logo */}
      {isOpen ? (
        <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-40">
          <a
            className="text-3xl whitespace-nowrap leading-tight text-gray-900 dark:text-white"
            href="/"
            style={{
              fontFamily: "var(--font-antipasto)",
              letterSpacing: "0.08em",
            }}
            onClick={() => setIsOpen(false)}
          >
            <span className="font-medium">ZPD</span>
            <span className="font-light ml-1">learning</span>
          </a>
        </div>
      ) : null}

      {/* Mobile CTA - Show on all pages except enrol and insights */}
      {pathname !== "/enrol" && pathname !== "/enrol/insights" ? (
        <Button
          className={`md:hidden fixed bottom-8 left-8 z-40 w-24 h-12 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm tracking-wide whitespace-nowrap leading-tight ${showCtaInNav ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{
            fontFamily: "var(--font-antipasto)",
            letterSpacing: "0.1em",
          }}
          onClick={() => (window.location.href = "/enrol")}
        >
          Enrol
        </Button>
      ) : null}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full z-30 flex flex-col justify-start items-start space-y-4 pt-16 pb-6 pl-6 pr-6 transition-opacity duration-300 border-b border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-blue-100/95 via-indigo-100/95 to-purple-100/95 dark:from-gray-900/95 dark:via-blue-900/95 dark:to-indigo-900/95 backdrop-blur-md shadow-lg ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <a
          className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/" ? "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
          href="/"
          style={{
            fontFamily: "var(--font-antipasto)",
            letterSpacing: "0.1em",
          }}
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>
        <a
          className={`text-xl leading-snug relative transition-colors duration-300 ${pathname === "/enrol" ? "font-bold text-gray-800 dark:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-800 dark:after:bg-gray-200 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center" : "font-light text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[1px] after:bg-gray-900 dark:after:bg-gray-200 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center"}`}
          href="/enrol"
          style={{
            fontFamily: "var(--font-antipasto)",
            letterSpacing: "0.1em",
          }}
          onClick={() => setIsOpen(false)}
        >
          Enrol
        </a>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            pathname={pathname || "/"}
            size="mobile"
            onNavigate={() => setIsOpen(false)}
          />
        ))}
      </div>
    </>
  );
};

export default Nav;
