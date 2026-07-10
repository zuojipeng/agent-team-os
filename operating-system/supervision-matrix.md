# Supervision Matrix

Agent teams need cross-checks. Each role has a reviewer and a failure destination.

In Loop Engineering mode, reviewers do not only approve or reject. They can open assignments against the owning role with a blocking level and evidence requirement.

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
| Opportunity Scout Agent | Product Agent + Operator Agent + Hermes | source freshness, eligibility, rules, fit, deadline, scoring | Opportunity Scout Agent or Human Owner |

## Cross-Agent Challenge Rights

Any Agent may challenge another role when:
- a requirement is not testable
- a UI state is missing
- an abstraction has no pressure
- a test does not prove the acceptance criterion
- release lacks rollback
- public messaging overclaims capability

## Default Assignment Routes

| From | Common Assignment Targets |
| --- | --- |
| Product Agent | UEAgent for workflow/state implications; Test Agent for acceptance-test mapping; Hermes for scope tradeoff |
| UEAgent | Product Agent for unclear user intent; Architecture Agent for feasibility/contracts; Engineering Agent for implementation constraints |
| Architecture Agent | Product Agent for domain ambiguity; Engineering Agent for spike or integration read; Test Agent for test strategy |
| Engineering Agent | Product Agent for ambiguous acceptance criteria; UEAgent for missing states; Architecture Agent for boundary/dependency decision; Test Agent for validation plan |
| Code Review Agent | Engineering Agent for fixes; Architecture Agent for design risk; Test Agent for coverage gaps; DevOps Agent for release risk |
| Test Agent | Product Agent for untestable criteria; Engineering Agent for defects; UEAgent for behavior/state gaps; DevOps Agent for environment issues |
| DevOps Agent | Engineering Agent for build/config fixes; Test Agent for smoke coverage; Product Agent for release scope; Operator Agent for communication |
| Operator Agent | Product Agent for messaging accuracy; DevOps Agent for release notes; Test Agent for demo evidence; Hermes for next iteration |
| Opportunity Scout Agent | Product Agent for strategic fit; Architecture Agent for sponsor feasibility; DevOps Agent for cost/environment; Operator Agent for logistics; Hermes for portfolio selection |

## Hermes Responsibilities

Hermes must:
- route failures to the correct owner
- prevent role bypass
- keep the current gate visible
- maintain final decision log
- stop work when the team is optimizing the wrong goal
- cap repeated repair loops for the same root cause at two attempts
- separate optional improvements from blocking release work
