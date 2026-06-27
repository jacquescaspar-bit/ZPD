# Sitemap SEO Notes

## What was updated in codebase

[`app/sitemap.ts`](../../app/sitemap.ts) now includes:

- `/contact`
- `/enrol` with plan query variants (trial, essential)
- Blog section anchors (`/blog#post-id`) for all 13 posts from `BlogNavigation.tsx`

## Why blog anchors

Posts currently live on a single `/blog` page with hash IDs — not separate routes. Google can still index `https://zpdlearning.com/blog#zpd-zone-of-proximal-development` as a fragment of the blog URL.

**Future (Phase 2):** Individual `/blog/[slug]` routes are better for SEO — see `phase-2-build/implementation-brief.md`.

## Submit to Google

After deploy:

1. https://search.google.com/search-console
2. Add property `zpdlearning.com`
3. Sitemaps → submit `https://zpdlearning.com/sitemap.xml`

## Flagship guide

When `/guides/parents-guide-to-zpd` is published, add to sitemap with `priority: 0.9`.
