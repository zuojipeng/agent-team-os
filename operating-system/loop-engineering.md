# Loop Engineering Protocol

Loop Engineering is the Team OS mode for repeated cross-Agent improvement. It keeps the delivery chain disciplined while allowing any Agent to name a problem, assign an owner, and request a new pass when evidence is weak.

## Core Idea

Work does not move only forward. It moves through short loops until the current slice has enough product clarity, experience quality, technical shape, implementation evidence, and release confidence.

```text
Frame
  -> Assign
  -> Produce
  -> Challenge
  -> Repair
  -> Verify
  -> Integrate
  -> Decide next loop
```

## Loop Roles

| Role | Loop Responsibility |
| --- | --- |
| Hermes Orchestrator | Maintains the loop board, resolves ownership conflicts, decides when to ship, continue, roll back, or escalate |
| Product Agent | Challenges vague goals, acceptance criteria, metrics, and scope creep |
| UEAgent | Challenges missing states, weak workflows, unclear hierarchy, accessibility gaps, and daily-use friction |
| Architecture Agent | Challenges unclear boundaries, fragile contracts, premature abstraction, migration risk, and poor testability |
| Engineering Agent | Challenges infeasible specs, hidden dependencies, unsafe implementation paths, and unowned technical debt |
| Code Review Agent | Challenges regressions, security risk, complexity, missing tests, and weak evidence |
| Test Agent | Challenges unprovable claims, missing coverage, flaky validation, and untested acceptance criteria |
| DevOps Agent | Challenges release, config, observability, migration, smoke, and rollback gaps |
| Operator Agent | Challenges demo truthfulness, handoff quality, user-facing claims, and unresolved next actions |

## Assignment Rights

Every Agent can create an assignment for another Agent when the issue falls inside that Agent's ownership.

An assignment must include:
- owner Agent
- requested output
- reason
- blocking level: `BLOCKER`, `REWORK`, `IMPROVEMENT`, or `OPTIONAL`
- acceptance evidence
- due loop: current loop or next loop

No Agent can assign vague work such as "improve quality" without naming the missing evidence or decision.

## Challenge Rights

Any Agent may challenge another Agent's output when:
- a claim lacks evidence
- a requirement cannot be tested
- a user path or UI state is missing
- a technical design adds complexity without pressure
- implementation changes behavior outside scope
- tests do not map to acceptance criteria
- release or rollback is not executable
- public communication overclaims shipped capability

Challenges must route to one owner. If the problem crosses roles, Hermes splits it into separate assignments.

## Loop Board

Each active slice should keep a small loop board in the project run log.

```markdown
## Loop Board

Loop:
Goal:
Current gate:
Decision: CONTINUE / SHIP / ROLLBACK / ESCALATE

| ID | From | To | Blocking Level | Request | Evidence Required | Status |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | Test Agent | Engineering Agent | BLOCKER | Add reproduction coverage for failed login state | Passing test command and failure-before-fix note | OPEN |
```

## Blocking Levels

`BLOCKER`: Current slice cannot pass or ship until resolved.

`REWORK`: Output is directionally right but must return to the owner before the next gate.

`IMPROVEMENT`: Useful quality increase. Hermes decides whether it fits the current slice or backlog.

`OPTIONAL`: Record for memory or future iteration. It must not block the current slice.

## Loop Decisions

Hermes makes one decision at the end of each loop:
- `SHIP`: Required gates passed and residual risk is documented.
- `CONTINUE`: The next loop has a named owner, small scope, and validation path.
- `ROLLBACK`: The slice created unacceptable risk or cannot be validated.
- `ESCALATE`: Human judgment is required for direction, cost, risk, or repeated failure.

## Loop Limits

Default limit: two repair loops for the same root cause.

After two failed repair loops, Hermes must either:
- reduce scope
- change owner
- escalate to the human owner
- create a separate investigation task

Looping is for sharpening work, not hiding uncertainty.

## Required Evidence

Each loop must end with evidence appropriate to the work:
- product: accepted scope, non-goals, success metric, acceptance criteria
- UE: state matrix, primary path, responsive/accessibility notes, browser evidence when UI exists
- architecture: boundary decision, data contract, rejected alternatives, test implications
- engineering: diff summary, commands run, error handling, test result
- review: findings with severity, file/line references, residual risk
- test: test matrix, commands, manual/E2E evidence, defect owners
- release: deploy steps, config, smoke, rollback, observability
- ops: demo path, release notes, handoff, next actions

## Anti-Patterns

- Agents assign work without naming evidence.
- Hermes accepts PASS because the chain already moved forward.
- Repair loops keep changing scope instead of fixing the root cause.
- Optional improvements block release without a product reason.
- The team asks the human owner to make decisions that belong to an Agent role.
