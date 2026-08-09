# `@kaeser/model-adapters`

## Summary

Provides a consistent interface for invoking different AI models. Adapters translate a normalized
Kaeser Bench request into provider-specific calls and return comparable output and usage metadata.

## Why it exists

Provider APIs differ in message formats, model identifiers, streaming behavior, usage accounting,
and failure modes. Isolating those differences prevents provider details from influencing benchmark
tasks or leaking into the rest of the evaluation pipeline.

## Objectives

- Normalize prompts, context, generation settings, cancellation, and output capture across providers.
- Record the exact provider, model identifier, adapter version, parameters, latency, token usage, and
  reported cost for every invocation.
- Preserve raw provider responses as artifacts when allowed so normalization can be audited.
- Handle timeouts, retries, rate limits, and provider errors without silently changing benchmark
  semantics or giving one model an unfair path.
- Expose model capabilities explicitly instead of emulating unsupported behavior invisibly.
- Provide fake and recorded adapters for deterministic runner tests that do not spend tokens or call
  external services.
- Keep credentials scoped to the invocation boundary and prevent them from reaching generated code.

## Boundary

Provider SDKs and authentication remain private implementation details here. Adapters do not choose
benchmark tasks, assemble retrieval context, run generated code, or calculate scores.
