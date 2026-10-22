import {
  Avatar,
  Checkbox,
  Heading,
  Label,
  Radio,
  Select,
  Separator,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@friendly-ui/react";
import {
  ModalExample,
  PaginationExample,
  SearchExample,
  SidebarExample,
  TabsExample,
  ToastExample,
} from "../app/component-examples";
import type { Doc } from "./docs";

export const componentDocs: Doc[] = [
  {
    slug: "checkbox",
    title: "Checkbox",
    group: "Components",
    description: "Native checkboxes for independent choices.",
    code: `import { Checkbox, Label } from '@friendly-ui/react';\n\n<Label className="flex items-center gap-2">\n  <Checkbox name="updates" defaultChecked />\n  Send me product updates\n</Label>`,
    preview: (
      <div className="choice-stack">
        <Label className="choice">
          <Checkbox name="updates" defaultChecked />
          Send me product updates
        </Label>
        <Label className="choice">
          <Checkbox disabled />
          Unavailable option
        </Label>
      </div>
    ),
    content: (
      <>
        <p>
          Uses a native checkbox. Click the label or press Space while focused
          to toggle. Checked named controls participate in FormData. Unchecked
          and disabled controls are omitted by the browser.
        </p>
        <p>
          Use defaultChecked for an uncontrolled field; checked and onChange
          require a client wrapper. For a group, use a fieldset with a legend.
          Indeterminate state is a DOM property and can be set through a ref in
          a client wrapper.
        </p>
      </>
    ),
    props: [
      ["defaultChecked", "boolean", "false"],
      ["checked", "boolean (controlled)", "—"],
      ["name / value", "native form props", "—"],
    ],
  },
  {
    slug: "radio",
    title: "Radio",
    group: "Components",
    description: "One choice from a group, using native radio buttons.",
    code: `import { Radio, Label } from '@friendly-ui/react';\n\n<fieldset>\n  <legend>Plan</legend>\n  <Label><Radio name="plan" value="free" defaultChecked /> Free</Label>\n  <Label><Radio name="plan" value="pro" /> Pro</Label>\n</fieldset>`,
    preview: (
      <fieldset className="choice-stack">
        <legend>Plan</legend>
        <Label className="choice">
          <Radio name="preview-plan" value="free" defaultChecked />
          Free
        </Label>
        <Label className="choice">
          <Radio name="preview-plan" value="pro" />
          Pro
        </Label>
      </fieldset>
    ),
    content: (
      <p>
        Give related radios the same name and distinct values. The browser
        handles exclusive selection, arrow keys, focus, validation, and form
        submission. Group with fieldset and legend; give each choice a label. No
        client wrapper is needed for uncontrolled inputs.
      </p>
    ),
    props: [
      ["name", "string shared by the group", "—"],
      ["value", "string identifying this choice", "—"],
      ["defaultChecked", "boolean", "false"],
    ],
  },
  {
    slug: "select",
    title: "Select / Dropdown",
    group: "Components",
    description: "A simple dropdown for choosing a form value.",
    code: `import { Select, Label } from '@friendly-ui/react';\n\n<Label htmlFor="language">Language</Label>\n<Select id="language" name="language" defaultValue="en">\n  <option value="en">English</option>\n  <option value="nl">Dutch</option>\n  <option value="fr">French</option>\n</Select>`,
    preview: (
      <div className="field">
        <Label htmlFor="preview-language">Language</Label>
        <Select id="preview-language" defaultValue="en">
          <option value="en">English</option>
          <option value="nl">Dutch</option>
          <option value="fr">French</option>
        </Select>
      </div>
    ),
    content: (
      <>
        <p>
          Select and Dropdown are aliases for the same native select element.
          Add option or optgroup children. Native keyboard navigation, mobile
          pickers, disabled options, required validation, and form submission
          work without client JavaScript.
        </p>
        <p>
          This is a value picker, not an action menu. Use defaultValue for an
          uncontrolled choice. Controlled value and onChange require a client
          wrapper.
        </p>
      </>
    ),
    props: [
      ["defaultValue", "string or string[]", "—"],
      ["multiple", "boolean", "false"],
      ["required / disabled", "boolean", "false"],
    ],
  },
  {
    slug: "heading",
    title: "Heading",
    group: "Components",
    description: "The heading API you already use, with portable theme styles.",
    code: `import { Heading } from '@friendly-ui/react';\n\n<Heading>Page title</Heading>\n<Heading as="h2">Section title</Heading>\n<Heading as="h3" className="text-primary">A smaller heading</Heading>`,
    preview: (
      <div className="choice-stack">
        <Heading>Page title</Heading>
        <Heading as="h2">Section title</Heading>
        <Heading as="h3">A smaller heading</Heading>
      </div>
    ),
    content: (
      <>
        <p>
          The as prop chooses h1 through h6 and defaults to h1. Each level has
          its own base size. It follows your existing reusable heading pattern,
          using package styles instead of project-specific sp-* classes.
        </p>
        <p>
          Choose the level for the document hierarchy; use className or style to
          customize appearance. Theme the sizes with --fui-heading-1 through
          --fui-heading-6. Font, foreground, and other theme tokens are
          inherited.
        </p>
      </>
    ),
    props: [["as", "h1 | h2 | h3 | h4 | h5 | h6", "h1"]],
  },
  {
    slug: "switch",
    title: "Switch",
    group: "Components",
    description: "An on/off control that works without hydration.",
    code: `import { Switch, Label } from '@friendly-ui/react';\n\n<Label className="flex items-center gap-2">\n  <Switch name="notifications" defaultChecked />\n  Notifications\n</Label>`,
    preview: (
      <div className="choice-stack">
        <Label className="choice">
          <Switch name="notifications" defaultChecked />
          Notifications
        </Label>
        <Label className="choice">
          <Switch disabled />
          Disabled setting
        </Label>
      </div>
    ),
    content: (
      <>
        <p>
          A native checkbox with role="switch" and themed track/thumb styling.
          The browser exposes checked state and handles Space, labels, focus,
          disabled state, and form values. The label should stay the same in
          both states.
        </p>
        <p>
          The control toggles locally without JavaScript; persisting a setting
          requires form submission or your own client callback. Use checked and
          onChange in a client wrapper when controlled.
        </p>
      </>
    ),
    props: [
      ["defaultChecked", "boolean", "false"],
      ["checked", "boolean (controlled)", "—"],
    ],
  },
  {
    slug: "separator",
    title: "Separator / Divider",
    group: "Components",
    description: "A quiet boundary, horizontal or vertical.",
    code: `import { Separator } from '@friendly-ui/react';\n\n<Separator />\n<div className="flex items-center gap-4">\n  <span>Profile</span>\n  <Separator orientation="vertical" />\n  <span>Settings</span>\n</div>\n<Separator decorative={false} />`,
    preview: (
      <div className="choice-stack">
        <span>Account</span>
        <Separator />
        <div className="preview-row">
          <span>Profile</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      </div>
    ),
    content: (
      <p>
        Separator and Divider are aliases. Decorative by default, so screen
        readers ignore the line. Set decorative=false for a semantic separator.
        A vertical separator stretches in a flex parent; give it an explicit
        height when using it elsewhere.
      </p>
    ),
    props: [
      ["orientation", "horizontal | vertical", "horizontal"],
      ["decorative", "boolean", "true"],
    ],
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    group: "Components",
    description: "An in-flow sidebar with a side, a size, and a mobile layout.",
    code: `import { Sidebar } from '@friendly-ui/react';\n\n<div className="flex flex-wrap">\n  <Sidebar side="left" size="md" aria-label="Workspace">\n    <nav aria-label="Workspace navigation">...</nav>\n  </Sidebar>\n  <section className="min-w-0 flex-1">Your content</section>\n</div>`,
    preview: <SidebarExample />,
    content: (
      <>
        <p>
          Use a flex container. The side prop sets flex order and the
          corresponding border; size selects 12rem, 16rem, or 20rem. At viewport
          widths of 425px and below, it takes 100% of its parent width. Use a
          wrapping parent, and a full-width parent when it should span the
          screen.
        </p>
        <p>
          This Sidebar is a layout region. Use SidebarDrawer from
          @friendly-ui/react/client for an overlay with a title, trigger, side,
          size, and a large close button. It uses native dialog focus handling
          and takes the full viewport width at 425px and below. Use
          --fui-sidebar-width to set a custom desktop width. Supply an
          accessible name when the page has multiple complementary regions.
        </p>
      </>
    ),
    props: [
      ["side", "left | right", "left"],
      ["size", "sm | md | lg", "md"],
    ],
  },
  {
    slug: "search",
    title: "Search",
    group: "Components",
    description: "A native search input. You choose what it searches.",
    code: `import { Search, Label, Button } from '@friendly-ui/react';\n\n<form action="/search" role="search">\n  <Label htmlFor="query">Search articles</Label>\n  <Search id="query" name="q" placeholder="Search…" />\n  <Button type="submit">Search</Button>\n</form>`,
    preview: <SearchExample />,
    content: (
      <>
        <p>
          Renders input type="search" with the same styles as Input. In Chromium
          and Safari, the native clear control uses a themed cross instead of
          the blue browser icon. Override --fui-search-clear to change its
          color; browsers without this native control keep their own behavior.
          Pair it with a label, or provide aria-label. A named search input
          submits normally in a form.
        </p>
        <p>
          The preview uses a small client wrapper to filter local items with
          value and onChange. The primitive itself does not fetch data, debounce
          requests, or provide autocomplete.
        </p>
      </>
    ),
  },
  {
    slug: "modal",
    title: "Modal",
    group: "Components",
    description: "A native modal dialog with a small client boundary.",
    code: `import { Modal } from '@friendly-ui/react/client';\n\n<Modal title="Edit profile" trigger="Open profile" size="sm"\n  description="Update your public details.">\n  <p>Your content goes here.</p>\n</Modal>`,
    preview: <ModalExample />,
    content: (
      <>
        <p>
          Import from the explicit client entry point. The built-in trigger
          label opens an uncontrolled dialog; pass text or non-interactive
          content as trigger. A Server Component may render it with serializable
          props and server-rendered children.
        </p>
        <p>
          The native dialog handles background inertness, focus containment,
          Escape, and focus return. A visible close button is always available.
          Overlay dismissal requires both pointer down and pointer up on the
          backdrop. Native form method="dialog" also closes it.
        </p>
        <p>
          For your own trigger, control open and onOpenChange in a client
          wrapper. Use autoFocus on a suitable child to choose initial focus.
          You can override aria-describedby or aria-labelledby to refer to your
          own content.
        </p>
      </>
    ),
    props: [
      ["title", "ReactNode (required)", "—"],
      ["trigger", "ReactNode, non-interactive label", "—"],
      ["description", "ReactNode", "—"],
      ["open / defaultOpen", "boolean", "false"],
      ["onOpenChange", "(open: boolean) => void", "—"],
      ["size", "sm | md | lg | full", "md"],
      ["closeOnEscape / closeOnOverlay", "boolean", "true"],
      ["closeLabel", "string", "Close dialog"],
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Components",
    description: "Related panels with keyboard-friendly navigation.",
    code: `import { Tabs } from '@friendly-ui/react/client';\n\n<Tabs label="Project" defaultValue="overview" items={[\n  { value: 'overview', label: 'Overview', content: <p>Your project.</p> },\n  { value: 'settings', label: 'Settings', content: <p>Preferences.</p> },\n]} />`,
    preview: <TabsExample />,
    content: (
      <>
        <p>
          Use unique item values and an accessible label for the tab list. Arrow
          keys move focus and select the next enabled tab; Home and End jump to
          the edges. Disabled items are skipped. Horizontal navigation respects
          text direction; vertical tabs use Up and Down.
        </p>
        <p>
          Inactive panels stay mounted and hidden, preserving form state. Items
          can contain server-rendered content when passed from a Server
          Component. Use value and onValueChange in a client wrapper for
          controlled tabs.
        </p>
      </>
    ),
    props: [
      ["items", "{ value, label, content, disabled? }[]", "required"],
      ["label", "string (accessible tab-list name)", "required"],
      ["defaultValue / value", "string", "first enabled item"],
      ["onValueChange", "(value: string) => void", "—"],
      ["orientation", "horizontal | vertical", "horizontal"],
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    group: "Components",
    description: "An image or a small set of initials.",
    code: `import { Avatar } from '@friendly-ui/react';\n\n<Avatar alt="Ada Lovelace" />\n<Avatar alt="Grace Hopper" fallback="GH" size="lg" />\n<Avatar src="/avatar.jpg" alt="Your name" />`,
    preview: (
      <div className="preview-row">
        <Avatar alt="Ada Lovelace" size="sm" />
        <Avatar alt="Grace Hopper" />
        <Avatar alt="Linus Torvalds" size="lg" />
      </div>
    ),
    content: (
      <>
        <p>
          Without src, derives initials from the first two words of alt, or uses
          your fallback content. The accessible name stays the full alt text.
          With src, renders an img; imageProps passes through attributes such as
          loading and decoding.
        </p>
        <p>
          Supply alt="" for a decorative avatar next to an already visible name.
          A failed image uses the browser’s native alt behavior; automatic
          image-error fallback is not part of this server-compatible primitive.
        </p>
      </>
    ),
    props: [
      ["alt", "string (required)", "—"],
      ["src", "string", "—"],
      ["fallback", "ReactNode", "initials from alt"],
      ["size", "sm | md | lg", "md"],
      ["imageProps", "native img props except src/alt", "—"],
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    group: "Components",
    description: "Real links that work on the server and in the browser.",
    code: `import { Pagination } from '@friendly-ui/react';\n\n<Pagination page={3} totalPages={20}\n  href={page => '/articles?page=' + page} />`,
    preview: <PaginationExample />,
    content: (
      <>
        <p>
          Pass the current page, total pages, and a URL builder. Previous and
          Next become disabled text at the edges. The current link uses
          aria-current="page"; distant ranges collapse into ellipses.
        </p>
        <p>
          Page numbers must be integers with totalPages at least 1 and page
          within range. Do not render pagination for an empty result set. The
          href callback runs on the server when used in a Server Component, so
          it does not cross a client boundary. Include your app’s base path in
          generated URLs if applicable.
        </p>
        <p>
          The preview intercepts ordinary clicks in a client wrapper to
          demonstrate local state. The package produces plain anchors and does
          not depend on a router.
        </p>
      </>
    ),
    props: [
      ["page / totalPages", "positive integers", "required"],
      ["href", "(page: number) => string", "required"],
      ["siblingCount", "number, bounded to 0–5", "1"],
    ],
  },
  {
    slug: "table",
    title: "Table",
    group: "Components",
    description: "A semantic table, without a data-grid framework.",
    code: `import { Table, TableCaption, TableHeader, TableBody,\n  TableRow, TableHead, TableCell, TableContainer } from '@friendly-ui/react';\n\n<TableContainer>\n  <Table>\n    <TableCaption>Team members</TableCaption>\n    <TableHeader><TableRow>\n      <TableHead>Name</TableHead><TableHead>Role</TableHead>\n    </TableRow></TableHeader>\n    <TableBody><TableRow>\n      <TableCell>Ada Lovelace</TableCell><TableCell>Developer</TableCell>\n    </TableRow></TableBody>\n  </Table>\n</TableContainer>`,
    preview: (
      <TableContainer>
        <Table>
          <TableCaption>Team members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada Lovelace</TableCell>
              <TableCell>Developer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grace Hopper</TableCell>
              <TableCell>Engineer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ),
    content: (
      <>
        <p>
          Compose native table elements with TableHeader, TableBody,
          TableFooter, TableRow, TableHead, TableCell, and TableCaption.
          TableHead defaults to scope="col"; set scope="row" for row headers.
        </p>
        <p>
          TableContainer adds horizontal overflow on smaller screens. Give the
          table a caption or accessible name. Sorting, selection, filtering, and
          pagination stay in your application, so a plain table requires no
          client JavaScript.
        </p>
      </>
    ),
  },
  {
    slug: "toast",
    title: "Toast",
    group: "Components",
    description: "A dismissible notification with no global provider.",
    code: `'use client';\nimport { useState } from 'react';\nimport { Button } from '@friendly-ui/react';\nimport { Toast } from '@friendly-ui/react/client';\n\nexport function SaveNotice() {\n  const [open, setOpen] = useState(false);\n  return <>\n    <Button onClick={() => setOpen(true)}>Save</Button>\n    <Toast open={open} onOpenChange={setOpen} title="Changes saved"\n      variant="success" position="top-center" duration={8000} showTimer>\n      Your preferences are up to date.\n    </Toast>\n  </>;\n}`,
    preview: <ToastExample />,
    content: (
      <>
        <p>
          Keep Toast mounted in a client wrapper and control it with open and
          onOpenChange. Its live region announces newly inserted content. Error
          notifications use role="alert"; other variants use role="status". It
          never steals focus.
        </p>
        <p>
          Dismisses after five seconds by default. The countdown pauses while
          hovered or focused and resumes with the remaining time. Set duration=0
          to keep it until dismissed. Set showTimer to show a countdown bar,
          which pauses with the timer. A large close button is always available.
          Reduced-motion preferences hide the animated bar.
        </p>
        <p>
          Error, warning, success, and info have default light and dark color
          palettes. Override --fui-toast-error-background,
          --fui-toast-error-foreground, and --fui-toast-error-border in your
          theme file, replacing error with any other variant. For a single
          notification, set these same variables through style or a className.
        </p>
        <p>
          This is a single notification primitive, without a global queue. Mount
          near your app root, outside transformed or clipped containers; render
          one toast per position to avoid overlap. For critical errors, also
          show a persistent inline message.
        </p>
      </>
    ),
    props: [
      ["open / onOpenChange", "boolean / (open: boolean) => void", "required"],
      ["title", "ReactNode", "required"],
      ["duration", "milliseconds, 0 disables timeout", "5000"],
      ["showTimer", "boolean, show animated countdown", "false"],
      ["variant", "default | success | error | warning | info", "default"],
      [
        "position",
        "bottom-right | bottom-center | bottom-left | top-right | top-center | top-left",
        "bottom-right",
      ],
      ["closeLabel", "string", "Dismiss notification"],
    ],
  },
];
