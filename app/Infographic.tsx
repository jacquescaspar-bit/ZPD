"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Infographic = () => {
  const [circleOpacity, setCircleOpacity] = useState(0);
  const [showGrown, setShowGrown] = useState(false);
  const [showKnown, setShowKnown] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const zpdCircleRef = useRef<HTMLDivElement>(null);

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
        if (progress > 0.8) {
          setShowGrown(true);
          setShowKnown(false);
        } else {
          setShowGrown(false);
          setShowKnown(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-[100vh] relative bg-white dark:bg-gray-900 z-0 flex justify-center items-center"
    >
      <div
        ref={zpdCircleRef}
        className="zpd-circle absolute w-[250px] h-[250px] md:w-[309px] md:h-[309px] border border-current rounded-full transition-opacity duration-1000"
        style={{ opacity: circleOpacity }}
      />
      <div
        className="absolute w-[250px] h-[250px] md:w-[309px] md:h-[309px] border border-current rounded-full"
        style={{ opacity: 0.2 }}
      />
      {showGrown && (
        <>
          {[0, 0.3, 0.6].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ scale: 1.58, opacity: 0 }}
              className="absolute border border-current rounded-full w-[156px] h-[156px] md:w-[196px] md:h-[196px]"
              initial={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 4, ease: "easeOut", delay }}
            />
          ))}
          <motion.div
            animate={{ opacity: 0.2 }}
            className="absolute border border-current rounded-full w-[300px] h-[300px] md:w-[488px] md:h-[488px]"
            initial={{ opacity: 0 }}
            transition={{ duration: 3, delay: 4 }}
          />
        </>
      )}
      <motion.div
        animate={showGrown ? { scale: 1.58 } : { scale: 1 }}
        className="border border-current rounded-full flex justify-center items-center p-8 relative z-10 bg-white dark:bg-gray-900 w-[156px] h-[156px] md:w-[196px] md:h-[196px]"
        transition={{ duration: 4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <motion.span
          animate={{ opacity: showKnown ? 1 : 0 }}
          className="text-4xl md:text-5xl font-extralight"
          transition={{ duration: showKnown ? 0 : 4 }}
        >
          known
        </motion.span>
        <motion.span
          animate={
            showGrown
              ? { opacity: 1, scale: 1.05, letterSpacing: "0.05em" }
              : { opacity: 0, scale: 1, letterSpacing: 0 }
          }
          className="text-4xl md:text-5xl font-extralight absolute"
          transition={{ duration: 3, delay: showGrown ? 4 : 0 }}
        >
          grown
        </motion.span>
      </div>
    </section>
  );
};

export default Infographic;
