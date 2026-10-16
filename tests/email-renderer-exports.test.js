import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('branded renderer exports both functions', () => {
  const source=readFileSync(new URL('../src/email-brands.js', import.meta.url),'utf8');
  assert.match(source,/export function renderBrandedEmail\(/);
  assert.match(source,/export function renderBrandedEmailText\(/);
});
