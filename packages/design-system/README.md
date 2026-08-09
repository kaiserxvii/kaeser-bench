# `@kaeser/design-system`

## Summary

Provides the sample design system that serves as the benchmark laboratory. It will contain real
components, design tokens, usage rules, accessibility requirements, documentation, patterns, and
constrained examples.

## Why it exists

Kaeser Bench is not measuring whether a model can produce any plausible interface. It measures
whether a model can work inside a specific frontend system. The design system supplies the rules,
APIs, and intentional constraints that make correct and incorrect model behavior observable.

## Objectives

- Build a coherent, production-shaped component library with typed APIs and meaningful composition
  patterns.
- Define tokens for color, spacing, typography, motion, shape, elevation, and responsive behavior.
- Document when to use each component, which combinations are supported, and which approaches are
  explicitly prohibited.
- Encode accessibility requirements in component behavior, usage guidance, and automated tests.
- Provide reference patterns and examples without reducing benchmark tasks to copy-and-paste work.
- Publish immutable releases whose components, documentation, and content digest can be tied to an
  evaluation run.
- Include enough nuance and constraints to expose hallucinated APIs, token violations, incorrect
  composition, and inaccessible behavior.

## Boundary

This package defines the system models must learn. It does not define benchmark scoring or contain
model-specific accommodations. The implementation framework remains intentionally undecided until
the component requirements make that choice concrete.

Planned source areas are `tokens/`, `components/`, `patterns/`, `docs/`, and `fixtures/`. Add them
when their formats are selected; empty directory trees are intentionally avoided.
