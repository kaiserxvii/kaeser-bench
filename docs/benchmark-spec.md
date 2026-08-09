# Benchmark specification

This document defines repository invariants, not a finalized scoring rubric.

## Versioned inputs

Every evaluation run should identify these immutable inputs:

- benchmark suite and task version
- design-system release or content digest
- context strategy and exact assembled context bundle
- prompt template version
- model adapter version and provider-reported model identifier
- sandbox image and toolchain version
- evaluator versions and aggregation policy

Changing any input produces a new comparable run identity rather than mutating old results.

## Proposed task layout

```text
tasks/<task-id>/<version>/
  task.json             Machine-readable task manifest
  prompt.md             User-facing assignment
  starter/              Deterministic starter project
  fixtures/             Local data and interaction fixtures
  assertions/           Task-specific machine checks
  rubric.md             Human-readable evaluation intent
```

Task manifests should describe required capabilities and evaluation dimensions without exposing
private expected implementations to the model context.

## Artifact model

A run may emit source archives, normalized model responses, context bundles, build logs,
screenshots, accessibility reports, interaction traces, evaluator evidence, and usage metadata.
Artifacts should be content-addressed where practical and linked from the run record.

## Score behavior

Each evaluator returns a normalized score in `[0, 1]`, a human-readable explanation, and evidence
references. Aggregate scores must preserve their weighting policy and source scores. A failed
build is data: it should retain artifacts and explicit failure status instead of disappearing
from a leaderboard dataset.

The initial dimension vocabulary lives in `@kaeser/contracts`; it is expected to evolve through
versioned changes before the first stable benchmark release.
