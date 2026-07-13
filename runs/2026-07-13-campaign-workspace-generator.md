# Agent Run: Campaign Workspace Generator

## Slice

Turn a producer/reviewer opportunity decision into a guarded project workspace without conflating evaluation authorization with participation approval.

## Loop Board

Loop: 1
Goal: Generate resumable campaign artifacts while enforcing human gates.
Decision: SHIP

| ID | From | To | Level | Request | Close Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CW1 | Opportunity Scout Agent | Operator Agent | BLOCKER | Record accepted, conflicting, and unresolved critical fields with official evidence | Valid review decision fixture | CLOSED |
| CW2 | Code Review Agent | Engineering Agent | BLOCKER | Prevent pending participation from becoming an active campaign | Mode derivation tests | CLOSED |
| CW3 | Test Agent | Engineering Agent | IMPROVEMENT | Fail visibly when the output parent path is absent | Reproducible failure and explicit parent creation | CLOSED |

## Evidence

Evidence ID: E-CAMPAIGN-1
Claim: The generator validates evidence, authorization, and human gate structure.
Level: E3
Source / Command / Tool: `node --test tests/*.test.mjs`
Result: PASS; 5 test files including evaluation/campaign mode and negative authorization/evidence cases.
Limits: Tests do not authorize participation.

Evidence ID: E-CAMPAIGN-2
Claim: The Team OS package remains structurally valid.
Level: E3
Source / Command / Tool: `scripts/validate.sh`
Result: PASS.

Evidence ID: E-CAMPAIGN-3
Claim: A real reviewed Backblaze decision generates a guarded Jingci workspace.
Level: E4
Source / Command / Tool: `node scripts/create-campaign-workspace.mjs --decision=examples/opportunities/backblaze-review-decision.json --out=/Users/edy/Desktop/learning/my-mastra-agent/docs/campaigns/backblaze-genmedia-2026`
Result: PASS after explicitly creating the known `docs/campaigns` parent; mode=`evaluation`, files=6.
Limits: Eligibility, participation, registration, terms, spend, and submission remain pending.

## Adversarial Review

Strongest rejection reason: A generated workspace could be mistaken for event participation approval.
Decision: PASS because unresolved eligibility or pending Human Gate A deterministically produces `evaluation`, and generated copy explicitly prohibits registration, terms, spend, publication, and submission.

## Next Owner

Operator Agent and human owner close eligibility and participation decisions. Engineering Agents may continue only within the embedded zero-spend evaluation authorization.
