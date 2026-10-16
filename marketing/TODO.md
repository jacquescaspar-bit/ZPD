# Marketing TODO

Grok Build owns scout/compose/validate. Grok Bot is Zoho only. Tick when Jacques confirms.

## Setup (once)

- [ ] Read `positioning.md`
- [ ] Site live at zpdlearning.com
- [ ] Stripe + SendGrid + webhook tested (one Diagnostic enrolment)
- [ ] Bookmark `/admin`
- [x] `GROW50` live (`04-promo-TERM2026.md`)
- [x] Google Business Profile verified (`gbp/profile-copy.md`)
- [x] Tutor `rate-card.md` + `/tutors` page
- [ ] Operator: paste Profile from `grok-bot/operator.md` (inbound dump + zoho-queue; variant A/B)
- [ ] Auto-review: require approval on every send (`permissions.md`)
- [ ] Zoho signed in as grow@zpdlearning.com when first pass set is ready (not Gmail)
- [ ] Grok Build: scout → compose → validate (`grok-bot/GROK-BUILD.md`)

## Human-only

- [ ] Join groups from Scout’s calendar in **batches** (national list — not four and done)
- [ ] Approve Next after dual-hat; then tell Operator `check zoho-queue`
- [ ] Paste INBOUND_V1 dumps into Grok Build to ingest
- [ ] Name trusted casuals for tutor one-pager (any state)
- [ ] Ads Manager: Pixel, payment, Publish — targeting **Australia** (`paid-ads/LAUNCH.md`)
- [ ] Gate decision when Operator flags it

## Bot queues (always on — token-bound)

- [ ] `tracking/coverage.md` — no empty states
- [ ] Outreach log: every qualified national prospect with a hook (no 20/40 cap)
- [ ] Grok Build compose pack; Operator Zoho only after approve
- [ ] Facebook calendar: groups × metros; draft every eligible slot
- [ ] Flagship guide live at `/blog/is-tutoring-the-right-fit`
- [ ] Sitemap includes guide (`05-sitemap-notes.md`)
- [ ] Contact form / stuck-payment drafts same day
- [ ] Testimonial ask drafted after first happy Diagnostic
- [ ] GBP post drafted fortnightly

## Paid Meta ads (14-day test)

See `paid-ads/LAUNCH.md` — Bots cannot publish. Locations = Australia.

- [ ] Create Meta Pixel; set `NEXT_PUBLIC_META_PIXEL_ID` on Vercel; redeploy
- [ ] Verify PageView + ViewContent in Events Manager (Accept All on cookie banner)
- [ ] Ad account payment method + ZPD Learning Facebook Page
- [ ] Publish 3 ads from `paid-ads/` (budget is your call; targeting AU)
- [ ] Operator daily CPA memo; Day 7 / Day 14 you scale or kill

## Phase 2 (after gate only)

- [ ] Rolling 28-day gate: ≥3 paid Diagnostics/term **or** ≥10 funnel emails **or** ≥2 positive replies
- [ ] `phase-2-build/implementation-brief.md` via Grok Build, not Grok Bot
