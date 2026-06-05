# Software Design Principles

## Complexity Is The Enemy

Watch for:
- Long functions mixing UI, data, effects, and formatting
- Boolean state explosions
- Duplicated domain rules
- Weakly typed external data
- Hidden global coupling
- Shallow abstractions

## Smallest Sufficient Architecture

Default order:

```text
Inline implementation
  -> Extract pure function
  -> Extract component
  -> Extract domain module
  -> Extract service
  -> Add dependency/framework
```

Move right only when complexity, duplication, testing, or ownership demands it.

## Deep Modules

Prefer modules with:
- Small public API
- Clear ownership
- Meaningful internal behavior
- Tests around behavior

Avoid modules that are wrappers with many knobs.

## Domain Language

Use product vocabulary. Avoid vague names like `data`, `item`, `helper`, `manager`, `service`, and `util` unless the boundary is truly generic.

## External Data

For APIs, model output, files, and user input:
- Type explicitly
- Validate at boundaries
- Normalize optional fields
- Fail recoverably

## Reference Base

- A Philosophy of Software Design
- Refactoring
- Simple Design
- Domain-Driven Design
- Architecture Decision Records
