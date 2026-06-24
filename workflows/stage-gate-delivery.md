# Workflow: Stage-Gate Delivery

Use when the team needs to take any request, small or large, through owner-led decomposition, Agent-owned deliverables, review gates, implementation, validation, release, operations, and retrospective loops.

## Core Model

```text
Human Owner / Hermes Orchestrator
  -> Intake and sizing
  -> Goal and stage plan
  -> Product gate
  -> Prototype gate
  -> UE/UI gate
  -> Architecture gate
  -> Engineering gate
  -> Code review gate
  -> Test gate
  -> Release gate
  -> Ops/Growth gate
  -> Retrospective
  -> Next loop
```

Hermes is the accountable team lead. Hermes does not accept work because a stage is complete; Hermes accepts work only when the stage has evidence that satisfies the gate.

## Request Size Classes

### S: Small Change

Use for copy tweaks, isolated bug fixes, tiny UI adjustments, simple config/docs changes.

Required stages:
1. Hermes: clarify request and acceptance check.
2. Engineering Agent: implement scoped diff.
3. Code Review Agent: check regression and scope.
4. Test Agent: run the relevant command or manual check.
5. Operator Agent: summarize result and residual risk.

Skipped unless needed:
- full PRD
- full prototype
- UI mock
- architecture note
- release runbook

### M: Normal Feature

Use for one coherent workflow, one screen, one API integration, one business rule set, or a visible product improvement.

Required stages:
1. Hermes: define objective, owner, non-goals, and slice boundary.
2. Product Agent: write product brief with user job, acceptance criteria, and success signal.
3. UEAgent: specify workflow, screen hierarchy, state matrix, responsive and accessibility behavior.
4. Architecture Agent: write smallest sufficient technical plan and contracts.
5. Engineering Agent: implement.
6. Code Review Agent: review diff and risk.
7. Test Agent: validate acceptance criteria.
8. DevOps Agent: confirm deploy/smoke/rollback impact.
9. Operator Agent: write handoff and demo notes.
10. Hermes: decide ship/continue/rollback/escalate.

### L: Large Feature / New Product / Strategic Bet

Use for new products, major workflows, broad architecture changes, paid/customer-facing launches, or anything with high product or release risk.

Required stages:
1. Hermes: goal, OKRs, phasing, budget/risk constraints.
2. Product Agent: PRD and success metrics.
3. Prototype Agent function: complete product prototype spec, clickable flow, or Figma/Stitch-ready generation prompt.
4. UEAgent: UI design spec, state matrix, accessibility, responsive rules, design review notes.
5. Architecture Agent: architecture note or ADR, data/API contracts, migration and rollback implications.
6. Engineering Agent: implementation plan split into reversible slices.
7. Code Review Agent: review each slice.
8. Test Agent: test plan, test cases, automated checks, manual evidence.
9. DevOps Agent: release runbook, deploy, smoke, rollback, observability.
10. Operator/Growth Agent: docs, demo, onboarding, support notes, metrics and feedback loop.
11. Hermes: final gate decision and next-loop backlog.

## Gate Standards

### Product Gate

Evidence required:
- target user
- user job
- scope and non-goals
- success metric
- acceptance criteria
- risks and assumptions

Reject when:
- requirements are slogans
- no measurable success signal exists
- scope is larger than the current cycle can validate

### Prototype Gate

Evidence required:
- primary flow from entry to success
- main screens or regions
- decision points
- empty/loading/error/success states at the product level
- Figma/Stitch prompt or clickable prototype when visual design is required

Reject when:
- the prototype hides the real primary path
- screens are decorative but not workflow-complete
- critical states are missing

### UE/UI Gate

Evidence required:
- information hierarchy
- component/state matrix
- responsive behavior
- accessibility requirements
- interaction details
- browser/design evidence when UI exists

Reject when:
- user needs instruction text to understand the path
- controls do not match intent
- mobile/desktop behavior is undefined

### Architecture Gate

Evidence required:
- smallest sufficient design
- data/API contracts
- dependency boundaries
- rejected alternatives
- test implications
- migration and rollback risk

Reject when:
- design is bigger than the problem
- contracts are vague
- implementation cannot be tested safely

### Engineering Gate

Evidence required:
- scoped implementation diff
- commands run
- recoverable error handling
- no unrelated refactor
- implementation notes for handoff

Reject when:
- code changes behavior outside scope
- types/contracts are weakened
- hidden dependencies are introduced

### Code Review Gate

Evidence required:
- findings ordered by severity
- file/line references for actionable issues
- security and regression review
- test gap review
- residual risk

Reject when:
- P0/P1 findings remain unresolved
- test gaps are ignored
- public/user-facing claims exceed behavior

### Test Gate

Evidence required:
- test cases mapped to acceptance criteria
- automated test output or manual evidence
- failure/recovery coverage
- residual risk and defect owners

Reject when:
- only the happy path is checked for risky work
- browser behavior is assumed
- failures lack reproduction steps

### Release Gate

Evidence required:
- deploy steps
- config/secrets list
- smoke test
- rollback path
- logs/observability
- owner for release

Reject when:
- deployment relies on hidden local state
- rollback is vague
- health checks do not prove the released behavior

### Ops/Growth Gate

Evidence required:
- demo path
- user-facing docs or release notes
- known limitations
- support/ops notes
- metrics or feedback plan
- next-loop recommendations

Reject when:
- handoff oversells the feature
- known limitations are hidden
- feedback cannot enter the next loop

## Review And Repair Loops

Every stage can be challenged by any Agent, but each challenge must have one owner and evidence required to close it.

Hermes decides one of:
- `SHIP`: gates passed and residual risk is documented
- `CONTINUE`: next loop has named owner, scope, and validation
- `ROLLBACK`: risk is unacceptable or behavior cannot be validated
- `ESCALATE`: human owner decision is required

Default repair limit: two loops for the same root cause. After that, Hermes must reduce scope, change owner, isolate investigation, or escalate.

## Required Project Artifacts

For M/L work, store artifacts in the target project:

```text
docs/okrs/
docs/prd/
docs/ue/
docs/architecture/
docs/test-reports/
docs/release/
docs/agent-runs/
```

For S work, a single `docs/agent-runs/` report is enough unless the change creates a reusable decision.
