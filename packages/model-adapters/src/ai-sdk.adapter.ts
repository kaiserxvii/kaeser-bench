import type { ModelUsage } from "@kaeser/contracts";
import { generateText } from "ai";
import type { ModelAdapter } from "./model.adapter";
import type { AISDKAdapterConfiguration } from "./types/providers.types";

export function createAISDKModelAdapter(options: AISDKAdapterConfiguration): ModelAdapter {
  return {
    provider: options.provider,
    model: options.model,
    version: options.version,
    async generate(request, signal) {
      const startedAt = performance.now();
      const result = await generateText({
        model: options.languageModel,
        instructions: request.context.content,
        prompt: request.task.prompt,
        maxRetries: 0,
        include: {
          requestBody: true,
          responseBody: true,
        },
        ...(options.providerOptions === undefined
          ? {}
          : { providerOptions: options.providerOptions }),
        ...(signal === undefined ? {} : { abortSignal: signal }),
      });

      const usageWithoutCost: ModelUsage = {
        ...(result.usage.inputTokens === undefined
          ? {}
          : { inputTokens: result.usage.inputTokens }),
        ...(result.usage.inputTokenDetails.cacheReadTokens === undefined
          ? {}
          : { cachedInputTokens: result.usage.inputTokenDetails.cacheReadTokens }),
        ...(result.usage.inputTokenDetails.cacheWriteTokens === undefined
          ? {}
          : { cacheWriteInputTokens: result.usage.inputTokenDetails.cacheWriteTokens }),
        ...(result.usage.outputTokens === undefined
          ? {}
          : { outputTokens: result.usage.outputTokens }),
        latencyMs: performance.now() - startedAt,
      };
      const costUsd = options.calculateCostUsd?.(usageWithoutCost);
      const usage: ModelUsage = {
        ...usageWithoutCost,
        ...(costUsd === undefined ? {} : { costUsd }),
      };
      const step = result.finalStep;

      return {
        output: {
          text: result.text,
          usage,
        },
        provenance: {
          provider: options.provider,
          requestedModel: options.model,
          providerModel: step.response.modelId,
          adapterVersion: options.version,
          finishReason: step.finishReason,
          ...(step.rawFinishReason === undefined ? {} : { rawFinishReason: step.rawFinishReason }),
          warnings: step.warnings ?? [],
          request: {
            ...(step.request.body === undefined ? {} : { body: step.request.body }),
          },
          response: {
            id: step.response.id,
            timestamp: step.response.timestamp.toISOString(),
            ...(step.response.headers === undefined ? {} : { headers: step.response.headers }),
            ...(step.response.body === undefined ? {} : { body: step.response.body }),
          },
          ...(step.providerMetadata === undefined
            ? {}
            : { providerMetadata: step.providerMetadata }),
        },
      };
    },
  };
}
