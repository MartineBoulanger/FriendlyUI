import { Avatar, Button, CloseButton, Sidebar } from "@friendly-ui/react";
import { Modal, SidebarDrawer } from "@friendly-ui/react/client";
import { BrandToastExample } from "../app/component-examples";
import type { ReactNode } from "react";

type Example = {
  title: string;
  css: string;
  usage: string;
  note: string;
  preview?: ReactNode;
};
export const customizations: Record<string, Example[]> = {
  button: [
    {
      title: "Add a variant",
      css: '.fui-button[data-variant="danger"] {\n  background: var(--fui-danger);\n  color: #fff;\n}',
      usage:
        'import { Button } from "@friendly-ui/react";\n\n<Button variant="danger">Delete</Button>',
      note: "Variant chooses the appearance. This name is application-defined; it is not an extra built-in variant.",
      preview: <Button variant="danger">Delete</Button>,
    },
    {
      title: "Add a size",
      css: '.fui-button[data-size="xl"] {\n  min-height: 3.5rem;\n  padding: 1rem 2rem;\n  font-size: 1.125rem;\n}',
      usage:
        'import { Button } from "@friendly-ui/react";\n\n<Button size="xl" variant="danger">Delete</Button>',
      note: "Size controls dimensions independently of variant. Combine the two names on the same component.",
      preview: (
        <Button size="xl" variant="danger">
          Delete
        </Button>
      ),
    },
  ],
  "close-button": [
    {
      title: "Add a variant",
      css: '.fui-close-button[data-variant="soft"] {\n  background: var(--fui-subtle);\n  color: var(--fui-foreground);\n}',
      usage:
        'import { CloseButton } from "@friendly-ui/react";\n\n<CloseButton variant="soft" label="Close settings" />',
      note: "The same variant mechanism as Button. Give every icon-only close control an accessible label.",
      preview: <CloseButton variant="soft" label="Close settings" />,
    },
    {
      title: "Add a size",
      css: '.fui-close-button[data-size="xl"] {\n  width: 3.5rem; min-width: 3.5rem;\n  height: 3.5rem; min-height: 3.5rem;\n}\n.fui-close-button[data-size="xl"] svg {\n  width: 2rem; height: 2rem;\n}',
      usage:
        'import { CloseButton } from "@friendly-ui/react";\n\n<CloseButton size="xl" variant="soft" label="Close settings" />',
      note: "CloseButton keeps a 44px target for its normal sizes. Custom sizes should keep at least that touch target. Its icon is sized separately from the button.",
      preview: <CloseButton size="xl" variant="soft" label="Close settings" />,
    },
  ],
  avatar: [
    {
      title: "Add a size",
      css: '.fui-avatar[data-size="xl"] {\n  width: 4rem;\n  height: 4rem;\n  font-size: 1.25rem;\n}',
      usage:
        'import { Avatar } from "@friendly-ui/react";\n\n<Avatar size="xl" alt="Ada Lovelace" />',
      note: "The same custom size works for both images and initials.",
      preview: <Avatar size="xl" alt="Ada Lovelace" />,
    },
  ],
  sidebar: [
    {
      title: "Add a size",
      css: '.fui-sidebar[data-size="wide"] {\n  --fui-sidebar-width: 24rem;\n}',
      usage:
        'import { Sidebar } from "@friendly-ui/react";\n\n<Sidebar size="wide" side="left">Workspace navigation</Sidebar>',
      note: "Changing the width token preserves the package’s full-width mobile rule at 425px and below.",
      preview: (
        <Sidebar size="wide" aria-label="Custom size preview">
          A wider sidebar
        </Sidebar>
      ),
    },
  ],
  "sidebar-drawer": [
    {
      title: "Add a size",
      css: '@media (min-width: 426px) {\n  .fui-sidebar-drawer[data-size="wide"] {\n    width: 24rem;\n    max-width: 100vw;\n  }\n}',
      usage:
        'import { SidebarDrawer } from "@friendly-ui/react/client";\n\n<SidebarDrawer size="wide" side="right" title="Workspace" trigger="Open wide sidebar">\n  Workspace navigation\n</SidebarDrawer>',
      note: "The media query keeps the full-screen mobile width. This is a client component, but it can be rendered from a Server Component with a built-in trigger.",
      preview: (
        <SidebarDrawer
          size="wide"
          side="right"
          title="Workspace"
          trigger="Open wide sidebar"
        >
          Workspace navigation
        </SidebarDrawer>
      ),
    },
  ],
  modal: [
    {
      title: "Add a size",
      css: '.fui-modal:not(.fui-sidebar-drawer)[data-size="wide"] {\n  width: calc(100% - 2rem);\n  max-width: 64rem;\n}',
      usage:
        'import { Modal } from "@friendly-ui/react/client";\n\n<Modal size="wide" title="Project details" trigger="Open wide modal">\n  Your content\n</Modal>',
      note: "Keep a viewport margin so the dialog fits smaller screens. The selector excludes SidebarDrawer so its custom size stays independent. Native focus handling and dismissal are unchanged.",
      preview: (
        <Modal size="wide" title="Project details" trigger="Open wide modal">
          Your content
        </Modal>
      ),
    },
  ],
  toast: [
    {
      title: "Add a variant",
      css: '.fui-toast[data-variant="brand"] {\n  --fui-toast-background: #312e81;\n  --fui-toast-foreground: #fff;\n  --fui-toast-border: #6366f1;\n}',
      usage:
        '"use client";\nimport { useState } from "react";\nimport { Button } from "@friendly-ui/react";\nimport { Toast } from "@friendly-ui/react/client";\n\nexport function BrandNotice() {\n  const [open, setOpen] = useState(false);\n  return <>\n    <Button onClick={() => setOpen(true)}>Show brand toast</Button>\n    <Toast variant="brand" open={open} onOpenChange={setOpen} title="Welcome">\n      Your brand colors, with the same toast behavior.\n    </Toast>\n  </>;\n}',
      note: "Custom names use polite status announcements by default. The built-in error variant remains an alert. For built-in palettes, override --fui-toast-success-background (or another built-in name) instead. Toast has no size prop; use className or CSS for layout.",
      preview: <BrandToastExample />,
    },
  ],
};

export function CustomizationGuide({ slug }: { slug: string }) {
  const examples = customizations[slug];
  if (!examples) return null;
  return (
    <section className="prose">
      <h2>Customize this component</h2>
      <p>
        1. Choose a name. 2. Add its CSS to your app’s theme.css, imported after
        the package styles. 3. Pass the same name to the prop. No registration,
        provider, or package edits are needed. Built-in TypeScript suggestions
        remain available.
      </p>
      <p>
        A custom name alone does not create styles: until its CSS is loaded, it
        inherits the component’s base appearance. The examples below are
        application styles, not additional package defaults.
      </p>
      {examples.map((example) => (
        <div key={example.title}>
          <h3>{example.title}</h3>
          <p>{example.note}</p>
          <pre>
            <code>{`/* app/theme.css — import after @friendly-ui/react/styles.css */\n@layer components {\n${example.css
              .split("\n")
              .map((line) => "  " + line)
              .join("\n")}\n}`}</code>
          </pre>
          <pre>
            <code>{example.usage}</code>
          </pre>
          {example.preview && (
            <div className="demo-body" aria-label={`${example.title} preview`}>
              {example.preview}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
