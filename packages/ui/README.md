# Friendly UI

Small, server-first React components for the Next.js App Router.

**[Read the online documentation](https://martineboulanger.github.io/FriendlyUI/)**

- [Installation](https://martineboulanger.github.io/FriendlyUI/docs/installation/)
- [Theming](https://martineboulanger.github.io/FriendlyUI/docs/theming/)
- [Server and client components](https://martineboulanger.github.io/FriendlyUI/docs/server-and-client/)
- [Component reference](https://martineboulanger.github.io/FriendlyUI/docs/button/)

The documentation is hosted online and does not need to run in your application.

```tsx
import { Button, Card } from '@fwenthehunter/friendly-ui';

export default function Page() {
  return (
    <Card>
      <Button>Get started</Button>
    </Card>
  );
}
```

Import `@fwenthehunter/friendly-ui/styles.css` in your application's global CSS. Tailwind v4 users can also import `@fwenthehunter/friendly-ui/tailwind.css` after Tailwind and the component styles. Customize CSS variables in your own theme file.

Default exports work in Server Components by default. Modal, Tabs, and Toast use the explicit `@fwenthehunter/friendly-ui/client` entry point. Import them into a small `'use client'` wrapper when adding state or event handlers. React 19 is required.

[Source and issues](https://github.com/MartineBoulanger/FriendlyUI)

## Package managers

Install with `npm install @fwenthehunter/friendly-ui`, `pnpm add @fwenthehunter/friendly-ui`, `yarn add @fwenthehunter/friendly-ui`, or `bun add @fwenthehunter/friendly-ui`. React and React DOM 19 are peer dependencies. The same package works with each manager; no install-time build is required.

## Your own variants and sizes

Pass your own string to the supported `variant` and `size` props, and define its appearance in your theme file using `.fui-button[data-variant="danger"]` or `.fui-button[data-size="xl"]`. Names need no registration. Built-in suggestions remain available in TypeScript; custom names inherit base styling until your CSS is loaded. The online component guides include complete per-component CSS, usage, and preview examples.

## License

MIT. See LICENSE in the package.

## Tooltip

Added Tooltip in version 0.3.0

```tsx
import { Button } from '@fwenthehunter/friendly-ui';
import { Tooltip } from '@fwenthehunter/friendly-ui/client';

<Tooltip content='Save your changes' side='top'>
  <Button>Save</Button>
</Tooltip>;
```

Opens on hover or keyboard focus; Escape dismisses it. Choose top, right, bottom, or left. Customize `--fui-tooltip-background` and `--fui-tooltip-foreground` in your theme. Keep essential instructions visible for touch users. Positioning uses CSS without automatic edge detection or a portal.

## Chip variants

Changes in version 0.4.0

`Chip` is server-compatible and defaults to `variant="neutral"`, which uses the theme background and foreground. Built-in variants are `neutral`, `info` (blue), `success` (green), `warning` (orange/yellow), and `error` (red), with light/dark theme palettes.

```tsx
import { Chip } from "@fwenthehunter/friendly-ui";

<Chip>Neutral</Chip>
<Chip variant="info">Information</Chip>
<Chip variant="success">Complete</Chip>
<Chip variant="warning">Needs attention</Chip>
<Chip variant="error">Failed</Chip>
<Chip variant="brand">Featured</Chip>
```

Change built-in colors or add your own variant in `app/theme.css`, imported after the package styles:

```css
/* Overrides all success Chips without changing Toast colors. */
:root {
  --fui-chip-success-background: #dcfce7;
  --fui-chip-success-foreground: #14532d;
  --fui-chip-success-border: #86efac;
}

@layer components {
  .fui-chip[data-variant='brand'] {
    --fui-chip-background: #ede9fe;
    --fui-chip-foreground: #5b21b6;
    --fui-chip-border: #c4b5fd;
  }
}
```

Every built-in variant has `--fui-chip-<variant>-background`, `--fui-chip-<variant>-foreground`, and `--fui-chip-<variant>-border` tokens. Custom variants need no registration; unknown names keep the neutral appearance until their CSS is provided. These example overrides use the same colors in both themes; add a dark media query if desired. `ChipVariant` and `ChipProps` are exported for typed wrappers.

## Storybook

Browse the [component Storybook](https://martineboulanger.github.io/FriendlyUI/storybook/) for live examples, editable props, and light/dark previews. Table primitives are documented together in the Table story.

From the repository root:

```sh
npm install
npm run storybook
```

Storybook runs at http://localhost:6006. Stories live in `stories/` and use the package source and shipped styles. `npm run build:storybook` creates `storybook-static/`; `npm run build:pages` builds the documentation and includes Storybook under `storybook/`. The Documentation workflow validates both and deploys them to GitHub Pages on pushes to `main`.
