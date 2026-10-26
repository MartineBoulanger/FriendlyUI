import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { Button, Input, Label, Accordion, Card } from "@fwenthehunter/friendly-ui";

test("button defaults to a non-submitting native control and preserves form attributes", () => {
  const html = renderToStaticMarkup(createElement(Button, { form: "settings", disabled: true }, "Save"));
  assert.match(html, /type="button"/);
  assert.match(html, /form="settings"/);
  assert.match(html, /disabled=""/);
  assert.match(renderToStaticMarkup(createElement(Button, {type:"submit"})), /type="submit"/);
});
test("fields keep native label association and accessibility props", () => {
  assert.match(renderToStaticMarkup(createElement(Label, {htmlFor:"email"}, "Email")), /for="email"/);
  const html = renderToStaticMarkup(createElement(Input, {id:"email", required:true, "aria-invalid":true}));
  assert.match(html, /id="email"/);
  assert.match(html, /required=""/);
  assert.match(html, /aria-invalid="true"/);
});
test("disclosure renders native interactive HTML on the server", () => {
  const html = renderToStaticMarkup(createElement(Accordion, {title:"More", open:true}, "Details"));
  assert.match(html, /<details[^>]*open=""/);
  assert.match(html, /<summary>More<\/summary>/);
  assert.match(html, /Details/);
});
test("custom classes and children survive composition", () => {
  assert.match(renderToStaticMarkup(createElement(Card, {className:"p-8"}, "Content")), /class="fui-card p-8">Content/);
});
test("built default entry remains free of a client directive", () => {
  const source = readFileSync(new URL("../packages/ui/dist/index.js", import.meta.url), "utf8");
  assert.doesNotMatch(source, /["']use client["']/);
});
