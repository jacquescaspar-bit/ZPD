# Grok Bot = Operator only

| Who            | What                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Grok Build** | Scout, compose, validate, ingest dumps, rebuild queue                                         |
| **Operator**   | Zoho: dump inbound; paste `zoho-queue.csv`; T5/T4 inline+attach newsletter PNG; T3 attach PDF |

Profile: `operator.md` → Edit Profile (replace the old growth-loop).

Do not create Scout, Validator, or Zoho Bots.

Flow: inbound dump → we write Next (two hats) → you approve → `zoho-queue.csv` → you say **check zoho-queue** → Operator pastes → SENT_V1.

Dumps: `tracking/README.md`. Permissions: require approval on every send (`permissions.md`).
