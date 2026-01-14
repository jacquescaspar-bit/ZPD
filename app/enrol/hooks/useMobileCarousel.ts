import { useState, useEffect, useCallback, useRef } from "react";

export const useMobileCarousel = () => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [fadeOthers, setFadeOthers] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % 4);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPlanIndex(index);

    // Scroll the carousel container into view to ensure selected slide is visible
    if (isMobile && carouselRef.current) {
      setTimeout(() => {
        carouselRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 100);
    }
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
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCurrentPlanIndex(0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    currentPlanIndex,
    isTransitioning,
    isMobile,
    fadeOthers,
    setFadeOthers,
    carouselRef,
    nextSlide,
    prevSlide,
    goToSlide,
    handleTransitionEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
