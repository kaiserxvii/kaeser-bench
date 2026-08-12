# `@kaeser/model-adapters`

## Summary

Provides a consistent interface for invoking AI models. Adapters translate a normalized Kaeser
Bench request into provider-specific calls and return comparable output with auditable provenance.

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

## Usage

The first adapter uses OpenAI's Responses API through the strongly typed Vercel AI SDK provider:

```ts
import { createOpenAIAdapter } from "@kaeser/model-adapters";

const model = createOpenAIAdapter({ model: "gpt-5.6" });
const invocation = await model.generate(request, abortSignal);
```

For local development, put `OPENAI_API_KEY` in the repository's `.env` file. Bun loads `.env`
automatically, and the OpenAI provider reads that standard variable. `apiKey` and `baseURL` may be
passed explicitly for isolated tests or compatible gateways.

The adapter deliberately disables SDK retries so every benchmark invocation maps to one provider
request. Callers own retry policy and can cancel an in-flight request with an `AbortSignal`.

Every generation returns one provider-neutral invocation containing normalized output and
provenance. Provenance distinguishes the requested model from the provider-reported model and
retains the provider request body, response ID and body, headers, finish reason, warnings, and
provider metadata. Pin exact model IDs in benchmark configuration and persist this evidence with the
run so aliases or compatible gateways cannot make provenance ambiguous.

## Pricing

Pricing is represented as a versioned catalog instead of being fetched during a run. This keeps a
historical run tied to the rates used when it was recorded. The shared pricing types model service
tiers, context tiers, uncached input, cached input, cache writes, and output tokens. Provider files
specialize those dimensions without forcing other labs to use OpenAI names.

The included OpenAI catalog is a snapshot for the GPT-5.6 family:

```ts
import { createOpenAIAdapter, openAIGpt56Pricing } from "@kaeser/model-adapters";

const model = createOpenAIAdapter({
  model: "gpt-5.6-terra",
  pricing: {
    catalog: openAIGpt56Pricing,
    serviceTier: "standard",
  },
});

const invocation = await model.generate(request);
const costUsd = invocation.output.usage.costUsd;
```

The same calculator can price recorded usage without making a model request:

```ts
import { calculateOpenAITextCostUsd, openAIGpt56Pricing } from "@kaeser/model-adapters";

const costUsd = calculateOpenAITextCostUsd({
  catalog: openAIGpt56Pricing,
  model: "gpt-5.6-terra",
  serviceTier: "standard",
  usage: {
    inputTokens: 1_000,
    cachedInputTokens: 200,
    outputTokens: 500,
  },
});
```

Adapters expose cache-read and cache-write counts when the provider reports them. `costUsd` uses the
applied response tier and is omitted when that tier is absent or unsupported. Callers should persist
the pricing catalog version, applied service tier, and whether regional processing applied alongside
the cost; the amount alone is not enough to reproduce billing later.
