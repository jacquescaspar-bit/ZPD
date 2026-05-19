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
  isMobile: boolean;
  fadeOthers: boolean;
  setFadeOthers: (fade: boolean) => void;
}

interface PlanSelectionProps {
  selectedPlan: PlanType | null;
  onPlanSelect: (plan: PlanType | null) => void;
  carouselHookValues: CarouselHookValues;
  paymentProps?: PaymentDetailsProps;
  showHighlights: boolean;
}

/* eslint-disable max-lines-per-function */
const PlanSelection: React.FC<PlanSelectionProps> = ({
  selectedPlan,
  onPlanSelect,
  carouselHookValues,
  paymentProps,
  showHighlights,
}) => {
  const { isMobile, fadeOthers, setFadeOthers } = carouselHookValues;

  const planCards = useMemo(() => getPlanCards(), []);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [lockedCardHeight, setLockedCardHeight] = useState<number | null>(null);

  const isDesktopPaymentLayout =
    !isMobile && Boolean(paymentProps && showPaymentDetails && selectedPlan);

  const isMobilePaymentLayout =
    isMobile && Boolean(paymentProps && showPaymentDetails && selectedPlan);

  useEffect(() => {
    if (!selectedPlan) {
      setLockedCardHeight(null);
      return;
    }

    // Lock the card height only for desktop to prevent snap; mobile uses compact thumbnail
    if (isMobile) {
      setLockedCardHeight(null);
      return;
    }
    const selectedIndex = planCards.findIndex((p) => p.id === selectedPlan);
    const selectedEl = cardRefs.current[selectedIndex];
    if (selectedEl) {
      setLockedCardHeight(selectedEl.offsetHeight);
    }

    const scrollTimer = window.setTimeout(() => {
      if (sectionRef.current) {
        const navbarHeight = 100;
        const sectionTop =
          sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: sectionTop - navbarHeight,
          behavior: "smooth",
        });
      }
    }, 100);
    return () => window.clearTimeout(scrollTimer);
  }, [selectedPlan, planCards, isDesktopPaymentLayout, isMobile]);

  useEffect(() => {
    if (selectedPlan) {
      if (isMobile) {
        setShowPaymentDetails(true);
      } else {
        const timer = setTimeout(() => setShowPaymentDetails(true), 500);
        return () => clearTimeout(timer);
      }
    } else {
      setShowPaymentDetails(false);
    }
  }, [selectedPlan, isMobile]);

  useEffect(() => {
    if (paymentProps && showPaymentDetails) {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }
    if (isMobilePaymentLayout) {
      setLockedCardHeight(null);
    }
  }, [paymentProps, showPaymentDetails, isMobilePaymentLayout]);

  return (
    <section ref={sectionRef} className={`${SECTION_CARD_CLASS} p-4 relative`}>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          {isDesktopPaymentLayout ? (
            <div className="grid md:grid-cols-4 md:items-start md:gap-6">
              <div className="md:col-span-1">
                <h2 className="text-2xl text-gray-900 dark:text-white transition-opacity duration-500 opacity-50">
                  <span className="font-semibold">
                    {planDescriptions[selectedPlan ?? ""].title}
                  </span>{" "}
                  <span className="font-light">Selected</span>
                </h2>
              </div>
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Payment Details
                </h2>
              </div>
            </div>
          ) : isMobilePaymentLayout ? (
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-gray-900 dark:text-white transition-opacity duration-500 opacity-50">
                <span className="font-semibold">
                  {planDescriptions[selectedPlan ?? ""].title}
                </span>{" "}
                <span className="font-light">Selected</span>
              </h2>
              <button
                aria-label="Change plan"
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={() => {
                  onPlanSelect(null);
                  setFadeOthers(false);
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          ) : selectedPlan ? (
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
          <div
            className={`grid md:grid-cols-4 md:gap-6 ${isDesktopPaymentLayout ? "md:items-start" : "md:items-stretch"}`}
          >
            {isDesktopPaymentLayout && selectedPlan ? (
              <>
                {planCards
                  .filter((plan) => plan.id === selectedPlan)
                  .map((plan) => {
                    const index = planCards.findIndex((p) => p.id === plan.id);
                    return (
                      <div
                        key={plan.id}
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
                        className="min-w-0 md:col-span-1 self-start"
                        style={
                          lockedCardHeight
                            ? { height: `${lockedCardHeight}px` }
                            : undefined
                        }
                      >
                        <PlanCard
                          isSelected
                          highlights={plan.highlights}
                          planId={plan.id}
                          price={plan.price}
                          sessions={plan.sessionsPerTerm}
                          showHighlights={showHighlights}
                          showPaymentDetails={showPaymentDetails}
                          title={plan.title}
                          variant="desktop"
                          onSelect={() => {
                            onPlanSelect(null);
                            setFadeOthers(false);
                          }}
                        />
                      </div>
                    );
                  })}
                <div
                  className={`min-w-0 md:col-span-3 [&>section]:!p-6 ${isHeaderVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out`}
                >
                  <PaymentDetails
                    {...paymentProps}
                    showHeader={false}
                    showHeaderSubtitle={false}
                  />
                </div>
              </>
            ) : (
              planCards.map((plan, index) => (
                <div
                  key={plan.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`${
                    fadeOthers && selectedPlan !== plan.id
                      ? "opacity-0 pointer-events-none"
                      : ""
                  } transition-opacity duration-500`}
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
              ))
            )}
          </div>
        ) : isMobilePaymentLayout && selectedPlan ? (
          // Mobile payment layout: selected card at top, payment below
          <div key={selectedPlan} className="space-y-6">
            {planCards
              .filter((plan) => plan.id === selectedPlan)
              .map((plan) => {
                const _index = planCards.findIndex((p) => p.id === plan.id);
                const _handleChangePlan = () => {
                  onPlanSelect(null);
                  setFadeOthers(false);
                };
                return (
                  <div
                    key={plan.id}
                    className="min-w-0 h-auto transition-all duration-500 ease-out"
                    onClick={() => {
                      onPlanSelect(null);
                      setFadeOthers(false);
                    }}
                  >
                    <PlanCard
                      isSelected
                      highlights={plan.highlights}
                      planId={plan.id}
                      price={plan.price}
                      sessions={plan.sessionsPerTerm}
                      showHighlights={showHighlights}
                      showPaymentDetails={showPaymentDetails}
                      title={plan.title}
                      variant="mobile"
                      onSelect={() => {
                        onPlanSelect(null);
                        setFadeOthers(false);
                      }}
                    />
                  </div>
                );
              })}
            <h2
              className={`text-2xl font-bold text-gray-900 dark:text-white transition-opacity duration-500 ease-in-out ${isHeaderVisible ? "opacity-100" : "opacity-0"}`}
            >
              Payment Details
            </h2>
            <div
              className={`${isHeaderVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out`}
            >
              <PaymentDetails
                {...paymentProps}
                showHeader={false}
                showHeaderSubtitle={false}
              />
            </div>
          </div>
        ) : (
          // Mobile: Vertical scroll stack - full visibility, easy comparison
          <div className="space-y-4">
            {planCards.map((plan, index) => (
              <div
                key={plan.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`${fadeOthers && selectedPlan !== plan.id ? "opacity-0 pointer-events-none" : ""} transition-opacity duration-500`}
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
                  variant="mobile"
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
        )}
      </div>
    </section>
  );
};

export default PlanSelection;
