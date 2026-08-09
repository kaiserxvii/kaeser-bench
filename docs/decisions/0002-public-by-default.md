# ADR 0002: Public by default

- Status: Accepted
- Date: 2026-08-09

## Context

Kaeser Bench is intended to be a public benchmark whose credibility depends on inspectable inputs,
methods, results, and limitations. It will also process untrusted generated code and may publish
model outputs, so normal application-repository hygiene is not sufficient.

## Decision

Develop repository policy, architecture decisions, benchmark specifications, and evaluation
provenance in public by default. Treat secrets, embargoed security reports, personal data,
licensed third-party assets, and unpublished provider information as explicitly private. Require
captured provenance for public benchmark inputs and outputs.

Use public issues for reproducible bugs and scoped proposals, Discussions for open-ended support
and design conversation, and private GitHub security reporting for vulnerabilities.

## Consequences

- Decisions and limitations should be documented alongside implementation changes.
- Test fixtures and generated artifacts need rights, privacy, and provenance review before commit.
- Repository settings are part of the security posture and must be checked before announcement.
- Public results must retain enough versioned evidence to be independently interpreted.
- A separate code/data licensing decision is a release blocker, not an implied default.
