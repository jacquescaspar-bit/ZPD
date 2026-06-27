import dynamic from "next/dynamic";
import Nav from "@/Nav";
import Hero from "@/Hero";
import ZPDDefinitionSection from "@/ZPDDefinitionSection";
import EnrolCta from "@/EnrolCta";
import PageShell from "@/components/PageShell";

const Features = dynamic(() => import("@/Features"));
const Testimonials = dynamic(() => import("@/Testimonials"));
const BackToTop = dynamic(() => import("@/BackToTop"));

const Home = () => (
  <PageShell>
    <Nav />
    <Hero />
    <Features />
    <ZPDDefinitionSection />
    <Testimonials />
    <EnrolCta />
    <BackToTop />
  </PageShell>
);

export default Home;
