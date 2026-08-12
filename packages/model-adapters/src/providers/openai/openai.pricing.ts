import { calculateTextTokenCostUsd } from "../../pricing";
import type { ModelCostCalculator } from "../../types/providers.types";
import type {
  CalculateOpenAITextCostOptions,
  CreateOpenAICostCalculatorOptions,
  OpenAIContextTier,
  OpenAITextModelPricing,
  OpenAITextPricingCatalog,
} from "./types/pricing";

const LONG_CONTEXT_THRESHOLD_TOKENS = 272_000;

/**
 * A pinned pricing snapshot for the GPT-5.6 family.
 *
 * Keep previous catalogs when prices change so historical benchmark runs can
 * continue to resolve the schedule they originally used.
 */
export const openAIGpt56Pricing = {
  provider: "openai",
  version: "2026-08-11",
  capturedAt: "2026-08-11",
  sourceUrl: "https://developers.openai.com/api/docs/pricing",
  unit: "usd-per-million-tokens",
  currency: "USD",
  regionalProcessingUplift: 0.1,
  aliases: {
    "gpt-5.6": "gpt-5.6-sol",
  },
  models: {
    "gpt-5.6-sol": {
      longContextThresholdTokens: LONG_CONTEXT_THRESHOLD_TOKENS,
      serviceTiers: {
        standard: {
          short: { input: 5, cachedInput: 0.5, cacheWrite: 6.25, output: 30 },
          long: { input: 10, cachedInput: 1, cacheWrite: 12.5, output: 45 },
        },
        batch: {
          short: { input: 2.5, cachedInput: 0.25, cacheWrite: 3.125, output: 15 },
          long: { input: 5, cachedInput: 0.5, cacheWrite: 6.25, output: 22.5 },
        },
        flex: {
          short: { input: 2.5, cachedInput: 0.25, cacheWrite: 3.125, output: 15 },
          long: { input: 5, cachedInput: 0.5, cacheWrite: 6.25, output: 22.5 },
        },
        fast: {
          short: { input: 10, cachedInput: 1, cacheWrite: 12.5, output: 60 },
          long: { input: 20, cachedInput: 2, cacheWrite: 25, output: 90 },
        },
      },
    },
    "gpt-5.6-terra": {
      longContextThresholdTokens: LONG_CONTEXT_THRESHOLD_TOKENS,
      serviceTiers: {
        standard: {
          short: { input: 2, cachedInput: 0.2, cacheWrite: 2.5, output: 12 },
          long: { input: 4, cachedInput: 0.4, cacheWrite: 5, output: 18 },
        },
        batch: {
          short: { input: 1, cachedInput: 0.1, cacheWrite: 1.25, output: 6 },
          long: { input: 2, cachedInput: 0.2, cacheWrite: 2.5, output: 9 },
        },
        flex: {
          short: { input: 1, cachedInput: 0.1, cacheWrite: 1.25, output: 6 },
          long: { input: 2, cachedInput: 0.2, cacheWrite: 2.5, output: 9 },
        },
        fast: {
          short: { input: 4, cachedInput: 0.4, cacheWrite: 5, output: 24 },
          long: { input: 8, cachedInput: 0.8, cacheWrite: 10, output: 36 },
        },
      },
    },
    "gpt-5.6-luna": {
      longContextThresholdTokens: LONG_CONTEXT_THRESHOLD_TOKENS,
      serviceTiers: {
        standard: {
          short: { input: 0.2, cachedInput: 0.02, cacheWrite: 0.25, output: 1.2 },
          long: { input: 0.4, cachedInput: 0.04, cacheWrite: 0.5, output: 1.8 },
        },
        batch: {
          short: { input: 0.1, cachedInput: 0.01, cacheWrite: 0.125, output: 0.6 },
          long: { input: 0.2, cachedInput: 0.02, cacheWrite: 0.25, output: 0.9 },
        },
        flex: {
          short: { input: 0.1, cachedInput: 0.01, cacheWrite: 0.125, output: 0.6 },
          long: { input: 0.2, cachedInput: 0.02, cacheWrite: 0.25, output: 0.9 },
        },
        fast: {
          short: { input: 0.4, cachedInput: 0.04, cacheWrite: 0.5, output: 2.4 },
          long: { input: 0.8, cachedInput: 0.08, cacheWrite: 1, output: 3.6 },
        },
      },
    },
  },
} as const satisfies OpenAITextPricingCatalog;

export function createOpenAICostCalculator(
  options: CreateOpenAICostCalculatorOptions,
): ModelCostCalculator {
  return (usage) => {
    if (usage.inputTokens === undefined || usage.outputTokens === undefined) {
      return undefined;
    }

    return calculateOpenAITextCostUsd({
      catalog: options.pricing.catalog,
      model: options.model,
      serviceTier: options.pricing.serviceTier,
      usage: {
        inputTokens: usage.inputTokens,
        ...(usage.cachedInputTokens === undefined
          ? {}
          : { cachedInputTokens: usage.cachedInputTokens }),
        ...(usage.cacheWriteInputTokens === undefined
          ? {}
          : { cacheWriteInputTokens: usage.cacheWriteInputTokens }),
        outputTokens: usage.outputTokens,
      },
      ...(options.pricing.regionalProcessing === undefined
        ? {}
        : { regionalProcessing: options.pricing.regionalProcessing }),
    });
  };
}

export function calculateOpenAITextCostUsd(options: CalculateOpenAITextCostOptions): number {
  const resolvedModel = options.catalog.aliases?.[options.model] ?? options.model;
  const modelPricing = options.catalog.models[resolvedModel];
  if (modelPricing === undefined) {
    throw new Error(`pricing catalog ${options.catalog.version} has no entry for ${options.model}`);
  }

  const contextTier = getContextTier(modelPricing, options.usage.inputTokens);
  const prices = modelPricing.serviceTiers[options.serviceTier]?.[contextTier];

  if (prices === undefined) {
    throw new Error(
      `no ${options.serviceTier} ${contextTier}-context pricing for ${options.model}`,
    );
  }

  const baseCost = calculateTextTokenCostUsd(options.usage, prices);
  return options.regionalProcessing
    ? baseCost * (1 + options.catalog.regionalProcessingUplift)
    : baseCost;
}

function getContextTier(pricing: OpenAITextModelPricing, inputTokens: number): OpenAIContextTier {
  return pricing.longContextThresholdTokens !== undefined &&
    inputTokens > pricing.longContextThresholdTokens
    ? "long"
    : "short";
}
