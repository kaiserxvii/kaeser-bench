import type { ArtifactReference, BenchmarkTask, ModelOutput } from "@kaeser/contracts";

export interface SandboxInput {
  task: BenchmarkTask;
  output: ModelOutput;
}

export interface SandboxResult {
  succeeded: boolean;
  artifacts: readonly ArtifactReference[];
}

export interface Sandbox {
  readonly id: string;
  readonly version: string;
  execute(input: SandboxInput, signal?: AbortSignal): Promise<SandboxResult>;
}
