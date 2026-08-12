import type { TextTokenPrices, TextTokenUsage } from "./types/pricing.types";

const TOKENS_PER_MILLION = 1_000_000;

export function calculateTextTokenCostUsd(usage: TextTokenUsage, prices: TextTokenPrices): number {
  assertTokenCount("inputTokens", usage.inputTokens);
  assertTokenCount("outputTokens", usage.outputTokens);

  const cachedInputTokens = usage.cachedInputTokens ?? 0;
  const cacheWriteInputTokens = usage.cacheWriteInputTokens ?? 0;
  assertTokenCount("cachedInputTokens", cachedInputTokens);
  assertTokenCount("cacheWriteInputTokens", cacheWriteInputTokens);

  const uncachedInputTokens = usage.inputTokens - cachedInputTokens - cacheWriteInputTokens;
  if (uncachedInputTokens < 0) {
    throw new RangeError("cached input and cache-write tokens cannot exceed total input tokens");
  }

  if (cachedInputTokens > 0 && prices.cachedInput === undefined) {
    throw new Error(
      "cached input tokens were reported but the pricing schedule has no cached rate",
    );
  }

  if (cacheWriteInputTokens > 0 && prices.cacheWrite === undefined) {
    throw new Error(
      "cache-write tokens were reported but the pricing schedule has no cache-write rate",
    );
  }

  const total =
    uncachedInputTokens * prices.input +
    cachedInputTokens * (prices.cachedInput ?? 0) +
    cacheWriteInputTokens * (prices.cacheWrite ?? 0) +
    usage.outputTokens * prices.output;

  return total / TOKENS_PER_MILLION;
}

function assertTokenCount(name: string, value: number): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative safe integer`);
  }
}
