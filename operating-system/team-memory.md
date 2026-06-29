# Team Memory

Agent Team OS improves only if lessons become reusable memory.

## Memory Types

| Memory | Location | Purpose |
| --- | --- | --- |
| Project scorecards | target project `docs/team-os/` | project health snapshots |
| Agent run logs | target project `docs/agent-runs/` | per-slice execution evidence |
| Task ledgers | target project `docs/team-os/task-ledger.md` | durable tasks, assignments, reviews, evidence, and progress |
| Test reports | target project `docs/test-reports/` | validation evidence |
| ADRs | target project `docs/adr/` | durable architecture decisions |
| Reusable principles | Team OS `principles/` | cross-project standards |
| Playbooks | Team OS `playbooks/` | repeated operating modes |
| Templates | Team OS `templates/` | repeatable artifact shape |

## Lesson Promotion Rule

A project lesson becomes Team OS memory when:
- it repeats across two projects
- it prevented a serious defect
- it shortened future delivery
- it clarified a reusable judgment
- it improved a gate or review checklist

## Retrospective Questions

After every meaningful slice:
- What changed?
- What evidence proved it?
- What slowed us down?
- Which Agent should have caught the issue earlier?
- Is this lesson project-specific or reusable?
- Should Team OS be updated?

## Memory Hygiene

- Do not promote project-specific details into global rules.
- Do not keep stale rules that no longer affect decisions.
- Prefer small reusable templates over long essays.
- Version Team OS changes with git commits.
- Keep ledgers compact. Preserve decisions and evidence, not raw chat noise.
- Never store secrets, tokens, or private production data in Team OS memory.
