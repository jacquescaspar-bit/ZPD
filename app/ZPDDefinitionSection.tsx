"use client";

import { useRef } from "react";
import { SECTION_BAND_LIGHT } from "@/lib/sectionBands";
import ZPDBackgroundLetters from "@/ZPDBackgroundLetters";
import ZPDCircleDevice from "@/ZPDCircleDevice";

const ZPDDefinitionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className={`relative z-10 overflow-visible ${SECTION_BAND_LIGHT}`}
      id="zpd-definition"
    >
      <ZPDBackgroundLetters />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 sm:gap-10 lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="px-6 py-10 sm:py-16 lg:py-20">
          <h2
            className="font-antipasto mb-1.5 text-3xl font-light text-gray-900 dark:text-white sm:mb-2 sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "0.08em" }}
          >
            ZPD
          </h2>
          <p className="mb-1 text-lg text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl">
            <a
              className="cursor-pointer hover:underline"
              href="/blog#zpd-zone-of-proximal-development"
            >
              Zone of Proximal Development
            </a>
          </p>
          <p className="mb-4 text-sm italic text-gray-500 dark:text-gray-400 sm:mb-6 sm:text-base md:text-lg">
            Education psychology concept - Lev Vygotsky 1930s
          </p>
          <div className="max-w-prose space-y-3 text-base leading-snug text-gray-800 dark:text-gray-200 sm:space-y-4 sm:text-lg sm:leading-relaxed md:text-xl">
            <p>
              The ZPD is the space between what your child can do alone and what
              they can achieve with the right support.
            </p>
            <p>It is a foundation of how children learn.</p>
            <p>
              At ZPD Learning, success is by design. This is where learning
              happens.
            </p>
          </div>
        </div>

        <ZPDCircleDevice sectionRef={sectionRef} />
      </div>
    </section>
  );
};

export default ZPDDefinitionSection;
