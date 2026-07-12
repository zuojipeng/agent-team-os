# Opportunity Engine

The Opportunity Engine turns public competition information into a verified portfolio of campaigns that Agent Team OS can prepare and execute under human authority.

It is designed for hackathons first, but the same record can later support grants, bounties, accelerators, and client opportunities.

## Pipeline

```text
Official sources
  -> discover
  -> normalize
  -> deduplicate
  -> verify rules and freshness
  -> hard-filter
  -> score fit and winnability
  -> portfolio review
  -> human GO / NO-GO
  -> campaign workspace
  -> delivery workflow
  -> submission approval
  -> result and retrospective memory
```

## Source Policy

Prefer official event and organizer sources. Aggregators may discover an event but cannot close deadline, eligibility, IP, or submission-rule questions.

Initial source registry:
- Devpost: `https://devpost.com/hackathons`
- Major League Hacking: `https://mlh.io/seasons`
- DoraHacks: `https://dorahacks.io/hackathon`
- ETHGlobal: `https://ethglobal.com/events`
- lablab.ai: `https://lablab.ai/ai-hackathons`
- Kaggle: `https://www.kaggle.com/competitions`
- organizer newsletters, official calendars, and verified social announcements

Source adapters must respect published APIs, feeds, terms, robots rules, and rate limits. Browser automation is a fallback for approved read-only discovery, not permission to bypass access controls.

## Canonical Opportunity Record

```yaml
id: source-stable-id
title: string
source: string
official_url: https://...
organizer: string
status: discovered | verified | shortlisted | approved | rejected | active | submitted | closed
discovered_at: ISO-8601
verified_at: ISO-8601 | null
registration_deadline_utc: ISO-8601 | null
submission_deadline_utc: ISO-8601 | null
mode: online | in_person | hybrid | null
location: string | null
languages: [string]
eligibility: [string]
team_size: { min: number, max: number } | null
tracks: [string]
required_technology: [string]
allowed_preexisting_work: yes | no | partial | unknown
deliverables: [repository, demo_url, video, slides, form]
ip_and_license_summary: string
prize_and_network_value: string
estimated_cost: number | null
estimated_team_hours: number | null
fit_assets: [string]
hard_filter: pass | fail | needs_review
score: number | null
confidence: low | medium | high
evidence: [url-or-artifact]
human_gates: [string]
```

Unknown values must remain unknown. Agents must not infer favorable rules.

## Hard Filters

Reject or send to human review before scoring when:
- owner or team is ineligible by country, age, employment, student status, or attendance mode
- deadline cannot support build, freeze, test, and submission windows
- required spend or travel exceeds the authorization envelope
- IP, license, privacy, identity, or pre-existing-code rules are materially unclear
- required technology cannot be accessed or validated
- submission requires misleading disclosure about prior work
- the opportunity conflicts with another approved campaign or product milestone

## Weighted Score

Score only opportunities that pass hard filters.

| Dimension | Weight | Question |
| --- | ---: | --- |
| Strategic fit | 25 | Does this strengthen an owned product or durable capability? |
| Reusable asset leverage | 20 | Can 40% or more of the foundation be reused lawfully and disclosed? |
| Winnability | 20 | Is there a sharp judging thesis and credible differentiation? |
| Delivery capacity | 15 | Can the team finish with freeze, E2E, deploy, and fallback evidence? |
| Demo leverage | 10 | Can judges understand value in under three minutes? |
| Prize/network value | 10 | Is the upside meaningful beyond headline prize value? |

Apply explicit risk penalties for rule uncertainty, paid dependencies, unstable sponsor APIs, timezone/travel burden, and public-data exposure.

Default portfolio policy:
- `80+`: recommend GO review
- `65-79`: watchlist or strategy spike
- below `65`: reject unless the human owner names a strategic exception
- no more than one high-intensity and two low-intensity active campaigns at once

## Authorization Envelope

Each approved campaign records what the team may do without another prompt:

```yaml
may_create_branch: true
may_create_public_repository: false
may_deploy_preview: true
may_deploy_production: false
may_use_paid_api: false
max_external_spend: 0
may_register_event: false
may_accept_terms: false
may_submit_entry: false
may_contact_people: false
```

Account registration, identity representation, accepting event terms, travel, payment, public submission, IP/license commitments, and prize/tax declarations require the human owner unless a future policy provides explicit event-scoped authorization.

## Cadence

- Daily: scan sources, normalize changes, expire stale records.
- Weekly: Hermes reviews the top five verified opportunities against capacity and product milestones.
- `T-21d`: request GO / NO-GO for promising events.
- `T-7d`: lock rules, thesis, asset disclosure, team, budget, and submission checklist.
- `T-48h`: enter Hackathon 48h Mode and freeze unrelated work.
- `T-4h`: feature freeze; smoke, pitch, fallback recording, and form validation only.
- `T+1d`: capture result, judge feedback, reusable code, and process lessons.

## Reliability And Trust

- shortlist requires E2 official-source evidence
- approved campaign requires reproducible rule and deadline record at E4
- producer and reviewer must be different roles
- the Opportunity Scout cannot approve its own recommendation
- Product Red Team challenges strategic fit; Release Red Team challenges deploy and submission readiness
- every source change creates an append-only event in the campaign ledger
- stale verification automatically lowers confidence and can revoke shortlist status

## Implementation Evolution

### M1: Protocol And Manual Proof

Use the opportunity template, official sources, weighted score, and human gates manually across three events.

### M2: Local Opportunity CLI

Add a canonical JSON schema, source adapters, deduplication, UTC deadline alerts, and Markdown brief generation. Keep account actions out of the CLI.

Current foundation:
- `schemas/hackathon-opportunity.schema.json`
- `scripts/validate-opportunity.mjs`
- `scripts/import-official-event.mjs`
- `scripts/discover-devpost-events.mjs`
- `scripts/build-devpost-rule-evidence.mjs`
- `tests/validate-opportunity.test.mjs`
- `tests/import-official-event.test.mjs`
- `tests/discover-devpost-events.test.mjs`
- `tests/build-devpost-rule-evidence.test.mjs`

The validator must pass before an imported record enters hard-filter or score review.

The Devpost listing adapter reads one bounded page from the official public JSON endpoint, emits a candidate index, and deduplicates canonical event roots. It does not claim that candidates are verified opportunities. The page importer remains a separate step and emits only low-confidence discovery metadata; rule verification is still a distinct adapter and gate.

The Devpost rule-evidence adapter reads only an event root and its `/rules` page. It captures machine-readable event facts and bounded official section excerpts into a review draft. The adapter never marks the opportunity verified: Opportunity Scout and Operator review are required before canonical fields, hard filters, or confidence can be upgraded.

### M3: Campaign Workspace Generator

Create a project branch/worktree, task ledger, rules snapshot, judging matrix, delivery plan, submission checklist, and retrospective from an approved opportunity.

### M4: Supervised Portfolio Autopilot

Run scheduled scans, capacity-aware selection, deadline wakeups, cross-Agent assignments, build/test/deploy loops, and a one-action human approval inbox.

### M5: Learning Competition Organization

Benchmark predicted versus actual outcomes, calibrate scores, measure asset reuse and cycle time, compare Agent/runtime performance, and retire playbooks that do not improve results.

The long-term moat is not more Agent personas. It is a growing evidence graph connecting opportunity rules, product assets, decisions, implementation history, test proof, judging outcomes, and reusable lessons.
