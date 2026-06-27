import Link from "next/link";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import ShareGuideLink from "@/guides/parents-guide-to-zpd/ShareGuideLink";

const sectionClass =
  "rounded-2xl border border-gray-200/80 bg-white/95 dark:bg-gray-800/95 dark:border-gray-700/80 p-6 sm:p-8 shadow-sm mb-6";

const GuideContent = () => (
  <PageShell>
    <Nav />
    <div className="px-6 pt-16 pb-12">
      <Container size="md">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <h1
            className="text-3xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            A Parent&apos;s Guide to the Zone of Proximal Development
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            How to spot the gap between what your child can do alone and what
            they can do with the right support — and why it matters for
            tutoring.
          </p>
        </header>

        <article className="max-w-3xl mx-auto">
          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Every parent has watched their child stuck on homework —
              frustrated, quiet, or insisting &quot;I don&apos;t get it.&quot;
              Often the problem isn&apos;t ability. It&apos;s{" "}
              <strong>fit</strong>: the work is either too easy (boredom) or too
              hard (shutdown).
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Psychologist Lev Vygotsky described the space between those
              extremes: the <strong>Zone of Proximal Development (ZPD)</strong>.
              It&apos;s where learning actually happens — with the right
              support, not alone.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              1. Three zones — not just &quot;good&quot; and &quot;bad&quot;
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 pr-4 font-medium">Zone</th>
                    <th className="py-2 pr-4 font-medium">Feels like</th>
                    <th className="py-2 font-medium">What happens</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 pr-4">Too easy</td>
                    <td className="py-3 pr-4">&quot;This is boring&quot;</td>
                    <td className="py-3">No growth; child coasts</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 pr-4 font-medium text-indigo-700 dark:text-indigo-300">
                      ZPD
                    </td>
                    <td className="py-3 pr-4">
                      &quot;I need a hint… oh, I see it&quot;
                    </td>
                    <td className="py-3">Real learning; skills stick</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Too hard</td>
                    <td className="py-3 pr-4">
                      &quot;I can&apos;t do this&quot;
                    </td>
                    <td className="py-3">Anxiety; child gives up</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              <strong>Good tutoring</strong> keeps sessions in the ZPD — not
              re-teaching the whole syllabus or doing homework for them.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              2. Signs work is too hard
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Meltdowns over tasks they &quot;should&quot; manage</li>
              <li>Parent becomes the full-time explainer every night</li>
              <li>Child avoids starting work</li>
              <li>Tutor reports &quot;we just get through homework&quot;</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              <strong>What helps:</strong> Smaller steps, more scaffolding, a
              tutor who understands current classroom expectations.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              3. Signs work is too easy
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Finishes quickly but careless errors under pressure</li>
              <li>Says tutoring is &quot;pointless&quot;</li>
              <li>Grades don&apos;t match ability on harder exams</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              <strong>What helps:</strong> Stretch tasks, exam-style
              application, metacognition (&quot;how did you know that?&quot;).
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              4. What good support looks like
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <strong>Model</strong> — &quot;Watch how I&apos;d approach
                this&quot;
              </li>
              <li>
                <strong>Prompt</strong> — &quot;What&apos;s the first step
                you&apos;d try?&quot;
              </li>
              <li>
                <strong>Fade</strong> — pull back as confidence grows
              </li>
            </ol>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              5. Why classroom context matters
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Curriculum and assessment change year to year. Tutors disconnected
              from schools can accidentally teach outdated methods. Look for
              tutors actively working in schools, who understand your
              child&apos;s year level, and who communicate what to practise
              between sessions.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              6. Term commitment vs pay-as-you-go
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              One-off homework help keeps children transactional. A term plan
              lets a tutor diagnose properly, build a sequence, and partner with
              you so practice continues between visits. ZPD isn&apos;t built in
              a single hour.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              7. Checklist before you choose tutoring
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>☐ Do they explain how they find your child&apos;s ZPD?</li>
              <li>
                ☐ Is there structured intake (not just &quot;what
                subject?&quot;)?
              </li>
              <li>☐ Are tutors vetted (WWCC, school experience)?</li>
              <li>
                ☐ Is there a plan for the term — not improvised each week?
              </li>
              <li>
                ☐ Can you start with a diagnostic before a term commitment?
              </li>
            </ul>
          </section>

          <section
            className={`${sectionClass} text-center border-indigo-200/80 dark:border-indigo-800/80`}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              About ZPD Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Classroom-active tutors · $110 Diagnostic Discovery · Term-based
              plans · Online or in-home across Australia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3 font-medium text-white shadow-lg hover:scale-105 transition-transform"
                href="/enrol?plan=trial"
              >
                Start with a Diagnostic
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 px-8 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                href="/blog#zpd-zone-of-proximal-development"
              >
                Read more on our blog
              </Link>
            </div>
            <ShareGuideLink />
          </section>
        </article>
      </Container>
    </div>
  </PageShell>
);

export default GuideContent;
