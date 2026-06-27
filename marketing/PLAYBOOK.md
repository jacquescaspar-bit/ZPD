# ZPD Marketing Playbook — Do This In Order

Estimated total time from you: **~2 hours/week for 4 weeks**, then **~30 min/week** ongoing.

---

## Before you start (30 minutes)

1. Open `TODO.md` and keep it visible all month.
2. Read `positioning.md`.
3. Log into https://zpdlearning.com/admin (password from `.env.local` → `ADMIN_PASSWORD`).
4. Confirm you can see Dashboard, Funnel, Promo Codes, Referrals.

**Checkpoint:** Admin loads. You know your enrol URL.

---

## Step 1 — Launch promo (Day 1, 15 min)

**File:** `phase-1-quick-wins/04-promo-TERM2026.md`

1. Go to **Admin → Promo Codes → New promo code**
2. Create `TERM2026` exactly as specified in that file
3. Test: open `https://zpdlearning.com/enrol?plan=essential&promo=TERM2026` in incognito
4. Confirm discount applies at payment step

**Checkpoint:** Promo validates. Note the $ amount shown to parents.

---

## Step 2 — Google Business Profile (Day 1–2, 45 min)

**File:** `gbp/profile-copy.md`

1. Go to https://business.google.com
2. Create or claim **ZPD Learning** as a **Service area business** (hide street address)
3. Paste description, categories, service areas from profile-copy.md
4. Add phone: **1300 990 443**, website: **zpdlearning.com**
5. Upload logo + 3 photos (classroom/tutoring stock or brand assets)
6. Request verification (postcard or phone — follow Google prompts)

**Do not** wait for verification to continue Steps 3–5.

**Checkpoint:** Profile submitted. Screenshot saved in `marketing/tracking/` (optional).

---

## Step 3 — Flagship guide (Day 2–3, 30 min your time)

**File:** `phase-1-quick-wins/01-flagship-guide.md`

1. Read full guide. Fix any factual claims you're unsure about.
2. Ask Agent to publish as `/guides/parents-guide-to-zpd` on the site (or export PDF yourself)
3. Once live, add link to footer or blog intro (optional Agent task)

**Why this matters:** This is your **backlink asset** — other sites link to guides, not sales pages.

**Checkpoint:** Guide has a public URL you can paste in outreach emails.

---

## Step 4 — Facebook groups (Week 1 onward, 10 min/week)

**File:** `phase-1-quick-wins/02-facebook-posts.md`

### Rules

- **Never** lead with "we offer tutoring"
- Lead with insight → link to blog or guide → enrol only if someone asks
- Max **2 posts per group per month** — avoid spam reports
- Join 3–5 groups: local parent groups, HSC/ATAR groups, "school mums" in your target metros

### Weekly routine

1. Open `02-facebook-posts.md` → find current week
2. Copy post text
3. Paste into group. Add link in **first comment** (not always in post body — some groups allow links in post)
4. Tick box in `TODO.md`

**Checkpoint Week 1:** 2 posts live in 2 different groups.

---

## Step 5 — Outreach emails (Week 2 onward, 15 min/week)

**File:** `phase-1-quick-wins/03-outreach-emails.md`

### How to find targets (30 min once)

Google these queries and open results:

- `"tutoring resources" sydney`
- `"helpful links" parents school`
- `"HSC" resources blog`
- `site:.edu.au tutoring tips` (careful — institutions are harder)

Build a simple spreadsheet: `Name | URL | Email | Template # | Sent? | Replied?`

### Sending

1. Pick 2–3 targets per week
2. Personalise **first line only** (mention their page title)
3. Send from **grow@zpdlearning.com**
4. Link to flagship guide, not enrol page
5. Log in spreadsheet

**Checkpoint Week 2:** 5 emails sent. At least 1 uses flagship guide link.

---

## Step 5b — Tutor network pilot (Week 2–4, parallel)

**Files:** `tutor-network/tutor-virality.md`, `tutor-network/tutor-one-pager.md`

This runs **alongside** parent marketing — casual teachers fill supply and refer demand.

1. Decide contractor session rate and referral bounty (one page, even if informal)
2. Email one-pager to 3 classroom-active casuals you already know
3. Onboard first tutor through full cycle: intake → plan → term
4. When they're happy, ask: _"Who else teaches like you who'd want the admin handled?"_
5. Log every tutor-attributed family in spreadsheet — Phase 2 will automate

**Do not** post "hiring tutors" in parent Facebook groups. Tutor recruitment goes in **teacher** groups or DMs, value-first angle from `tutor-virality.md`.

**Checkpoint:** 1 active contractor tutor OR 1 family enrolled via tutor referral.

---

## Step 6 — Partnerships (Week 3, 20 min)

**File:** `partnerships/partner-one-pager.md`

1. Identify 5 local: occupational therapists, speech pathologists, child psychs, learning support coordinators
2. Email short intro + one-pager (PDF or paste key bullets)
3. Offer: reciprocal resource link or $50 referral credit for families they send (manual — track in spreadsheet)

**Checkpoint:** 3 emails sent. No need for replies yet.

---

## Step 7 — Testimonials (after first Diagnostic, 10 min)

After a successful Diagnostic session:

**Subject:** How was [child's name]'s session?

**Body:**

> Hi [Name],
>
> Thanks for booking a Diagnostic Discovery with ZPD Learning. We'd love to know — did the session help clarify next steps for [child]?
>
> If you're happy to share a sentence we can use on our site (first name only), just reply to this email. It helps other parents who are in the same boat.
>
> If anything didn't land, tell us that too — we want to get this right.
>
> — ZPD Learning

Save replies. Screenshot for Google review ask (Step 8).

---

## Step 8 — Google reviews (after happy parent, 5 min)

Only after positive feedback:

> Would you mind leaving a quick Google review? It helps other parents find us: [GBP review link from Google Business dashboard]

**Checkpoint:** 1 Google review OR 1 written testimonial.

---

## Step 9 — Weekly metrics (every Friday, 10 min)

**File:** `tracking/weekly-metrics.md`

Record in admin + spreadsheet:

- Enrolments (Dashboard)
- Funnel sessions stuck at payment (Funnel page)
- Referral codes used (Referrals)
- Outreach emails sent / replies
- Facebook posts published

---

## Step 10 — Phase 1 decision gate (end of Week 4)

**Proceed to Phase 2 if ANY of:**

- ≥3 paid Diagnostics or term enrolments from marketing efforts
- ≥10 active funnel sessions with emails captured
- ≥2 positive replies from outreach/partnerships

**If not:** Repeat Week 3–4 (more FB + outreach). Do **not** build Phase 2 tooling yet.

**File:** `phase-2-build/implementation-brief.md` when ready.

---

## What Agent can do next (when you ask)

| Task                        | Say                                           |
| --------------------------- | --------------------------------------------- |
| Publish flagship guide page | "Publish parents guide from marketing folder" |
| Fix / extend sitemap        | Done in codebase — see 05-sitemap-notes.md    |
| Build Growth Queue admin    | "Build Phase 2 growth queue"                  |
| Nurture emails              | "Build post-Diagnostic email sequence"        |
| Geo landing pages           | "Build Sydney tutoring landing page"          |
