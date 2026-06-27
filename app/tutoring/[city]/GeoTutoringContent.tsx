import Link from "next/link";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import { formatAudWholeDollars, LOWEST_TERM_PLAN_PRICE } from "@/lib/constants";
import { getGeoTutoringCopy } from "@/lib/geo";
import { getVisitorGeo } from "@/lib/getVisitorGeo";

interface GeoTutoringContentProps {
  citySlug: string;
}

const GeoTutoringContent = async ({ citySlug }: GeoTutoringContentProps) => {
  const copy = getGeoTutoringCopy(citySlug, await getVisitorGeo());

  const highlights = [
    {
      title: copy.tutorsNearSchoolsTitle,
      body: copy.tutorsNearSchoolsBody,
    },
    {
      title: "Planned before sessions",
      body: "Diagnostic discovery and parent insights first — then a term learning sequence, not week-to-week homework help.",
    },
    {
      title: "Term momentum",
      body: "Same tutor, weekly rhythm, compounding progress. Essential and Intensive plans for sustained support.",
    },
  ];

  const faqs = [
    {
      q: copy.centreFaqQuestion,
      a: "No — we're decentralised. Tutors work online or in-home near schools and suburbs they already know. No drop-in centre.",
    },
    {
      q: "Can we start with one session?",
      a: "Yes. The $110 Diagnostic Discovery is a single session to understand fit before committing to a term plan.",
    },
    {
      q: "What areas do you cover?",
      a: copy.areasFaqAnswer,
    },
  ];

  return (
    <PageShell>
      <Nav />
      <div className="px-6 pt-16 pb-12">
        <Container size="md">
          <header className="text-center mb-12">
            <h1
              className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight"
              style={{ letterSpacing: "0.02em" }}
            >
              {copy.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Classroom-active tutors · Term-based plans from{" "}
              {formatAudWholeDollars(LOWEST_TERM_PLAN_PRICE)} ·{" "}
              {copy.heroSublineSuffix}
            </p>
          </header>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200/80 bg-white/95 dark:bg-gray-800/95 dark:border-gray-700/80 p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-gray-200/80 bg-white/95 dark:bg-gray-800/95 dark:border-gray-700/80 p-6 sm:p-8 shadow-md mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Frequently asked questions
            </h2>
            <dl className="space-y-6">
              {faqs.map((item) => (
                <div key={item.q}>
                  <dt className="font-medium text-gray-900 dark:text-white mb-1">
                    {item.q}
                  </dt>
                  <dd className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="text-center rounded-2xl border border-gray-200/80 bg-white/95 dark:bg-gray-800/95 p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4 font-antipasto">
              Start in the ZPD
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
              Begin with a diagnostic discovery session — we&apos;ll learn about
              your child and build a plan before tutoring starts.
            </p>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-4 text-lg font-medium text-white shadow-lg hover:scale-105 transition-transform"
              href="/enrol?plan=trial"
            >
              Book a Diagnostic
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              <Link className="text-indigo-600 hover:underline" href="/tutors">
                Meet our tutors
              </Link>
              {" · "}
              <Link
                className="text-indigo-600 hover:underline"
                href="/guides/parents-guide-to-zpd"
              >
                Parent&apos;s guide to ZPD
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default GeoTutoringContent;
