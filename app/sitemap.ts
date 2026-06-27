import type { MetadataRoute } from "next";
import { getGreaterCitySlugs } from "@/lib/geo";

const BLOG_POST_IDS = [
  "invisible-ladder-brain",
  "about-zpd-learning",
  "supporting-parents",
  "perfect-tutor-match",
  "science-behind-zpd",
  "educational-philosophy",
  "progress-tracking-helps-learning",
  "certified-tutors-matter",
  "personalised-learning",
  "zpd-zone-of-proximal-development",
  "experienced-tutors",
  "triangle-tutoring",
  "magic-trick",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zpdlearning.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tutors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/enrol`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/enrol?plan=trial`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/enrol?plan=essential`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/parents-guide-to-zpd`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/child-protection`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const tutoringPages: MetadataRoute.Sitemap = getGreaterCitySlugs().map(
    (city) => ({
      url: `${baseUrl}/tutoring/${city}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  const blogAnchors: MetadataRoute.Sitemap = BLOG_POST_IDS.map((id) => ({
    url: `${baseUrl}/blog#${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...tutoringPages, ...blogAnchors];
}
