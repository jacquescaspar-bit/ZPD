"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  const [paymentFormReady, setPaymentFormReady] = useState(false);
  const [lockedCardHeight, setLockedCardHeight] = useState<number | null>(null);
  const [slideOffset, setSlideOffset] = useState(0);

  const isDesktopPaymentLayout =
    !isMobile && Boolean(paymentProps && showPaymentDetails && selectedPlan);

  const isMobilePaymentLayout =
    isMobile && Boolean(paymentProps && showPaymentDetails && selectedPlan);

  useEffect(() => {
    if (!selectedPlan) {
      setLockedCardHeight(null);
      setSlideOffset(0);
      return;
    }
    if (isMobile) return;
    const selectedIndex = planCards.findIndex((p) => p.id === selectedPlan);
    const selectedEl = cardRefs.current[selectedIndex];
    if (selectedEl) setLockedCardHeight(selectedEl.offsetHeight);
  }, [selectedPlan, planCards, isMobile]);

  useEffect(() => {
    if (!selectedPlan) {
      setShowPaymentDetails(false);
      setPaymentFormReady(false);
      return;
    }
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowPaymentDetails(true);
        setPaymentFormReady(true);
      }, 680);
      return () => clearTimeout(timer);
    }
  }, [selectedPlan, isMobile]);

  // When mobile selection happens, immediately show compact thumbnail.
  // The actual payment form reveal is delayed in the handler.
  const _showCompactThumbnail = isMobile && Boolean(selectedPlan);

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
                <h2 className="text-2xl text-gray-900 dark:text-white transition-opacity duration-300 opacity-50">
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
              <h2 className="text-2xl text-gray-900 dark:text-white transition-opacity duration-300 opacity-50">
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
              className={`text-2xl text-gray-900 dark:text-white transition-opacity duration-300 ${showPaymentDetails ? "opacity-50" : "opacity-100"}`}
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
                  className={`min-w-0 md:col-span-3 [&>section]:!p-6 ${isHeaderVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
                >
                  <PaymentDetails
                    {...paymentProps}
                    showHeader={false}
                    showHeaderSubtitle={false}
                  />
                </div>
              </>
            ) : (
              planCards.map((plan, index) => {
                const isThisSelected = selectedPlan === plan.id;
                const _distance = isThisSelected ? index * 25 : 0; // % based on 4-col grid
                return (
                  <motion.div
                    key={plan.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    animate={
                      isThisSelected && fadeOthers
                        ? { x: slideOffset }
                        : { x: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 130,
                      damping: 24,
                      mass: 1.2,
                    }}
                  >
                    <PlanCard
                      highlights={plan.highlights}
                      isSelected={isThisSelected}
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
                          setSlideOffset(0);
                        } else {
                          onPlanSelect(plan.id);
                          setFadeOthers(true);
                          // compute exact px offset so selected card lands precisely on first column
                          const [firstEl] = cardRefs.current;
                          const selEl = cardRefs.current[index];
                          if (firstEl && selEl) {
                            const delta =
                              firstEl.getBoundingClientRect().left -
                              selEl.getBoundingClientRect().left;
                            setSlideOffset(delta);
                          } else {
                            setSlideOffset(0);
                          }
                        }
                      }}
                    />
                  </motion.div>
                );
              })
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
                  <motion.div
                    key={plan.id}
                    animate={{ opacity: 1, y: 0 }}
                    className="min-w-0 h-auto"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
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
                  </motion.div>
                );
              })}
            <h2
              className={`text-2xl font-bold text-gray-900 dark:text-white transition-opacity duration-300 ease-in-out ${paymentFormReady ? "opacity-100" : "opacity-0"}`}
            >
              Payment Details
            </h2>
            <div
              className={`${paymentFormReady ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
            >
              <PaymentDetails
                {...paymentProps}
                showHeader={false}
                showHeaderSubtitle={false}
              />
            </div>
          </div>
        ) : (
          // Mobile: thumbnail + viewport scroll in perfect sync
          <div className="space-y-4">
            {planCards.map((plan, index) => (
              <motion.div
                key={plan.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                animate={
                  selectedPlan === plan.id ? { scale: 0.55 } : { scale: 1 }
                }
                className={`${fadeOthers && selectedPlan !== plan.id ? "opacity-0 pointer-events-none" : ""} transition-opacity duration-300`}
                transition={{ duration: 0.35, ease: "easeInOut" }}
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
                      setPaymentFormReady(false);
                    } else {
                      onPlanSelect(plan.id);
                      setFadeOthers(true);
                      setShowPaymentDetails(true); // thumbnail in place

                      // Force instant snap only on mobile (override global smooth scroll)
                      if (isMobile) {
                        const html = document.documentElement;
                        const prev = html.style.scrollBehavior;
                        html.style.scrollBehavior = "auto";
                        try {
                          sectionRef.current?.scrollIntoView({
                            block: "start",
                          });
                        } finally {
                          html.style.scrollBehavior = prev;
                        }
                      }

                      setTimeout(() => setPaymentFormReady(true), 550);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanSelection;
