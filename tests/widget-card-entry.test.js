import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('VWidgetCard has its own entry point and a named export', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.deepEqual(pkg.exports['./vue/widget-card'], { types: './dist/vue/entries/widget-card.d.ts', import: './dist/vue/entries/widget-card.js' });
  assert.ok(existsSync('src/entries/widget-card.ts'));
  assert.match(readFileSync('src/index.ts', 'utf8'), /VWidgetCard/);
});
