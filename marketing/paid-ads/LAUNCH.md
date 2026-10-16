# Meta (Facebook) Ads — 14-day Diagnostic test

**You** run Ads Manager (payment method + account access).  
**This pack** is everything else: tracking on site, copy, creatives, setup steps, kill criteria.

---

## Hard limit

Nobody can publish ads into _your_ Meta ad account without:

1. A Meta Business portfolio / Business Manager
2. An ad account with a **payment method**
3. A **Pixel ID** pasted into Vercel as `NEXT_PUBLIC_META_PIXEL_ID`
4. You clicking **Publish** in Ads Manager

Once the Pixel ID is live on production, open Ads Manager and follow **Launch checklist** below (15–25 min).

---

## Destination URLs (use exactly)

| Ad                 | URL                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Primary            | `https://zpdlearning.com/enrol?plan=trial&utm_source=facebook&utm_medium=paid&utm_campaign=diagnostic_test_2026&utm_content=primary`             |
| Promo GROW50       | `https://zpdlearning.com/enrol?plan=trial&promo=GROW50&utm_source=facebook&utm_medium=paid&utm_campaign=diagnostic_test_2026&utm_content=grow50` |
| Classroom teachers | `https://zpdlearning.com/enrol?plan=trial&utm_source=facebook&utm_medium=paid&utm_campaign=diagnostic_test_2026&utm_content=classroom`           |

Site captures UTMs in `sessionStorage` (`zpd_marketing_params`) for later debugging.

---

## Budget & duration

| Setting            | Value                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| Daily budget       | **A$20/day** (or A$15 if tight)                                             |
| Duration           | **14 days**                                                                 |
| Total test         | ~A$210–280                                                                  |
| Campaign objective | **Sales** (or Leads if Sales unavailable)                                   |
| Conversion event   | **Purchase** (falls back to **InitiateCheckout** until Purchase has volume) |
| Bid                | Highest volume / lowest cost (Advantage)                                    |

---

## Targeting (AU)

Start **one** ad set:

- **Locations:** Australia (do not restrict to NSW/VIC/QLD)
- **Age:** 30–55
- **Gender:** All
- **Detailed targeting:** leave **broad** (Advantage+). Optional suggestions only if delivery is empty: parenting, primary/secondary education, NAPLAN, HSC, VCE, QCE, WACE, SACE
- **Placements:** Advantage+ placements (Feed + Stories/Reels fine)
- **Languages:** English

Do **not** stack 8 interest layers — kills delivery on small budgets.

---

## Structure

```
Campaign: ZPD Diagnostic Test 2026
└── Ad set: AU parents 30–55 · A$20/day · Purchase
    ├── Ad A — Homework wars (creative 01 + primary copy)
    ├── Ad B — Classroom teachers (creative 02 + classroom copy)
    └── Ad C — Try one session (creative 03 + GROW50 URL)
```

---

## Launch checklist (Ads Manager)

### Day 0 — tracking (once)

1. [ ] [events manager](https://business.facebook.com/events_manager2) → Connect data → **Web** → Meta Pixel → name `ZPD Learning`
2. [ ] Copy **Pixel ID**
3. [ ] Vercel → Project → Settings → Environment Variables →  
        `NEXT_PUBLIC_META_PIXEL_ID` = that ID (Production + Preview)
4. [ ] Redeploy production
5. [ ] Visit https://zpdlearning.com → cookie banner → **Accept All**
6. [ ] Events Manager → Test events → confirm **PageView**
7. [ ] Open `/enrol?plan=trial` → confirm **ViewContent**
8. [ ] (Optional) Complete a small real or test payment path → **Purchase** / **InitiateCheckout**

### Day 0 — campaign

9. [ ] Create campaign → **Sales** → Manual setup
10. [ ] Conversion: Pixel → **Purchase** (or InitiateCheckout)
11. [ ] Budget A$20/day · 14 days · AU 30–55 · English
12. [ ] Create 3 ads using copy in `ad-copy.md` + images in `creatives/`
13. [ ] Identity: Page = ZPD Learning (create Page if none — ads need a Page)
14. [ ] Review → **Publish**

### Days 1–3

15. [ ] Do **not** kill for high CPA — learning phase
16. [ ] Check: spend, CTR, landing-page views, InitiateCheckout, Purchase

### Day 7 review

| Signal                           | Action                                    |
| -------------------------------- | ----------------------------------------- |
| ≥1 Purchase and CPA &lt; ~A$60   | Keep running; duplicate winner            |
| Initiates checkout, no Purchase  | Fix enrol friction / trust, not targeting |
| Clicks, no checkout              | Creative or landing mismatch              |
| CPM high, zero meaningful clicks | Pause weak ads; keep best CTR             |

### Day 14 kill criteria

- **Pause** if cost per paid Diagnostic **&gt; A$100** and no clear creative fix
- **Scale** (+20–30% budget) if CPA &lt; A$40–50 with ≥2 purchases
- Log numbers in `tracking/weekly-metrics.md` under notes: `meta paid`

---

## Creative files

| File                                  | Use for                 |
| ------------------------------------- | ----------------------- |
| `creatives/01-homework-wars.svg`      | Ad A — problem-aware    |
| `creatives/02-classroom-teachers.svg` | Ad B — differentiator   |
| `creatives/03-try-one-session.svg`    | Ad C — low risk / promo |

Upload as PNG if Ads Manager prefers: open SVG in browser → screenshot, or:

```bash
# if you have rsvg-convert / inkscape
rsvg-convert -w 1080 -h 1080 marketing/paid-ads/creatives/01-homework-wars.svg -o /tmp/01.png
```

Feed size: **1080×1080**.

---

## Compliance (AU / Meta)

- No unrealistic grade guarantees
- Don’t imply every child will “catch up overnight”
- Target **parents**, not children; no under-13 targeting
- Landing must match ad claim (Diagnostic $110, classroom-active teachers)

---

## After first purchase from ads

1. Ask for a one-sentence testimonial (`PLAYBOOK.md`)
2. Turn on **Advantage+ catalogue** only if you later have many products — skip for now
3. Consider Google Search later for “tutor Sydney Year 9” intent traffic

---

## Agent / you handoff

| Who                  | Does                                                       |
| -------------------- | ---------------------------------------------------------- |
| Agent (done in repo) | Pixel code, consent, Purchase events, this pack, creatives |
| You                  | Pixel ID in Vercel, payment method, Publish campaign       |
| Agent (if you ask)   | Iterate copy after 7-day results; CAPI server events later |
