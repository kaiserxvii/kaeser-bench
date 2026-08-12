import type { BenchmarkTask, VersionedReference } from "@kaeser/contracts";

export interface BenchmarkSuite extends VersionedReference {
  title: string;
  tasks: readonly BenchmarkTask[];
}

export interface TaskRepository {
  getTask(reference: VersionedReference): Promise<BenchmarkTask>;
}

export interface BenchmarkRepository extends TaskRepository {
  getSuite(reference: VersionedReference): Promise<BenchmarkSuite>;
}

export type TaskManifest = Omit<BenchmarkTask, "prompt">;
