# Editorial field-note pattern

An editorial field note uses restraint to make hierarchy obvious:

1. Place the eyebrow and metadata in the `label` role.
2. Use one `h1` in the `display` role.
3. Give the summary the `title` role and the article excerpt the `body` role.
4. Use a semantic link for the action. Its visual role is `title`; it must have an accessible focus
   state and a comfortably sized hit area.
5. Keep prose measure between 45 and 68 characters. The display heading may use a narrower measure.
6. Separate the editorial content from the canvas with the surface color and panel radius.
7. On narrow viewports, keep document order and use spacing tokens to reduce density. Do not shrink
   the display role to an undocumented size.

The pattern permits asymmetry and generous empty space. It prohibits centered body copy, decorative
icons, gradients, shadows, all-caps prose, and extra interface controls.
