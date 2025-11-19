import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "ZPD Learning helped me understand math concepts I struggled with for years. My tutor's personalised approach made all the difference!",
      author: "Alex J.",
      role: "High School Student",
      color: "blue",
    },
    {
      quote:
        "As a parent, I was amazed by how quickly my daughter improved her grades. The tutors truly care about each student's success.",
      author: "Sarah C.",
      role: "Parent",
      color: "purple",
    },
    {
      quote:
        "The science tutoring sessions were engaging and fun. I finally understand complex topics that seemed impossible before.",
      author: "Michael R.",
      role: "Middle School Student",
      color: "green",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center bg-white dark:bg-gray-900 px-6 z-10"
      id="testimonials"
    >
      <div className="max-w-4xl text-center mx-auto py-16">
        <h2
          className="text-5xl font-light mb-12 text-gray-900 dark:text-white"
          style={{ letterSpacing: "0.1em" }}
        >
          What Our Students Say
        </h2>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto"
              exit={{ opacity: 0, x: -100 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`text-6xl mb-6 ${testimonials[currentIndex].color === "blue" ? "text-blue-500" : testimonials[currentIndex].color === "purple" ? "text-purple-500" : "text-green-500"}`}
              >
                &ldquo;
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>
              <div className="flex items-center justify-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${testimonials[currentIndex].color === "blue" ? "from-blue-500 to-purple-600" : testimonials[currentIndex].color === "purple" ? "from-purple-500 to-pink-600" : "from-green-500 to-blue-600"} rounded-full flex items-center justify-center mr-4`}
                >
                  <span className="text-white font-semibold text-sm">
                    {testimonials[currentIndex].author.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
