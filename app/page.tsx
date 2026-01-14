"use client";

import Nav from "@/Nav";
import Hero from "@/Hero";
import ZPDDefinitionSection from "@/ZPDDefinitionSection";
import Infographic from "@/Infographic";
import Features from "@/Features";
import Stats from "@/Stats";
import Testimonials from "@/Testimonials";
import TrinitySynergy from "@/TrinitySynergy";
import BackToTop from "@/BackToTop";

const Home = () => (
  <>
    <Nav />
    <div className="fixed inset-0 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 -z-10" />
    <Hero />
    <ZPDDefinitionSection />
    <Infographic />
    <Features />
    <Stats />
    <Testimonials />
    <TrinitySynergy />
    <BackToTop />
  </>
);

export default Home;
