"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import PlanCard from "@/enrol/components/PlanCard";
import PaymentDetails, {
  type PaymentDetailsProps,
} from "@/enrol/components/PaymentDetails";
import type { PlanType } from "@/lib/constants";
import { SECTION_CARD_CLASS } from "@/enrol/constants";
import { planDescriptions, getPlanCards } from "@/enrol/data";

interface CarouselHookValues {
  currentPlanIndex: number;
  isTransitioning: boolean;
  isMobile: boolean;
  fadeOthers: boolean;
  setFadeOthers: (fade: boolean) => void;
  carouselRef: React.RefObject<HTMLDivElement | null>;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  handleTransitionEnd: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

interface PlanSelectionProps {
  selectedPlan: PlanType | null;
  onPlanSelect: (plan: PlanType | null) => void;
  carouselHookValues: CarouselHookValues;
  paymentProps?: PaymentDetailsProps;
  showHighlights: boolean;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({
  selectedPlan,
  onPlanSelect,
  carouselHookValues,
  paymentProps,
  showHighlights,
}) => {
  const {
    currentPlanIndex,
    isTransitioning,
    isMobile,
    fadeOthers,
    setFadeOthers,
    carouselRef,
    goToSlide,
    handleTransitionEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = carouselHookValues;

  const planCards = useMemo(() => getPlanCards(), []);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paymentRef = useRef<HTMLDivElement>(null);
  const paymentHeaderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [transformX, setTransformX] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  useEffect(() => {
    if (selectedPlan && cardRefs.current[0] && cardRefs.current.length > 0) {
      const selectedIndex = planCards.findIndex((p) => p.id === selectedPlan);
      if (selectedIndex >= 0 && cardRefs.current[selectedIndex]) {
        const discoveryLeft = cardRefs.current[0]?.offsetLeft || 0;
        const selectedLeft = cardRefs.current[selectedIndex]?.offsetLeft || 0;
        setTransformX(discoveryLeft - selectedLeft);
      }
      // Scroll to section when plan is selected
      setTimeout(() => {
        if (sectionRef.current) {
          const navbarHeight = 100;
          const sectionTop =
            sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: sectionTop - navbarHeight,
            behavior: "smooth",
          });
        }
      }, 100); // Short delay to allow DOM update
    } else {
      setTransformX(0);
    }
  }, [selectedPlan, planCards]);

  useEffect(() => {
    if (paymentProps && showPaymentDetails && !isMobile && paymentRef.current) {
      const container = paymentRef.current.parentElement;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      // Find the first and last plan cards for positioning
      const firstCardIndex = 0;
      const lastCardIndex = planCards.length - 1;
      if (!cardRefs.current[firstCardIndex] || !cardRefs.current[lastCardIndex])
        return;

      const firstCardRect =
        cardRefs.current[firstCardIndex].getBoundingClientRect();
      const lastCardRect =
        cardRefs.current[lastCardIndex].getBoundingClientRect();
      const gap = 24; // 1.5rem gap

      // Position PaymentDetails to the right of the first plan card consistently
      const left = firstCardRect.right - containerRect.left + gap;
      const top = firstCardRect.top - containerRect.top;

      // Calculate width to span to the right edge of the last plan card
      const rightEdgeOfLastCard = lastCardRect.right - containerRect.left;
      const width = rightEdgeOfLastCard - left;

      paymentRef.current.style.left = `${left}px`;
      paymentRef.current.style.width = `${width}px`;
      paymentRef.current.style.top = `${top}px`;
      paymentRef.current.style.height = "auto";

      // Set section min-height to accommodate payment details dynamically
      requestAnimationFrame(() => {
        if (sectionRef.current && paymentRef.current) {
          const paymentHeight = paymentRef.current.offsetHeight;
          sectionRef.current.style.minHeight = `${top + paymentHeight + 100}px`;
        }
      });

      // Position payment header above the payment details, horizontally aligned with the payment form
      if (paymentHeaderRef.current) {
        paymentHeaderRef.current.style.left = `${left}px`;
        paymentHeaderRef.current.style.top = `${top - 50}px`;
        paymentHeaderRef.current.style.width = "auto";
        paymentHeaderRef.current.style.height = "auto";
      }
    } else if (sectionRef.current) {
      // Reset section min-height when payment details are not shown
      sectionRef.current.style.minHeight = "";
    }
  }, [paymentProps, showPaymentDetails, isMobile, planCards]);

  useEffect(() => {
    if (selectedPlan) {
      const timer = setTimeout(() => setShowPaymentDetails(true), 500);
      return () => clearTimeout(timer);
    }
    setShowPaymentDetails(false);
  }, [selectedPlan]);

  useEffect(() => {
    if (paymentProps && showPaymentDetails && !isMobile) {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }
  }, [paymentProps, showPaymentDetails, isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`${SECTION_CARD_CLASS} p-4 space-y-4 relative`}
    >
      <div className="flex flex-col gap-2">
        {selectedPlan ? (
          <h2
            className={`text-2xl text-gray-900 dark:text-white transition-opacity duration-500 ${showPaymentDetails ? "opacity-50" : "opacity-100"}`}
          >
            <span className="font-semibold">
              {planDescriptions[selectedPlan].title}
            </span>{" "}
            <span className="font-light">Selected</span>
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Choose your plan
          </h2>
        )}
      </div>
      {!isMobile ? (
        <div className="grid md:grid-cols-4 gap-6">
          {planCards.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${
                fadeOthers && selectedPlan !== plan.id
                  ? "opacity-0 pointer-events-none"
                  : ""
              } transition-opacity duration-500 ${
                selectedPlan === plan.id
                  ? "transition-transform duration-500 ease-out md:sticky md:top-4"
                  : ""
              }`}
              style={{
                transform:
                  selectedPlan === plan.id
                    ? `translateX(${transformX}px)`
                    : "none",
              }}
            >
              <PlanCard
                highlights={plan.highlights}
                isSelected={selectedPlan === plan.id}
                planId={plan.id}
                price={plan.price}
                sessions={plan.sessionsPerTerm}
                showHighlights={showHighlights}
                showPaymentDetails={showPaymentDetails}
                title={plan.title}
                variant="desktop"
                onSelect={() => {
                  if (selectedPlan === plan.id) {
                    onPlanSelect(null);
                    setFadeOthers(false);
                  } else {
                    onPlanSelect(plan.id);
                    setFadeOthers(true);
                  }
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        // Mobile: Carousel with peeking slides
        <div className="relative overflow-visible">
          <div className="flex items-stretch justify-center px-4">
            <div
              ref={carouselRef}
              className={`flex items-center ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
              style={{
                transform: `translateX(calc(50% - ${currentPlanIndex * 320}px - 144px))`,
              }}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchStart}
              onTransitionEnd={handleTransitionEnd}
            >
              {planCards.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`${fadeOthers && selectedPlan !== plan.id ? "opacity-0 pointer-events-none" : ""} transition-opacity duration-500`}
                >
                  <PlanCard
                    highlights={plan.highlights}
                    isSelected={selectedPlan === plan.id}
                    mobileProps={{
                      index,
                      currentPlanIndex,
                      onGoToSlide: goToSlide,
                    }}
                    planId={plan.id}
                    price={plan.price}
                    sessions={plan.sessionsPerTerm}
                    showHighlights={showHighlights}
                    showPaymentDetails={showPaymentDetails}
                    title={plan.title}
                    variant="mobile"
                    onSelect={() => {
                      onPlanSelect(plan.id);
                      setFadeOthers(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={`dot-${index}`}
                aria-label={`Go to pricing option ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPlanIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {paymentProps && showPaymentDetails && !isMobile && (
        <>
          <div
            ref={paymentHeaderRef}
            className={`absolute transition-opacity duration-500 ease-in-out ${isHeaderVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-gray-900 dark:text-white">
                <span className="font-semibold">Payment details</span>
              </h2>
            </div>
          </div>
          <div ref={paymentRef} className="absolute">
            <PaymentDetails {...paymentProps} />
          </div>
        </>
      )}
    </section>
  );
};

export default PlanSelection;
