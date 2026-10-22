# Friendly UI

A small UI package for the Next.js App Router, with server-compatible components and opt-in client interactivity. This is a working foundation, not a complete design system. The package name is local and has not been published or checked for availability.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. After editing the package source, rebuild it with `npm run build -w @friendly-ui/react`; the example app supports normal Next.js hot reload for its own files.

```sh
npm test
npm run typecheck
npm run build
```

## Use the components

```tsx
// app/page.tsx — no client directive needed
import { Button, Card, Accordion } from '@friendly-ui/react';

export default function Page() {
  return (
    <Card>
      <Button type="submit">Save</Button>
      <Accordion title="Details">Works without client JavaScript.</Accordion>
    </Card>
  );
}
```

Available: Button (primary/secondary/ghost, sm/md/lg), Card, Input, Textarea, Label, Badge, Accordion. Components accept their native HTML props, including `className`, `style`, ARIA attributes, and React 19 refs. Associate inputs with labels and supply meaningful accessible names as you would with HTML. Buttons default to `type="button"`; use `type="submit"` in forms.

## Make a component interactive

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@friendly-ui/react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>{count}</Button>;
}
```

Use the same import in either environment. There is no `client` prop: Next.js decides the boundary through the module's `'use client'` directive. These components contain no hooks, context, browser APIs, or server-only imports, so they work on either side. Keep interactive wrappers small. Client components can also be prerendered to HTML; “client” does not mean “no server rendering.” Passing an ordinary event callback from a Server Component to a Client Component is not supported. Use a client wrapper for callbacks and Next.js Server Actions for server form mutations.

## Tailwind (default example)

The included app uses Tailwind v4. Import these once in your app's global CSS, in this order:

```css
@import "tailwindcss";
@import "@friendly-ui/react/styles.css";
@import "@friendly-ui/react/tailwind.css";
@import "./theme.css";
```

The bridge exposes utilities such as `bg-primary`, `text-muted`, `border-border`, and `rounded-ui`. Package component styles live in `@layer components`, so Tailwind utilities can override them. No package-source scanning is required: component styles ship as CSS rather than generated utility strings.

## One theme file

```css
/* app/theme.css */
:root {
  --fui-primary: #2563eb;
  --fui-primary-foreground: #ffffff;
  --fui-radius: 0.5rem;
}
```

Defaults use a neutral black/white palette inspired by the Next.js starter (Next.js itself has no official component design system). The default theme follows the system color scheme. Set `data-theme="light"` on `<html>` to force light defaults. For other themes, override tokens on `:root`, a class, or a data attribute. Overrides also apply in system dark mode; specify both foreground and background colors for a readable pair.

Tokens: `--fui-background`, `--fui-foreground`, `--fui-surface`, `--fui-muted`, `--fui-subtle`, `--fui-border`, `--fui-primary`, `--fui-primary-foreground`, `--fui-ring`, `--fui-radius`, `--fui-font`. There is no JavaScript theme provider. Use your app's font (including `next/font`) through `--fui-font`.

## Plain CSS / CSS Modules

Tailwind is optional. Import `@friendly-ui/react/styles.css` once in your root layout and your own theme CSS after it. Skip `tailwind.css`. Override stable `.fui-*` classes, pass CSS Module classes through `className`, or use `style`. Unlayered app CSS takes precedence over the layered defaults. The package does not apply a global reset.

## Structure and scope

- `packages/ui`: publishable ESM package, compiled JavaScript, declarations, and CSS. React is a peer dependency; no runtime component dependencies.
- `examples/next`: a real App Router app with a server page and a small client counter.
- `scripts`: build helpers and HTML contract tests.

`npm run build -w @friendly-ui/react` builds the package; `npm pack -w @friendly-ui/react` creates an installable tarball. Next.js is only required by the example, so the primitives also work in React apps. The build uses TypeScript rather than bundling the library, preserving module directives for future interactive entry points.

Prefer native HTML interactions first. Future dialogs, menus, tabs, and other complex widgets should get explicit client entry points and thorough keyboard/focus testing. Do not add a client directive to the default package entry point.

Architecture references: [Next.js server/client boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components), [Tailwind theme variables](https://tailwindcss.com/docs/theme).

## Documentation and GitHub Pages

The Next.js app in `examples/next` is the documentation site. It includes setup guides and live previews for every component. Run `npm run dev` for local development. `npm run build` exports static files into `examples/next/out`; `npm run check:docs` checks exported page links and assets.

To test a GitHub project URL locally:

```sh
DOCS_BASE_PATH=/FriendlyUI npm run build
DOCS_BASE_PATH=/FriendlyUI npm run check:docs
```

The base path is a build-time setting. Leave it empty for local development or a domain-root deployment. All documentation links use Next.js Link so the base path is applied automatically. Trailing slashes allow direct visits to nested pages on GitHub Pages.

To publish:

1. Push this workspace, including `package-lock.json`, to a GitHub repository with a `main` branch.
2. In the repository’s **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run the **Documentation** workflow, or push a change to `main`.

The workflow runs component tests, builds the package and static documentation, checks types and exported links, then deploys the `out` directory. Pull requests run validation without deployment. `actions/configure-pages` supplies the base path automatically for project sites and custom domains. If your default branch is not `main`, update `.github/workflows/docs.yml`.

GitHub Pages serves static assets: component HTML is produced during the build and interactive client examples run in the browser. Live Server Actions and request-time rendering require a separate server host. The library itself remains compatible with those features in consumers’ Next.js apps.

No GitHub deployment has been performed from this workspace yet.
