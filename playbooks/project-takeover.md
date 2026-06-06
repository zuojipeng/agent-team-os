# Playbook: Project Takeover

Use when Agent Team OS enters an existing codebase.

## Goal

Understand the project before changing it, then propose the smallest valuable next slice.

## Sequence

1. Hermes: inspect repository status, stack, scripts, docs, tests, deployment hints.
2. Product Agent: infer product shape, target user, core workflow, and current value proposition.
3. UEAgent: inspect primary UI path and experience risks.
4. Architecture Agent: inspect module boundaries, contracts, complexity hotspots, and test seams.
5. Test Agent: identify available quality gates and missing critical tests.
6. Hermes: produce takeover report and choose next slice.

## Commands To Prefer

```bash
git status --short
git log --oneline -8
rg --files
rg -n "TODO|FIXME|deploy|test|build|lint|e2e|smoke|api|route|schema|config"
```

## Output

```markdown
# Project Takeover Report

## Scorecard
## Product Reading
## UE Reading
## Architecture Reading
## Quality Gates
## Deployment Reading
## Risks
## Recommended Next Slice
```

Use `templates/project-scorecard.md` when the user wants a reusable quality snapshot.

## Rule

Do not implement before the takeover report unless the user asks for a specific emergency fix.
