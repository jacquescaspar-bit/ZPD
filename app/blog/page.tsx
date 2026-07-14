import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import PostCard from "@/blog/components/PostCard";
import {
  getPinnedPost,
  getRecentQuarterPosts,
  getLatestQuarter,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | ZPD Learning",
  description:
    "Practical notes for parents on tutoring fit, classroom-active teachers, term plans, and trying a Diagnostic before you commit.",
  openGraph: {
    title: "ZPD Learning Blog",
    description:
      "Practical notes for parents — not homework hype, not education jargon.",
    type: "website",
  },
};

const quarterHeading = (year: number, quarter: number) => {
  const labels = ["Jan–Mar", "Apr–Jun", "Jul–Sep", "Oct–Dec"] as const;
  return `${year} · ${labels[quarter - 1]}`;
};

const BlogPage = () => {
  const pinned = getPinnedPost();
  const recent = getRecentQuarterPosts();
  const { year, quarter } = getLatestQuarter();

  return (
    <PageShell>
      <Nav />
      <div className="px-6 pt-16 pb-12">
        <Container size="md">
          <header className="text-center mb-12 max-w-2xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight"
              style={{ letterSpacing: "0.02em" }}
            >
              Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Notes for parents on fit, tutors, and what to ask before you pay
              for a term.
            </p>
          </header>

          {pinned ? (
            <section className="mb-12">
              <PostCard pinned post={pinned} />
            </section>
          ) : null}

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Recent posts
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {quarterHeading(year, quarter)}
                </p>
              </div>
              <Link
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                href="/blog/archive"
              >
                Older →
              </Link>
            </div>
            <div className="space-y-6">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <p className="text-center mt-12">
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              href="/"
            >
              ← Back to home
            </Link>
          </p>
        </Container>
      </div>
    </PageShell>
  );
};

export default BlogPage;
