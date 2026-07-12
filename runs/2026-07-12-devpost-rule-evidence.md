# Agent Run: Devpost Rule Evidence

## Slice

Create a bounded evidence adapter for one Devpost event without automating legal judgment or participation approval.

## Loop Board

Loop: 1
Goal: Produce reviewable deadline, attendance, eligibility, submission, prior-work, and IP evidence from official pages.
Current gate: Engineering
Decision: SHIP

| ID | From | To | Blocking Level | Request | Evidence Required | Status |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | Product Agent | Architecture Agent | BLOCKER | Separate evidence gathering from verification judgment | Draft output with null verified status | CLOSED |
| R2 | Architecture Agent | Engineering Agent | BLOCKER | Use JSON-LD for event facts and bounded titled sections for rules | Cached fixture coverage | CLOSED |
| R3 | Code Review Agent | Test Agent | BLOCKER | Prove missing rules remain unknown and fetch scope stays bounded | Negative tests and live smoke | CLOSED |

## Adversarial Review

Reviewer: Code Review Agent
Producer reviewed: Opportunity Scout Agent
Scope: Official Devpost event and rules evidence extraction.
Strongest rejection reason: Extracted legal text could be mistaken for a legal conclusion or verified eligibility.
Evidence checked: Output contract, source URLs, unknown handling, and fetch boundary.
Blocking level: PASS
Required repair: Keep `verified_opportunity_status` null and require human plus Operator review.
Owner: Engineering Agent
Close condition: Automated tests prove bounded extraction and no verification claim.
Residual risk: Official page markup and rule headings can change; missing sections must remain visible.

## Evidence

Evidence ID: E-RULES-1
Claim: Rule evidence extraction respects heading boundaries and does not infer missing sections.
Level: E3
Source / Command / Tool: `node --test tests/*.test.mjs`
Result: PASS; 4 test files passed, including JSON-LD facts, H4/H5 section boundaries, unknown handling, URL restrictions, and two-page fetch scope.
Repro steps: Run the command from the Team OS repository root.
Limits: Cached fixtures do not prove live markup stability.
Owner: Test Agent
Reviewer: Code Review Agent

Evidence ID: E-RULES-2
Claim: The Team OS package remains structurally valid.
Level: E3
Source / Command / Tool: `scripts/validate.sh`
Result: PASS; Agent Team OS validation passed.
Repro steps: Run the command from the Team OS repository root.
Limits: Structural validation does not verify external rules.
Owner: Engineering Agent
Reviewer: Test Agent

Evidence ID: E-RULES-3
Claim: The adapter is compatible with a current official Devpost event and rules page on 2026-07-12.
Level: E4
Source / Command / Tool: `node scripts/build-devpost-rule-evidence.mjs --url=https://xprize.devpost.com/`
Result: PASS; captured event dates, online attendance, eligibility, submission requirements, prior-work language, and IP sections with official source anchors while leaving verified status null.
Repro steps: Run the command with network access and review the JSON evidence draft against both official pages.
Limits: This is evidence collection, not legal advice, eligibility approval, registration, or a verified opportunity record.
Owner: Opportunity Scout Agent
Reviewer: Operator Agent

## Hermes Decision

SHIP the evidence adapter. Next owner: Opportunity Scout Agent and Operator Agent. Next smallest action: define a reviewer decision record that maps each canonical opportunity field to accepted evidence, conflict, or unresolved status before any opportunity can become `verified`.
