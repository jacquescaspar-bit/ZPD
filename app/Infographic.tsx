"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Baby, GraduationCap, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Infographic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const innerScale = useTransform(scrollYProgress, [0.5, 1], [1, 1.5]);
  const innerOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const iconOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const [textKey, setTextKey] = useState("known");

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (progress > 0.8) {
        setTextKey("grown");
      } else {
        setTextKey("known");
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-7xl px-4">
        <div className="flex items-center justify-center">
          <svg width="400" height="400" viewBox="-200 -200 400 400" className="w-full max-w-md h-auto">
            {/* Outer stroke circle */}
            <circle cx="0" cy="0" r="150" fill="none" stroke="#3b82f6" strokeWidth="2" />

            {/* Inner filled circle */}
            <motion.circle
              cx="0"
              cy="0"
              r="100"
              fill="#ffffff"
              style={{ scale: innerScale, opacity: innerOpacity }}
            />

            {/* Center content */}
            <g>
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-light text-white"
                style={{ fontFamily: 'Antipasto', fontWeight: 200 }}
              >
                <AnimatePresence mode="wait">
                  {textKey === "known" ? (
                    <motion.tspan
                      key="known"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      known
                    </motion.tspan>
                  ) : (
                    <motion.tspan
                      key="grown"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      grown
                    </motion.tspan>
                  )}
                </AnimatePresence>
              </text>
            </g>

            {/* Rotating icons in gap */}
            <motion.g style={{ rotate: rotation }}>
              <motion.g
                style={{ opacity: iconOpacity }}
                transform="translate(0, -125)"
              >
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <Baby className="w-8 h-8 text-white" />
                </foreignObject>
              </motion.g>
              <motion.g
                style={{ opacity: iconOpacity }}
                transform="translate(-62.5, 108.253)"
              >
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <GraduationCap className="w-8 h-8 text-white" />
                </foreignObject>
              </motion.g>
              <motion.g
                style={{ opacity: iconOpacity }}
                transform="translate(-62.5, -108.253)"
              >
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <Users className="w-8 h-8 text-white" />
                </foreignObject>
              </motion.g>
            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Infographic;