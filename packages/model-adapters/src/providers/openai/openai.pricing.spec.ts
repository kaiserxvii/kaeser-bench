import { describe, expect, test } from "bun:test";
import {
  calculateOpenAITextCostUsd,
  createOpenAICostCalculator,
  openAIGpt56Pricing,
} from "./openai.pricing";

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

describe("createOpenAICostCalculator", () => {
  const calculateCost = createOpenAICostCalculator({
    model: "gpt-5.6-terra",
    pricing: {
      catalog: openAIGpt56Pricing,
      serviceTier: "fast",
    },
  });
  const usage = {
    inputTokens: 100_000,
    outputTokens: 100_000,
    latencyMs: 0,
  };

  test("uses the applied response tier instead of the requested tier", () => {
    expect(calculateCost(usage, { serviceTier: "default" })).toBeCloseTo(1.4, 12);
    expect(calculateCost(usage, { serviceTier: "priority" })).toBeCloseTo(2.8, 12);
  });

  test("omits cost when the applied response tier is absent or unsupported", () => {
    expect(calculateCost(usage, {})).toBeUndefined();
    expect(calculateCost(usage, { serviceTier: "scale" })).toBeUndefined();
  });
});
