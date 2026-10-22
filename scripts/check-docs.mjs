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
assert.ok(pages.length >= 11, 'Expected home page and ten documentation pages');
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
