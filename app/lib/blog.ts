import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Blog posts in content/blog/ must use Australian English (en-AU). See scripts/check-blog-locale.mjs */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  excerpt: string;
  pinned?: boolean;
  readMinutes?: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface BlogQuarter {
  year: number;
  quarter: 1 | 2 | 3 | 4;
  label: string;
  posts: BlogPostMeta[];
}

const quarterLabel = (year: number, quarter: number): string => {
  const names = ["Jan–Mar", "Apr–Jun", "Jul–Sep", "Oct–Dec"] as const;
  return `${year} · Q${quarter} (${names[quarter - 1]})`;
};

const estimateReadMinutes = (content: string): number =>
  Math.max(3, Math.round(content.split(/\s+/).length / 200));

const parseFile = (filename: string): BlogPost => {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const year = Number(data.year);
  const quarter = Number(data.quarter) as 1 | 2 | 3 | 4;

  return {
    slug: String(data.slug),
    title: String(data.title),
    date: String(data.date),
    year,
    quarter,
    excerpt: String(data.excerpt),
    pinned: Boolean(data.pinned),
    readMinutes: estimateReadMinutes(content),
    content: content.trim(),
  };
};

let cache: BlogPost[] | null = null;

export const getAllPosts = (): BlogPost[] => {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) return [];

  cache = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date));

  return cache;
};

export const getPostBySlug = (slug: string): BlogPost | null =>
  getAllPosts().find((p) => p.slug === slug) ?? null;

export const getPinnedPost = (): BlogPost | null =>
  getAllPosts().find((p) => p.pinned) ?? null;

export const getLatestQuarter = (): {
  year: number;
  quarter: 1 | 2 | 3 | 4;
} => {
  const posts = getAllPosts().filter((p) => !p.pinned);
  const [latest] = posts;
  if (!latest) return { year: new Date().getFullYear(), quarter: 1 };
  return { year: latest.year, quarter: latest.quarter };
};

export const getRecentQuarterPosts = (): BlogPostMeta[] => {
  const { year, quarter } = getLatestQuarter();
  return getAllPosts()
    .filter((p) => !p.pinned && p.year === year && p.quarter === quarter)
    .map(({ content: _c, ...meta }) => meta);
};

export const getArchiveYears = (): number[] => {
  const years = new Set(getAllPosts().map((p) => p.year));
  return [...years].sort((a, b) => b - a);
};

export const getQuartersForYear = (year: number): BlogQuarter[] => {
  const posts = getAllPosts().filter((p) => p.year === year);
  const quarters = new Set(posts.map((p) => p.quarter));

  return [...quarters]
    .sort((a, b) => b - a)
    .map((quarter) => ({
      year,
      quarter,
      label: quarterLabel(year, quarter),
      posts: posts
        .filter((p) => p.quarter === quarter)
        .map(({ content: _c, ...meta }) => meta)
        .sort((a, b) => b.date.localeCompare(a.date)),
    }));
};

export const getOlderQuarters = (): BlogQuarter[] => {
  const { year: latestYear, quarter: latestQuarter } = getLatestQuarter();
  const quarters: BlogQuarter[] = [];

  for (const y of getArchiveYears()) {
    for (const q of getQuartersForYear(y)) {
      const isCurrent = q.year === latestYear && q.quarter === latestQuarter;
      if (!isCurrent) quarters.push(q);
    }
  }

  return quarters.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.quarter - a.quarter;
  });
};

export const getAllSlugs = (): string[] => getAllPosts().map((p) => p.slug);
