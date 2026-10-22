import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup as render } from "react-dom/server";
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import {
  Checkbox,
  Radio,
  Switch,
  Select,
  Dropdown,
  Heading,
  Separator,
  Sidebar,
  Search,
  Avatar,
  Pagination,
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@friendly-ui/react";

test("native choices and selects submit actual form values without hydration", () => {
  const html = render(
    h(
      "form",
      {},
      h(Checkbox, { name: "updates", value: "yes", defaultChecked: true }),
      h(Checkbox, { name: "omitted", value: "no" }),
      h(Switch, { name: "notifications", defaultChecked: true }),
      h(Radio, { name: "plan", value: "free" }),
      h(Radio, { name: "plan", value: "pro", defaultChecked: true }),
      h(
        Select,
        { name: "language", defaultValue: "nl" },
        h("option", { value: "en" }, "English"),
        h("option", { value: "nl" }, "Dutch"),
      ),
    ),
  );
  const { window } = new JSDOM(html);
  assert.deepEqual(
    [...new window.FormData(window.document.querySelector("form")).entries()],
    [
      ["updates", "yes"],
      ["notifications", "on"],
      ["plan", "pro"],
      ["language", "nl"],
    ],
  );
  assert.equal(
    window.document.querySelector('[role="switch"]').type,
    "checkbox",
  );
  assert.equal(Dropdown, Select);
  window.close();
});
test("heading chooses semantic elements and preserves custom props", () => {
  for (const as of ["h1", "h2", "h3", "h4", "h5", "h6"])
    assert.match(
      render(
        h(Heading, { as, id: "title", className: "text-primary" }, "Title"),
      ),
      new RegExp(
        `<${as} id="title" class="fui-heading text-primary">Title</${as}>`,
      ),
    );
  assert.match(render(h(Heading, {}, "Title")), /^<h1/);
});
test("separator semantics and sidebar settings are explicit", () => {
  assert.match(render(h(Separator)), /role="none"/);
  assert.match(
    render(h(Separator, { decorative: false, orientation: "vertical" })),
    /role="separator" aria-orientation="vertical"/,
  );
  assert.match(
    render(
      h(Sidebar, { side: "right", size: "lg", "aria-label": "Workspace" }),
    ),
    /data-side="right" data-size="lg"/,
  );
  assert.match(
    render(h(Search, { "aria-label": "Search", name: "q" })),
    /type="search"/,
  );
});
test("avatar keeps initials decorative under a full accessible name", () => {
  assert.match(
    render(h(Avatar, { alt: "Ada Lovelace" })),
    /role="img" aria-label="Ada Lovelace"/,
  );
  assert.match(
    render(h(Avatar, { alt: "Ada Lovelace" })),
    /aria-hidden="true">AL/,
  );
  assert.doesNotMatch(render(h(Avatar, { alt: "" })), /role="img"/);
  assert.match(
    render(h(Avatar, { src: "/avatar.jpg", alt: "Ada" })),
    /<img[^>]*alt="Ada"/,
  );
});
test("pagination handles bounds, current page, gaps and enormous result sets", () => {
  const props = { page: 1, totalPages: 1000000000, href: (n) => `?page=${n}` };
  const { window } = new JSDOM(render(h(Pagination, props)));
  assert.equal(
    window.document.querySelector("[aria-disabled]").textContent,
    "Previous",
  );
  assert.equal(
    window.document.querySelector("[aria-current]").textContent,
    "1",
  );
  assert.ok(window.document.querySelectorAll("a").length < 10);
  assert.match(
    render(h(Pagination, { ...props, page: 1000000000 })),
    /aria-disabled="true">Next/,
  );
  assert.throws(() => render(h(Pagination, { ...props, page: 0 })), RangeError);
  assert.throws(
    () => render(h(Pagination, { ...props, totalPages: 0 })),
    RangeError,
  );
  window.close();
});
test("table composition produces native headers and a caption", () => {
  const html = render(
    h(
      Table,
      {},
      h(TableCaption, {}, "Team"),
      h(TableHeader, {}, h(TableRow, {}, h(TableHead, {}, "Name"))),
      h(TableBody, {}, h(TableRow, {}, h(TableCell, {}, "Ada"))),
    ),
  );
  assert.match(html, /<caption>Team<\/caption>/);
  assert.match(html, /<th scope="col">Name<\/th>/);
  assert.match(html, /<tbody><tr><td>Ada/);
});
test("client components retain their boundary without contaminating the default entry", () => {
  const client = readFileSync(
    new URL("../packages/ui/dist/client.js", import.meta.url),
    "utf8",
  );
  assert.match(client, /^['"]use client['"]/);
  for (const file of ["index.js", "primitives.js"])
    assert.doesNotMatch(
      readFileSync(
        new URL(`../packages/ui/dist/${file}`, import.meta.url),
        "utf8",
      ),
      /['"]use client['"]|from ['"]\.\/client/,
    );
});
