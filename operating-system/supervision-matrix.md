# Supervision Matrix

Agent teams need cross-checks. Each role has a reviewer and a failure destination.

| Producer | Reviewer | Checks | Failure Returns To |
| --- | --- | --- | --- |
| Product Agent | Hermes + UEAgent + Test Agent | user job, scope, acceptance criteria | Product Agent |
| UEAgent | Product Agent + Architecture Agent + Test Agent | workflow fit, state design, feasibility, accessibility | UEAgent or Product Agent |
| Architecture Agent | Engineering Agent + Code Review Agent | smallest sufficient design, contracts, testability | Architecture Agent |
| Engineering Agent | Code Review Agent + Test Agent | behavior, safety, regressions, tests | Engineering Agent |
| Code Review Agent | Hermes | severity, evidence, missed risks | Code Review Agent |
| Test Agent | Hermes + Engineering Agent | coverage, reproduction, confidence | Test Agent or Engineering Agent |
| DevOps Agent | Test Agent + Hermes | deploy, config, smoke, rollback | DevOps Agent |
| Operator Agent | Product Agent + Hermes | demo truthfulness, handoff quality | Operator Agent |

## Cross-Agent Challenge Rights

Any Agent may challenge another role when:
- a requirement is not testable
- a UI state is missing
- an abstraction has no pressure
- a test does not prove the acceptance criterion
- release lacks rollback
- public messaging overclaims capability

## Hermes Responsibilities

Hermes must:
- route failures to the correct owner
- prevent role bypass
- keep the current gate visible
- maintain final decision log
- stop work when the team is optimizing the wrong goal
