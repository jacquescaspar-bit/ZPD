"use client";

import Nav from "@/Nav";
import Hero from "@/Hero";
import ZPDDefinitionSection from "@/ZPDDefinitionSection";
import Infographic from "@/Infographic";
import Features from "@/Features";
import Stats from "@/Stats";
import Testimonials from "@/Testimonials";
import BackToTop from "@/BackToTop";
import BodyBackground from "@/BodyBackground";

const Home = () => (
  <>
    <Nav />
    <BodyBackground />
    <Hero />
    <ZPDDefinitionSection />
    <Infographic />
    <Features />
    <Stats />
    <Testimonials />
    <BackToTop />
  </>
);

export default Home;
