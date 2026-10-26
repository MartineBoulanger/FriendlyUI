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
  Select,
} from "@friendly-ui/react";
import {
  Modal,
  Tabs,
  Toast,
  SidebarDrawer,
  type ToastProps,
} from "@friendly-ui/react/client";

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
  const [variant, setVariant] =
    useState<"default" | "success" | "error" | "warning" | "info">("success");
  const [position, setPosition] =
    useState<NonNullable<ToastProps["position"]>>("bottom-right");
  const [duration, setDuration] = useState(5000);
  return (
    <div className="field">
      <Label htmlFor="toast-variant">Type</Label>
      <Select
        id="toast-variant"
        value={variant}
        onChange={(event) => setVariant(event.target.value as typeof variant)}
      >
        {["default", "success", "error", "warning", "info"].map((value) => (
          <option key={value}>{value}</option>
        ))}
      </Select>
      <Label htmlFor="toast-position">Position</Label>
      <Select
        id="toast-position"
        value={position}
        onChange={(event) => setPosition(event.target.value as typeof position)}
      >
        {[
          "top-left",
          "top-center",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ].map((value) => (
          <option key={value}>{value}</option>
        ))}
      </Select>
      <Label htmlFor="toast-duration">Dismiss after</Label>
      <Select
        id="toast-duration"
        value={duration}
        onChange={(event) => setDuration(Number(event.target.value))}
      >
        <option value={3000}>3 seconds</option>
        <option value={5000}>5 seconds</option>
        <option value={10000}>10 seconds</option>
        <option value={0}>Until dismissed</option>
      </Select>
      <Button onClick={() => setOpen(true)} disabled={open}>
        Show notification
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title={
          {
            default: "A quick update",
            success: "Changes saved",
            error: "Could not save changes",
            warning: "Check your settings",
            info: "A new update is available",
          }[variant]
        }
        variant={variant}
        position={position}
        duration={duration}
        showTimer
      >
        {variant === "error"
          ? "Please try again."
          : "Your notification uses the selected theme and position."}
      </Toast>
    </div>
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
        previousLabel="← Previous"
        nextLabel="Next →"
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
      <SidebarDrawer
        title="Workspace"
        trigger="Open sidebar"
        side={side}
        size={size}
      >
        <nav aria-label="Drawer navigation">
          <a href="#sidebar-overview">Overview</a>
          <p>Projects</p>
          <p>Settings</p>
        </nav>
      </SidebarDrawer>
      <div id="sidebar-overview" className="sidebar-demo-layout">
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
