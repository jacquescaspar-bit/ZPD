"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Infographic = () => {
  const [circleOpacity, setCircleOpacity] = useState(0);
  const [showGrown, setShowGrown] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight / 2 - rect.top) / (window.innerHeight / 2),
          ),
        );
        const opacity = progress * 0.2;
        setCircleOpacity(opacity);
        setShowGrown(progress > 0.8);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-[100vh] relative bg-white dark:bg-gray-900 z-0 flex justify-center items-center"
    >
      <div
        className="absolute w-[309px] h-[309px] border border-current bg-current rounded-full transition-opacity duration-1000"
        style={{ opacity: circleOpacity }}
      />
      <div
        className="absolute w-[309px] h-[309px] border border-current rounded-full"
        style={{ opacity: 0.2 }}
      />
      {showGrown && (
        <>
          {[0, 0.3, 0.6].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ scale: 1.58, opacity: 0 }}
              className="absolute border border-current rounded-full"
              initial={{ scale: 1, opacity: 0.6 }}
              style={{ width: "12.25rem", height: "12.25rem" }}
              transition={{ duration: 4, ease: "easeOut", delay }}
            />
          ))}
          <motion.div
            animate={{ opacity: 0.2 }}
            className="absolute border border-current rounded-full"
            initial={{ opacity: 0 }}
            style={{ width: "30.562rem", height: "30.562rem" }}
            transition={{ duration: 3, delay: 5 }}
          />
        </>
      )}
      <motion.div
        animate={showGrown ? { scale: 1.58 } : { scale: 1 }}
        className="border border-current rounded-full flex justify-center items-center p-8 relative z-10 bg-white dark:bg-gray-900"
        style={{ width: "12.25rem", height: "12.25rem" }}
        transition={{ duration: 4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <AnimatePresence mode="wait">
          <motion.span
            key={showGrown ? "grown" : "known"}
            animate={
              showGrown
                ? { opacity: 1, scale: 1.05, letterSpacing: "0.05em" }
                : { opacity: 1, scale: 1, letterSpacing: 0 }
            }
            className="text-5xl font-extralight"
            exit={{ opacity: 0, scale: 1, letterSpacing: 0 }}
            initial={{ opacity: 0, scale: 1, letterSpacing: 0 }}
            transition={
              showGrown ? { duration: 1.5, delay: 0.5 } : { duration: 1 }
            }
          >
            {showGrown ? "grown" : "known"}
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Infographic;
