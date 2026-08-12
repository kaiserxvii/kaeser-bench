import type {
  ModelTextTokenPricing,
  TextTokenUsage,
  TokenPricingCatalog,
} from "../../../types/pricing.types";

export type OpenAIServiceTier = "standard" | "batch" | "flex" | "fast";
export type OpenAIInvocationServiceTier = Exclude<OpenAIServiceTier, "batch">;
export type OpenAIContextTier = "short" | "long";

export type OpenAITextModelPricing = ModelTextTokenPricing<OpenAIServiceTier, OpenAIContextTier> & {
  /** Requests above this input-token count use the long-context rate. */
  longContextThresholdTokens?: number;
};

export type OpenAITextPricingCatalog<ModelId extends string = string> = Omit<
  TokenPricingCatalog<ModelId, OpenAIServiceTier, OpenAIContextTier>,
  "models" | "provider"
> & {
  provider: "openai";
  regionalProcessingUplift: number;
  aliases?: Readonly<Record<string, ModelId>>;
  models: Readonly<Partial<Record<ModelId, OpenAITextModelPricing>>>;
};

export type OpenAIPricingOptions = {
  catalog: OpenAITextPricingCatalog;
  /** Also configures the corresponding tier on the OpenAI request. */
  serviceTier: OpenAIInvocationServiceTier;
  regionalProcessing?: boolean;
};

export type CreateOpenAICostCalculatorOptions = {
  model: string;
  pricing: OpenAIPricingOptions;
};

export type CalculateOpenAITextCostOptions = {
  catalog: OpenAITextPricingCatalog;
  model: string;
  serviceTier: OpenAIServiceTier;
  usage: TextTokenUsage;
  regionalProcessing?: boolean;
};
