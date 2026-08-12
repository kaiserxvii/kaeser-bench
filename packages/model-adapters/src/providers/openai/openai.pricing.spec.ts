import { describe, expect, test } from "bun:test";
import { calculateOpenAITextCostUsd, openAIGpt56Pricing } from "./openai.pricing";

describe("calculateOpenAITextCostUsd", () => {
  test("uses the selected service tier", () => {
    const standard = calculateOpenAITextCostUsd({
      catalog: openAIGpt56Pricing,
      model: "gpt-5.6-terra",
      serviceTier: "standard",
      usage: { inputTokens: 1_000_000, outputTokens: 1_000_000 },
    });
    const fast = calculateOpenAITextCostUsd({
      catalog: openAIGpt56Pricing,
      model: "gpt-5.6-terra",
      serviceTier: "fast",
      usage: { inputTokens: 1_000_000, outputTokens: 1_000_000 },
    });

    expect(standard).toBe(22);
    expect(fast).toBe(44);
  });

  test("switches to long-context prices only above the threshold", () => {
    const short = calculateOpenAITextCostUsd({
      catalog: openAIGpt56Pricing,
      model: "gpt-5.6-luna",
      serviceTier: "standard",
      usage: { inputTokens: 272_000, outputTokens: 0 },
    });
    const long = calculateOpenAITextCostUsd({
      catalog: openAIGpt56Pricing,
      model: "gpt-5.6-luna",
      serviceTier: "standard",
      usage: { inputTokens: 272_001, outputTokens: 0 },
    });

    expect(short).toBeCloseTo(0.0544, 12);
    expect(long).toBeCloseTo(0.1088004, 12);
  });

  test("applies the regional-processing uplift explicitly", () => {
    const cost = calculateOpenAITextCostUsd({
      catalog: openAIGpt56Pricing,
      model: "gpt-5.6-sol",
      serviceTier: "batch",
      usage: { inputTokens: 1_000, outputTokens: 1_000 },
      regionalProcessing: true,
    });

    expect(cost).toBeCloseTo(0.01925, 12);
  });
});
