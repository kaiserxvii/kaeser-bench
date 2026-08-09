import type { ModelOutput, ModelRequest } from "@kaeser/contracts";

export interface ModelAdapter {
  readonly provider: string;
  readonly model: string;
  readonly version: string;
  generate(request: ModelRequest, signal?: AbortSignal): Promise<ModelOutput>;
}
