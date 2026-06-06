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
