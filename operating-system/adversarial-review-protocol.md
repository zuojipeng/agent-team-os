# Adversarial Review Protocol

Adversarial review prevents same-model role switching from becoming self-congratulation.

## Core Rule

Every meaningful slice must include at least one reviewer whose job is to find why the slice should not pass yet.

The reviewer must not restate the producer's claims. The reviewer must test the claim against evidence, failure modes, and role-specific standards.

## Review Modes

| Mode | Owner | Purpose |
| --- | --- | --- |
| Product Red Team | Product Agent + Test Agent | find vague goals, untestable success, scope creep |
| UE Red Team | UEAgent + Product Agent + Test Agent | find missing states, unclear hierarchy, accessibility and workflow gaps |
| Architecture Red Team | Architecture Agent + Engineering Agent + Code Review Agent | find premature abstraction, fragile contracts, migration/test risk |
| Code Red Team | Code Review Agent + Test Agent | find regressions, unsafe data handling, missing tests, complexity |
| Release Red Team | DevOps Agent + Test Agent + Hermes | find config, deploy, smoke, rollback, telemetry gaps |
| Claims Red Team | Operator Agent + Product Agent | find overclaimed demos, docs, or release notes |

## Required Questions

Every adversarial review must answer:
- What is the strongest reason to reject this output?
- What evidence would change the decision?
- Which acceptance criterion is not proven?
- What failure would a user notice first?
- What hidden coupling or cost is being introduced?
- Is this solving the current goal or creating attractive drift?

## Review Output

```markdown
Reviewer:
Producer reviewed:
Scope:
Strongest rejection reason:
Evidence checked:
Findings:
Blocking level: PASS / IMPROVEMENT / REWORK / BLOCK
Required repair:
Owner:
Close condition:
Residual risk:
```

## Same-Model Risk Controls

When the same model instance simulates multiple Agents:
- use different source context per role
- require role-specific failure criteria
- force at least one negative finding or explicit "no blocking finding after checking X"
- require concrete evidence IDs, file references, command results, or screenshots
- prohibit reviewers from accepting claims that only repeat producer language
- rotate the review lens: product, UE, architecture, test, release, claims

## Loop Decision

Hermes may pass a gate only when:
- the producer output exists
- the reviewer output exists
- blocker findings are closed or explicitly accepted as residual risk
- the evidence level meets the gate minimum

If the same root cause fails twice, Hermes must reduce scope, change owner, open an investigation, or escalate to the human owner.
