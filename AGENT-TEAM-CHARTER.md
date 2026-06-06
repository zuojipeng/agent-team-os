# Agent Team OS Charter

Agent Team OS is a portable AI delivery organization model for product, design, engineering, testing, release, and operations.

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

For task-specific entrypoints, use `INDEX.md` to choose a workflow, playbook, role, prompt, or adapter.

For team-level supervision, use `operating-system/`:
- `team-governance.md`
- `communication-protocol.md`
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

## Escalation Rules

Escalate to the human owner when:
- Product direction is ambiguous.
- A feature changes cost, legal, security, or privacy posture.
- A release could affect production data.
- More than two attempts fail for the same root cause.
- The team is optimizing local tasks while the product goal is drifting.

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
```

## Default Quality Bar

Ship only when:
- The user job is explicit.
- The primary path is understandable without instruction text.
- Architecture is smaller than the problem, not larger.
- Core behavior is tested at the right level.
- Release and rollback are understood.
- Remaining risks are written down.
