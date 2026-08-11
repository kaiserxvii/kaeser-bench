# Kaeser Bench

**Pretty is easy. Belonging is harder.**

[![Research preview](https://img.shields.io/badge/status-research_preview-8B5CF6?style=for-the-badge&labelColor=18181B&logo=googlescholar&logoColor=white)](docs/north-star.md)
[![CI](https://img.shields.io/github/actions/workflow/status/kaiserxvii/kaeser-bench/ci.yml?branch=main&style=for-the-badge&label=signal&labelColor=18181B&color=22C55E&logo=githubactions&logoColor=white)](https://github.com/kaiserxvii/kaeser-bench/actions/workflows/ci.yml)
[![Bun 1.3.4](https://img.shields.io/badge/runtime-Bun_1.3.4-F472B6?style=for-the-badge&labelColor=18181B&logo=bun&logoColor=white)](https://bun.sh/)
[![Apache 2.0](https://img.shields.io/badge/license-Apache_2.0-38BDF8?style=for-the-badge&labelColor=18181B)](LICENSE)

Kaeser Bench measures how coding agents turn an incomplete product goal into a functional and
accessible interface. The interface must follow an unfamiliar design system. Kaeser does more than
test screenshot copying.

> Can an agent understand a system, make good UI decisions, implement them, inspect the result, and
> repair its mistakes?

Kaeser studies **design-system reasoning under ambiguity**. Typography is the first test area. The
rules are exact, but hierarchy, density, and emphasis still require judgment.

Read the [`north star`](docs/north-star.md) for the full research thesis.

## Status

Kaeser is an early research project. You cannot run the benchmark yet. The repository contains the
contracts, boundaries, and tools for the first typography study.

## What it tests

- **Understand:** Find an unfamiliar system and interpret its rules.
- **Decide:** Plan the hierarchy, density, emphasis, and composition.
- **Build:** Make a functional, accessible, and system-native UI.
- **Reflect:** Render, review, and repair the UI. Keep the parts that work.

Each result identifies a versioned model-harness configuration. It includes the source, screenshots,
interaction traces, evaluator findings, usage, and agent trajectory. A leaderboard can show who
won. Kaeser must also show what broke.

## Quickstart

Requires [Bun](https://bun.sh/) 1.3.4.

```sh
bun install
bun run check
bun run build
```

These commands validate the current scaffold. A benchmark CLI will arrive with the first vertical
slice.

## Read more

- [`docs/north-star.md`](docs/north-star.md): Why Kaeser exists
- [`docs/benchmark-spec.md`](docs/benchmark-spec.md): Benchmark rules and artifact structure
- [`docs/architecture.md`](docs/architecture.md): System boundaries and data flow
- [`CONTRIBUTING.md`](CONTRIBUTING.md): Contribution workflow

## Contributing and security

Kaeser is a public project. We welcome issues and focused pull requests. Generated code is
untrusted. Do not run it outside the future sandbox or with host credentials. Follow
[`SECURITY.md`](SECURITY.md) to report a security problem.

Commits and pull-request titles follow [`docs/commit-style.md`](docs/commit-style.md).

## License

[Apache License 2.0](LICENSE). The name **Kaeser** is a play on Kai and the Caesar origin of the
name. This benchmark is the proving ground.
