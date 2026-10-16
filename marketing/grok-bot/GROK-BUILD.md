# Grok Build — scout, compose, validate, ingest

Local only. Operator is Zoho.

| Job      | How                                             | Output                                                                             |
| -------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| Scout    | `scout.md`                                      | `evidence/{slug}.md` + outreach.csv row                                            |
| Compose  | `compose.md` (hat 1)                            | `## Next` in `tracking/threads/{id}.md`                                            |
| Validate | `validator.md` (hat 2 — treat compose as wrong) | rewrite Next or kill                                                               |
| You      | approve                                         | status `go`                                                                        |
| Queue    | rebuild                                         | `tracking/zoho-queue.csv` + Queue sheet; body matches **variant** (50/50 per type) |
| Operator | “check zoho-queue”                              | paste in Zoho; T5/T4 inline+attach newsletter PNG; T3 attach PDF                   |
| Ingest   | paste INBOUND_V1 / SENT_V1                      | update CSVs                                                                        |

## Prompts

**Scout:**  
`Scout coverage gaps. Write evidence files with verbatim quotes. Add outreach.csv rows. No desktop.`

**Inbound:** (paste Operator dump)  
`Ingest INBOUND_V1. Set needs_us. Dual-hat Next for each new thread.`

**Compose+validate first-touch:**  
`Compose first-touch from evidence into thread ## Next. Then validator hat: assume it is wrong, rewrite or kill. Show me both. Do not queue until I approve.`

**Approve:**  
`Mark {slug} go. Rebuild zoho-queue.csv.`

**Operator:**  
`check zoho-queue`
