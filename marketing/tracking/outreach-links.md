# Outreach click links

Use these first-party paths in **future** wave emails. Do not edit a wave that is already sending.

## Pattern

`https://zpdlearning.com/g/<code>`

`<code>` is a short slug: letters, numbers, hyphens or underscores, max 64 characters.

| Example         | Use                     |
| --------------- | ----------------------- |
| `/g/w12`        | Wave 12 (all audiences) |
| `/g/w12-school` | Wave 12, school emails  |
| `/g/w12-clinic` | Wave 12, clinic emails  |
| `/g/w12-pc`     | Wave 12, P&C emails     |

The path redirects to the parent guide:

`/blog/is-tutoring-the-right-fit?utm_source=email&utm_medium=outreach&utm_campaign=<code>`

UTMs are for GA4 (`G-H430HPFXFX`) after cookie consent. The `/g/<code>` path itself is what Vercel Web Analytics and Vercel runtime logs can attribute per wave. Do not treat hits on `/blog/aXMtdHV0b3` (or other mangled slugs) as real guide reads; those are mostly email-security scanners and already redirect to the guide.

## Rules for Grok Build / queue builders

- Put `https://zpdlearning.com/g/wXX` (or the audience split) in new first-touch and follow-up bodies, not the bare guide URL.
- Do not add `/enrol` or promo codes (including GROW50 or GET50) to outreach emails.
- Do not change hrefs in a wave that is already sending or queued to send.
- Restore these links starting with the next wave after the current one finishes.

Official human-facing guide URL (for PDFs, QR codes, the site itself):

`https://zpdlearning.com/blog/is-tutoring-the-right-fit`
