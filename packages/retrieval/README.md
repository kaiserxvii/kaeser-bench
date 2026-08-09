# `@kaeser/retrieval`

## Summary

Builds the controlled design-system context supplied to a model for a benchmark task. It owns
document selection, ordering, formatting, truncation, provenance, and the resulting context bundle.

## Why it exists

Model performance can change dramatically based on which documentation is retrieved and how it is
presented. Treating context assembly as a versioned input lets Kaeser Bench compare retrieval and
documentation strategies independently from the underlying model.

## Objectives

- Implement reproducible strategies such as full-document context, curated subsets, search-based
  retrieval, and task-aware retrieval.
- Enforce explicit and comparable context budgets across model runs.
- Record every selected document, source version, ordering decision, transformation, and truncation.
- Produce an immutable context bundle that can be inspected and replayed exactly.
- Measure retrieval characteristics such as document count, token size, overlap, and omitted content.
- Prevent private assertions, evaluation rubrics, and unrelated task solutions from leaking into
  model-visible context.
- Make documentation format and retrieval strategy first-class experiment variables.

## Boundary

Retrieval strategies produce context bundles. They do not invoke the model, execute generated code,
or decide how the resulting interface should be scored.
