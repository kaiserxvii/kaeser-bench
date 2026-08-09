# ADR 0001: Bun workspace monorepo

- Status: Accepted
- Date: 2026-08-09

## Context

The benchmark needs several independently replaceable concerns while sharing contracts and a
single contributor workflow. The project is beginning with repository primitives rather than a
selected web or sandbox stack.

## Decision

Use Bun for package management, scripts, tests, and initial package builds. Organize applications
under `apps/*` and reusable boundaries under `packages/*`. Keep the initial scaffold
framework-neutral and use TypeScript at every boundary.

## Consequences

- One lockfile and command surface cover the repository.
- Package ownership is visible before implementations exist.
- The runner can compose packages without forcing feature packages to depend on one another.
- Tooling that cannot run correctly on Bun may still require a targeted runtime exception,
  documented in a later ADR.
