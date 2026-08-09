# Repository instructions

These instructions apply to coding agents and automated contributors working in Kaeser Bench.

## Commits and pull requests

- Use Conventional Commits for every commit and pull-request title.
- Follow `docs/commit-style.md` for types, scopes, breaking changes, and examples.
- Keep the subject imperative, lowercase, free of a trailing period, and at most 100 characters.
- Prefer one focused commit for one coherent change. Do not combine unrelated work.
- Use `bun run commit` when an interactive prompt is appropriate. In non-interactive automation,
  construct the Conventional Commit message directly.
- Never bypass the `commit-msg` hook to force an invalid message through.
- Run `bun run check` and `bun run build` before publishing code changes.

## Changelog

- Changelog entries are generated from squash-merged PR titles by git-cliff.
- Do not edit generated entries in `CHANGELOG.md` by hand.
- Use `bun run changelog:preview` to inspect unreleased notes.
- Use `bun run changelog` only when intentionally refreshing the generated changelog.
- Mark breaking public-contract or benchmark-semantic changes with `!` and a `BREAKING CHANGE:`
  footer.
