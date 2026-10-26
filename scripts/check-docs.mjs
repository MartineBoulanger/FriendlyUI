import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('examples/next/out');
const base = process.env.DOCS_BASE_PATH || '';
function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const file = join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const pages = walk(root).filter(file => file.endsWith('.html'));
for (const slug of ['installation', 'theming', 'server-and-client', 'button', 'card', 'input', 'textarea', 'label', 'badge', 'chip', 'close-button', 'sidebar-drawer', 'accordion', 'checkbox', 'radio', 'select', 'heading', 'switch', 'separator', 'sidebar', 'search', 'modal', 'tabs', 'avatar', 'pagination', 'table', 'toast']) {
  assert.ok(existsSync(join(root, 'docs', slug, 'index.html')), `Missing documentation page: ${slug}`);
}
let checked = 0;
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    assert.ok(!base || url === base || url.startsWith(`${base}/`), `${file}: missing base path: ${url}`);
    const local = decodeURIComponent(url.slice(base.length)).split('?')[0];
    let target = join(root, local);
    if (local.endsWith('/')) target = join(target, 'index.html');
    assert.ok(existsSync(target), `${file}: missing target ${url}`);
    checked++;
  }
}
assert.match(readFileSync(join(root, 'docs/accordion/index.html'), 'utf8'), /<details/);
assert.match(readFileSync(join(root, 'docs/server-and-client/index.html'), 'utf8'), /Clicked/);
console.log(`Checked ${pages.length} static pages and ${checked} local links/assets (base path: ${base || '/'}).`);

for (const slug of ['button', 'close-button', 'avatar', 'sidebar', 'sidebar-drawer', 'modal', 'toast']) {
  const html = readFileSync(join(root, 'docs', slug, 'index.html'), 'utf8');
  assert.match(html, /Customize this component/, `Missing customisation guide for ${slug}`);
  assert.match(html, /app\/theme.css/, `Missing theme-file instructions for ${slug}`);
}
const installPage = readFileSync(join(root, 'docs/installation/index.html'), 'utf8');
for (const manager of ['npm install', 'pnpm add', 'yarn add', 'bun add']) assert.ok(installPage.includes(manager), `Missing ${manager} instructions`);

const sidebarPage = readFileSync(join(root, 'docs/sidebar/index.html'), 'utf8');
const drawerPage = readFileSync(join(root, 'docs/sidebar-drawer/index.html'), 'utf8');
assert.match(sidebarPage, /class="fui-sidebar(?: |")/, 'Sidebar needs an in-page preview');
assert.doesNotMatch(sidebarPage, /<dialog/, 'Sidebar preview must not open a drawer');
assert.match(drawerPage, /Open navigation drawer/, 'Drawer needs its own trigger example');
assert.match(drawerPage, /<dialog/, 'Drawer needs its own dialog preview');
