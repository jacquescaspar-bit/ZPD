import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import { getArchiveYears, getQuartersForYear } from "@/lib/blog";

interface ArchiveYearPageProps {
  params: Promise<{ year: string }>;
}

export const generateStaticParams = () =>
  getArchiveYears().map((year) => ({ year: String(year) }));

export const generateMetadata = async ({
  params,
}: ArchiveYearPageProps): Promise<Metadata> => {
  const { year } = await params;
  return {
    title: `Blog archive ${year} | ZPD Learning`,
    description: `ZPD Learning blog posts from ${year}, grouped by quarter.`,
  };
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const ArchiveYearPage = async ({ params }: ArchiveYearPageProps) => {
  const { year: yearParam } = await params;
  const year = Number(yearParam);
  if (!Number.isFinite(year) || !getArchiveYears().includes(year)) {
    notFound();
  }

  const quarters = getQuartersForYear(year);

  return (
    <PageShell>
      <Nav />
      <div className="px-6 pt-16 pb-12">
        <Container size="md">
          <header className="mb-10">
            <p className="text-sm mb-2">
              <Link
                className="text-blue-600 dark:text-blue-400 hover:underline"
                href="/blog/archive"
              >
                Archive
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <Link
                className="text-blue-600 dark:text-blue-400 hover:underline"
                href="/blog"
              >
                Blog
              </Link>
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              {year}
            </h1>
          </header>

          <div className="space-y-10">
            {quarters.map((q) => (
              <section key={`${q.year}-Q${q.quarter}`}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {q.label}
                </h2>
                <ul className="space-y-3">
                  {q.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        className="block rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800 px-5 py-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                        href={`/blog/${post.slug}`}
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {post.title}
                        </span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(post.date)}
                          {post.pinned ? " · Pinned guide" : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default ArchiveYearPage;
