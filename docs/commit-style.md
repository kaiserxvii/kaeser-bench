# Commit style

Kaeser Bench uses [Conventional Commits](https://www.conventionalcommits.org/) so its history is
readable and git-cliff can generate deterministic release notes.

## Format

```text
<type>(optional-scope)!: <description>

[optional body]

[optional footer]
```

The header must be at most 100 characters. Write the description in the imperative mood, begin it
with a lowercase letter, and do not end it with a period.

## Types

| Type | Use for | Changelog section |
| --- | --- | --- |
| `feat` | new user- or contributor-facing behavior | Added |
| `fix` | corrections to behavior | Fixed |
| `perf` | measurable performance improvements | Performance |
| `refactor` | internal changes without new behavior or a fix | Changed |
| `docs` | documentation only | Documentation |
| `test` | tests and test fixtures | Testing |
| `build` | dependencies, packaging, and build tooling | Build |
| `ci` | continuous-integration configuration | Continuous integration |
| `style` | formatting without behavioral changes | Styling |
| `revert` | reverting an earlier commit | Reverted |
| `chore` | maintenance that fits no category above | Maintenance |

Prefer the most specific type. A dependency update is usually `build(deps)`, while a workflow-only
change is `ci(repo)`.

## Scopes

Scopes are optional. Prefer one stable architectural area:

- `benchmark`, `contracts`, `design-system`, `evaluator`, `models`, `retrieval`, or `sandbox`
- `runner` or `web`
- `deps`, `repo`, or `release`

Do not invent a scope merely to restate the type. A change spanning several areas may omit the
scope.

## Breaking changes

Add `!` before the colon and explain the migration in a `BREAKING CHANGE:` footer:

```text
feat(contracts)!: version artifact locations

BREAKING CHANGE: ArtifactReference.location now requires a versioned URI.
```

Breaking changes are based on public contracts and published benchmark semantics, not merely on the
size of the diff.

## Examples

```text
feat(benchmark): add account security settings task
fix(sandbox): terminate child processes after timeout
docs(repo): explain evaluator evidence requirements
build(deps): update Biome
ci(repo): scan pull requests with CodeQL
```

## Contributor workflow

Use the guided prompt when useful:

```sh
bun run commit
```

Direct `git commit` remains supported, but the `commit-msg` hook validates it with commitlint. Run
the linter manually with:

```sh
printf '%s\n' 'feat(benchmark): add example task' | bun commitlint
```

Pull-request titles must follow the same format. Kaeser Bench uses squash merges and records the PR
title as the commit title on `main`, making each merged PR one changelog entry.

## Changelog workflow

Preview unreleased notes without changing files:

```sh
bun run changelog:preview
```

Generate `CHANGELOG.md` from the complete Git history:

```sh
bun run changelog
```

Inspect the semantic version implied by unreleased commits:

```sh
bun run version:next
```

Do not edit generated changelog entries by hand. Correct the source commit or adjust `cliff.toml`,
then regenerate the file. The release process will eventually own changelog generation and tags.
