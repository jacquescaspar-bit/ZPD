"use client";

import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
const AssessmentSection = lazy(
  () => import("@/start/components/AssessmentSection"),
);
const DiagnosticSection = lazy(
  () => import("@/start/components/DiagnosticSection"),
);
const TeacherInsightSection = lazy(
  () => import("@/start/components/TeacherInsightSection"),
);
const PlanningSection = lazy(
  () => import("@/start/components/PlanningSection"),
);
const SessionsSection = lazy(
  () => import("@/start/components/SessionsSection"),
);
const ProgressSection = lazy(
  () => import("@/start/components/ProgressSection"),
);
import ProcessSteps from "@/start/components/ProcessSteps";

const ProcessCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0 (first slide)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [_isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sections = [
    <AssessmentSection key="assessment" />,
    <DiagnosticSection key="diagnostic" />,
    <TeacherInsightSection key="teacher-insight" />,
    <PlanningSection key="planning" />,
    <SessionsSection key="sessions" />,
    <ProgressSection key="progress" />,
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sections.length) % sections.length,
    );
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-b-3xl min-h-[320px] sm:min-h-[350px] md:min-h-[400px]">
        <div className="sticky top-0 z-10 md:relative md:z-auto">
          <ProcessSteps
            currentIndex={currentIndex}
            onNext={nextSlide}
            onPrev={prevSlide}
            onStepClick={goToSlide}
          />
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[250px] sm:min-h-[350px] md:min-h-[400px]">
              Loading...
            </div>
          }
        >
          <div
            ref={carouselRef}
            className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTransitionEnd={handleTransitionEnd}
          >
            {sections.map((section, index) => (
              <div key={`slide-${index}`} className="w-full flex-shrink-0">
                {section}
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ProcessCarousel;
