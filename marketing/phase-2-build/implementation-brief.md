# Phase 2 — Implementation Brief

**Start only after Phase 1 decision gate** (see PLAYBOOK §10).

## 1. Blog CMS-lite

**Problem:** Posts are hardcoded TSX in `app/blog/components/`. AI can't publish without a code change.

**Solution:**

- Store posts as markdown in `content/blog/` or JSON in DB
- Dynamic route `app/blog/[slug]/page.tsx`
- Migrate existing 13 posts from `BlogNavigation.tsx` ids
- Update sitemap to `/blog/[slug]` URLs

## 2. Admin Growth tab (`/admin/growth`)

**Tables:**

```sql
marketing_content (id, type, title, body, status, scheduled_at, published_at)
marketing_outreach (id, target_email, subject, body, status, sent_at)
```

**UI:**

- Content queue: approve → publish to blog or save as Google Post draft
- Outreach queue: approve → SendGrid send
- Status: draft | approved | published | rejected

## 3. Abandoned-cart email

**Query:**

```sql
SELECT * FROM enrollment_sessions
WHERE current_step = 'payment'
  AND email IS NOT NULL
  AND updated_at < NOW() - INTERVAL '24 hours'
  AND expires_at > NOW()
```

**Cron:** Vercel cron or manual admin trigger daily  
**Email:** "You started enrolling — need help?" + link to resume session

## 4. Nurture sequences (SendGrid)

Extend [`app/api/webhooks/stripe/route.ts`](../../app/api/webhooks/stripe/route.ts) + scheduled jobs:

| Trigger                       | Delay | Template                     |
| ----------------------------- | ----- | ---------------------------- |
| trial plan purchased          | 0h    | What to expect at Diagnostic |
| trial completed (manual tag)  | 3d    | Testimonial ask              |
| essential/intensive purchased | 7d    | Referral reminder            |

## 5. Geo landing pages

Routes:

- `/tutoring/sydney`
- `/tutoring/melbourne`
- `/tutoring/brisbane`

Reuse copy patterns from [`app/lib/geo.ts`](../../app/lib/geo.ts). CTA → `/enrol?plan=trial`.

## 6. Tutor network (supply-side virality)

From `tutor-network/tutor-virality.md`:

- `/tutors` recruitment landing (contractor value prop — not parent CTA)
- Tutor-owned referral codes (`owner_email` = tutor, tracked like parent REF codes)
- Admin: tutor-attributed enrollments + bounty owed
- Optional tutor portal: matched families, session plans

## Agent command

> "Build Phase 2 from marketing/phase-2-build/implementation-brief.md"  
> "Build tutor referral tracking from marketing/tutor-network/"
