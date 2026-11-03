import { cpSync, existsSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
assert.ok(existsSync('examples/next/out/index.html'), 'Build the documentation first.');
assert.ok(existsSync('storybook-static/index.html'), 'Build Storybook first.');
cpSync('storybook-static', 'examples/next/out/storybook', { recursive: true });
writeFileSync('examples/next/out/.nojekyll', '');
console.log('Added Storybook to the Pages artifact at /storybook/.');
