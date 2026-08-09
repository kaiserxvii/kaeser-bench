import type { BenchmarkTask, VersionedReference } from "@kaeser/contracts";

export interface BenchmarkSuite extends VersionedReference {
  title: string;
  tasks: readonly BenchmarkTask[];
}

export interface BenchmarkRepository {
  getSuite(reference: VersionedReference): Promise<BenchmarkSuite>;
  getTask(reference: VersionedReference): Promise<BenchmarkTask>;
}
