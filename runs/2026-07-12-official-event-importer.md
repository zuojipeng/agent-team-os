# Team OS Run: Official Event Importer

Date: 2026-07-12
Task: TOS-H003
Owner: Opportunity Scout Agent + Engineering Agent
Reviewers: Product Agent + Test Agent + Hermes
Status: SHIP

## Goal

Add the first read-only source adapter: convert one known official event page into a valid, low-confidence opportunity record without guessing rules.

## Scope

- fetch one explicitly supplied HTTP(S) event URL
- accept HTML only and cap the response at 2 MB
- extract Open Graph title, description, and canonical URL
- create a deterministic opportunity id
- emit `discovered`, `needs_review`, `score: null`, and human gates
- validate the generated record before output

Out of scope:
- scanning event listings
- parsing dates, eligibility, IP, prizes, or judging rules
- bypassing access controls, registration, or account actions
- storing or scheduling imported records

## Adversarial Review

Strongest rejection reason: a metadata importer can create false confidence that an event has been fully verified.

Controls:
- `verified_at`, deadlines, mode, location, and team size remain `null`
- rule-dependent fields remain empty or `unknown`
- confidence is always `low`
- hard filter remains `needs_review`
- `rules_review`, registration, terms, and submission stay as human gates

Decision: PASS. The adapter only establishes event identity and provenance.

## Evidence

- `node --test tests/validate-opportunity.test.mjs tests/import-official-event.test.mjs`: 8 passed.
- Live read-only import of `https://api-cloud-ai-hackathon-2026.devpost.com/`: PASS and emitted a valid discovered record.
- `./scripts/validate.sh`: PASS.
- `git diff --check`: PASS.

## Next Loop

Add a listing discovery adapter with cached fixtures, deduplication by canonical URL/id, source timestamps, and a conservative request cadence.
