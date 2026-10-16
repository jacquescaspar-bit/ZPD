# Flagship guide — now a pinned blog post

**Canonical URL:** https://zpdlearning.com/blog/is-tutoring-the-right-fit  
**Source:** `content/blog/is-tutoring-the-right-fit.md`  
**Legacy redirect:** `/guides/parents-guide-to-zpd` → blog post

The parent guide is pinned at the top of `/blog`. Edit the markdown file above; the site renders via `app/blog/[slug]/page.tsx`.

**Print / newsletter pack** (rebuild with `pnpm guide:print`):

| File                                               | What                                            |
| -------------------------------------------------- | ----------------------------------------------- |
| `/guides/is-tutoring-the-right-fit.pdf`            | A4 one-pager. Clickable in digital PDF viewers. |
| `/guides/is-tutoring-the-right-fit-a4.png`         | Same page as an image.                          |
| `/guides/is-tutoring-the-right-fit-newsletter.png` | Tall image for digital newsletters. Paste it.   |
| How to send it                                     | `guide-newsletter-paste.md`                     |

A PNG cannot store a clickable link. Digital newsletters: paste the image **and** the URL, or wrap the image in HTML (`newsletter-embed.html`).
