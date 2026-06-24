# Agent Team OS

Portable AI delivery organization for product, UE, architecture, engineering, testing, release, and operations.

Team OS runs in Loop Engineering mode by default: Agents can challenge each other, assign owner-specific repair work, and repeat short evidence-driven loops until the slice is shippable, reduced, rolled back, or escalated.

Use this folder as the source of truth for host-level Agent team behavior.

## Structure

```text
AGENT-TEAM-CHARTER.md
INDEX.md
agents/
operating-system/
principles/
workflows/
playbooks/
templates/
adapters/
prompts/
scripts/
```

## Quick Use

For any AI tool:

1. Read `AGENT-TEAM-CHARTER.md`.
2. Read `operating-system/loop-engineering.md` for assignment and repair-loop rules.
3. Read the workflow that matches the task.
4. Read only the relevant Agent role files.
5. Use templates for deliverables.
6. Keep project-specific artifacts inside the target project; keep reusable rules here.

## Delivery Modes

Use `workflows/stage-gate-delivery.md` as the default delivery operating model for new requests. Hermes classifies each request as:

- `S`: small change, lightweight gates
- `M`: normal feature, product/UE/architecture/engineering/test/release gates
- `L`: large feature or new product, full PRD/prototype/UI/architecture/release/ops loop

Use `playbooks/okr-cascade.md` when the request starts from a broad goal and needs project OKRs plus Agent-owned OKRs before implementation.

The default rule is: choose the lightest process that still produces enough evidence for Hermes to decide `SHIP`, `CONTINUE`, `ROLLBACK`, or `ESCALATE`.

## Codex Skill

Codex entrypoint:

```text
/Users/edy/.codex/skills/agent-team-os/SKILL.md
```

Trigger example:

```text
Use Agent Team OS to run this project from PRD to release.
```

## Project Installation

From a target project:

```bash
/Users/edy/.agents/team-os/scripts/install-to-project.sh .
```

This creates a small `AGENT-TEAM-OS.md` pointer and lightweight template folders without copying the whole system.

## Validation

```bash
/Users/edy/.agents/team-os/scripts/validate.sh
```

Expected output:

```text
Agent Team OS validation passed
```

## Project Scorecard

Create a project scorecard from the reusable template:

```bash
/Users/edy/.agents/team-os/scripts/new-scorecard.sh "Project Name" ./docs/team-os/project-scorecard.md
```
