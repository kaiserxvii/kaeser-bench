# ADR 0004: Next.js App Router for the web application

- Status: Accepted
- Date: 2026-08-11

## Context

The first generation flow produces inspectable task, context, provider, and source artifacts. The
repository now needs a durable product surface for browsing those records and, later, comparing
sandbox and evaluator evidence. The architecture intentionally deferred the frontend framework
until a vertical slice made that boundary concrete.

## Decision

Use Next.js 16 with the App Router for `apps/web`. Use TypeScript and the optional `src/` directory,
keep components as React Server Components unless interactivity requires a client boundary, and use
Next.js metadata APIs from the root layout. Continue using the repository's Biome configuration
instead of adding a second linter.

Test synchronous route components with Vitest and React Testing Library. Add end-to-end coverage at
the HTTP and browser seam when routes begin reading run artifacts or rendering sandbox evidence.
Generated model output remains untrusted and must not be injected or rendered by the web process
before the sandbox boundary exists.

## Consequences

- `apps/web` owns Next.js routing and server-rendered product views.
- The application can later read durable run metadata on the server without exposing filesystem
  access to browser code.
- Workspace packages remain framework-neutral; the web app consumes their public contracts.
- Next.js build output uses `.next/` and is tracked by Turborepo as the web package's build artifact.
- Deploying, authenticating, and selecting a durable run store remain separate decisions.
