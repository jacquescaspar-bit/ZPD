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
import BodyBackground from "@/BodyBackground";
import { Card } from "@/components/ui";

const Home = () => (
  <>
    <Nav />
    <BodyBackground />
    <Hero />
    <ZPDDefinitionSection />
    <Infographic />
    <Features />
    <Card>
      <Stats />
    </Card>
    <Testimonials />
    <TrinitySynergy />
    <BackToTop />
  </>
);

export default Home;
