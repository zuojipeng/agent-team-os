# Playbook: Architecture Review

Use before large refactors, persistence, auth, billing, deployment changes, or complex feature expansion.

## Sequence

1. Architecture Agent: read relevant modules and existing patterns.
2. Product Agent: confirm the product pressure causing the architecture change.
3. Engineering Agent: map affected files, contracts, data, and tests.
4. Test Agent: define regression surface.
5. Architecture Agent: recommend now / later / never.

## Review Questions

- What complexity is real today?
- What is duplicated?
- Which boundaries are unclear?
- Which data is external or untrusted?
- What abstraction has enough pressure?
- What simpler option was rejected and why?

## Output

```markdown
# Architecture Review

## Current Design Reading
## Complexity Hotspots
## Smallest Sufficient Design
## Rejected Alternatives
## Test Implications
## Migration / Rollback
## Decision
```
