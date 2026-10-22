"use client";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Pagination,
  Search,
  Sidebar,
  Heading,
} from "@friendly-ui/react";
import { Modal, Tabs, Toast } from "@friendly-ui/react/client";

export function ModalExample() {
  return (
    <Modal
      title="Edit your profile"
      description="Update the name people see."
      trigger="Edit profile"
      size="sm"
    >
      <form method="dialog" className="field">
        <Label htmlFor="modal-name">Full name</Label>
        <Input
          id="modal-name"
          name="name"
          defaultValue="Ada Lovelace"
          autoFocus
        />
        <Button type="submit">Done</Button>
      </form>
    </Modal>
  );
}
export function TabsExample() {
  return (
    <Tabs
      label="Project settings"
      defaultValue="overview"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: <p>Your project at a glance.</p>,
        },
        {
          value: "settings",
          label: "Settings",
          content: (
            <div className="field">
              <Label htmlFor="tabs-name">Project name</Label>
              <Input id="tabs-name" defaultValue="My next idea" />
            </div>
          ),
        },
        {
          value: "billing",
          label: "Billing",
          content: "Billing is not available yet.",
          disabled: true,
        },
      ]}
    />
  );
}
export function ToastExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={open}>
        Show notification
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Changes saved"
        variant="success"
      >
        Your preferences are up to date.
      </Toast>
    </>
  );
}
export function SearchExample() {
  const [query, setQuery] = useState("");
  const items = ["Button", "Checkbox", "Heading", "Modal", "Sidebar", "Table"];
  const matches = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="field">
      <Label htmlFor="component-search">Find a component</Label>
      <Search
        id="component-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try heading…"
      />
      <p aria-live="polite">
        {matches.length ? matches.join(" · ") : "No components found."}
      </p>
    </div>
  );
}
export function PaginationExample() {
  const [page, setPage] = useState(1);
  return (
    <div className="field">
      <p>Page {page} of 10</p>
      <Pagination
        page={page}
        totalPages={10}
        href={(n) => `?page=${n}`}
        onClick={(event) => {
          const link = (event.target as Element).closest("a");
          if (
            link &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.shiftKey &&
            !event.altKey &&
            event.button === 0
          ) {
            event.preventDefault();
            setPage(Number(new URL(link.href).searchParams.get("page")));
          }
        }}
      />
    </div>
  );
}
export function SidebarExample() {
  const [side, setSide] = useState<"left" | "right">("left");
  const [size, setSize] = useState<"sm" | "md" | "lg">("sm");
  return (
    <div className="sidebar-demo-wrap">
      <div className="preview-row">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setSide(side === "left" ? "right" : "left")}
        >
          Side: {side}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            setSize(size === "sm" ? "md" : size === "md" ? "lg" : "sm")
          }
        >
          Size: {size}
        </Button>
      </div>
      <div className="sidebar-demo-layout">
        <Sidebar side={side} size={size} aria-label="Example sidebar">
          <Heading as="h3">Workspace</Heading>
          <p>Overview</p>
          <p>Projects</p>
          <p>Settings</p>
        </Sidebar>
        <div className="sidebar-demo-content">Your content</div>
      </div>
    </div>
  );
}
