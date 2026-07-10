# Agent Capability Registry

Agent Team OS treats every Agent as a role with tools, evidence duties, and explicit limits. A role name is not a capability.

## Registry Rule

Before an Agent owns a gate, Hermes must know:
- which skills, MCP tools, commands, or external systems the Agent may use
- which artifacts the Agent must produce
- which evidence level the Agent can realistically provide
- which decisions the Agent is not allowed to self-certify
- which reviewer must check the output

If a required capability is missing, Hermes must either reduce scope, route the work to a better-equipped Agent, ask the human owner for the missing integration, or mark the gate blocked.

## Capability Levels

| Level | Meaning | Use |
| --- | --- | --- |
| `C0 Prompt` | Role has only written instructions | brainstorming, critique, first draft |
| `C1 Local Context` | Role can inspect project files and docs | repo-aware planning and review |
| `C2 Local Execution` | Role can run commands, tests, builds, scripts | engineering and validation |
| `C3 Tool Integrated` | Role can use MCP, browser, Figma, Drive, CI, cloud CLIs, or project APIs | design, release, operations, external verification |
| `C4 Production Connected` | Role can read production telemetry or execute approved production actions | release confidence, incident response |

Capability level does not equal trust. Trust still requires evidence and independent review.

## Default Role Capabilities

| Agent | Default Tools | Required Outputs | Cannot Self-Certify |
| --- | --- | --- | --- |
| Product Agent | PRD templates, project docs, user feedback, analytics when available, web research when needed | user job, scope, non-goals, success metric, acceptance criteria | UE, architecture, implementation, release |
| UEAgent | UE principles, design-system search, Figma when available, browser screenshots, Playwright evidence when UI exists | workflow map, IA, state matrix, responsive and accessibility notes, design handoff | product value, code correctness, release readiness |
| Architecture Agent | repo search, dependency inspection, ADR template, API/schema docs, testability review | smallest sufficient design, contracts, rejected alternatives, migration/test implications | implementation correctness, test pass, release |
| Engineering Agent | local editor, repo tools, typecheck, test runner, build, package manager | scoped diff, implementation notes, commands run, error handling | code review, test gate, release |
| Code Review Agent | git diff, file/line references, static checks, test reports, security/privacy checklist | severity-ordered findings, open questions, residual risk, pass/block decision | implementation authorship, final release |
| Test Agent | unit/integration/E2E tools, smoke scripts, browser automation, test matrix | mapped tests, commands, failure reproduction, residual risk | product direction, implementation design |
| DevOps Agent | CI/CD, cloud CLI, env/config docs, logs, smoke, rollback scripts | deploy plan, config list, smoke, rollback, observability | product value, code quality |
| Operator Agent | README, release notes, demo scripts, recordings, handoff templates | demo path, release notes, support notes, next actions | unresolved defects, release gate |
| Opportunity Scout Agent | official event sources, web/browser research, calendars, normalization and scoring tools | verified opportunity brief, deadline record, hard-filter result, ranked shortlist | participation, registration, legal/identity terms, spend, submission |

## Capability Registration Format

Use this block in a project run log when a role depends on a concrete tool.

```markdown
Capability:
Agent:
Tool / Skill / MCP:
Level: C0 / C1 / C2 / C3 / C4
Available: yes / no / blocked
Evidence it can provide:
Limits:
Reviewer:
```

## Missing Capability Handling

When a tool is unavailable:
- record the missing capability as a blocker if it is required for the current gate
- use a lower-confidence evidence level only if Hermes explicitly accepts the risk
- do not replace unavailable execution with confident prose
- do not ask the human owner to solve a role-owned judgment problem

## Multica Comparison

Multica makes agents first-class teammates with assignments, comments, execution history, runtimes, autopilots, and reusable skills. Team OS should stay compatible with that model, but its differentiator is stricter gate trust:
- tools are registered per Agent capability
- outputs are graded by evidence level
- producers cannot self-certify their own gate
- every handoff has a reviewer and a close condition
