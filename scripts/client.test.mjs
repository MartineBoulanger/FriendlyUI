import assert from "node:assert/strict";
import { test, beforeEach, afterEach } from "node:test";
import { JSDOM } from "jsdom";
import { createElement as h, act } from "react";
import { createRoot } from "react-dom/client";
import { Modal, Tabs, Toast } from "@fwenthehunter/friendly-ui/client";

let dom, root, container;
beforeEach(() => {
  dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "https://example.test" },
  );
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.Node = dom.window.Node;
  globalThis.getComputedStyle = dom.window.getComputedStyle;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom has no dialog top layer: mock only open/close, leaving real focus trapping to the browser.
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new dom.window.Event("close"));
  };
  container = document.getElementById("root");
  root = createRoot(container);
});
afterEach(async () => {
  await act(() => root.unmount());
  dom.window.close();
});
const render = async (element) => act(() => root.render(element));
const click = async (element) =>
  act(() =>
    element.dispatchEvent(
      new dom.window.MouseEvent("click", { bubbles: true }),
    ),
  );
const key = async (element, key) =>
  act(() =>
    element.dispatchEvent(
      new dom.window.KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
const items = [
  {
    value: "one",
    label: "One",
    content: h("input", {
      "aria-label": "Remembered field",
      defaultValue: "kept",
    }),
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
    content: "Unavailable",
  },
  { value: "two", label: "Two", content: "Second panel" },
];

test("tabs link panels, skip disabled items, wrap, and keep inactive state mounted", async () => {
  await render(h(Tabs, { label: "Example", items }));
  const tabs = [...container.querySelectorAll('[role="tab"]')];
  assert.equal(tabs[0].getAttribute("aria-selected"), "true");
  assert.equal(
    document.getElementById(tabs[0].getAttribute("aria-controls")).hidden,
    false,
  );
  const input = container.querySelector("input");
  input.value = "Edited";
  await key(tabs[0], "ArrowRight");
  assert.equal(document.activeElement, tabs[2]);
  assert.equal(tabs[2].getAttribute("aria-selected"), "true");
  assert.equal(input.closest('[role="tabpanel"]').hidden, true);
  await key(tabs[2], "ArrowRight");
  assert.equal(tabs[0].getAttribute("aria-selected"), "true");
  assert.equal(input.value, "Edited");
  await key(tabs[0], "End");
  assert.equal(document.activeElement, tabs[2]);
  await key(tabs[2], "Home");
  assert.equal(document.activeElement, tabs[0]);
});
test("vertical and RTL tabs use the correct keys and controlled values stay controlled", async () => {
  let selected;
  await render(
    h(Tabs, {
      label: "Example",
      items,
      value: "one",
      onValueChange: (v) => {
        selected = v;
      },
      orientation: "vertical",
    }),
  );
  let tabs = container.querySelectorAll('[role="tab"]');
  await key(tabs[0], "ArrowDown");
  assert.equal(selected, "two");
  assert.equal(tabs[0].getAttribute("aria-selected"), "true");
  await render(
    h(Tabs, { label: "Example", items, style: { direction: "rtl" } }),
  );
  tabs = container.querySelectorAll('[role="tab"]');
  // jsdom does not inherit direction for getComputedStyle; set it on the focused control.
  tabs[0].style.direction = "rtl";
  await key(tabs[0], "ArrowLeft");
  assert.equal(tabs[2].getAttribute("aria-selected"), "true");
});
test("modal opens from trigger, names its dialog, and closes by Escape or close button", async () => {
  await render(
    h(
      Modal,
      {
        id: "profile",
        title: "Profile",
        description: "Your details",
        trigger: "Edit",
      },
      "Content",
    ),
  );
  const dialog = container.querySelector("dialog");
  const trigger = container.querySelector("button");
  assert.equal(dialog.open, false);
  assert.equal(trigger.getAttribute("aria-controls"), "profile");
  await click(trigger);
  assert.equal(dialog.open, true);
  assert.equal(
    document.getElementById(dialog.getAttribute("aria-labelledby")).textContent,
    "Profile",
  );
  assert.equal(
    document.getElementById(dialog.getAttribute("aria-describedby"))
      .textContent,
    "Your details",
  );
  await act(() =>
    dialog.dispatchEvent(new dom.window.Event("cancel", { cancelable: true })),
  );
  assert.equal(dialog.open, false);
  await click(trigger);
  await click(dialog.querySelector('[aria-label="Close dialog"]'));
  assert.equal(dialog.open, false);
});
test("modal can prevent Escape and supports controlled state and backdrop dismissal", async () => {
  let value;
  await render(
    h(
      Modal,
      {
        title: "Settings",
        open: true,
        closeOnEscape: false,
        onOpenChange: (next) => {
          value = next;
        },
      },
      "Content",
    ),
  );
  const dialog = container.querySelector("dialog");
  await act(() =>
    dialog.dispatchEvent(new dom.window.Event("cancel", { cancelable: true })),
  );
  assert.equal(dialog.open, true);
  assert.equal(value, undefined);
  await click(dialog.querySelector("button"));
  assert.equal(value, false);
  assert.equal(dialog.open, true);
  value = undefined;
  await act(() => {
    dialog.dispatchEvent(
      new dom.window.MouseEvent("pointerdown", {
        bubbles: true,
        clientX: 20,
        clientY: 20,
      }),
    );
    dialog.dispatchEvent(
      new dom.window.MouseEvent("pointerup", {
        bubbles: true,
        clientX: 20,
        clientY: 20,
      }),
    );
  });
  assert.equal(value, false);
  await render(h(Modal, { title: "Settings", open: false }));
  assert.equal(dialog.open, false);
});
test("toast announces only when opened and dismisses without taking focus", async () => {
  let value;
  const props = {
    open: false,
    onOpenChange: (next) => {
      value = next;
    },
    title: "Saved",
    duration: 0,
  };
  await render(h(Toast, props));
  assert.equal(container.querySelector('[role="status"]').textContent, "");
  await render(h(Toast, { ...props, open: true }));
  assert.match(container.querySelector('[role="status"]').textContent, /Saved/);
  assert.notEqual(document.activeElement, container.querySelector("button"));
  await click(container.querySelector("button"));
  assert.equal(value, false);
  await render(h(Toast, { ...props, open: true, variant: "error" }));
  assert.ok(container.querySelector('[role="alert"]'));
});
test("toast timeout pauses on hover and resumes with remaining time", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  let value;
  await render(
    h(Toast, {
      open: true,
      onOpenChange: (next) => {
        value = next;
      },
      title: "Saved",
      duration: 5000,
    }),
  );
  await act(() => t.mock.timers.tick(2000));
  const toast = container.querySelector(".fui-toast");
  await act(() =>
    toast.dispatchEvent(
      new dom.window.MouseEvent("pointerover", { bubbles: true }),
    ),
  );
  await act(() => t.mock.timers.tick(10000));
  assert.equal(value, undefined);
  await act(() =>
    toast.dispatchEvent(
      new dom.window.MouseEvent("pointerout", { bubbles: true }),
    ),
  );
  await act(() => t.mock.timers.tick(2999));
  assert.equal(value, undefined);
  await act(() => t.mock.timers.tick(1));
  assert.equal(value, false);
});

test("toast can pause on focus, reopen, and receive a new duration", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  let value;
  const props = {
    open: true,
    onOpenChange: (next) => {
      value = next;
    },
    title: "Saved",
    duration: 5000,
  };
  await render(h(Toast, props));
  await act(() => container.querySelector("button").focus());
  await act(() => t.mock.timers.tick(6000));
  assert.equal(value, undefined);
  await render(h(Toast, { ...props, open: false }));
  await render(h(Toast, { ...props, duration: 1000 }));
  await act(() => t.mock.timers.tick(999));
  assert.equal(value, undefined);
  await act(() => t.mock.timers.tick(1));
  assert.equal(value, false);
  value = undefined;
  await render(h(Toast, { ...props, duration: 2000 }));
  await act(() => t.mock.timers.tick(1999));
  assert.equal(value, undefined);
  await act(() => t.mock.timers.tick(1));
  assert.equal(value, false);
});

test("toast supports six positions, four semantic types, and an optional paused countdown", async () => {
  const props = {
    open: true,
    onOpenChange: () => {},
    title: "Notice",
    duration: 4000,
    showTimer: true,
  };
  for (const position of [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]) {
    await render(h(Toast, { ...props, position }));
    assert.equal(
      container.querySelector(".fui-toast-region").dataset.position,
      position,
    );
  }
  for (const variant of ["default", "error", "warning", "success", "info"]) {
    await render(h(Toast, { ...props, variant }));
    assert.equal(
      container.querySelector(".fui-toast").dataset.variant,
      variant,
    );
    assert.ok(
      container.querySelector(
        variant === "error" ? '[role="alert"]' : '[role="status"]',
      ),
    );
  }
  const timer = container.querySelector(".fui-toast-timer");
  assert.equal(timer.style.animationDuration, "4000ms");
  assert.equal(timer.getAttribute("aria-hidden"), "true");
  await act(() => container.querySelector("button").focus());
  assert.equal(timer.style.animationPlayState, "paused");
  assert.equal(
    container.querySelector(".fui-close-button svg").getAttribute("width"),
    "24",
  );
  await render(h(Toast, { ...props, duration: 0 }));
  assert.equal(container.querySelector(".fui-toast-timer"), null);
});

test("drawer opens a native dialog with side, size, and the shared close control", async () => {
  const { Drawer } = await import("@fwenthehunter/friendly-ui/client");
  await render(
    h(
      Drawer,
      {
        title: "Workspace",
        trigger: "Open sidebar",
        side: "right",
        size: "lg",
      },
      "Navigation",
    ),
  );
  await click(container.querySelector("button"));
  const dialog = container.querySelector("dialog");
  assert.equal(dialog.open, true);
  assert.equal(dialog.dataset.side, "right");
  assert.equal(dialog.dataset.size, "lg");
  assert.ok(dialog.classList.contains("fui-drawer"));
  await click(dialog.querySelector(".fui-close-button"));
  assert.equal(dialog.open, false);
});

test('custom button and toast variants reach their CSS selectors without changing semantics', async () => {
  const { Button } = await import('@fwenthehunter/friendly-ui');
  await render(h('div',{},h(Button,{variant:'danger'},'Delete'),h(Toast,{variant:'brand',open:true,duration:0,onOpenChange:()=>{},title:'Welcome'})));
  assert.equal(container.querySelector('button').dataset.variant,'danger');
  assert.equal(container.querySelector('.fui-toast').dataset.variant,'brand');
  assert.ok(container.querySelector('[role="status"]'));
});

test('modal and drawer forward custom sizes to their dialogs', async () => {
  const { Drawer } = await import('@fwenthehunter/friendly-ui/client');
  await render(h(Modal,{title:'Wide modal',size:'wide',open:true}));
  assert.equal(container.querySelector('dialog').dataset.size,'wide');
  await render(h(Drawer,{title:'Wide sidebar',size:'wide',open:true}));
  assert.equal(container.querySelector('dialog').dataset.size,'wide');
  assert.ok(container.querySelector('.fui-drawer'));
});
