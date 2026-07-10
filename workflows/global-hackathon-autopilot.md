# Workflow: Global Hackathon Autopilot

Use when Agent Team OS should continuously find suitable competitions and carry approved opportunities from strategy to submission.

Read first:
- `operating-system/opportunity-engine.md`
- `agents/opportunity-scout-agent.md`
- `workflows/hackathon-48h.md`
- `playbooks/hackathon-kit.md`

## Phase 1: Discover And Verify

Opportunity Scout Agent:
- scans the source registry and deduplicates events
- creates a normalized opportunity brief
- verifies official rules, deadlines, eligibility, deliverables, and prior-work policy
- marks unknown or conflicting rules instead of guessing

Reviewer: Operator Agent checks dates, timezone, attendance, language, and deliverables.

Gate: only E2 verified opportunities proceed to scoring.

## Phase 2: Score And Select

Product Agent:
- maps the event to an owned product, reusable asset, or explicit learning goal
- writes one judging thesis and one memorable demo promise
- estimates what must be new during the event

Architecture Agent and DevOps Agent:
- assess sponsor integration, environment, cost, deployment, and fallback risk

Hermes:
- applies hard filters and weighted scoring
- checks campaign capacity and product roadmap conflict
- presents GO / WATCH / NO-GO with evidence and a decision deadline

Human Gate A:
- approve or reject participation
- approve event-scoped authorization envelope
- personally complete or explicitly authorize registration and terms acceptance

## Phase 3: Prepare The Campaign

After GO:
- snapshot rules and judging criteria
- record pre-existing assets and required disclosure
- create campaign branch/worktree and task ledger
- prepare PRD, UE flow, architecture note, test matrix, release plan, pitch skeleton, and submission checklist
- validate sponsor credentials and free/paid limits without committing spend outside the envelope

Hermes assigns the normal Product -> UE -> Architecture -> Engineering -> Review -> Test -> Release -> Ops chain.

Gate: campaign cannot start build mode without rules snapshot, acceptance criteria, demo path, and fallback strategy.

## Phase 4: Execute

Use `hackathon-48h.md` or an event-specific schedule.

Rules:
- build one sharp vertical slice
- keep all prior-work disclosure accurate
- maintain a stable demo branch
- keep a fallback recording and deterministic demo data
- feature-freeze with at least four hours remaining
- route defects through bounded repair loops

## Phase 5: Submit

Test Agent and DevOps Agent verify:
- public URL and repository access
- clean setup path
- judging criteria coverage
- required video, deck, screenshots, forms, licenses, and attributions
- deadline timezone and upload completion margin

Operator Agent assembles the submission packet and exact form values.

Human Gate B:
- approve public claims, repository visibility, licenses, terms, identity, and final submission
- perform the final account-bound action unless event-scoped authority explicitly allows the tool to do so

No Agent may report `SUBMITTED` from a prepared draft or upload preview. Submission requires platform confirmation evidence.

## Phase 6: Learn And Compound

Within one day:
- record placement, feedback, traffic, failures, and actual time/cost
- compare predicted score with outcome
- separate reusable product code from event-specific code
- merge reusable work only through normal project review
- update opportunity scoring calibration and Team OS memory
- publish an honest case study only after Human Gate C approves public communication

## Success Metrics

- verified opportunities per month
- shortlist precision and stale-source rate
- GO-to-submission conversion
- on-time submission rate
- demo failure rate
- percentage of reused assets versus event-only code
- predicted score calibration versus placement/judge feedback
- product improvements retained after competitions
- prize, partnership, user, and learning value per team hour
