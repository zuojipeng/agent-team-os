# Team OS Run: Global Hackathon Autopilot

Date: 2026-07-10
Task: TOS-H001
Owner: Hermes Orchestrator
Producers: Opportunity Scout Agent + Product Agent
Reviewers: Operator Agent + Architecture Agent + Test Agent
Status: SHIP protocol / CONTINUE implementation

## Goal

Extend Agent Team OS from executing a known hackathon to continuously discovering, selecting, preparing, and delivering suitable global competitions under explicit human authority.

## Capability Register

| Agent | Capability | Level | Available | Evidence | Limit | Reviewer |
| --- | --- | --- | --- | --- | --- | --- |
| Opportunity Scout Agent | official web-source discovery and rule normalization | C3 | yes | E2 official pages and verified timestamps | no account, terms, identity, spend, or submission authority | Product Agent + Operator Agent |
| Product Agent | asset/track fit and judging thesis | C1 | yes | E2 product portfolio and competition brief | cannot approve participation | Hermes |
| Hermes | portfolio scoring and campaign routing | C2 | yes | reproducible score, capacity decision, task ledger | cannot grant itself human authority | Human Owner |
| Delivery team | build, review, test, deploy preview, prepare submission | C2/C3 | project-dependent | E3/E4 implementation and release evidence | public/production actions remain inside campaign envelope | Code Review + Test + Human Owner |

## Adversarial Review

Strongest rejection reason: adding a Scout persona could become another prompt-only role that ranks stale web pages and creates contest activity without improving owned products.

Evidence checked:
- existing `workflows/hackathon-48h.md` only starts after an event is known
- existing trust model requires producer/reviewer separation and evidence levels
- official platforms expose different eligibility, prior-work, deliverable, account, and deadline rules

Required controls added:
- canonical opportunity record and official-source policy
- hard filters before weighted scoring
- source freshness and confidence
- product-asset reuse and retained-value metrics
- explicit account, identity, cost, legal, publication, and submission gates
- outcome calibration before scoring becomes autonomous

Decision: PASS for M1 protocol.

## Validation

- `./scripts/validate.sh`: PASS
- `git diff --check`: PASS for Team OS-owned files
- producer/reviewer and human-gate boundaries are explicit

## Next Implementation Loop

Owner: Engineering Agent + Opportunity Scout Agent
Scope: implement a local canonical opportunity schema and manual brief validator before any source scraper.
Close condition: three real events can be represented, deduplicated, scored, expired, and reviewed without browser account actions.
