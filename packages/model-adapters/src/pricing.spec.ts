import { describe, expect, test } from "bun:test";
import { calculateTextTokenCostUsd } from "./pricing";

describe("calculateTextTokenCostUsd", () => {
  test("prices uncached input, cache reads, cache writes, and output independently", () => {
    const cost = calculateTextTokenCostUsd(
      {
        inputTokens: 1_000_000,
        cachedInputTokens: 250_000,
        cacheWriteInputTokens: 250_000,
        outputTokens: 100_000,
      },
      { input: 2, cachedInput: 0.2, cacheWrite: 2.5, output: 12 },
    );

    expect(cost).toBeCloseTo(2.875, 12);
  });

  test("rejects cache details that exceed total input", () => {
    expect(() =>
      calculateTextTokenCostUsd(
        { inputTokens: 10, cachedInputTokens: 11, outputTokens: 0 },
        { input: 1, cachedInput: 0.1, output: 1 },
      ),
    ).toThrow("cannot exceed total input tokens");
  });

  test("rejects usage that has no matching cache rate", () => {
    expect(() =>
      calculateTextTokenCostUsd(
        { inputTokens: 10, cachedInputTokens: 1, outputTokens: 0 },
        { input: 1, output: 1 },
      ),
    ).toThrow("no cached rate");
  });
});
