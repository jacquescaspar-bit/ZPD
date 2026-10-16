# Playbook — national, bot-paced Phase 1

The market is **Australia**. Product is already online or in-home nationwide. Throughput is bounded by **tokens**, **quality**, **platform rules**, and **Jacques’s approval** — not by a three-city shop cadence.

**Grok Build** (this repo) scouts, composes, and validates. **Grok Bot** only opens Zoho.

Do not start Phase 2 until the gate at the bottom.

---

## Who does what

| Role                   | Where      | Does                                                                                                      | Does not                                               |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Scout**              | Grok Build | Evidence files + `outreach.csv` row                                                                       | Zoho                                                   |
| **Compose → validate** | Grok Build | Two hats: write Next, then treat it as wrong                                                              | Queue before Jacques                                   |
| **Jacques**            | —          | Approve Next; tell Operator to check queue                                                                | Write emails from scratch                              |
| **Operator**           | Grok Bot   | Dump inbound; paste `zoho-queue.csv` into Zoho; T5/T4 inline+attach the newsletter PNG; T3 attach the PDF | Auto-draft; rewrite; scout; send T5/T4/T3 as link-only |

Mailbox: **Zoho Mail as grow@zpdlearning.com only.** Never Gmail on the Agent Computer.

---

## Constraint stack (in order)

1. **Tokens** — Grok Build for text; Grok Bot tokens only for Zoho. Do not browse-to-validate on the remote desktop.
2. **Quality** — no hook, no row. Positioning voice. No invented names/emails.
3. **Platform** — Facebook **2 posts per group per month**; never identical body in two groups the same day; wait 24h after join. Localise (HSC vs VCE vs QCE…).
4. **Inbox health** — if Zoho blocks, bounce rate is ugly, or spam complaints spike, **pause cold send** and report. That is infrastructure, not TAM.
5. **Jacques** — joins and approvals. Unused drafts sit; they are not a reason to shrink the queue.

There is **no** 2-emails-a-day cap, **no** 4–6 group ceiling, **no** 20-ready queue cap. Those were human-week pacing. Wrong scale.

GBP: one national profile, fortnightly post (Google’s surface, not the market).

---

## Always-on loops

Times Australia/Sydney. Routines after one supervised run each.

| When                       | Who        | Output                                  |
| -------------------------- | ---------- | --------------------------------------- |
| Scout / compose / validate | Grok Build | `evidence/`, thread `## Next`, then you |
| You approve                | Grok Build | status `go` + `zoho-queue.csv`          |
| You say check zoho-queue   | Operator   | Paste into Zoho Drafts + named file     |
| New replies                | Operator   | `INBOUND_V1` dump — no reply yet        |
| Facebook / groups          | You        | Not Operator                            |

Ledger: **`tracking/tracking.xlsx`** (Prospects includes **variant A/B**). Operator only reads `tracking/zoho-queue.csv` (also has variant). Thread copy: `tracking/threads/`.

---

## Jacques — batch review

Approve **Next** in the thread file (after both hats). Then “rebuild queue” here, then tell Operator **check zoho-queue**.

Inbound: paste Operator’s `INBOUND_V1` here. We classify, dual-hat, you approve, then queue.

Joining groups is still you.

---

## Day 1

1. Read `positioning.md`
2. GROW50 + GBP
3. Keep **Operator**. Paste the new Profile from `grok-bot/operator.md` over the old growth-loop. Do not add Scout/Validator Bots.
4. Agent Computer: **Zoho grow@** only. Not Gmail. Not required until the first pass set.
5. Auto-review from `grok-bot/permissions.md`
6. Join the first batch of groups from Scout’s recs / `00-do-this-now.md` (start anywhere; coverage file is the map)
7. Grok Build: scout → compose → validate. Operator only after queue has `go` rows.

Tutor names when you have them.

---

## Facebook

`02-facebook-posts.md` is a **library**. You (or Grok Build copy) localise city and senior cert. Operator does not post.

`tracking/facebook-calendar.md`: group, city, state, joined, last post, next eligible.

Post every eligible slot. More groups (national) = more posts. Per-group monthly cap still 2.

---

## After first happy Diagnostic

Operator drafts the testimonial ask (PLAYBOOK voice). Do not send until approved. Google review only if happy.

---

## Tutor pilot

You name casuals (any state). Operator drafts `tutor-one-pager.md` from grow@. Never “hiring tutors” in parent groups.

---

## Paid ads

`paid-ads/LAUNCH.md` — **Locations: Australia.** Do not restrict to NSW/VIC/QLD “to start.” Jacques publishes. Operator read-only CPA memo. Budget is money, not tokens — you set it.

---

## Phase 1 gate (rolling 28 days)

Still a **product** gate (unlock Phase 2 tooling), not a market-size guess:

- ≥3 paid Diagnostics or term enrolments from marketing
- ≥10 funnel sessions with emails captured
- ≥2 positive outreach/partner replies

Hit any → flag Phase 2. Miss at 28 days → diagnose funnel and copy, not “we need a smaller city list.” Do not build Phase 2 yet.

---

## Grok Build vs Grok Bot

- **Grok Build:** scout, compose, validate, site, Pixel, Phase 2 after the gate
- **Grok Bot Operator:** Zoho only (`grok-bot/operator.md`) — paste Profile again; T5/T4 get the newsletter PNG, T3 the PDF

Ask Grok Build: scout / compose / validate (`grok-bot/GROK-BUILD.md`). After the gate: “Build Phase 2 from marketing/phase-2-build/implementation-brief.md”
