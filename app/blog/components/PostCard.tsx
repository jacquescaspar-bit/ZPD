import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

interface PostCardProps {
  post: BlogPostMeta;
  pinned?: boolean;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const PostCard = ({ post, pinned = false }: PostCardProps) => (
  <article
    className={`rounded-2xl border bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md ${
      pinned
        ? "border-indigo-200/80 dark:border-indigo-800/80 ring-1 ring-indigo-100 dark:ring-indigo-900/40"
        : "border-gray-200/80 dark:border-gray-700/80"
    }`}
  >
    {pinned ? (
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-2">
        Pinned · start here
      </p>
    ) : null}
    <time
      className="text-sm text-gray-500 dark:text-gray-400"
      dateTime={post.date}
    >
      {formatDate(post.date)}
      {post.readMinutes ? ` · ${post.readMinutes} min read` : null}
    </time>
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-2 mb-3 leading-snug">
      <Link
        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        href={`/blog/${post.slug}`}
      >
        {post.title}
      </Link>
    </h2>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
      {post.excerpt}
    </p>
    <Link
      className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      href={`/blog/${post.slug}`}
    >
      Read →
    </Link>
  </article>
);

export default PostCard;
