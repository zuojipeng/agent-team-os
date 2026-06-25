# Continuity Protocol

Use this when an Agent team should keep working across turns, heartbeats, cron runs, background threads, or multiple tools.

## Core Rule

Every run must leave enough state for the next Agent to continue without rediscovering the project from scratch.

## Required Continuity Anchors

Each active project should keep:

```text
docs/okrs/
docs/agent-runs/
```

The latest agent run must end with:
- Hermes decision: `SHIP`, `CONTINUE`, `ROLLBACK`, or `ESCALATE`
- next owner Agent
- next smallest slice
- validation evidence
- open blockers
- explicit non-goals

## Resume Sequence

When resuming work:

1. Read the project `AGENT-TEAM-OS.md`.
2. Read the active OKR in `docs/okrs/`.
3. Read the newest report in `docs/agent-runs/`.
4. Start from the last Hermes decision.
5. If decision is `CONTINUE`, execute only the named next slice unless new user input changes priority.
6. If decision is `ESCALATE`, ask the human owner for the named decision before implementation.
7. If decision is `ROLLBACK`, do not continue forward until the rollback or scope reduction is handled.

## Continuous Work Safety

Persistent Agents must not:
- expand scope just because they woke up
- start a new objective while an open blocker remains
- treat an old plan as current when the user gave newer direction
- run production-impacting deploys without explicit release approval
- hide repeated failure behind more loops

## Heartbeat Prompt Pattern

```text
Read AGENT-TEAM-OS.md, the active OKR, and the newest agent run report.
Resume from the latest Hermes decision.
Execute the next smallest Stage-Gate slice only.
Run available validation.
Write a new agent run report with evidence, blockers, and the next owner.
Stop and ask the human owner if the next action affects production, secrets, cost, legal/privacy posture, or repeats the same failure for a third time.
```

## Done Means

The current run is done only when:
- a concrete artifact changed or a concrete blocker was proven
- validation was run or explicitly blocked
- a new run report tells the next Agent exactly what to do next
