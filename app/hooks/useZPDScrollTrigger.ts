"use client";

import { useEffect, useRef } from "react";
import { ZPD_SCROLL } from "@/lib/zpdCircleGeometry";

/** Progress peaks at 1 when element centre aligns with viewport 50% line. */
export const computeViewportProgress = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (rect.bottom <= 0 || rect.top >= viewportHeight) {
    return 0;
  }

  const elementCenterY = rect.top + rect.height / 2;
  const viewportCenterY = viewportHeight * 0.5;
  const distance = Math.abs(elementCenterY - viewportCenterY);
  const falloff = viewportHeight * 0.5;

  return Math.max(0, Math.min(1, 1 - distance / falloff));
};

/** Share of the element's height currently visible in the viewport (0–1). */
export const getSectionVisibleRatio = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  if (rect.height <= 0) return 0;

  const viewportHeight = window.innerHeight;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  return visibleHeight / rect.height;
};

/**
 * Scroll position triggers and resets — it does not drive frame-by-frame movement.
 * onTrigger: section nears viewport centre (once per visit).
 * onReset: ≤25% of the section remains visible.
 */
export const useZPDScrollTrigger = (
  sectionRef: React.RefObject<HTMLElement | null>,
  onTrigger: () => void,
  onReset: () => void,
) => {
  const armedRef = useRef(true);
  const onTriggerRef = useRef(onTrigger);
  const onResetRef = useRef(onReset);

  onTriggerRef.current = onTrigger;
  onResetRef.current = onReset;

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const visibleRatio = getSectionVisibleRatio(section);

      if (visibleRatio <= ZPD_SCROLL.revertThreshold) {
        armedRef.current = true;
        onResetRef.current();
        return;
      }

      const progress = computeViewportProgress(section);

      if (armedRef.current && progress >= ZPD_SCROLL.triggerThreshold) {
        armedRef.current = false;
        onTriggerRef.current();
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);
};
