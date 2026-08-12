import type { BenchmarkTask, ContextBundle, VersionedReference } from "@kaeser/contracts";

export interface ContextAssemblyInput {
  task: BenchmarkTask;
  designSystem: VersionedReference;
}

export interface ContextAssembler {
  readonly id: string;
  readonly version: string;
  assemble(input: ContextAssemblyInput): Promise<ContextBundle>;
}

export interface ContextDocumentRelease {
  contentDigest: string;
  documentIds: readonly string[];
}

export interface ContextDocumentSource {
  getRelease(reference: VersionedReference): Promise<ContextDocumentRelease>;
  readDocument(release: VersionedReference, documentId: string): Promise<string>;
}
