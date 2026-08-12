import type { VersionedReference } from "@kaeser/contracts";

export interface DesignSystemRelease extends VersionedReference {
  contentDigest: string;
  documentIds: readonly string[];
}

export interface DesignSystemRepository {
  getRelease(reference: VersionedReference): Promise<DesignSystemRelease>;
  readDocument(release: VersionedReference, documentId: string): Promise<string>;
}

export type ReleaseManifest = Omit<DesignSystemRelease, "contentDigest">;
