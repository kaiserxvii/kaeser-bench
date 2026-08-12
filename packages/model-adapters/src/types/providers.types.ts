import type { ModelUsage } from "@kaeser/contracts";
import type { JSONValue, LanguageModel } from "ai";

export type AISDKProviderOptions = Readonly<Record<string, Readonly<Record<string, JSONValue>>>>;

export type ModelBillingMetadata = {
  serviceTier?: string;
};

export type ModelCostCalculator = (
  usage: ModelUsage,
  billingMetadata: ModelBillingMetadata,
) => number | undefined;

export type ProviderAdapterOptions<ModelId extends string> = {
  model: ModelId;
  apiKey?: string;
  baseURL?: string;
};

export type AISDKAdapterConfiguration = {
  provider: string;
  model: string;
  version: string;
  languageModel: LanguageModel;
  providerOptions?: AISDKProviderOptions;
  calculateCostUsd?: ModelCostCalculator;
};
