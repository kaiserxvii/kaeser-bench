# Contributing

The project is in its scaffold phase. Changes should preserve clear package boundaries and avoid
locking the benchmark to a single model provider, UI framework, or sandbox implementation.

By participating, you agree to follow the project [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
Security reports must follow [`SECURITY.md`](SECURITY.md) instead of the public issue tracker.

## Before writing code

Use a GitHub issue for substantial features, new evaluation dimensions, scoring-policy changes,
and benchmark tasks. This lets maintainers establish scope and comparability before implementation.
Small documentation fixes can go directly to a pull request.

Unless a contribution explicitly states otherwise, submitting it means agreeing to license it
under the repository's [Apache License 2.0](LICENSE).

## Local workflow

```sh
bun install
bun run check
bun run build
```

Before opening a pull request:

1. Add or update tests for observable behavior.
2. Record consequential architecture choices in `docs/decisions/`.
3. Keep benchmark task inputs versioned and deterministic.
4. Keep secrets, provider credentials, and generated run artifacts out of Git.
5. Disclose AI assistance and identify generated code or assets in the pull-request summary.
6. Run `bun run check` and `bun run build` locally.

## Package boundaries

- Cross-package data belongs in `@kaeser/contracts`.
- Model-specific logic belongs in `@kaeser/model-adapters`.
- Browser, container, and execution details belong in `@kaeser/sandbox`.
- Evaluation logic must consume captured artifacts, not hidden provider state.
- Apps may compose packages; packages must not import from apps.

## Commit style

Every commit and pull-request title must follow the project's
[`docs/commit-style.md`](docs/commit-style.md) guide. Use Commitizen for an interactive prompt:

```sh
bun run commit
```

The `commit-msg` hook validates local commits with commitlint. Pull-request titles are validated in
CI because squash merges use the PR title as the commit title on `main`. Those titles become the
source for the generated changelog.

## Pull-request expectations

- Explain user-visible and benchmark-comparability effects.
- Avoid unrelated refactors in the same change.
- Do not commit model credentials, production data, or raw run artifacts.
- Preserve provenance for prompts, context bundles, model identifiers, and generated outputs.
- Expect maintainers to request changes or decline work that undermines reproducibility, safety,
  or the benchmark's provider neutrality.
