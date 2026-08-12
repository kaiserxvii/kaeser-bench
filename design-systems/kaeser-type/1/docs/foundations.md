# Kaeser Type foundations

Kaeser Type is a typography-first design system. Use only the following CSS custom properties. Do
not introduce other font families, font sizes, line heights, letter spacing, colors, spacing values,
or corner radii.

```css
:root {
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --type-display-size: clamp(2.5rem, 7vw, 5rem);
  --type-display-leading: 0.94;
  --type-title-size: 1.25rem;
  --type-title-leading: 1.2;
  --type-body-size: 1rem;
  --type-body-leading: 1.65;
  --type-label-size: 0.75rem;
  --type-label-leading: 1.2;
  --tracking-display: -0.055em;
  --tracking-label: 0.12em;
  --color-canvas: #f2efe8;
  --color-ink: #181713;
  --color-muted: #6b675e;
  --color-accent: #b53a24;
  --color-surface: #fffdf8;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --radius-panel: 1.5rem;
}
```

Apply the font family to the document body. Text roles are semantic, not merely sizes:

- `display`: the single page subject; use the display size and leading, weight 700, and display
  tracking.
- `title`: a subordinate heading or strong action; use the title size and leading, weight 650.
- `body`: prose and explanatory copy; use the body size and leading, weight 400.
- `label`: metadata and eyebrows; use the label size and leading, weight 700, label tracking, and
  uppercase transformation.

Add a `data-type-role` attribute to every visible text element so role selection can be evaluated.
The attribute value must be one of `display`, `title`, `body`, or `label`.

Use a visible two-pixel outline in `--color-accent` for keyboard focus. Respect the user's reduced
motion preference if motion is added. Never remove an outline without a replacement.
