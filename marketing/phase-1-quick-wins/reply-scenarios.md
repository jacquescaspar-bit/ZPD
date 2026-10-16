# Replies — classify, then copy

**Grok Build** uses this after Operator dumps inbound. Operator does **not** auto-draft from these templates in Zoho.

Guess id on inbound is optional; we re-classify here. Dual-hat: compose Next, then validator hat. Jacques approves → `zoho-queue.csv`.

Guide: https://zpdlearning.com/blog/is-tutoring-the-right-fit  
Diagnostic (only if they ask how a family starts): https://zpdlearning.com/enrol?plan=trial  
GROW50 only if they ask for a code. Never Essential on a first reply.

If two labels fit, use the **more specific** one (e.g. listing request beats “yes”). If nothing fits: `unknown` — draft nothing, flag Jacques.

---

## Classifier

Read the inbound. Pick **one** id.

| Id             | What they said                                                                                          | Next                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `ignore`       | Out of office, bounce, auto-ack, bulk newsletter                                                        | Log. No reply.                                                               |
| `stop`         | Unsubscribe, don’t contact, hostile, “remove me”                                                        | One close. Never follow up.                                                  |
| `escalate`     | Named child, complaint, legal, WWCC/insurance pack, vendor onboarding, “call me today”, threat, privacy | No draft. Jacques.                                                           |
| `yes-link`     | We’ll add the link / run a line                                                                         | Thank + URL once                                                             |
| `yes-piece`    | Send the 400 words / guest post / article                                                               | Thank; Grok Build writes the piece; Operator sends when Jacques has the text |
| `yes-handout`  | Clinic/SPELD will give it to parents                                                                    | Thank + URL; no enrol                                                        |
| `how-start`    | How do families book / cost / enrol                                                                     | Diagnostic URL + $110                                                        |
| `who-are-you`  | Advertising? conflict? who is ZPD?                                                                      | Short who; guide; no enrol                                                   |
| `edit-ok`      | Can we cut/edit/rebadge                                                                                 | Yes                                                                          |
| `forward`      | Wrong person, send to X                                                                                 | Thanks; don’t re-pitch X unless Jacques says                                 |
| `not-now`      | Maybe later, after exams, next issue, next term                                                         | One date; then wait                                                          |
| `no`           | Not for us, no thanks                                                                                   | Close the loop (template 6 bones)                                            |
| `listing`      | Join our tutor directory / register / paid slot                                                         | Decline; handout only                                                        |
| `referral-fee` | What’s in it for us / kickback                                                                          | No fee; handout                                                              |
| `speak`        | Present at meeting / webinar / seminar                                                                  | Jacques; draft a holding yes/maybe                                           |
| `send-to-list` | Blast our members / give us a mailout                                                                   | They send the link themselves; we don’t take the list                        |
| `parent`       | I’m a parent / my child                                                                                 | Treat as parent, not desk                                                    |
| `more-info`    | Brochure, pricing sheet, all plans                                                                      | Guide first; Diagnostic if they insist on booking                            |
| `unknown`      | Can’t classify                                                                                          | Flag Jacques                                                                 |

Desk from the original send (clinic / P&C / blog) still applies to tone. Sign-off: **Jacques**. From grow@.

---

## Copy

Subject: `Re: [original subject]` unless noted. Keep it short.

### `stop`

```
Hi [Name],

Understood — I won’t email again. Sorry for the noise.

Jacques
```

### `yes-link`

```
Hi [Name],

Thanks — that’s all it needed. Same link if useful:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

### `yes-piece`

Operator drafts this **holding** reply immediately. The actual article is written in Grok Build, then Operator sends it as a follow-up.

```
Hi [Name],

Thanks — I’ll send a short piece (~400 words) you can run or cut. Title: “Is tutoring actually the right fit?” Link-out to the free guide, no enrol pitch.

I’ll have it to you shortly.

Jacques
```

When Jacques has the piece:

```
Hi [Name],

Here’s the piece. Cut anything you like. Guide at the end if you want a link:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

### `yes-handout` (clinic / SPELD / Learning Links)

```
Hi [Name],

Glad it’s useful. Same page if a parent asks about tutoring — no referral fee, not a listing:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

If they want to try a session after that, it’s a $110 Diagnostic, one-off, no term locked in. Only if they ask you.

Jacques
```

(Diagnostic sentence stays **only** for this desk, and only as “if the parent asks you.” Do not put it on P&C yes-link.)

### `how-start`

```
Hi [Name],

Families start with one Diagnostic session ($110) so nobody commits to a term blind. Online or in-home.

https://zpdlearning.com/enrol?plan=trial

Jacques
```

If they asked as a **parent** (not a desk), same body. If they asked as a clinic, you can add: “Happy for you to send that link; no referral fee.”

### `who-are-you`

```
Hi [Name],

Fair question. ZPD Learning is classroom teachers who still work in schools — term plans, not homework rescue. I’m not asking you to sell it.

The page is a free parent guide on whether tutoring is actually the right fit:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

### `edit-ok`

```
Hi [Name],

Yes — cut, rebadge, or run a line with the link only. Whatever works for your readers.

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

### `forward`

```
Hi [Name],

Thanks for pointing me. I won’t chase [X] unless they want it.

Jacques
```

### `not-now`

```
Hi [Name],

No rush. I’ll leave it with you for [month / next issue / after exams]. Guide stays here if the timing opens up:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

Log `follow-up-due` on that date. One bump later (outreach template 5). Then stop.

### `no`

```
Hi [Name],

All good — thanks for the time. I won’t chase it. Guide stays up if it’s handy later:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

Log `closed`.

### `listing`

```
Hi [Name],

Not asking to be listed or to join a register. If a parent asks you about tutoring, the page is a neutral handout only:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

### `referral-fee`

```
Hi [Name],

No referral fee. If a family asks you about tutoring, send the guide; that’s the whole ask.

https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

### `speak`

```
Hi [Name],

I can do a short parent-facing session (tutoring fit — not a sales slot). I’ll confirm times with you once I’ve checked.

Jacques
```

Flag Jacques with the date/place they named. Operator does **not** commit a calendar slot.

### `send-to-list`

```
Hi [Name],

Best if it comes from you. Here’s the line and the link — you send it to members if you want:

Is tutoring actually the right fit? A short free read for parents: https://zpdlearning.com/blog/is-tutoring-the-right-fit

Jacques
```

Never accept a CSV or “just add these addresses.”

### `parent`

They wrote as a parent, not as the desk.

```
Hi [Name],

If you’re weighing tutoring for your child: start with whether the work is too hard, too easy, or in the gap in between — that’s the guide.

https://zpdlearning.com/blog/is-tutoring-the-right-fit

If you want to try one session with a classroom-active teacher, it’s $110 Diagnostic, no term until it fits:

https://zpdlearning.com/enrol?plan=trial

Jacques
```

GROW50 only if they ask.

### `more-info`

```
Hi [Name],

The parent page is the full first read:

https://zpdlearning.com/blog/is-tutoring-the-right-fit

If you’re asking how a family starts: one Diagnostic session, $110.

https://zpdlearning.com/enrol?plan=trial

Jacques
```

Do not attach Essential/Intensive pricing unless they asked for term plans **after** Diagnostic.

---

## Operator log line

After each inbound: `outreach-log` Notes += `reply:{id}` and Status (`waiting-reply` / `follow-up-due` / `closed`).

Unknown or escalate: no send, list the thread for Jacques.
