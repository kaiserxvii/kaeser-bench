import { FileSystemTaskRepository } from "@kaeser/benchmark";
import { FileSystemDesignSystemRepository } from "@kaeser/design-system";
import {
  createOpenAIAdapter,
  openAIGpt56Pricing,
  type OpenAIModelId,
} from "@kaeser/model-adapters";
import { createFullDocumentContextAssembler } from "@kaeser/retrieval";
import { join, resolve } from "node:path";
import { runGeneration } from "./generation.runner";

const repositoryRoot = resolve(import.meta.dir, "../../..");
const model = (process.env.KAESER_MODEL ?? "gpt-5.6-luna") as OpenAIModelId;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required; copy .env.example to .env and add your key");
}

const taskRepository = new FileSystemTaskRepository(join(repositoryRoot, "tasks"));
const designSystems = new FileSystemDesignSystemRepository(join(repositoryRoot, "design-systems"));
const contextAssembler = createFullDocumentContextAssembler(designSystems);
const modelAdapter = createOpenAIAdapter({
  model,
  pricing: {
    catalog: openAIGpt56Pricing,
    serviceTier: "standard",
  },
});

const result = await runGeneration({
  task: { id: "typography-editorial-card", version: "1" },
  designSystem: { id: "kaeser-type", version: "1" },
  taskRepository,
  contextAssembler,
  modelAdapter,
  outputDirectory: join(repositoryRoot, "runs"),
});

console.log(
  JSON.stringify(
    {
      runId: result.run.id,
      status: result.run.status,
      model: result.run.model,
      usage: result.usage,
      runDirectory: result.runDirectory,
      sourcePath: result.sourcePath,
      deferred: result.run.pipeline.deferred,
    },
    null,
    2,
  ),
);
