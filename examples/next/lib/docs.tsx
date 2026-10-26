import type { ReactNode } from "react";
import {
  Accordion,
  Badge,
  Chip,
  Avatar,
  Button,
  Card,
  Input,
  Label,
  Textarea,
} from "@fwenthehunter/friendly-ui";
import { InstallGuide } from "./install-guide";
import { componentDocs } from "./component-docs";
import { Counter } from "../app/counter";

export type Doc = {
  slug: string;
  title: string;
  group: "Start here" | "Components";
  description: string;
  code: string;
  content: ReactNode;
  preview?: ReactNode;
  props?: [string, string, string][];
};
export const docs: Doc[] = [
  {
    slug: "installation",
    title: "Installation",
    group: "Start here",
    description: "Install Friendly UI in your Next.js project.",
    code: `# Choose your package manager\nnpm install @fwenthehunter/friendly-ui\npnpm add @fwenthehunter/friendly-ui\nyarn add @fwenthehunter/friendly-ui\nbun add @fwenthehunter/friendly-ui`,
    content: (
      <>
        <p>
          Install @fwenthehunter/friendly-ui in your Next.js App Router application. React 19 and React DOM 19 are required. Friendly UI is MIT licensed.
        </p>
        <InstallGuide />
        <h2>Load the styles once</h2>
        <p>
          In your global CSS, import Tailwind, the component styles, the
          optional Tailwind bridge, and then your own theme.
        </p>
        <pre>
          <code>{`@import "tailwindcss";\n@import "@fwenthehunter/friendly-ui/styles.css";\n@import "@fwenthehunter/friendly-ui/tailwind.css";\n@import "./theme.css";`}</code>
        </pre>
        <p>
          Import that global CSS from your root layout. With plain CSS, skip
          both Tailwind imports. No provider or package-source scanning is
          needed.
        </p>
        <h2>Use a component</h2>
        <pre>
          <code>{`import { Button } from '@fwenthehunter/friendly-ui';\n\nexport default function Page() {\n  return <Button>Get started</Button>;\n}`}</code>
        </pre>
      </>
    ),
  },
  {
    slug: "theming",
    title: "Theming",
    group: "Start here",
    description: "One CSS file. A theme that flows through every component.",
    code: `/* app/theme.css */\n:root {\n  --fui-primary: #2563eb;\n  --fui-primary-foreground: #ffffff;\n  --fui-radius: 0.5rem;\n}`,
    preview: (
      <div
        style={
          {
            "--fui-primary": "#2563eb",
            "--fui-primary-foreground": "#fff",
            "--fui-radius": ".5rem",
          } as React.CSSProperties
        }
      >
        <Button>A different point of view</Button>
      </div>
    ),
    content: (
      <>
        <p>
          Defaults use a monochrome palette inspired by the Next.js starter.
          Override CSS variables in your theme file, imported after the package
          styles. No JavaScript context is involved.
        </p>
        <h2>Available tokens</h2>
        <p>
          Prefix each token with <code>--fui-</code>: background, foreground,
          surface, muted, subtle, border, primary, primary-foreground, ring,
          radius, font, heading-1 through heading-6, danger, and success.
        </p>
        <h2>Add your own variants</h2>
        <p>Button and Toast accept custom variant names while keeping built-in TypeScript suggestions. CloseButton inherits Button’s variants. No registration or client provider is required: add a selector to your theme file, then use the name.</p>
        <pre><code>{`/* app/theme.css */
@layer components {
  .fui-button[data-variant="danger"] {
    background: var(--fui-danger);
    color: #fff;
  }
  .fui-toast[data-variant="brand"] {
    --fui-toast-background: #312e81;
    --fui-toast-foreground: #fff;
    --fui-toast-border: #6366f1;
  }
}`}</code></pre>
        <pre><code>{`<Button variant="danger">Delete</Button>
<Toast variant="brand" open={open} onOpenChange={setOpen} title="Welcome" />`}</code></pre>
        <p>Custom variants inherit base styles until you supply their CSS. Define suitable foreground/background pairs for each color scheme. Custom toast variants use polite status announcements; the built-in error variant uses an alert.</p>
        <h2>Dark mode and scoped themes</h2>
        <p>
          The defaults follow the system color scheme. Set{" "}
          <code>data-theme="light"</code> on the html element to force light
          defaults. Define your own dark palette using a class or data
          attribute. Custom token overrides also apply in system dark mode; set
          foreground and background pairs together.
        </p>
        <p>
          You can scope tokens to any wrapper, as in the preview above. Use{" "}
          <code>--fui-font</code> to connect your application’s font.
        </p>
        <h2>Tailwind or your own CSS</h2>
        <p>
          The Tailwind v4 bridge exposes utilities including{" "}
          <code>bg-primary</code>, <code>text-muted</code>, and{" "}
          <code>rounded-ui</code>. Components use the components cascade layer
          so utilities can override defaults. Plain CSS and CSS Modules work
          through the native className and style props.
        </p>
      </>
    ),
  },
  {
    slug: "server-and-client",
    title: "Server & client",
    group: "Start here",
    description:
      "Keep the page on the server. Add interaction where it belongs.",
    code: `'use client';\n\nimport { useState } from 'react';\nimport { Button } from '@fwenthehunter/friendly-ui';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <Button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </Button>\n  );\n}`,
    preview: <Counter />,
    content: (
      <>
        <p>
          The default entry point exports server-compatible components built
          from native HTML. Modal, Tabs, and Toast live in the explicit
          @fwenthehunter/friendly-ui/client entry point. A Server Component can render
          those client components while keeping the rest of the page on the
          server.
        </p>
        <h2>Opt into interaction</h2>
        <p>
          Add <code>'use client'</code> to a small wrapper when you need state
          or event callbacks. Import the same components there. A prop cannot
          switch the server/client boundary; Next.js determines it from the
          module graph.
        </p>
        <p>
          Ordinary event callbacks cannot cross from a Server Component to a
          Client Component. Define them inside your client wrapper. Client
          components can still be prerendered to HTML.
        </p>
        <h2>Native behavior comes first</h2>
        <p>
          Input fields and the Accordion disclosure work with browser-native
          behavior. A disclosure does not require hydration simply to open and
          close.
        </p>
        <h2>This documentation is static</h2>
        <p>
          On GitHub Pages, Server Components run at build time. Client previews
          hydrate in the browser. Server Actions, request-time rendering, and
          other features needing a running server cannot be demonstrated live on
          this host.
        </p>
      </>
    ),
  },
  {
    slug: "button",
    title: "Button",
    group: "Components",
    description: "A native button, ready for forms and small interactions.",
    code: `import { Button } from '@fwenthehunter/friendly-ui';\n\n<Button>Continue</Button>\n<Button variant="secondary">Cancel</Button>\n<Button variant="ghost" size="sm">Learn more</Button>\n<Button type="submit">Save changes</Button>`,
    preview: (
      <div className="preview-row">
        <Button>Continue</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Delete (custom)</Button>
        <Button variant="ghost" size="sm">
          Learn more
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    ),
    content: (
      <>
        <p>
          Custom variant names such as danger are supported; their styles come from your theme file. The danger preview uses CSS supplied by this documentation app. Defaults to type="button" to avoid accidental form submissions. Set
          type="submit" explicitly inside a form. Use a client wrapper for
          onClick behavior.
        </p>
        <p>
          Provide visible text or an accessible name for icon-only buttons. For
          navigation, use a link rather than a button.
        </p>
      </>
    ),
    props: [
      ["variant", "primary | secondary | ghost | custom string", "primary"],
      ["size", "sm | md | lg | custom string", "md"],
      ["type", "button | submit | reset", "button"],
    ],
  },
  {
    slug: "card",
    title: "Card",
    group: "Components",
    description: "A quiet surface for related content.",
    code: `import { Card } from '@fwenthehunter/friendly-ui';\n\n<Card className="space-y-2">\n  <h2>Your next idea</h2>\n  <p>Start with something small.</p>\n</Card>`,
    preview: (
      <Card>
        <h3>Your next idea</h3>
        <p>Start with something small.</p>
      </Card>
    ),
    content: (
      <p>
        Renders a div with a border, surface color, padding, and themed radius.
        Supply your own headings and content. It does not add a landmark or
        heading level automatically.
      </p>
    ),
  },
  {
    slug: "input",
    title: "Input",
    group: "Components",
    description: "Native inputs with an accessible, familiar foundation.",
    code: `import { Input, Label } from '@fwenthehunter/friendly-ui';\n\n<Label htmlFor="email">Email</Label>\n<Input id="email" name="email" type="email"\n  autoComplete="email" placeholder="you@example.com" />`,
    preview: (
      <div className="field">
        <Label htmlFor="preview-email">Email</Label>
        <Input
          id="preview-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>
    ),
    content: (
      <>
        <p>
          Accepts native input props, including type, name, required, disabled,
          and defaultValue. Pair each field with a label using matching htmlFor
          and id values.
        </p>
        <p>
          For errors, set aria-invalid and connect explanatory text with
          aria-describedby. Placeholders do not replace labels. Controlled
          values and onChange callbacks belong inside a client wrapper.
        </p>
      </>
    ),
  },
  {
    slug: "textarea",
    title: "Textarea",
    group: "Components",
    description: "A little more room to express an idea.",
    code: `import { Textarea, Label } from '@fwenthehunter/friendly-ui';\n\n<Label htmlFor="message">Message</Label>\n<Textarea id="message" name="message" rows={4}\n  placeholder="What are you building?" />`,
    preview: (
      <div className="field">
        <Label htmlFor="preview-message">Message</Label>
        <Textarea
          id="preview-message"
          rows={4}
          placeholder="What are you building?"
        />
      </div>
    ),
    content: (
      <p>
        Accepts native textarea props. Resizes vertically by default. Use an
        associated label and connect descriptions or error messages with
        aria-describedby.
      </p>
    ),
  },
  {
    slug: "label",
    title: "Label",
    group: "Components",
    description: "Give each form control a clear name.",
    code: `import { Label, Input } from '@fwenthehunter/friendly-ui';\n\n<Label htmlFor="name">Full name</Label>\n<Input id="name" name="name" autoComplete="name" />`,
    preview: (
      <div className="field">
        <Label htmlFor="preview-name">Full name</Label>
        <Input id="preview-name" autoComplete="name" />
      </div>
    ),
    content: (
      <p>
        Renders a native label. Use htmlFor to point to the input’s id. Clicking
        the label focuses its associated field. Keep ids unique on each page.
      </p>
    ),
  },
  {
    slug: "chip",
    title: "Chip",
    group: "Components",
    description: "A compact label for status, categories, and metadata.",
    code: `import { Chip } from '@fwenthehunter/friendly-ui';\n\n<Chip>In progress</Chip>`,
    preview: (
      <div className="preview-row">
        <Chip>In progress</Chip>
        <Chip>Version 0.1</Chip>
      </div>
    ),
    content: (
      <p>
        Previously named Badge. Chip renders a styled span for short labels. Use
        Badge when you need a count or dot over an avatar or control. Chip is
        not interactive and does not announce changes automatically.
      </p>
    ),
  },
  {
    slug: "badge",
    title: "Badge",
    group: "Components",
    description: "A count or status dot over an avatar, button, or icon.",
    code: `import { Avatar, Badge, Button } from '@fwenthehunter/friendly-ui';\n\n<Badge content={3} label="3 unread notifications">\n  <Button variant="secondary" aria-label="Notifications, 3 unread">Notifications</Button>\n</Badge>\n\n<Badge dot label="Online" position="bottom-right">\n  <Avatar alt="Ada Lovelace" />\n</Badge>`,
    preview: (
      <div className="preview-row" style={{ gap: "2rem", padding: ".5rem" }}>
        <Badge content={3} label="3 unread notifications">
          <Button variant="secondary" aria-label="Notifications, 3 unread">Notifications</Button>
        </Badge>
        <Badge dot label="Online" position="bottom-right">
          <Avatar alt="Ada Lovelace" />
        </Badge>
        <Badge content={120}>
          <Button variant="secondary">Updates</Button>
        </Badge>
      </div>
    ),
    content: (
      <>
        <p>
          Wrap an avatar or control in Badge. The marker is positioned over its
          corner and does not intercept pointer events. A numeric count above
          max displays as max+ while its accessible name retains the full count.
        </p>
        <p>
          Zero counts are hidden by default; set showZero to display them. With
          no content, the marker is hidden unless dot is enabled. Set label to
          explain the indicator, such as “3 unread notifications” or “Online”.
          An unlabeled dot is decorative.
        </p>
        <p>
          A marker on a button sits outside the button’s accessible name.
          Include the count or status in the button’s aria-label when the
          control needs that information. Badge is not a live region;
          announce dynamic updates separately when necessary.
        </p>
        <p>
          The former pill-shaped Badge is now Chip. Customize the marker with
          --fui-badge-background and --fui-badge-foreground.
        </p>
      </>
    ),
    props: [
      ["content", "number | string", "—"],
      ["dot", "boolean", "false"],
      [
        "position",
        "top-right | top-left | bottom-right | bottom-left",
        "top-right",
      ],
      ["max", "number", "99"],
      ["showZero", "boolean", "false"],
      ["label", "string, accessible marker description", "—"],
    ],
  },
  {
    slug: "accordion",
    title: "Accordion",
    group: "Components",
    description:
      "A disclosure powered by the browser. No client wrapper needed.",
    code: `import { Accordion } from '@fwenthehunter/friendly-ui';\n\n<Accordion title="Does this need JavaScript?">\n  No. Native details and summary handle the interaction.\n</Accordion>`,
    preview: (
      <Accordion title="Does this need JavaScript?">
        No. Native details and summary handle the interaction.
      </Accordion>
    ),
    content: (
      <>
        <p>
          Renders details with a summary and a content wrapper. Works on the
          server and remains interactive with JavaScript disabled. Focus the
          summary and press Enter or Space to toggle it.
        </p>
        <p>
          Each disclosure opens independently. Supply the native name attribute
          to group disclosures in browsers that support it. Avoid interactive
          elements inside the title.
        </p>
      </>
    ),
    props: [
      ["title", "ReactNode (required)", "—"],
      ["open", "boolean (native)", "false"],
      ["name", "string (native grouping)", "—"],
    ],
  },
  ...componentDocs,
];
