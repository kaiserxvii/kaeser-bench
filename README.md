# Kaeser Bench

An open benchmark for measuring whether AI-generated frontend code belongs in a specific
design system—not merely whether it renders. The name **Kaeser** is a play on Kai and the name's
Caesar lineage; the benchmark is the proving ground.

Canonical repository: [github.com/kaiserxvii/kaeser-bench](https://github.com/kaiserxvii/kaeser-bench)

The project will provide a sample design system, a standardized task suite, controlled context
assembly, isolated generation and rendering, automated evaluators, and a public playground and
leaderboard. This repository currently contains only the foundations: package boundaries,
contracts, repository policy, and build tooling.

## What the benchmark measures

- component and API selection
- design-token and styling compliance
- accessibility and interaction behavior
- TypeScript and build correctness
- documented pattern adherence
- hallucinated APIs and unsupported behavior
- visual quality
- generation latency, token usage, and cost

## Repository map

```text
apps/
  runner/             Evaluation orchestration process
  web/                Future playground and leaderboard
packages/
  benchmark/          Versioned task-suite loading
  contracts/          Shared, vendor-neutral data contracts
  design-system/      Laboratory components, tokens, docs, and rules
  evaluator/          Pluggable scoring interfaces and aggregation boundary
  model-adapters/     Model-provider boundary
  retrieval/          Controlled context and retrieval boundary
  sandbox/            Isolated build, render, and interaction boundary
  typescript-config/  Shared TypeScript defaults for Bun and browser packages
docs/
  decisions/          Architecture decision records
  architecture.md     System boundaries and data flow
  benchmark-spec.md   Benchmark invariants and proposed artifact layout
```

Dependency direction is inward: apps compose packages, and packages exchange stable values from
`@kaeser/contracts`. Provider SDKs, browser runtimes, and framework choices stay behind their
respective package boundaries.

## Getting started

Requirements: [Bun](https://bun.sh/) 1.3.4.

```sh
bun install
bun run check
bun run build
```

Useful commands:

```sh
bun run commit
bun run changelog:preview
bun run format
bun run lint
bun run typecheck
bun run test
```

Turborepo schedules `build`, `typecheck`, and `test` against the workspace dependency graph and
caches successful work. Bun remains the package manager and keeps one lockfile and one central
package store. The small `node_modules` directories inside workspaces are dependency-isolation
symlinks into that store, not duplicate package installations.

Shared tool versions are declared once in the root dependency catalog and referenced by packages
with `catalog:`. Runtime dependencies still belong to the package that imports them, while shared
TypeScript defaults live in `@kaeser/typescript-config`.

Commits and pull-request titles follow
[`docs/commit-style.md`](docs/commit-style.md). Release notes are generated from that history with
git-cliff rather than maintained as duplicate handwritten entries.

## Current status

This is a zero-feature scaffold. Interfaces are deliberately small and framework-neutral. See
[`docs/architecture.md`](docs/architecture.md) for boundaries and
[`docs/benchmark-spec.md`](docs/benchmark-spec.md) for the proposed benchmark shape.

## Contributing and security

Kaeser Bench is being built in public. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before proposing a
change and follow [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) in all project spaces. General usage
questions belong in GitHub Discussions once enabled; reproducible defects and scoped proposals
belong in GitHub Issues.

Generated code is untrusted. Do not execute model output outside the future sandbox boundary or
with host credentials. Report vulnerabilities privately as described in
[`SECURITY.md`](SECURITY.md), never in a public issue.

## License

Kaeser Bench is licensed under the [Apache License 2.0](LICENSE). Unless a file or directory says
otherwise, that license covers the code, documentation, benchmark definitions, and original sample
design-system assets in this repository. Third-party materials retain their original licenses.
