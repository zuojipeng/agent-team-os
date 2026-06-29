# Task Ledger

Task Ledger is the durable record of Agent Team OS work. It keeps tasks, assignments, Agent communication, reviews, evidence, and progress resumable across tools and time.

## Why This Exists

Multica keeps issues, comments, metadata, run history, projects, and autopilot runs as first-class platform objects. Agent Team OS needs the same continuity, but as a portable Markdown-first protocol that works in Codex, Claude, Cursor, OpenClaw, Multica, GitHub Issues, Linear, or a plain repository.

The ledger is not a chat transcript. It is a compact operational record.

## Ledger Locations

Default project-local locations:

```text
docs/team-os/task-ledger.md
docs/agent-runs/YYYY-MM-DD-slice.md
docs/code-reviews/YYYY-MM-DD-slice.md
docs/test-reports/YYYY-MM-DD-slice.md
docs/release/YYYY-MM-DD-slice.md
```

Host-level coordination artifacts may live in:

```text
/Users/edy/.agents/team-os/runs/
```

Use host-level runs for reusable Team OS evolution, broad OKRs, and cross-project coordination. Use project-local ledgers for product delivery evidence.

## Task Record

```markdown
Task ID:
Parent:
Project:
Title:
Status: backlog / ready / in_progress / in_review / blocked / done / cancelled
Owner Agent:
Reviewer Agent:
Priority:
Gate:
Created:
Updated:
Due / Cadence:
User goal:
Acceptance criteria:
Evidence required:
Current blocker:
Next smallest action:
Links:
```

## Event Types

Record events as append-only entries:

| Event | Meaning |
| --- | --- |
| `ASSIGNED` | Hermes or an Agent routed work to an owner |
| `STARTED` | owner began execution |
| `COMMENTED` | meaningful cross-Agent communication |
| `EVIDENCE_ADDED` | command, screenshot, source, test, smoke, or production evidence recorded |
| `REVIEW_REQUESTED` | producer asks reviewer to evaluate |
| `REVIEWED` | reviewer passes, blocks, or requests repair |
| `BLOCKED` | progress stopped with evidence and owner |
| `REPAIRED` | owner addressed a blocker |
| `DECIDED` | Hermes chose continue, ship, rollback, or escalate |
| `PROMOTED` | lesson became reusable Team OS memory |

## Event Format

```markdown
### YYYY-MM-DD HH:mm Event ID

Type:
From:
To:
Task:
Gate:
Message:
Evidence:
Decision:
Next owner:
Close condition:
```

## Communication Retention

Keep:
- assignments with owner and close condition
- review findings and decisions
- blocker evidence
- command/test/smoke summaries
- links to artifacts, diffs, screenshots, or deployment URLs
- Hermes decisions and next owner

Do not keep:
- full chain-of-thought
- secrets or tokens
- raw logs that can be regenerated
- duplicate copies of long source files
- noisy "still working" messages without a decision or evidence

## Metadata Rules

Use small stable keys when a platform supports metadata, for example:
- `pipeline_status`
- `waiting_on`
- `review_gate`
- `evidence_level`
- `pr_url`
- `deploy_url`
- `blocked_reason`
- `next_owner`

Do not store large notes, secrets, attempt counters, or copied descriptions as metadata.

## Resume Contract

Any Agent resuming a task must be able to answer:
- What is the active task?
- Who owns it?
- Which gate is active?
- What evidence exists?
- What blocker remains?
- What is the next smallest action?
- Who reviews the next output?

If the ledger cannot answer these questions, Hermes must open a continuity repair task before new feature work.

## Difference From Multica

Agent Team OS should be able to run on top of Multica, but it should be stronger in four ways:
- portable ledgers instead of platform-only state
- evidence levels attached to every important claim
- producer/reviewer separation as a required gate
- promotion of repeated lessons into reusable operating rules
