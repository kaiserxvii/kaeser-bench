import type { ArtifactReference, ModelInvocation } from "@kaeser/contracts";
import { mkdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import type {
  GenerationRunOptions,
  GenerationRunRecord,
  GenerationRunResult,
} from "./types/generation.types";

export async function runGeneration(options: GenerationRunOptions): Promise<GenerationRunResult> {
  const now = options.now ?? (() => new Date());
  const runId = options.createRunId?.() ?? createRunId(now());
  const runDirectory = join(options.outputDirectory, runId);
  await mkdir(runDirectory, { recursive: true });

  const task = await options.taskRepository.getTask(options.task);
  const context = await options.contextAssembler.assemble({
    task,
    designSystem: options.designSystem,
  });
  const createdAt = now().toISOString();
  const artifacts: ArtifactReference[] = [];

  artifacts.push(await writeArtifact(runDirectory, "task.json", "task", "application/json", task));
  artifacts.push(
    await writeArtifact(
      runDirectory,
      "context.json",
      "context-bundle",
      "application/json",
      context,
    ),
  );

  const invocation = await options.modelAdapter.generate({ task, context }, options.signal);
  artifacts.push(
    await writeArtifact(
      runDirectory,
      "model-response.json",
      "model-response",
      "application/json",
      invocation,
    ),
  );

  const source = extractHtmlDocument(invocation);
  const sourceArtifact = await writeArtifact(
    runDirectory,
    "source/index.html",
    "source",
    "text/html",
    source,
  );
  artifacts.push(sourceArtifact);

  const run: GenerationRunRecord = {
    id: runId,
    scope: "generation-only",
    status: "completed",
    task: options.task,
    designSystem: options.designSystem,
    context: { id: context.id, version: context.version },
    provider: options.modelAdapter.provider,
    model: invocation.provenance.providerModel,
    artifacts,
    scores: [],
    createdAt,
    completedAt: now().toISOString(),
    pipeline: {
      completed: ["task-loading", "context-assembly", "model-generation"],
      deferred: ["sandbox-execution", "evaluation"],
    },
  };
  await writeJson(join(runDirectory, "run.json"), run);

  return {
    run,
    usage: invocation.output.usage,
    runDirectory,
    sourcePath: join(runDirectory, sourceArtifact.location),
  };
}

function extractHtmlDocument(invocation: ModelInvocation): string {
  const output = invocation.output.text.trim();
  const start = output.search(/<!doctype html>/i);
  const closingTag = "</html>";
  const end = output.toLowerCase().lastIndexOf(closingTag);
  if (start < 0 || end < start) {
    throw new Error("model response was captured, but it did not contain a complete HTML document");
  }
  return `${output.slice(start, end + closingTag.length)}\n`;
}

async function writeArtifact(
  runDirectory: string,
  location: string,
  kind: ArtifactReference["kind"],
  mediaType: string,
  value: string | object,
): Promise<ArtifactReference> {
  const path = join(runDirectory, location);
  const content = typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`;
  await mkdir(dirname(path), { recursive: true });
  await Bun.write(path, content);
  const contentDigest = digest(content);
  return {
    id: `${kind}-${contentDigest.slice("sha256:".length, "sha256:".length + 12)}`,
    kind,
    contentDigest,
    mediaType,
    location: relative(runDirectory, path),
  };
}

async function writeJson(path: string, value: object): Promise<void> {
  await Bun.write(path, `${JSON.stringify(value, null, 2)}\n`);
}

function digest(content: string): string {
  const hash = new Bun.CryptoHasher("sha256").update(content).digest("hex");
  return `sha256:${hash}`;
}

function createRunId(date: Date): string {
  const timestamp = date.toISOString().replaceAll(/[-:.]/g, "");
  return `${timestamp}-${crypto.randomUUID().slice(0, 8)}`;
}
