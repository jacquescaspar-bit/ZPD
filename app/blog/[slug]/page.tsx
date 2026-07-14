import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/Nav";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/ui";
import MarkdownContent from "@/blog/components/MarkdownContent";
import SharePostLink from "@/blog/components/SharePostLink";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  getAllSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | ZPD Learning`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <Nav />
      <div className="px-6 pt-16 pb-12">
        <Container size="md">
          <article className="max-w-3xl mx-auto">
            <header className="mb-10 text-center">
              {post.pinned ? (
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-3">
                  Pinned guide
                </p>
              ) : null}
              <h1
                className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight"
                style={{ letterSpacing: "0.02em" }}
              >
                {post.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readMinutes ? ` · ${post.readMinutes} min read` : null}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-800/95 p-6 sm:p-10 shadow-sm">
              <MarkdownContent content={post.content} />
            </div>

            <SharePostLink slug={post.slug} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3 font-medium text-white shadow-lg hover:scale-105 transition-transform text-center"
                href="/enrol?plan=trial"
              >
                Book a Diagnostic
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 px-8 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
                href="/blog"
              >
                All posts
              </Link>
            </div>
          </article>
        </Container>
      </div>
    </PageShell>
  );
};

export default BlogPostPage;
