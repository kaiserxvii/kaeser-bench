# `@kaeser/evaluator`

## Summary

Turns captured run artifacts into explainable, versioned scores. This package owns pluggable
dimension evaluators, evidence references, score normalization, and aggregation policy.

## Why it exists

The product becomes a benchmark only when model behavior is measured consistently. Evaluation must
be inspectable and repeatable so a leaderboard score can be understood, challenged, recalculated,
and improved rather than treated as an opaque judgment.

## Objectives

- Provide independent evaluators for component selection, API validity, token compliance,
  accessibility, build correctness, interaction behavior, visual quality, documented patterns,
  hallucinations, latency, and cost.
- Require every score to include an explanation, evaluator version, and references to supporting
  evidence.
- Normalize dimension outputs without erasing the original measurements or failure details.
- Version aggregation weights and policies so leaderboard changes do not rewrite historical results.
- Support deterministic checks first and clearly identify heuristic or human-reviewed judgments.
- Build calibration fixtures that reveal evaluator regressions, disagreement, and false confidence.
- Allow scores to be recomputed from saved artifacts without invoking the model again.

## Boundary

Evaluators consume captured tasks and artifacts. They do not call models, construct prompts, or
execute generated code, and they must not rely on hidden provider state.
