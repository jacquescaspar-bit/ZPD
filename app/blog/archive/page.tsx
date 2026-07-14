import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import { getArchiveYears } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog archive | ZPD Learning",
  description: "Older blog posts by year — four posts per quarter.",
};

const BlogArchivePage = () => {
  const years = getArchiveYears();

  return (
    <PageShell>
      <Nav />
      <div className="px-6 pt-16 pb-12">
        <Container size="md">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-3">
              Blog archive
            </h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Posts grouped by year and quarter.{" "}
              <Link
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                href="/blog"
              >
                Back to recent posts
              </Link>
            </p>
          </header>

          <ul className="space-y-4">
            {years.map((year) => (
              <li key={year}>
                <Link
                  className="block rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800 p-6 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                  href={`/blog/archive/${year}`}
                >
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {year}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                    View quarters →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </PageShell>
  );
};

export default BlogArchivePage;
