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
