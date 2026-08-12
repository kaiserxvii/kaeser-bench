import { evaluationDimensions } from "@kaeser/contracts";
import type { BenchmarkTask, VersionedReference } from "@kaeser/contracts";
import { join } from "node:path";
import type { TaskManifest, TaskRepository } from "./types/benchmark.types";

export class FileSystemTaskRepository implements TaskRepository {
  constructor(private readonly rootDirectory: string) {}

  async getTask(reference: VersionedReference): Promise<BenchmarkTask> {
    assertSafeReference(reference);
    const directory = join(this.rootDirectory, reference.id, reference.version);
    const manifest = await readJson(join(directory, "task.json"));
    const prompt = await Bun.file(join(directory, "prompt.md")).text();

    if (!isTaskManifest(manifest)) {
      throw new Error(`invalid task manifest for ${reference.id}@${reference.version}`);
    }
    if (manifest.id !== reference.id || manifest.version !== reference.version) {
      throw new Error(`task manifest does not match ${reference.id}@${reference.version}`);
    }

    return { ...manifest, prompt: prompt.trim() };
  }
}

async function readJson(path: string): Promise<unknown> {
  const file = Bun.file(path);
  if (!(await file.exists())) {
    throw new Error(`required benchmark file does not exist: ${path}`);
  }
  return file.json();
}

function isTaskManifest(value: unknown): value is TaskManifest {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  const dimensions = record.dimensions;
  return (
    typeof record.id === "string" &&
    typeof record.version === "string" &&
    typeof record.title === "string" &&
    Array.isArray(record.requiredCapabilities) &&
    record.requiredCapabilities.every((item) => typeof item === "string") &&
    Array.isArray(dimensions) &&
    dimensions.every(
      (item) => typeof item === "string" && evaluationDimensions.includes(item as never),
    )
  );
}

function assertSafeReference(reference: VersionedReference): void {
  const safeSegment = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!safeSegment.test(reference.id) || !safeSegment.test(reference.version)) {
    throw new Error(`unsafe benchmark reference: ${reference.id}@${reference.version}`);
  }
}
