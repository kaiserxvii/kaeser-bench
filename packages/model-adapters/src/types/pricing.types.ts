export type TokenPriceUnit = "usd-per-million-tokens";

/** Prices in USD for one million text tokens. */
export type TextTokenPrices = {
  input: number;
  cachedInput?: number;
  cacheWrite?: number;
  output: number;
};

export type TextTokenUsage = {
  /** Total input tokens, including cache reads and cache writes. */
  inputTokens: number;
  cachedInputTokens?: number;
  cacheWriteInputTokens?: number;
  outputTokens: number;
};

export type ModelTextTokenPricing<ServiceTier extends string, ContextTier extends string> = {
  serviceTiers: Readonly<
    Partial<Record<ServiceTier, Readonly<Partial<Record<ContextTier, TextTokenPrices>>>>>
  >;
};

export type TokenPricingCatalog<
  ModelId extends string,
  ServiceTier extends string,
  ContextTier extends string,
> = {
  provider: string;
  version: string;
  capturedAt: string;
  sourceUrl: string;
  unit: TokenPriceUnit;
  currency: "USD";
  models: Readonly<Partial<Record<ModelId, ModelTextTokenPricing<ServiceTier, ContextTier>>>>;
};
