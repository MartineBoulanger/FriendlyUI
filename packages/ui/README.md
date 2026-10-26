# Friendly UI

Small, server-first React components for the Next.js App Router.

**[Read the online documentation](https://martineboulanger.github.io/FriendlyUI/)**

- [Installation](https://martineboulanger.github.io/FriendlyUI/docs/installation/)
- [Theming](https://martineboulanger.github.io/FriendlyUI/docs/theming/)
- [Server and client components](https://martineboulanger.github.io/FriendlyUI/docs/server-and-client/)
- [Component reference](https://martineboulanger.github.io/FriendlyUI/docs/button/)

The documentation is hosted online and does not need to run in your application.

```tsx
import { Button, Card } from '@friendly-ui/react';

export default function Page() {
  return <Card><Button>Get started</Button></Card>;
}
```

Import `@friendly-ui/react/styles.css` in your application's global CSS. Tailwind v4 users can also import `@friendly-ui/react/tailwind.css` after Tailwind and the component styles. Customize CSS variables in your own theme file.

Default exports work in Server Components by default. Modal, Tabs, and Toast use the explicit `@friendly-ui/react/client` entry point. Import them into a small `'use client'` wrapper when adding state or event handlers. React 19 is required.

[Source and issues](https://github.com/MartineBoulanger/FriendlyUI)

## Package managers

After release, use `npm install @friendly-ui/react`, `pnpm add @friendly-ui/react`, `yarn add @friendly-ui/react`, or `bun add @friendly-ui/react`. These registry commands require a published release; the current package is not published yet. Before release, install the built `.tgz` artifact with your manager (Yarn uses `file:/absolute/path/package.tgz`). React and React DOM 19 are required.

## Your own variants and sizes

Pass your own string to the supported `variant` and `size` props, and define its appearance in your theme file using `.fui-button[data-variant="danger"]` or `.fui-button[data-size="xl"]`. Names need no registration. Built-in suggestions remain available in TypeScript; custom names inherit base styling until your CSS is loaded. The online component guides include complete per-component CSS, usage, and preview examples.
