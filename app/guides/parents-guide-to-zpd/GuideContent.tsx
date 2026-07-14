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
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3 tracking-wide uppercase">
            Free guide · ~8 min read
          </p>
          <h1
            className="text-3xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight"
            style={{ letterSpacing: "0.02em" }}
          >
            Is tutoring actually the right fit?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Before you sign up for a term, here&apos;s how to tell whether the
            work is too hard, too easy, or sitting in that productive middle —
            and what to ask any tutor on the phone.
          </p>
        </header>

        <article className="max-w-3xl mx-auto">
          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              You&apos;ve probably seen this kitchen table
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Homework opens. Within ten minutes the mood has turned. By eight
              o&apos;clock you&apos;re explaining the same concept for the third
              time and wondering if you&apos;re helping or doing it for them.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Or the flip side: they whip through the sheet, say tutoring is a
              waste of money, and still walk out of the exam with a mark that
              doesn&apos;t match what you know they can do.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Both patterns are common. Both are usually a <strong>fit</strong>{" "}
              problem — not a kid who &quot;isn&apos;t trying.&quot;
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              The one idea worth knowing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kids learn fastest on work they <em>almost</em> get — with a hint,
              a model, or someone asking the right question, not with you doing
              it for them.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Psychologists call that band the Zone of Proximal Development. We
              shorten it to ZPD. You don&apos;t need the theory — you need to
              spot which band your child is in this week.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Three bands — pick the one that sounds like your house
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white m-0">
                  Too easy
                </p>
                <p className="mt-2 mb-0 leading-relaxed">
                  &quot;This is boring.&quot; Done in minutes. Careless mistakes
                  when it actually counts. Tutoring feels pointless because
                  nothing stretches them.
                </p>
              </div>
              <div className="rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 p-4 border border-indigo-100 dark:border-indigo-900/50">
                <p className="font-medium text-indigo-900 dark:text-indigo-200 m-0">
                  Just right
                </p>
                <p className="mt-2 mb-0 leading-relaxed">
                  &quot;I need a hint… oh, I see it.&quot; Frustration, then a
                  click. They can repeat it tomorrow with less help. This is
                  where money and time actually pay off.
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white m-0">
                  Too hard (for now)
                </p>
                <p className="mt-2 mb-0 leading-relaxed">
                  &quot;I can&apos;t do this.&quot; Won&apos;t start. Meltdowns
                  on work they &quot;should&quot; know. You become the nightly
                  tutor by default.
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-5 mb-0 leading-relaxed">
              Good tutoring stays in the middle band. Bad tutoring either does
              the homework for them or throws harder content at a kid who
              hasn&apos;t closed the gap underneath.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Red flags — you might be paying for the wrong thing
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                Sessions are mostly &quot;let&apos;s get tonight&apos;s sheet
                done&quot;
              </li>
              <li>
                Your child can&apos;t explain what they practised without the
                tutor in the room
              </li>
              <li>
                Nobody tells you what to do for five minutes between visits —
                just &quot;do homework&quot;
              </li>
              <li>
                The tutor can&apos;t say what should be different after five
                sessions
              </li>
              <li>
                You&apos;re on week six and the plan still changes every
                Thursday
              </li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              What good support looks like in the room
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Watch for this pattern — it&apos;s simple and it works:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <strong>Show one move</strong> — &quot;Watch how I&apos;d start
                this problem.&quot;
              </li>
              <li>
                <strong>Hand it back</strong> — &quot;What&apos;s your first
                step?&quot;
              </li>
              <li>
                <strong>Step away</strong> — less talking each week as the skill
                sticks.
              </li>
            </ol>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If the tutor is always holding the pencil, you&apos;re buying
              dependency. If they never adjust when your kid shuts down,
              you&apos;re buying anxiety.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Five questions to ask before you hand over a term&apos;s fees
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Copy these into an email or ask on a call. A decent provider
              answers plainly.
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <strong>
                  &quot;How will you figure out my child&apos;s level?&quot;
                </strong>{" "}
                — not just subject and year.
              </li>
              <li>
                <strong>
                  &quot;What should they do alone after session five that they
                  can&apos;t do now?&quot;
                </strong>
              </li>
              <li>
                <strong>
                  &quot;What do you want me practising at home — specifically,
                  for how long?&quot;
                </strong>
              </li>
              <li>
                <strong>
                  &quot;Are you still teaching in schools? What year
                  levels?&quot;
                </strong>
              </li>
              <li>
                <strong>
                  &quot;Can we do one session before committing to a term?&quot;
                </strong>
              </li>
            </ol>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Why we care if the tutor still teaches in a classroom
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              &quot;Experienced tutor&quot; on a flyer often means &quot;has
              tutored for years&quot; — not &quot;knows what your child&apos;s
              teacher is doing this term.&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Syllabus, NAPLAN weighting, even how maths gets taught shifts
              constantly. The tutors we see work best are still in schools. They
              live the same content your kid walks into on Monday morning.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Why a term beats &quot;book when you&apos;re stuck&quot;
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              One-off homework rescue keeps everyone in fire-drill mode. A term
              gives room to find the actual gap, build one skill at a time, and
              loop you in so something happens between visits.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              That doesn&apos;t mean lock-in for lock-in&apos;s sake. It means
              enough runway for progress to show up — usually more than a single
              hour.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              Quick checklist
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                ☐ They can explain how they&apos;d find your child&apos;s level
              </li>
              <li>☐ Real intake — not just &quot;what subject?&quot;</li>
              <li>☐ WWCC and school experience checked</li>
              <li>☐ A plan for the term, not a new plan every week</li>
              <li>☐ One trial session before you commit</li>
            </ul>
          </section>

          <section
            className={`${sectionClass} text-center border-indigo-200/80 dark:border-indigo-800/80`}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-0">
              If you want to try us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              ZPD Learning matches kids with teachers who still work in local
              schools. Start with a $110 Diagnostic — one session to see if the
              fit&apos;s right — then term plans if it is. Online or in-home
              across Australia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3 font-medium text-white shadow-lg hover:scale-105 transition-transform"
                href="/enrol?plan=trial"
              >
                Book a Diagnostic
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 px-8 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                href="/blog#zpd-zone-of-proximal-development"
              >
                More on our blog
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
