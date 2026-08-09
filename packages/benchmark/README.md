# `@kaeser/benchmark`

## Summary

Defines the standardized frontend assignments used to compare models. This package owns versioned
benchmark suites, task manifests, starter projects, fixtures, assertions, and task validation.

## Why it exists

A useful model comparison requires every model to solve the same clearly defined problem under the
same constraints. Keeping tasks deterministic and independently versioned makes results repeatable,
auditable, and comparable over time.

## Objectives

- Define a stable task manifest that captures prompts, required capabilities, fixtures, and scoring
  dimensions.
- Provide representative tasks spanning forms, settings, commerce, search, dashboards, and other
  common product interfaces.
- Make starter projects and fixtures deterministic, local, and safe to execute without private data.
- Validate task packages before they enter a published suite, including paths, identifiers, versions,
  and required artifacts.
- Version suites and tasks independently so historical runs retain their original meaning.
- Separate model-visible requirements from private assertions so the benchmark does not leak its
  expected implementation.

## Boundary

This package describes what must be built and how a task is loaded. It does not assemble model
context, invoke models, execute generated code, or interpret evaluation results.
