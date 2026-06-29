# Evidence Standard

Agent Team OS does not trust confidence. It trusts inspectable evidence.

## Evidence Levels

| Level | Name | Meaning | Allowed Use |
| --- | --- | --- | --- |
| `E0` | Opinion | Judgment without cited source, artifact, command, or reproducible check | brainstorming only |
| `E1` | Reasoned | Logical argument based on context, but not independently verified | early planning |
| `E2` | Referenced | Cites project docs, source files, external docs, design principles, or user feedback | product/design/architecture proposal |
| `E3` | Executed | Command, build, test, screenshot, API call, or tool action was run and result recorded | engineering gate, review support |
| `E4` | Reproducible | Steps, inputs, environment, and expected output are clear enough for another Agent to repeat | release candidate, incident repair |
| `E5` | Production Evidence | Production logs, telemetry, deployed smoke, real user behavior, or approved live system evidence | release confidence, product metrics |

## Minimum Evidence By Gate

| Gate | Minimum | Examples |
| --- | --- | --- |
| Product | E2 | PRD, user feedback, analytics, acceptance criteria |
| UE | E2, E3 when UI exists | state matrix, Figma/screenshot, browser evidence |
| Architecture | E2 | ADR, repo references, data contract, rejected alternatives |
| Engineering | E3 | typecheck, tests, build, diff summary |
| Code Review | E2 plus E3 where available | file/line findings, test result references |
| Test | E3 | unit/integration/E2E/smoke commands and results |
| Release | E4, E5 when production touched | deploy steps, smoke, rollback, logs |
| Ops | E2, E3 when demo exists | release notes, demo path, screenshot/video evidence |

Hermes may raise the minimum evidence level when a slice touches auth, data persistence, payments, privacy, production deploys, or public commitments.

## Evidence Record Format

```markdown
Evidence ID:
Claim:
Level: E0 / E1 / E2 / E3 / E4 / E5
Source / Command / Tool:
Result:
Repro steps:
Limits:
Owner:
Reviewer:
```

## Trust Rules

- E0 and E1 cannot pass a delivery gate.
- E2 can pass planning gates, but cannot prove implementation works.
- E3 is the normal minimum for code changes.
- E4 is required before release when another Agent may need to repeat the check.
- E5 is required before claiming production behavior, business impact, or operational health.
- Failed evidence is still evidence. Record it and route ownership.

## Evidence Anti-Patterns

- Saying "looks good" without naming the checked artifact.
- Claiming test coverage without listing the command.
- Treating a mocked result as production proof.
- Using a screenshot to prove business logic.
- Using a passing unit test to claim release readiness.
- Hiding a failed command because a later command passed.
