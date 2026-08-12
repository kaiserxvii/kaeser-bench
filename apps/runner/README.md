# `@kaeser/runner`

The runner is the composition root for benchmark, retrieval, model, sandbox, and evaluator
implementations. Its first executable slice deliberately stops after model generation so the input
and artifact flow can be inspected before untrusted code execution is introduced.

## Run one generation

Put an OpenAI key in the repository's `.env`, then run from the repository root:

```sh
bun run benchmark:generate
```

The default model is `gpt-5.6-luna`. Set `KAESER_MODEL` to use another GPT-5.6 adapter model:

```sh
KAESER_MODEL=gpt-5.6-terra bun run benchmark:generate
```

Each invocation creates a unique ignored directory under `runs/`:

```text
runs/<run-id>/
  task.json             Exact resolved task and prompt
  context.json          Exact model-visible context and provenance
  model-response.json   Normalized output, usage, and provider provenance
  source/index.html     HTML extracted from the model response
  run.json              Run identity, artifact digests, and pipeline state
```

`run.json` labels this as a `generation-only` result and lists sandbox execution and evaluation as
deferred. Generated HTML is captured but never opened or executed by the runner.
