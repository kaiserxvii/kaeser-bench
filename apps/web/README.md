# `@kaeser/web`

Next.js App Router application for the public playground, generated-code inspector, evaluation
explorer, comparisons, and leaderboard.

## Development

From the repository root:

```sh
bun run web:dev
```

Then visit `http://localhost:3000`. The current home route establishes the application shell and
describes the generation boundary. It does not render untrusted generated HTML.

The app uses TypeScript, React Server Components by default, global CSS for the initial shell,
Biome through the repository commands, and Vitest with React Testing Library for synchronous route
components.
