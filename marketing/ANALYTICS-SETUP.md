# Analytics setup (16 Oct 2026)

## Findings

- Host: **Vercel** (`vercel.json`, `.vercel/repo.json`; cron `/api/cron/nurture`). No Cloudflare Workers/wrangler.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is the placeholder `G-XXXXXXXXXX` in `.env.local` / `.env.example`. The live site's JS bundles contain **no `G-` ID**, so it's unset in production. GA is not collecting anything.
- Consent: `app/components/PrivacyConsent.tsx` shows a banner and stores `analytics_consent`; `app/lib/analytics.ts` only calls `gtag` when `GA_MEASUREMENT_ID` is set and consent is given.
- **Gap:** nothing in `app/` loads the GA library (`https://www.googletagmanager.com/gtag/js`). `initGA()` calls `gtag(...)`, but no `<Script>` defines it. Even with a real ID, GA4 won't record until a loader is added (only after consent).
- `@vercel/analytics` is mounted in `app/layout.tsx` (`<Analytics />`). That's the quickest source of traffic numbers, if Web Analytics is enabled on the Vercel project.

## Steps for Jacques

1. **Vercel Web Analytics (5 min, gives numbers today):** vercel.com → project → Analytics tab → Enable (if not already). Check page views for `/blog/is-tutoring-the-right-fit` and referrers/UTM (`utm_source=newsletter|clinic|pc-email|facebook-group|gbp`).
2. **GA4 property:** analytics.google.com → Admin → Create property "ZPD Learning" (Australia, AUD) → Web stream `https://zpdlearning.com` → copy the Measurement ID (`G-…`).
3. **Vercel env var:** project → Settings → Environment Variables → `NEXT_PUBLIC_GA_MEASUREMENT_ID` = that ID, environment Production (+ Preview), save. Redeploy (NEXT_PUBLIC vars are baked in at build).
4. **Add the gtag loader** (code change, Grok Bot can do it on request): in `app/layout.tsx` (or in `enableAnalytics()`) load `https://www.googletagmanager.com/gtag/js?id=${ID}` and define `window.dataLayer`/`gtag` **only after consent** is granted, then call `initGA()`.
5. In GA4 mark `generate_lead` / enrol and contact-form submissions as key events. Test with GA DebugView after accepting the cookie banner.
