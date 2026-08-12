import type { TaskRepository } from "@kaeser/benchmark";
import type { EvaluationRun, ModelUsage, VersionedReference } from "@kaeser/contracts";
import type { ModelAdapter } from "@kaeser/model-adapters";
import type { ContextAssembler } from "@kaeser/retrieval";

export interface GenerationRunOptions {
  task: VersionedReference;
  designSystem: VersionedReference;
  taskRepository: TaskRepository;
  contextAssembler: ContextAssembler;
  modelAdapter: ModelAdapter;
  outputDirectory: string;
  now?: () => Date;
  createRunId?: () => string;
  signal?: AbortSignal;
}

export type CompletedGenerationStages = readonly [
  "task-loading",
  "context-assembly",
  "model-generation",
];

export type DeferredGenerationStages = readonly ["sandbox-execution", "evaluation"];

export interface GenerationRunPipeline {
  completed: CompletedGenerationStages;
  deferred: DeferredGenerationStages;
}

export interface GenerationRunRecord extends EvaluationRun {
  scope: "generation-only";
  pipeline: GenerationRunPipeline;
}

export interface GenerationRunResult {
  run: GenerationRunRecord;
  usage: ModelUsage;
  runDirectory: string;
  sourcePath: string;
}
