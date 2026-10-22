import type { ReactNode } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Input,
  Label,
  Textarea,
} from "@friendly-ui/react";
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
    description: "From a local package to your first component.",
    code: `# In this repository\nnpm install\nnpm run dev\n\n# Create a distributable package\nnpm run build -w @friendly-ui/react\nnpm pack -w @friendly-ui/react\n\n# In another Next.js app (use the actual tarball path)\nnpm install /path/to/friendly-ui-react-0.1.0.tgz`,
    content: (
      <>
        <p>
          Friendly UI is currently a local package, not a published npm release.
          Use the workspace example or install its tarball in another Next.js
          App Router app. React 19 is required.
        </p>
        <h2>Load the styles once</h2>
        <p>
          In your global CSS, import Tailwind, the component styles, the
          optional Tailwind bridge, and then your own theme.
        </p>
        <pre>
          <code>{`@import "tailwindcss";\n@import "@friendly-ui/react/styles.css";\n@import "@friendly-ui/react/tailwind.css";\n@import "./theme.css";`}</code>
        </pre>
        <p>
          Import that global CSS from your root layout. With plain CSS, skip
          both Tailwind imports. No provider or package-source scanning is
          needed.
        </p>
        <h2>Use a component</h2>
        <pre>
          <code>{`import { Button } from '@friendly-ui/react';\n\nexport default function Page() {\n  return <Button>Get started</Button>;\n}`}</code>
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
    code: `'use client';\n\nimport { useState } from 'react';\nimport { Button } from '@friendly-ui/react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <Button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </Button>\n  );\n}`,
    preview: <Counter />,
    content: (
      <>
        <p>
          The default entry point exports server-compatible components built
          from native HTML. Modal, Tabs, and Toast live in the explicit
          @friendly-ui/react/client entry point. A Server Component can render
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
    code: `import { Button } from '@friendly-ui/react';\n\n<Button>Continue</Button>\n<Button variant="secondary">Cancel</Button>\n<Button variant="ghost" size="sm">Learn more</Button>\n<Button type="submit">Save changes</Button>`,
    preview: (
      <div className="preview-row">
        <Button>Continue</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost" size="sm">
          Learn more
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    ),
    content: (
      <>
        <p>
          Defaults to type="button" to avoid accidental form submissions. Set
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
      ["variant", "primary | secondary | ghost", "primary"],
      ["size", "sm | md | lg", "md"],
      ["type", "button | submit | reset", "button"],
    ],
  },
  {
    slug: "card",
    title: "Card",
    group: "Components",
    description: "A quiet surface for related content.",
    code: `import { Card } from '@friendly-ui/react';\n\n<Card className="space-y-2">\n  <h2>Your next idea</h2>\n  <p>Start with something small.</p>\n</Card>`,
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
    code: `import { Input, Label } from '@friendly-ui/react';\n\n<Label htmlFor="email">Email</Label>\n<Input id="email" name="email" type="email"\n  autoComplete="email" placeholder="you@example.com" />`,
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
    code: `import { Textarea, Label } from '@friendly-ui/react';\n\n<Label htmlFor="message">Message</Label>\n<Textarea id="message" name="message" rows={4}\n  placeholder="What are you building?" />`,
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
    code: `import { Label, Input } from '@friendly-ui/react';\n\n<Label htmlFor="name">Full name</Label>\n<Input id="name" name="name" autoComplete="name" />`,
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
    slug: "badge",
    title: "Badge",
    group: "Components",
    description: "A small piece of context, close to the content.",
    code: `import { Badge } from '@friendly-ui/react';\n\n<Badge>In progress</Badge>`,
    preview: (
      <div className="preview-row">
        <Badge>In progress</Badge>
        <Badge>Version 0.1</Badge>
      </div>
    ),
    content: (
      <p>
        Renders a styled span. Use for short status text or metadata. It is not
        an interactive control or a live announcement; provide appropriate
        semantics when announcing dynamic status updates.
      </p>
    ),
  },
  {
    slug: "accordion",
    title: "Accordion",
    group: "Components",
    description:
      "A disclosure powered by the browser. No client wrapper needed.",
    code: `import { Accordion } from '@friendly-ui/react';\n\n<Accordion title="Does this need JavaScript?">\n  No. Native details and summary handle the interaction.\n</Accordion>`,
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
