# Workflow: Code Review Mode

Use when asked to review an existing codebase, PR, or diff.

## Order

1. Read intent: PRD, issue, commit message, or user request.
2. Inspect diff and surrounding code.
3. Check behavior first, style last.
4. Prioritize bugs, regressions, security, data loss, and missing tests.
5. Give findings with file/line references.
6. State residual risk if no findings.

## Output

```markdown
Findings:
- [Severity] File:line - issue, impact, fix direction.

Open questions:

Test gaps:

Summary:
```

## Review Bias

- Do not ask for large refactors when a small fix is enough.
- Do not approve untested critical behavior.
- Do not reward abstraction for its own sake.
