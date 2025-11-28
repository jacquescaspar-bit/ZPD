"use client";

import React, { useState, useEffect, useCallback } from "react";

const PricingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);

  const pricingCards = [
    // Essential
    <div
      key="essential"
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Essential
      </h3>
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        $790
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        10 sessions/term upfront (~$79/hr)
      </p>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">1 subject</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Standard tutor
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">Online only</span>
        </li>
      </ul>
      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
        Select Essential
      </button>
    </div>,

    // Core - Most Popular
    <div
      key="core"
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 ring-2 ring-green-500 dark:ring-green-400 relative h-full"
    >
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Core ★
      </h3>
      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
        $1,340
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        20 sessions/term upfront (~$67/hr)
      </p>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Multi-subject
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            ATAR/HSC specialist tutor
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Fortnightly reports
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Priority scheduling
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Free trial credit included
          </span>
        </li>
      </ul>
      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
        Select Core
      </button>
    </div>,

    // Advanced
    <div
      key="advanced"
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Advanced
      </h3>
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        $1,890
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        30 sessions/term upfront (~$63/hr)
      </p>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Unlimited within term
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Dedicated 99+ ATAR tutor
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Weekly parent calls
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            In-person metro option
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">
            Exam resources pack
          </span>
        </li>
      </ul>
      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
        Select Advanced
      </button>
    </div>,
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pricingCards.length);
  }, [isTransitioning, pricingCards.length]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + pricingCards.length) % pricingCards.length,
    );
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartTime(Date.now());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const timeDiff = Date.now() - touchStartTime;
    const velocity = timeDiff > 0 ? Math.abs(distance) / timeDiff : 0;
    const isSwipe =
      Math.abs(distance) > 30 || (Math.abs(distance) > 20 && velocity > 0.3);
    if (isSwipe) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance carousel every 5 seconds (only on mobile)
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isMobile, nextSlide]);

  if (!isMobile) {
    // Desktop: Show all cards in grid layout
    return <div className="grid md:grid-cols-3 gap-8">{pricingCards}</div>;
  }

  // Mobile: Carousel with peeking slides
  return (
    <div className="relative overflow-visible">
      <div className="flex items-stretch justify-center px-4">
        <div
          className={`flex items-center ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
          style={{
            transform: `translateX(calc(50% - ${currentIndex * 320}px - 144px))`,
          }}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTransitionEnd={handleTransitionEnd}
        >
          {pricingCards.map((card, index) => (
            <div
              key={`pricing-slide-${index}`}
              className={`flex-shrink-0 w-72 mx-4 h-full transition-all duration-300 cursor-pointer rounded-2xl ${
                index === currentIndex
                  ? "scale-100 opacity-100 ring-2 ring-blue-500"
                  : "scale-90 opacity-60"
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="max-w-sm mx-auto h-full">{card}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {pricingCards.map((_, index) => (
          <button
            key={`dot-${index}`}
            aria-label={`Go to pricing option ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingCarousel;
