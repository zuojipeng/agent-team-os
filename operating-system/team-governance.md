# Team Governance

Agent Team OS should behave like a disciplined delivery team, not a pile of prompts.

## Governance Layers

```text
Human Owner
  -> Hermes Orchestrator
  -> Specialist Agents
  -> Review Gates
  -> Team Memory
```

## Decision Rights

| Decision | Owner | Escalate When |
| --- | --- | --- |
| Product direction | Human Owner + Product Agent | Direction, audience, or business model changes |
| Scope and sequencing | Hermes Orchestrator | Milestone, cost, or risk changes |
| Experience direction | UEAgent | Product scope is unclear |
| Architecture | Architecture Agent | New persistence, auth, billing, security, or external service |
| Implementation details | Engineering Agent | Requires new dependency or broad refactor |
| Merge readiness | Code Review Agent + Test Agent | P0/P1 issue, failed tests, missing evidence |
| Release | DevOps Agent + Human Owner | Production data or customer impact |
| Communication and handoff | Operator Agent | Public claims or client commitments |

## Gate Ownership

Every gate has:
- owner Agent
- required evidence
- failure condition
- rollback or rework path

No Agent can self-certify a gate that belongs to another role.

## Anti-Patterns

- Engineering starts before product scope is testable.
- UI is implemented before state design exists.
- Architecture expands before repeated pressure exists.
- Code review only checks style.
- Tests are treated as ceremony.
- Release happens without rollback.
- Retrospectives do not change future behavior.

## Team Health Signals

Track these across projects:
- cycle time per slice
- number of rework loops
- failed gate reasons
- test coverage confidence
- architecture debt created or removed
- user-facing value shipped
- reusable lessons added to Team OS
