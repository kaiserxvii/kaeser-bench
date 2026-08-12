import { expect, test } from "bun:test";
import type { ModelRequest } from "@kaeser/contracts";
import { createOpenAIAdapter, openAIGpt56Pricing } from "../../index";

const request: ModelRequest = {
  task: {
    id: "pricing-card",
    version: "1",
    title: "Build a pricing card",
    prompt: "Build a responsive pricing card with the documented components.",
    requiredCapabilities: [],
    dimensions: ["component-selection"],
  },
  context: {
    id: "sample-design-system",
    version: "1",
    strategy: "full-documentation",
    contentDigest: "sha256:test-context",
    documentIds: ["pricing-card-docs"],
    content: "Use Card, Stack, and Button from the sample design system.",
  },
};

test("an OpenAI model records normalized output with auditable provenance", async () => {
  let receivedRequest: Request | undefined;
  let receivedBody: unknown;
  const providerResponse = {
    id: "resp_test",
    object: "response",
    created_at: 1_754_000_000,
    status: "completed",
    error: null,
    incomplete_details: null,
    instructions: null,
    max_output_tokens: null,
    model: "gpt-5.6-2026-08-07",
    output: [
      {
        id: "msg_test",
        type: "message",
        status: "completed",
        role: "assistant",
        content: [
          {
            type: "output_text",
            text: "export function PricingCard() {}",
            annotations: [],
            logprobs: [],
          },
        ],
      },
    ],
    parallel_tool_calls: true,
    previous_response_id: null,
    reasoning: { effort: null, summary: null },
    store: true,
    temperature: 1,
    text: { format: { type: "text" }, verbosity: "medium" },
    tool_choice: "auto",
    tools: [],
    top_p: 1,
    truncation: "disabled",
    service_tier: "default",
    usage: {
      input_tokens: 17,
      input_tokens_details: { cached_tokens: 0 },
      output_tokens: 23,
      output_tokens_details: { reasoning_tokens: 0 },
      total_tokens: 40,
    },
    metadata: {},
  };
  const server = Bun.serve({
    port: 0,
    async fetch(incomingRequest) {
      receivedRequest = incomingRequest;
      receivedBody = await incomingRequest.json();

      return Response.json(providerResponse, {
        headers: { "x-request-id": "req_test" },
      });
    },
  });

  try {
    const adapter = createOpenAIAdapter({
      model: "gpt-5.6",
      apiKey: "test-api-key",
      baseURL: `${server.url}v1`,
      pricing: {
        catalog: openAIGpt56Pricing,
        serviceTier: "fast",
      },
    });

    const invocation = await adapter.generate(request);

    expect(adapter.provider).toBe("openai");
    expect(adapter.model).toBe("gpt-5.6");
    expect(invocation).toMatchObject({
      output: {
        text: "export function PricingCard() {}",
        usage: {
          inputTokens: 17,
          cachedInputTokens: 0,
          outputTokens: 23,
          costUsd: 0.000775,
          latencyMs: expect.any(Number),
        },
      },
      provenance: {
        provider: "openai",
        requestedModel: "gpt-5.6",
        providerModel: "gpt-5.6-2026-08-07",
        adapterVersion: "1",
        finishReason: "stop",
        warnings: [],
        request: {
          body: receivedBody,
        },
        response: {
          id: "resp_test",
          timestamp: new Date(providerResponse.created_at * 1_000).toISOString(),
          headers: { "x-request-id": "req_test" },
          body: providerResponse,
        },
        providerMetadata: {
          openai: { responseId: "resp_test", serviceTier: "default" },
        },
      },
    });
    expect(receivedRequest?.url).toBe(`${server.url}v1/responses`);
    expect(receivedRequest?.headers.get("authorization")).toBe("Bearer test-api-key");
    expect(receivedBody).toMatchObject({
      model: "gpt-5.6",
      service_tier: "fast",
      input: [
        {
          role: "developer",
          content: request.context.content,
        },
        {
          role: "user",
          content: [{ type: "input_text", text: request.task.prompt }],
        },
      ],
    });
  } finally {
    await server.stop(true);
  }
});

test("an OpenAI model does not silently retry a failed benchmark request", async () => {
  let attempts = 0;
  const server = Bun.serve({
    port: 0,
    fetch() {
      attempts += 1;

      return Response.json(
        {
          error: {
            message: "rate limited for test",
            type: "rate_limit_error",
            param: null,
            code: "rate_limit_exceeded",
          },
        },
        { status: 429, headers: { "retry-after": "0" } },
      );
    },
  });

  try {
    const adapter = createOpenAIAdapter({
      model: "gpt-5.6",
      apiKey: "test-api-key",
      baseURL: `${server.url}v1`,
    });

    await expect(adapter.generate(request)).rejects.toThrow("rate limited for test");
    expect(attempts).toBe(1);
  } finally {
    await server.stop(true);
  }
});

test("an OpenAI model stops generation when the caller aborts", async () => {
  let markRequestStarted: (() => void) | undefined;
  const requestStarted = new Promise<void>((resolve) => {
    markRequestStarted = resolve;
  });
  const server = Bun.serve({
    port: 0,
    fetch(incomingRequest) {
      markRequestStarted?.();

      return new Promise<Response>((resolve) => {
        incomingRequest.signal.addEventListener(
          "abort",
          () => {
            resolve(new Response(null, { status: 499 }));
          },
          { once: true },
        );
      });
    },
  });

  try {
    const adapter = createOpenAIAdapter({
      model: "gpt-5.6",
      apiKey: "test-api-key",
      baseURL: `${server.url}v1`,
    });
    const controller = new AbortController();
    const generation = adapter.generate(request, controller.signal);

    await requestStarted;
    controller.abort();

    const outcome = await Promise.race([
      generation.then(
        () => "completed",
        () => "aborted",
      ),
      Bun.sleep(100).then(() => "pending"),
    ]);

    expect(outcome).toBe("aborted");
  } finally {
    await server.stop(true);
  }
});
