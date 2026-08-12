import type { ContextAssembler, ContextDocumentSource } from "./types/context.types";

export function createFullDocumentContextAssembler(
  source: ContextDocumentSource,
): ContextAssembler {
  return {
    id: "full-documentation",
    version: "1",
    async assemble(input) {
      const release = await source.getRelease(input.designSystem);
      const documents = await Promise.all(
        release.documentIds.map(async (documentId) => ({
          documentId,
          content: await source.readDocument(input.designSystem, documentId),
        })),
      );
      const content = [
        "You are implementing a Kaeser Bench task. Treat the following design-system documents as mandatory constraints.",
        ...documents.map(
          ({ documentId, content }) => `\n<document id="${documentId}">\n${content}\n</document>`,
        ),
      ].join("\n");

      return {
        id: `${input.designSystem.id}-${this.id}`,
        version: `${input.designSystem.version}.${this.version}`,
        strategy: this.id,
        contentDigest: digest(content),
        documentIds: release.documentIds,
        content,
      };
    },
  };
}

function digest(content: string): string {
  const hash = new Bun.CryptoHasher("sha256").update(content).digest("hex");
  return `sha256:${hash}`;
}
