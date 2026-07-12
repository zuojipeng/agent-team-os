# Agent Run: Devpost Listing Discovery

## Slice

Add a bounded official-listing adapter that discovers Devpost event candidates and deduplicates canonical event URLs without claiming rule verification.

## Loop Board

Loop: 1
Goal: Turn one official Devpost listing response into a reproducible candidate index.
Current gate: Test
Decision: SHIP

| ID | From | To | Blocking Level | Request | Evidence Required | Status |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | Architecture Agent | Engineering Agent | BLOCKER | Keep listing discovery separate from event-page import and rule verification | Candidate-only output contract and documentation | CLOSED |
| L2 | Code Review Agent | Test Agent | BLOCKER | Prove canonical URL deduplication and reject account/external hosts | Cached fixture tests | CLOSED |

## Agent Reports

Role: Product Agent
Task: Define the smallest next M2 opportunity-engine slice.
Status: PASS
Evidence: `operating-system/opportunity-engine.md` requires discover, normalize, and deduplicate before verification.
Impact: Candidate intake becomes repeatable without overstating trust.
Risks: Listing freshness is not rule freshness.
Recommended owner: Architecture Agent
Request to orchestrator: Keep rule verification outside this slice.

Role: Architecture Agent
Task: Select the source contract and boundaries.
Status: PASS
Evidence: Devpost's official listing HTML declares `https://devpost.com/api/hackathons`; the adapter reads one bounded JSON page and emits no canonical opportunity record.
Impact: Avoids DOM coupling and preserves the existing importer boundary.
Risks: The unofficially documented response shape may change.
Recommended owner: Engineering Agent
Request to orchestrator: Require shape validation and cached fixtures.

Role: Code Review Agent
Task: Adversarially review trust and scope.
Status: PASS
Evidence: The adapter rejects non-HTTPS, external, account, help, and information hosts; strips path/query/hash; caps response size and candidate count.
Strongest rejection reason: A candidate could be mistaken for an eligible, current event.
Required repair: Label output as a candidate index and document that rules remain unverified.
Close condition: Output and docs make no verification claim.
Residual risk: An official event subdomain can still point to a closed event; later verification must resolve status.

## Evidence

Evidence ID: E-DISCOVER-1
Claim: Canonical candidate discovery is deterministic for cached Devpost-shaped input.
Level: E3
Source / Command / Tool: `node --test tests/*.test.mjs`
Result: PASS; 3 test files passed, including canonicalization, deduplication, event-host rejection, official listing endpoint enforcement, fetch settings, malformed payloads, and candidate limits.
Repro steps: Run the command from the Team OS repository root.
Limits: Cached input proves adapter behavior, not live source freshness.
Owner: Test Agent
Reviewer: Code Review Agent

Evidence ID: E-DISCOVER-2
Claim: The Team OS package remains structurally valid.
Level: E3
Source / Command / Tool: `scripts/validate.sh`
Result: PASS; Agent Team OS validation passed.
Repro steps: Run the command from the Team OS repository root.
Limits: Structural validation does not prove external source availability.
Owner: Engineering Agent
Reviewer: Test Agent

Evidence ID: E-DISCOVER-3
Claim: The official Devpost listing endpoint is compatible with the adapter on 2026-07-12.
Level: E4
Source / Command / Tool: `node scripts/discover-devpost-events.mjs --limit=10`
Result: PASS; one bounded page returned 9 unique canonical event candidates, including `https://xprize.devpost.com/` and `https://qwencloud-hackathon.devpost.com/`.
Repro steps: Run the command with network access; expect JSON with `source`, `listing_url`, `candidate_count`, and `candidates`.
Limits: Candidate presence does not prove deadline, eligibility, IP terms, or open registration.
Owner: Opportunity Scout Agent
Reviewer: Operator Agent

## Hermes Decision

SHIP this M2 slice. Next owner: Opportunity Scout Agent. Next smallest action: add a separate bounded verification adapter for deadline and official rule evidence on one human-selected candidate; do not auto-register or auto-submit.
