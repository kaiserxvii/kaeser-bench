# Security policy

This project will execute untrusted model-generated code. Until the sandbox threat model is
implemented and reviewed, do not run generated code with host credentials, network access, or
write access to developer files.

## Supported versions

Kaeser Bench has no released or supported version yet. Security fixes currently target the `main`
branch. A version-support table will be added with the first release.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in an issue, discussion, pull request, benchmark result,
or other public channel.

Before the repository is announced, maintainers must enable GitHub private vulnerability reporting.
After it is enabled, use **Security → Report a vulnerability** in the repository. Include:

- the affected revision or version
- a minimal reproduction or proof of concept
- the expected impact and trust boundary crossed
- any known mitigations

Maintainers should acknowledge a report within five business days, provide an initial assessment
when practical, and coordinate disclosure with the reporter. These are response targets, not a
guarantee or service-level agreement.

## Scope priorities

Reports involving sandbox escape, credential exposure, arbitrary host writes, unauthorized network
access, artifact poisoning, prompt/context leakage, or leaderboard integrity are especially
important. Reports about model output quality without a security boundary impact belong in the
normal issue tracker.
