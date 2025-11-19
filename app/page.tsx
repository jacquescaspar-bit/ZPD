"use client";

import { useEffect } from "react";
import Hero from "@/Hero";
import Infographic from "@/Infographic";
import About from "@/About";
import Testimonials from "@/Testimonials";
import Features from "@/Features";
import Stats from "@/Stats";
import Contact from "@/Contact";

const Home = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Full-screen background behind navigation */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />

      {/* Hero Section */}
      <Hero />

      {/* Infographic Section */}
      <Infographic />

      {/* Sections */}
      <About />
      <Testimonials />
      <Features />
      <Stats />
      <Contact />
    </div>
  );
};

export default Home;
