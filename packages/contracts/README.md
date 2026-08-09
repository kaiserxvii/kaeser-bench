# `@kaeser/contracts`

## Summary

Provides the vendor-neutral data contracts exchanged across Kaeser Bench. These values describe
tasks, context bundles, model requests and outputs, artifacts, scores, and evaluation runs.

## Why it exists

The benchmark can only replace providers, sandboxes, evaluators, and storage implementations when
they share a small, stable vocabulary. Serializable contracts also make every run easier to store,
inspect, replay, and publish without depending on an implementation's internal objects.

## Objectives

- Define stable identifiers and version references for every input that affects comparability.
- Represent run inputs, lifecycle states, outputs, artifacts, usage, cost, and scores as serializable
  values.
- Keep provider SDK types and infrastructure-specific objects from leaking across package boundaries.
- Preserve evidence and provenance references so every published score can be traced to its inputs.
- Introduce runtime schemas and compatibility tests when the first end-to-end run establishes the
  persistence and validation requirements.
- Evolve contracts through explicit versioning rather than silently changing historical semantics.

## Boundary

Keep this package dependency-light and behavior-free. It defines shared values, not service
implementations, orchestration, persistence, or business policy.
