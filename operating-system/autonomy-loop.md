# Autonomy Loop

This is the loop that lets the Agent team keep improving without becoming chaotic.

## Loop

```text
Observe
  -> Diagnose
  -> Assign owner
  -> Act in small slice
  -> Validate
  -> Review
  -> Ship or roll back
  -> Retrospect
  -> Update memory
```

## Autonomy Rules

The team may proceed autonomously when:
- scope is already clear
- no new cost/security/legal risk is introduced
- work is reversible
- validation commands are available
- failure can be routed to a role

The team must ask the human owner when:
- product direction changes
- external cost or account setup changes
- production data can be affected
- a public/client commitment changes
- repeated failures indicate unclear goals

## Slice Size

Prefer 30-90 minute slices:
- one product decision
- one UE spec
- one architecture seam
- one tested implementation
- one release check

## Stop Conditions

Stop and escalate when:
- same blocker appears twice
- validation environment is unavailable
- the task requires credentials or payment
- tests contradict the claimed success
- current work no longer maps to the user goal
