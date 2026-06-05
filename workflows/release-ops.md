# Workflow: Release Ops Mode

Use before deploying or handing off.

## Required Checks

- Build
- Type/lint/static checks
- Unit/integration tests
- E2E or manual evidence for primary path
- Environment variables
- Secret ownership
- Migration plan
- Rollback plan
- Smoke checks
- Monitoring/log review

## Release Report

```markdown
Version:
Commit:
Environment:
Changes:
Checks:
Smoke:
Rollback:
Known risks:
Owner:
```
