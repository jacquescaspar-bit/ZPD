import Nav from "@/Nav";
import ProcessCarousel from "@/about/components/ProcessCarousel";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";

const StartContent = () => (
  <PageShell>
    <Nav />
    <div className="px-6 pb-16 pt-16">
      <Container className="pb-12 text-center" size="md">
        <h1
          className="mb-2 text-4xl font-semibold leading-tight text-gray-900 dark:text-white sm:mb-4 sm:text-6xl"
          style={{ letterSpacing: "0.02em" }}
        >
          Success by Design
        </h1>
        <p
          className="mx-auto mt-2 max-w-2xl text-base font-normal leading-relaxed text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg"
          style={{ letterSpacing: "0.01em" }}
        >
          Our proven ZPD methodology for tutoring success.
        </p>
      </Container>
      <ProcessCarousel />
    </div>
  </PageShell>
);

export default StartContent;
