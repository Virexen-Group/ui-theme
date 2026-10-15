import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/data/smart-options.ts', import.meta.url), 'utf8');
test('English region options and legacy English exist', () => {
  assert.match(source, /value: 'en-GB', label: 'English \(UK\)'/);
  assert.match(source, /value: 'en-US', label: 'English \(US\)'/);
  assert.match(source, /value: language.code/);
});
