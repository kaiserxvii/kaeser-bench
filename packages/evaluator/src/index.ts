import type {
  ArtifactReference,
  BenchmarkTask,
  EvaluationDimension,
  EvaluationScore,
} from "@kaeser/contracts";

export interface EvaluationInput {
  task: BenchmarkTask;
  artifacts: readonly ArtifactReference[];
}

export interface Evaluator {
  readonly id: string;
  readonly version: string;
  readonly dimensions: readonly EvaluationDimension[];
  evaluate(input: EvaluationInput): Promise<readonly EvaluationScore[]>;
}

export interface ScoreAggregator {
  readonly id: string;
  readonly version: string;
  aggregate(scores: readonly EvaluationScore[]): number;
}
