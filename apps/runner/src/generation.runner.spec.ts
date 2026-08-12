import { afterEach, describe, expect, test } from "bun:test";
import { FileSystemTaskRepository } from "@kaeser/benchmark";
import { FileSystemDesignSystemRepository } from "@kaeser/design-system";
import type { ModelAdapter } from "@kaeser/model-adapters";
import { createFullDocumentContextAssembler } from "@kaeser/retrieval";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { runGeneration } from "./generation.runner";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true })),
  );
});

describe("generation runner", () => {
  test("loads one task, assembles context, invokes one model, and records the result", async () => {
    const repositoryRoot = resolve(import.meta.dir, "../../..");
    const outputDirectory = await mkdtemp(join(tmpdir(), "kaeser-runner-test-"));
    temporaryDirectories.push(outputDirectory);
    let observedPrompt = "";
    let observedContext = "";

    const modelAdapter: ModelAdapter = {
      provider: "fake",
      model: "fake-model",
      version: "1",
      async generate(request) {
        observedPrompt = request.task.prompt;
        observedContext = request.context.content;
        return {
          output: {
            text: "<!doctype html><html><body><h1>Result</h1></body></html>",
            usage: { inputTokens: 100, outputTokens: 20, latencyMs: 5 },
          },
          provenance: {
            provider: "fake",
            requestedModel: "fake-model",
            providerModel: "fake-model-2026-08-11",
            adapterVersion: "1",
            finishReason: "stop",
            warnings: [],
            request: {},
            response: { id: "response-1", timestamp: "2026-08-11T12:00:00.000Z" },
          },
        };
      },
    };
    const taskRepository = new FileSystemTaskRepository(join(repositoryRoot, "tasks"));
    const designSystems = new FileSystemDesignSystemRepository(
      join(repositoryRoot, "design-systems"),
    );

    const result = await runGeneration({
      task: { id: "typography-editorial-card", version: "1" },
      designSystem: { id: "kaeser-type", version: "1" },
      taskRepository,
      contextAssembler: createFullDocumentContextAssembler(designSystems),
      modelAdapter,
      outputDirectory,
      createRunId: () => "run-test",
      now: () => new Date("2026-08-11T12:00:00.000Z"),
    });

    expect(observedPrompt).toContain("Designing quieter notifications");
    expect(observedContext).toContain('<document id="foundations.md">');
    expect(observedContext).not.toContain("This rubric is evaluator-only");
    expect(result.run).toMatchObject({
      id: "run-test",
      scope: "generation-only",
      status: "completed",
      provider: "fake",
      model: "fake-model-2026-08-11",
      scores: [],
      pipeline: {
        completed: ["task-loading", "context-assembly", "model-generation"],
        deferred: ["sandbox-execution", "evaluation"],
      },
    });
    expect(result.usage).toEqual({ inputTokens: 100, outputTokens: 20, latencyMs: 5 });
    expect(result.run.artifacts.map((artifact) => artifact.location)).toEqual([
      "task.json",
      "context.json",
      "model-response.json",
      "source/index.html",
    ]);
    expect(await Bun.file(result.sourcePath).text()).toStartWith("<!doctype html>");

    const savedRun = await Bun.file(join(result.runDirectory, "run.json")).json();
    expect(savedRun).toEqual(result.run);
  });
});
