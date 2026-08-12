import { createOpenAI } from "@ai-sdk/openai";
import { createAISDKModelAdapter } from "../../ai-sdk.adapter";
import type { ModelAdapter } from "../../model.adapter";
import { createOpenAICostCalculator } from "./openai.pricing";
import type { OpenAIAdapterOptions } from "./types/openai.types";

export function createOpenAIAdapter(options: OpenAIAdapterOptions): ModelAdapter {
  const openai = createOpenAI({
    ...(options.apiKey === undefined ? {} : { apiKey: options.apiKey }),
    ...(options.baseURL === undefined ? {} : { baseURL: options.baseURL }),
  });
  const pricing = options.pricing;

  return createAISDKModelAdapter({
    provider: "openai",
    model: options.model,
    version: "1",
    languageModel: openai.responses(options.model),
    ...(pricing === undefined
      ? {}
      : {
          providerOptions: {
            openai: {
              serviceTier: pricing.serviceTier === "standard" ? "default" : pricing.serviceTier,
            },
          },
          calculateCostUsd: createOpenAICostCalculator({ model: options.model, pricing }),
        }),
  });
}
