# Public repository checklist

Complete this checklist before announcing Kaeser Bench or accepting external contributions.

## Repository metadata

- [ ] Create the GitHub repository with `main` as the default branch.
- [ ] Add a concise description, project URL when available, and relevant topics.
- [ ] Confirm repository visibility is public and remove any internal-only links or fixtures.
- [ ] Add the canonical GitHub URL to `package.json` and the README after it exists.
- [ ] Enable GitHub Discussions if it will be the support and design-conversation channel.

## Rights and governance

- [ ] Select code and benchmark-data licenses; add the license files and package metadata.
- [ ] Confirm every committed fixture, design asset, font, and generated artifact can be published.
- [ ] Publish a private conduct-reporting contact.
- [ ] Identify maintainers and decision-making expectations.
- [ ] Decide whether contributor sign-off, a DCO, or a CLA is necessary.

## Security and repository settings

- [ ] Enable private vulnerability reporting.
- [ ] Enable secret scanning and push protection where available.
- [ ] Enable Dependabot alerts and security updates.
- [ ] Protect `main`; require pull requests and the CI check before merge.
- [ ] Restrict force pushes and branch deletion on `main`.
- [ ] Review the entire Git history for secrets before the first push.
- [ ] Confirm workflows have minimal token permissions and dependency actions are trusted.

## Project quality

- [ ] Run `bun install --frozen-lockfile`, `bun run check`, and `bun run build` from a clean clone.
- [ ] Confirm all issue-form labels exist or remove their automatic labels.
- [ ] Add a release/versioning policy before publishing packages or benchmark datasets.
- [ ] Document the sandbox threat model before executing generated code in shared infrastructure.
- [ ] Define artifact retention, privacy, takedown, and provenance policies before publishing runs.
