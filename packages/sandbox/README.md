# `@kaeser/sandbox`

## Summary

Owns the isolated environment where untrusted model-generated frontend code is materialized, built,
rendered, and exercised. It returns captured artifacts without deciding what those artifacts mean.

## Why it exists

Generated code may be broken, hostile, nondeterministic, or designed to access credentials and the
host system. A consistent sandbox is both a security boundary and an experimental control: every
model output must face the same toolchain, limits, fixtures, and execution conditions.

## Objectives

- Enforce strong isolation from host files, credentials, processes, and networks by default.
- Pin the runtime, package manager, browser, dependencies, operating-system image, and resource
  limits used by each run.
- Materialize generated files safely and reject paths or archives that escape the assigned workspace.
- Apply deterministic time, CPU, memory, process, output, and network limits.
- Capture source, installation output, build logs, runtime errors, screenshots, accessibility data,
  interaction traces, and failure metadata as durable artifacts.
- Clean up every run completely and support cancellation without leaving processes or writable state
  behind.
- Maintain a documented threat model and adversarial tests before shared or hosted execution is
  considered safe.
- Make failed builds and timed-out interactions observable results rather than discarded runs.

## Boundary

The sandbox executes and records; it does not interpret quality or calculate scores. No concrete
sandbox implementation should be considered safe until the threat model in
[`SECURITY.md`](../../SECURITY.md) is implemented and reviewed.
