# North star: design-system reasoning under ambiguity

Kaeser Bench answers one question:

> Can a coding agent turn an incomplete product goal into a functional, accessible, and coherent
> interface that follows an unfamiliar design system?

Kaeser measures more than screenshot copying or code that builds. It measures how an agent uses a
system of design decisions. The agent must make choices, write code, inspect the result, and repair
its mistakes.

We call this subject **design-system reasoning under ambiguity**. This subject defines the tasks,
evaluators, tools, and research claims in Kaeser.

## Why this problem is important

A product request rarely specifies every visual decision. It can identify the audience, content,
workflow, and required result. It often does not specify hierarchy, density, composition,
responsive behavior, or emphasis.

A design system reduces the number of possible decisions. It does not remove the need for judgment.

A good UI coding agent must do these tasks:

- Find the applicable components, tokens, patterns, and constraints.
- Interpret the product goal and the content structure.
- Select one design from multiple valid designs.
- Keep the correct accessibility and interaction behavior.
- Inspect the rendered interface.
- Repair weak decisions without damage to correct work.

Code benchmarks usually test software behavior. Visual benchmarks usually compare a rendering with
a reference image. These tests do not fully measure if the result follows a product design system.
Kaeser measures the relationship between intent, system rules, judgment, and implementation.

## What Kaeser evaluates

Kaeser evaluates a **model-harness configuration**. It does not evaluate only a model. The harness
controls the tools, context, rendering access, interaction length, and stop conditions.

Each published result must identify the model-harness configuration. It must also identify the task,
environment, budget, and evaluator versions.

A typical Kaeser task has this sequence:

1. The agent receives an unfamiliar design system and a product goal.
2. The agent finds and reads the applicable system guidance.
3. The agent records a short design specification.
4. The agent implements a working interface.
5. The agent renders, uses, and tests the interface.
6. The agent repairs defects and submits the final result.

The design specification is a visible work product. It is not private reasoning. It can identify
content roles, components, tokens, responsive decisions, states, and known risks.

Kaeser compares the specification with the implementation. This comparison shows if the agent can
implement its design plan. It also finds design language that does not match the implementation.

## Goal-oriented tasks with controlled variation

Each task starts with a plausible product goal. The prompt gives the goal and all required
constraints. Private evaluators can hide test cases. They must not test an unstated preference or
require one reference implementation.

Kaeser uses controlled variations to change task difficulty. The variations keep the tested
capability the same. A task family can change these items:

- Design-system terms and component APIs.
- Typography, color, spacing, or motion scales.
- Content length, density, language, and data shape.
- Viewport, input method, zoom, and interaction state.
- Documentation format, retrieval strategy, and context budget.
- Access to rendering, tests, and evaluator feedback.

This is the twist. The variations show if an agent learned the supplied system. They also show when
an agent used familiar conventions instead.

Counterfactual design systems are useful for this test. Two systems can support the same product
goal, but use different token names, semantic roles, APIs, and composition rules. Success across
both systems shows adaptation instead of memory of one system.

Each variation must be fair. A difficult condition is useful when it represents real UI work. The
agent must be able to find the required information in the task environment. A hidden opinion is
not a valid test.

## Evidence before aggregate scores

Some UI requirements are objective. Other requirements need contextual judgment. Kaeser scores
these two types separately. Subjective taste must not appear as a mechanical fact.

Automated checks provide evidence for these facts:

- The project builds and the required workflows operate correctly.
- The implementation uses the correct components, APIs, and tokens.
- The semantic structure and accessibility behavior are correct.
- The content works with responsive layouts, localization, and zoom.
- The implementation does not add unsupported APIs or arbitrary style values.
- The implementation matches the design specification.

Contextual review measures hierarchy, emphasis, density, and coherence. Each review must use a clear
rubric. Multiple trained reviewers must review a representative set of results. Pairwise comparison
is the preferred method when it is practical.

A model-based visual judge can help with large test sets. Kaeser must first measure its agreement
with human reviewers. Reviewer disagreement shows uncertainty. Kaeser must report this uncertainty.

Kaeser can publish an aggregate score for comparison. The capability profile and its evidence are
the main result. A useful result shows the cause of a failure. For example, the agent can fail to
understand, plan, implement, inspect, or repair.

## Repeatability and meaningful comparison

A coding agent can produce a different result for each attempt. Thus, one run is one sample. Kaeser
uses repeated attempts and reports variance and failure distributions.

A model comparison must use the same tasks, harness, tools, budgets, and evaluators. A harness or
context study must change only the named test condition.

Each run stores its source, screenshots, browser traces, accessibility reports, build logs,
evaluation evidence, usage, and agent trajectory. Versions or content digests identify all inputs
and artifacts. This data lets a researcher inspect and reproduce a result within provider limits.

Public development tasks make Kaeser easy to try. Research tests should also use new, rotating,
held-out, or generated task instances when practical. These instances test adaptation instead of
familiarity with a fixed answer set.

## The first research area: typography

Typography is the first test area. It combines exact system constraints with design judgment. A
type ramp specifies available values and can name semantic roles. It does not organize the
information for a specific product.

A typography study can test if an agent does these tasks:

- Understand the roles in an unfamiliar type ramp.
- Map content meaning to those roles instead of selecting by size.
- Make a clear hierarchy without arbitrary values.
- Adapt the hierarchy to dense, sparse, localized, and responsive content.
- Align semantic HTML with visual prominence.
- Find weak hierarchy after rendering.
- Improve the result and continue to follow the design system.

This area is narrow enough for rigorous evaluation. It also includes understanding, planning,
implementation, visual inspection, and repair.

Later studies can use the same research method for components, color, spacing, forms, data display,
interaction patterns, and design-system extension.

Typography is the first test area, but it does not define Kaeser. Kaeser studies how agents make and
implement UI decisions in a system of constraints.

## What Kaeser does not measure

Kaeser is not primarily these things:

- A screenshot-reproduction benchmark.
- A general frontend software-engineering benchmark.
- A contest for the most fashionable interface.
- A test of design terminology.
- A ranking of design systems.
- One score without supporting evidence.

Design systems are controlled research environments. Future research can test how easy a design
system is for an agent to understand. The first research subject is the ability of an agent to use a
design system.

## The required result

Kaeser succeeds when a user can test a model-harness configuration and understand the result. The
user must learn if the agent is good at system-native UI work. The user must also learn why the agent
succeeded or failed.

Researchers must be able to reproduce the conditions, inspect the evidence, question the
evaluators, and study specific failure types.

Kaeser must show progress with evidence, not with vague opinions. Progress includes better system
discovery, stronger design decisions, correct implementation, useful self-review, and reliable
repair across different systems and content.
