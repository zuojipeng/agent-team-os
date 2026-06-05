# Agent Team OS

Portable AI delivery organization for product, UE, architecture, engineering, testing, release, and operations.

Use this folder as the source of truth for host-level Agent team behavior.

## Structure

```text
AGENT-TEAM-CHARTER.md
agents/
principles/
workflows/
templates/
adapters/
scripts/
```

## Quick Use

For any AI tool:

1. Read `AGENT-TEAM-CHARTER.md`.
2. Read the workflow that matches the task.
3. Read only the relevant Agent role files.
4. Use templates for deliverables.
5. Keep project-specific artifacts inside the target project; keep reusable rules here.

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
