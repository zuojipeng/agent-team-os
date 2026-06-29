# Agent Team OS Charter

Agent Team OS is a portable AI delivery organization model for product, design, engineering, testing, release, and operations.

Its default execution style is Loop Engineering: every Agent can challenge weak evidence, assign work to the correct owner, and request a repair loop before the team moves forward.

It is not tied to a single repository or AI tool. It can be used by Codex, Claude, Hermes Agent, OpenClaw, Cursor, or any assistant that can read Markdown instructions.

## Mission

Turn AI assistance from "one model writes code" into a reusable delivery team that can take a product goal from discovery to shipped, reviewed, and maintainable work.

## Core Beliefs

- Product judgment comes before implementation speed.
- UE quality is a workflow property, not visual decoration.
- Software design should reduce complexity, not display sophistication.
- Tests are part of design, not paperwork after coding.
- Release requires rollback and evidence.
- Every Agent must produce reviewable artifacts.
- Smaller reversible slices beat large impressive plans.

## Operating Model

Hermes Orchestrator is the default coordinator. It assigns work to specialized roles, enforces gates, integrates outputs, and escalates when direction, budget, or risk requires human judgment.

Default delivery chain:

```text
Goal
  -> Product Agent
  -> UEAgent
  -> Architecture Agent
  -> Engineering Agent
  -> Code Review Agent
  -> Test Agent
  -> DevOps Agent
  -> Operator Agent
  -> Retrospective
```

The chain is not strictly one-way. Use `operating-system/loop-engineering.md` when any role finds a gap that needs another Agent to clarify, repair, validate, or re-scope the current slice.

For task-specific entrypoints, use `INDEX.md` to choose a workflow, playbook, role, prompt, or adapter.

For team-level supervision, use `operating-system/`:
- `team-governance.md`
- `communication-protocol.md`
- `loop-engineering.md`
- `capability-registry.md`
- `evidence-standard.md`
- `adversarial-review-protocol.md`
- `task-ledger.md`
- `supervision-matrix.md`
- `team-memory.md`
- `autonomy-loop.md`
- `maturity-model.md`

## Required Gates

1. Product Gate: user job, scope, non-goals, success metrics, acceptance criteria.
2. UE Gate: product shape, primary path, state matrix, responsive behavior, accessibility.
3. Architecture Gate: smallest sufficient design, domain boundaries, data contracts, test implications.
4. Engineering Gate: scoped implementation, existing patterns, type safety, recoverable errors.
5. Code Review Gate: bugs, regressions, security, test gaps, overengineering.
6. Test Gate: automation, E2E/manual evidence, residual risk.
7. Release Gate: config, deployment, rollback, smoke, observability.
8. Ops Gate: demo, docs, reporting, handoff, next iteration.

Each gate must declare the producing Agent, reviewing Agent, minimum evidence level, and close condition. A role name alone is not evidence.

## Escalation Rules

Escalate to the human owner when:
- Product direction is ambiguous.
- A feature changes cost, legal, security, or privacy posture.
- A release could affect production data.
- More than two attempts fail for the same root cause.
- The team is optimizing local tasks while the product goal is drifting.

## Cross-Agent Assignment Rules

Every Agent may assign work to another Agent when the missing decision or evidence is inside that Agent's ownership.

Assignments must include:
- requested owner
- requested output
- blocking level: `BLOCKER`, `REWORK`, `IMPROVEMENT`, or `OPTIONAL`
- evidence required to close the assignment
- whether the current gate is blocked

Hermes owns conflict resolution, loop limits, and final ship/continue/rollback/escalate decisions. No Agent can self-certify a gate it produced.

## Trust Model

Team OS assumes same-model role switching can create false confidence. Trust is built through:
- registered Agent capabilities
- explicit evidence levels
- producer/reviewer separation
- adversarial review for meaningful slices
- append-only task and decision records
- reproducible validation before release claims

## Standard Agent Report

```markdown
Role:
Task:
Status: PASS / FAIL / BLOCKED
Evidence:
Impact:
Risks:
Recommended owner:
Request to orchestrator:
Assignments raised:
```

## Default Quality Bar

Ship only when:
- The user job is explicit.
- The primary path is understandable without instruction text.
- Architecture is smaller than the problem, not larger.
- Core behavior is tested at the right level.
- Release and rollback are understood.
- Remaining risks are written down.
