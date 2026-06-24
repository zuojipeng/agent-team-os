# Playbook: OKR Cascade

Use when the human owner wants Team OS to turn a broad goal into project OKRs, Agent-owned OKRs, execution loops, and a final report.

## Goal

Create one measurable cycle plan, let each Agent own role-specific outcomes, then execute the smallest valuable slice with evidence.

## Sequence

1. Hermes: define cycle, primary slice, decision deadline, and current constraints.
2. Product Agent: define user job, product objectives, non-goals, acceptance criteria, and product risks.
3. UEAgent: define primary workflow, screen hierarchy, state matrix, responsive/accessibility requirements, and UE risks.
4. Architecture Agent: define smallest sufficient boundaries, API/data contracts, test seams, and migration/release implications.
5. Engineering Agent: define implementation OKRs, file ownership, execution order, and rollback-friendly slices.
6. Code Review Agent: define review OKRs, severity thresholds, security/privacy checks, and scope-control checks.
7. Test Agent: define validation OKRs, test matrix, automation/manual evidence, and residual risk rules.
8. DevOps Agent: define runtime, config, deploy, smoke, rollback, and observability OKRs.
9. Operator Agent: define demo, handoff, release notes, known limitations, and final reporting OKRs.
10. Hermes: merge outputs into `templates/okr-cascade.md`, open a loop board, and pick the first implementation slice.

## Required Output

Write the project-specific OKR cascade into the target project, usually:

```text
docs/okrs/YYYY-MM-DD-project-okr.md
```

The document must include:
- north star
- 2-4 project objectives
- measurable key results
- every Agent's own OKRs
- non-goals
- acceptance criteria
- loop board
- Hermes decision

## Execution Rule

After OKRs are written, do not attempt all KRs at once. Hermes chooses one vertical slice that:
- advances at least one project objective
- has a named Agent owner
- can be validated in this loop
- does not depend on unrelated future scope

## Final Report Format

Every OKR execution loop ends with:

```markdown
Role:
Task:
Status: PASS / FAIL / BLOCKED
Evidence:
Commands run:
Release readiness:
Risks:
Acceptance criteria:
Assignments raised:
Next owner:
```

Reports must distinguish:
- passed
- passed with warnings
- failed
- blocked
- not run

## Anti-Patterns

- OKRs that describe activity instead of measurable outcomes.
- Agents copying Hermes goals without role-specific ownership.
- KRs that cannot be verified.
- Shipping UI that still communicates placeholders as capability.
- Treating known limitations as shipped claims.
