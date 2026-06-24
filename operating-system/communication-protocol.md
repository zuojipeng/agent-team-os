# Communication Protocol

Agent Team OS uses structured messages so work can be handed off, reviewed, and resumed.

## Standard Message

```markdown
Role:
Task:
Status: PASS / FAIL / BLOCKED
Inputs:
Outputs:
Evidence:
Risks:
Requested next owner:
Request to Hermes:
Assignments raised:
```

## Handoff Message

```markdown
From:
To:
Reason:
Context:
Required decision:
Evidence:
Deadline / urgency:
```

## Assignment Message

Use this when one Agent assigns work to another Agent during a loop.

```markdown
Assignment ID:
From:
To:
Blocking level: BLOCKER / REWORK / IMPROVEMENT / OPTIONAL
Request:
Reason:
Evidence required:
Current gate blocked: yes / no
Due loop:
```

## Failure Message

```markdown
Role:
Task:
Status: FAIL / BLOCKED
Failure type:
Reproduction / evidence:
Impact:
Likely owner:
Recommended fix path:
Assignment ID:
```

## Review Message

```markdown
Reviewer:
Scope:
Findings:
Open questions:
Test gaps:
Residual risk:
Decision: PASS / BLOCK
```

## Communication Rules

- Findings before summaries.
- Evidence before opinion.
- Owners before next actions.
- Do not hide blockers inside progress updates.
- Do not mark PASS without validation evidence.
- Do not ask the human owner for decisions that an Agent role can make.
- Do not create assignments without a single named owner and close condition.
- Do not keep looping after the same root cause fails twice; reduce scope, change owner, investigate separately, or escalate.
