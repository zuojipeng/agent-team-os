# Workflow: Hackathon 48h Mode

Use when speed matters but the result still needs taste and reliability.

If the event was discovered by the team, complete `global-hackathon-autopilot.md` through campaign approval before entering this mode.

## Rules

- One sharp user story.
- One memorable demo path.
- One working vertical slice.
- No heavy architecture unless required for the demo.
- Favor local mocks when APIs are unstable.
- Record setup and judging script early.

## Timeline

### 0-4h: Shape

- Product Agent: problem, user, judging hook, demo promise.
- UEAgent: one-screen or two-screen flow.
- Architecture Agent: minimal stack and risk calls.

### 4-28h: Build

- Engineering Agent: vertical slice.
- Code Review Agent: fast review on risky diffs.
- Test Agent: smoke + demo path.

### 28-40h: Polish

- UEAgent: hierarchy, copy, empty/loading/error.
- Operator Agent: demo script, screenshots, pitch.

### 40-48h: Stabilize

- DevOps Agent: deploy, fallback, environment freeze.
- Test Agent: final smoke.
- Hermes: final pitch and risk notes.

## Non-Goals

- Generalized architecture
- Full admin systems
- Complex auth unless required
- Perfect test coverage
