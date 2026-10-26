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
  return <Card><Button>Get started</Button></Card>;
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
