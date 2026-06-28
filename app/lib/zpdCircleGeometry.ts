export const ZPD_SIZES = {
  inner: { base: 156, md: 196 },
  middle: { base: 250, md: 309 },
  halo: { base: 360, md: 488 },
} as const;

/** 64vw / 43.75vw on mobile — matches middleSizeClass / innerSizeClass ratio. */
export const GROWTH_SCALE = {
  base: 64 / 43.75,
  md: ZPD_SIZES.middle.md / ZPD_SIZES.inner.md,
} as const;

export const ZPD_TIMING = {
  expand: 3,
  grownLabelDelay: 2.5,
  grownLabel: 2.5,
  ripple: 3,
  rippleStagger: [0, 0.25, 0.5] as const,
  haloDelay: 2.5,
  halo: 2.5,
  reduced: 0.2,
} as const;

export const ZPD_SCROLL = {
  /** Fire animation once per visit when section nears viewport centre. */
  triggerThreshold: 0.5,
  /** Revert to idle when this fraction (or less) of the section remains visible. */
  revertThreshold: 0.25,
  maxOpacity: 0.2,
} as const;

/** Solid inner ring — slightly translucent so page band shows through. */
export const ZPD_SOLID_RING_OPACITY = 0.9;

export const ZPD_RING_GRADIENT =
  "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900";

export const ZPD_RING_BORDER =
  "border border-gray-300/50 dark:border-indigo-400/30";

export const ZPD_RING_SHADOW =
  "shadow-sm shadow-indigo-200/20 dark:shadow-indigo-900/30";

export const ZPD_LABEL_LAYER_CLASS = "pointer-events-none relative z-20";

export const ZPD_LABEL_CENTER_CLASS =
  "absolute inset-0 flex items-center justify-center text-center leading-none";

export const ZPD_LABEL_CLASS =
  "font-antipasto select-none text-3xl font-extralight tracking-wide text-gray-600 dark:text-gray-300 md:text-4xl";

/** 25% larger than known: size, weight (200→250), kerning (0.025em→0.03125em). */
export const ZPD_GROWN_LABEL_CLASS =
  "font-antipasto select-none text-[2.34375rem] font-[250] tracking-[0.03125em] text-gray-600 dark:text-gray-300 md:text-[2.8125rem]";

/** vw-scaled on mobile so outer rings fill the device; fixed px from md up. */
export const innerSizeClass =
  "h-[min(43.75vw,172px)] w-[min(43.75vw,172px)] md:h-[196px] md:w-[196px]";

export const middleSizeClass =
  "h-[min(64vw,247px)] w-[min(64vw,247px)] md:h-[309px] md:w-[309px]";

export const haloSizeClass =
  "h-[min(95vw,360px)] w-[min(95vw,360px)] md:h-[360px] md:w-[360px] lg:h-[488px] lg:w-[488px]";

export const deviceBoundsClass =
  "relative h-[min(88vw,520px)] w-[min(88vw,520px)] overflow-visible max-w-[520px]";
