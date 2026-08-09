export const evaluationDimensions = [
  "component-selection",
  "api-validity",
  "token-compliance",
  "accessibility",
  "build-correctness",
  "interaction-behavior",
  "visual-quality",
  "pattern-adherence",
  "hallucination-rate",
  "latency",
  "token-cost",
] as const;

export type EvaluationDimension = (typeof evaluationDimensions)[number];

export type RunStatus =
  | "queued"
  | "generating"
  | "building"
  | "evaluating"
  | "completed"
  | "failed";

export type ArtifactKind =
  | "context-bundle"
  | "model-response"
  | "source"
  | "build-log"
  | "screenshot"
  | "accessibility-report"
  | "interaction-report"
  | "evaluation-report";

export interface VersionedReference {
  id: string;
  version: string;
}

export interface BenchmarkTask extends VersionedReference {
  title: string;
  prompt: string;
  requiredCapabilities: readonly string[];
  dimensions: readonly EvaluationDimension[];
}

export interface ContextBundle extends VersionedReference {
  strategy: string;
  contentDigest: string;
  documentIds: readonly string[];
  content: string;
}

export interface ModelRequest {
  task: BenchmarkTask;
  context: ContextBundle;
}

export interface ModelUsage {
  inputTokens?: number;
  outputTokens?: number;
  costUsd?: number;
  latencyMs: number;
}

export interface ModelOutput {
  provider: string;
  model: string;
  text: string;
  usage: ModelUsage;
}

export interface ArtifactReference {
  id: string;
  kind: ArtifactKind;
  contentDigest: string;
  mediaType: string;
  location: string;
}

export interface EvaluationScore {
  dimension: EvaluationDimension;
  /** Normalized inclusive range: 0 is worst, 1 is best. */
  value: number;
  explanation: string;
  evidenceArtifactIds: readonly string[];
  evaluatorVersion: string;
}

export interface EvaluationRun {
  id: string;
  status: RunStatus;
  task: VersionedReference;
  designSystem: VersionedReference;
  context: VersionedReference;
  provider: string;
  model: string;
  artifacts: readonly ArtifactReference[];
  scores: readonly EvaluationScore[];
  aggregateScore?: number;
  createdAt: string;
  completedAt?: string;
}
