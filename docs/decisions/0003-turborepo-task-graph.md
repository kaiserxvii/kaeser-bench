# ADR 0003: Turborepo task graph

- Status: Accepted
- Date: 2026-08-10

## Context

The Bun workspace already provides package boundaries, one lockfile, dependency deduplication, and
local package linking. As the workspace grows, repository-wide build, typecheck, and test commands
also need to understand those boundaries, run in dependency order, and avoid repeating unchanged
work. Shared compiler defaults and tool versions should have one maintenance point without hiding
which dependencies each package uses.

## Decision

Keep Bun as the workspace package manager, runtime, and test runner. Use Turborepo as the task graph
and cache layer for builds, typechecks, and tests.

Declare runtime and development dependencies in the package that uses them. Use Bun's root catalog
to keep versions of shared development tools aligned, and keep common TypeScript settings in the
internal `@kaeser/typescript-config` package. Each source package extends the appropriate Bun or
browser TypeScript preset and exposes its own cacheable task scripts. Continue to run Biome as a
root task because it already processes the repository efficiently in one pass.

## Consequences

- Builds run in workspace dependency order and restore each package's `dist` output from cache.
- Tests and typechecks run at package granularity, so unchanged packages can be skipped.
- Shared TypeScript rules and cataloged versions are updated in one place.
- Package manifests remain explicit about direct dependencies, preventing phantom imports.
- Bun's isolated linker creates package-local `node_modules` symlink maps backed by the central
  `node_modules/.bun` store; these maps are expected and do not duplicate installed package data.
