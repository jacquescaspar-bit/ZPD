import AssessmentSection from "@/about/components/AssessmentSection";
import DiagnosticSection from "@/about/components/DiagnosticSection";
import PlanningSection from "@/about/components/PlanningSection";
import ProcessSteps from "@/about/components/ProcessSteps";
import SessionsSection from "@/about/components/SessionsSection";
import { Container } from "@/components/ui";

const ProcessCarousel = () => (
  <Container className="space-y-8" size="md">
    <ProcessSteps />
    <AssessmentSection />
    <DiagnosticSection />
    <PlanningSection />
    <SessionsSection />
  </Container>
);

export default ProcessCarousel;
