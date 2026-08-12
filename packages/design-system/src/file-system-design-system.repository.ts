import type { VersionedReference } from "@kaeser/contracts";
import { join } from "node:path";
import type {
  DesignSystemRelease,
  DesignSystemRepository,
  ReleaseManifest,
} from "./types/design-system.types";

export class FileSystemDesignSystemRepository implements DesignSystemRepository {
  constructor(private readonly rootDirectory: string) {}

  async getRelease(reference: VersionedReference): Promise<DesignSystemRelease> {
    assertSafeReference(reference);
    const manifestPath = join(this.rootDirectory, reference.id, reference.version, "release.json");
    const file = Bun.file(manifestPath);
    if (!(await file.exists())) {
      throw new Error(`required design-system file does not exist: ${manifestPath}`);
    }
    const manifest: unknown = await file.json();
    if (!isReleaseManifest(manifest)) {
      throw new Error(`invalid design-system release for ${reference.id}@${reference.version}`);
    }
    if (manifest.id !== reference.id || manifest.version !== reference.version) {
      throw new Error(`design-system release does not match ${reference.id}@${reference.version}`);
    }

    const documents = await Promise.all(
      manifest.documentIds.map((documentId) => this.readRawDocument(reference, documentId)),
    );
    return {
      ...manifest,
      contentDigest: digest(documents.join("\n\n---\n\n")),
    };
  }

  async readDocument(release: VersionedReference, documentId: string): Promise<string> {
    const manifest = await this.getRelease(release);
    if (!manifest.documentIds.includes(documentId)) {
      throw new Error(`${documentId} is not part of ${release.id}@${release.version}`);
    }
    return this.readRawDocument(release, documentId);
  }

  private async readRawDocument(release: VersionedReference, documentId: string): Promise<string> {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(documentId)) {
      throw new Error(`unsafe design-system document id: ${documentId}`);
    }
    const path = join(this.rootDirectory, release.id, release.version, "docs", documentId);
    const file = Bun.file(path);
    if (!(await file.exists())) {
      throw new Error(`required design-system document does not exist: ${path}`);
    }
    return (await file.text()).trim();
  }
}

function isReleaseManifest(value: unknown): value is ReleaseManifest {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.version === "string" &&
    Array.isArray(record.documentIds) &&
    record.documentIds.length > 0 &&
    record.documentIds.every((item) => typeof item === "string")
  );
}

function assertSafeReference(reference: VersionedReference): void {
  const safeSegment = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!safeSegment.test(reference.id) || !safeSegment.test(reference.version)) {
    throw new Error(`unsafe design-system reference: ${reference.id}@${reference.version}`);
  }
}

function digest(content: string): string {
  const hash = new Bun.CryptoHasher("sha256").update(content).digest("hex");
  return `sha256:${hash}`;
}
