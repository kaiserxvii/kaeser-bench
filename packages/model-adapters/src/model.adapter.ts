import type { ModelInvocation, ModelRequest } from "@kaeser/contracts";

export type ModelAdapter = {
  readonly provider: string;
  readonly model: string;
  readonly version: string;
  generate(request: ModelRequest, signal?: AbortSignal): Promise<ModelInvocation>;
};
