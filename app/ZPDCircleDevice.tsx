"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useZPDScrollTrigger } from "@/hooks/useZPDScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  GROWTH_SCALE,
  ZPD_GROWN_LABEL_CLASS,
  ZPD_LABEL_CLASS,
  ZPD_RING_BORDER,
  ZPD_RING_GRADIENT,
  ZPD_RING_SHADOW,
  ZPD_TIMING,
  deviceBoundsClass,
  haloSizeClass,
  innerSizeClass,
  middleSizeClass,
} from "@/lib/zpdCircleGeometry";

type AnimState = "idle" | "animating" | "grown";

interface ZPDCircleDeviceProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const ZPDCircleDevice = ({ sectionRef }: ZPDCircleDeviceProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");
  const growthTarget = isMd ? GROWTH_SCALE.md : GROWTH_SCALE.base;

  const [animState, setAnimState] = useState<AnimState>("idle");
  const [playKey, setPlayKey] = useState(0);

  const handleTrigger = useCallback(() => {
    setAnimState((current) => {
      if (current !== "idle") return current;
      return prefersReducedMotion ? "grown" : "animating";
    });
    setPlayKey((key) => key + 1);
  }, [prefersReducedMotion]);

  const handleReset = useCallback(() => {
    setAnimState("idle");
  }, []);

  useZPDScrollTrigger(sectionRef, handleTrigger, handleReset);

  useEffect(() => {
    if (animState !== "animating") return;

    const timer = setTimeout(
      () => setAnimState("grown"),
      ZPD_TIMING.expand * 1000,
    );

    return () => clearTimeout(timer);
  }, [animState, playKey]);

  const isExpanded = animState === "animating" || animState === "grown";
  const instant = animState === "idle";

  const expandDuration = prefersReducedMotion
    ? ZPD_TIMING.reduced
    : ZPD_TIMING.expand;
  const rippleDuration = prefersReducedMotion
    ? ZPD_TIMING.reduced
    : ZPD_TIMING.ripple;
  const haloDuration = prefersReducedMotion
    ? ZPD_TIMING.reduced
    : ZPD_TIMING.halo;
  const haloDelay = prefersReducedMotion ? 0 : ZPD_TIMING.haloDelay;
  const grownLabelDelay = prefersReducedMotion ? 0 : ZPD_TIMING.grownLabelDelay;
  const grownLabelDuration = prefersReducedMotion
    ? ZPD_TIMING.reduced
    : ZPD_TIMING.grownLabel;

  const ringStackClass =
    "absolute inset-0 grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1";

  return (
    <figure className="relative mx-auto w-full overflow-visible lg:max-w-none">
      <h3 className="sr-only">Where learning happens</h3>

      <div className="relative flex w-full items-center justify-center overflow-visible px-4 py-8 sm:px-6 sm:py-10 md:min-h-[80vh] md:py-16 lg:min-h-screen lg:px-0 lg:py-0">
        <div className={deviceBoundsClass}>
          <div className={ringStackClass}>
            <motion.div
              aria-hidden
              animate={{ opacity: isExpanded ? 0.2 : 0 }}
              className={`${middleSizeClass} rounded-full backdrop-blur-md ${ZPD_RING_GRADIENT} ${ZPD_RING_BORDER} ${ZPD_RING_SHADOW}`}
              transition={{
                duration: instant ? 0 : expandDuration,
                ease: "easeOut",
              }}
            />

            <div
              aria-hidden
              className={`${middleSizeClass} rounded-full backdrop-blur-md ${ZPD_RING_GRADIENT} ${ZPD_RING_BORDER}`}
              style={{ opacity: 0.2 }}
            />

            {animState === "animating" &&
              ZPD_TIMING.rippleStagger.map((delay, index) => (
                <motion.div
                  key={`ripple-${playKey}-${index}`}
                  aria-hidden
                  animate={{ scale: growthTarget, opacity: 0 }}
                  className={`${innerSizeClass} rounded-full ${ZPD_RING_BORDER}`}
                  initial={{ scale: 1, opacity: 0.6 }}
                  style={{ transformOrigin: "center center" }}
                  transition={{
                    duration: rippleDuration,
                    ease: "easeOut",
                    delay: prefersReducedMotion ? 0 : delay,
                  }}
                />
              ))}

            <motion.div
              aria-hidden
              animate={{ opacity: isExpanded ? 0.2 : 0 }}
              className={`${haloSizeClass} rounded-full backdrop-blur-md ${ZPD_RING_GRADIENT} ${ZPD_RING_BORDER}`}
              initial={{ opacity: 0 }}
              transition={{
                duration: instant ? 0 : haloDuration,
                delay: instant ? 0 : isExpanded ? haloDelay : 0,
                ease: "easeOut",
              }}
            />

            <motion.div
              animate={{ scale: isExpanded ? growthTarget : 1 }}
              className={`z-10 ${innerSizeClass} rounded-full bg-white dark:bg-gray-900 ${ZPD_RING_BORDER}`}
              style={{ transformOrigin: "center center" }}
              transition={{
                duration: instant ? 0 : expandDuration,
                ease: "easeOut",
              }}
            />
          </div>

          <div
            aria-atomic="true"
            aria-live="polite"
            className="pointer-events-none absolute inset-0 z-20 grid place-items-center"
          >
            <span className="sr-only">
              {isExpanded
                ? "Grown — learning in the zone of proximal development"
                : "Known — what your child can do alone"}
            </span>

            <motion.span
              aria-hidden
              animate={{ opacity: isExpanded ? 0 : 1 }}
              className={ZPD_LABEL_CLASS}
              transition={{
                duration: instant ? 0 : expandDuration,
                ease: "easeOut",
              }}
            >
              known
            </motion.span>

            <motion.span
              aria-hidden
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className={`absolute ${ZPD_GROWN_LABEL_CLASS}`}
              transition={{
                duration: instant ? 0 : grownLabelDuration,
                delay: instant ? 0 : isExpanded ? grownLabelDelay : 0,
                ease: "easeOut",
              }}
            >
              grown
            </motion.span>
          </div>
        </div>
      </div>

      <p className="sr-only">
        When this section reaches the middle of the screen, the known circle
        plays an animation expanding into the zone of proximal development,
        labelled grown.
      </p>
    </figure>
  );
};

export default ZPDCircleDevice;
