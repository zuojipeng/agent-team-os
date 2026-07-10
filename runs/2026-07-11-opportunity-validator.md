# Team OS Run: Opportunity Validator

Date: 2026-07-11
Task: TOS-H002
Owner: Engineering Agent + Opportunity Scout Agent
Reviewers: Architecture Agent + Test Agent + Hermes
Status: SHIP

## Goal

Implement the first M2 boundary: a canonical machine-readable opportunity record and deterministic local validation before source adapters or scheduled scanning are added.

## Scope

- JSON Schema for the portable record contract
- zero-dependency Node CLI for structural and workflow invariants
- checked-in sample record
- Node built-in tests for valid, invalid, contradictory, and CLI paths

Out of scope:
- event scraping or browser automation
- accounts, registration, terms acceptance, or submission
- database, queue, dashboard, or scheduler

## Adversarial Review

Strongest rejection reason: a handwritten validator can drift from the JSON Schema.

Decision: PASS for this bounded slice. The validator reads required fields, allowed fields, and enums directly from the checked-in Schema, then adds cross-field workflow rules that are clearer in code. A general schema dependency is not justified until multiple real producers create more validation pressure.

Residual risk: source freshness and rule accuracy remain human-reviewed E2 evidence; this validator proves record shape, not event truth.

## Evidence

- `node --test tests/validate-opportunity.test.mjs`: 5 passed.
- `node scripts/validate-opportunity.mjs examples/opportunities/sample-opportunity.json`: PASS.
- `./scripts/validate.sh`: PASS.
- `git diff --check`: PASS.

## Next Loop

Implement one read-only source adapter against an official feed or page with cached fixtures, rate limits, and source timestamps. Do not add account actions.
