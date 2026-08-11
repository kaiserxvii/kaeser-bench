import type { LanguageModel } from "ai";

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
};
