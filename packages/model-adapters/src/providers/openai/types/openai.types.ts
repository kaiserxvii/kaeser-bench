import type { OpenAIProvider } from "@ai-sdk/openai";
import type { ProviderAdapterOptions } from "../../../types/providers.types";

export type OpenAIModelId = Parameters<OpenAIProvider["responses"]>[0];

export type OpenAIAdapterOptions = ProviderAdapterOptions<OpenAIModelId>;
