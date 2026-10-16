import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const config=readFileSync('vite.sandbox.config.ts','utf8');
const renderer=readFileSync('src/email-brands.js','utf8');
test('sandbox statically imports both branded renderer functions',()=>{assert.match(config,/import \{ renderBrandedEmail, renderBrandedEmailText \} from '\.\/src\/email-brands\.js'/);assert.doesNotMatch(config,/ssrLoadModule\([^)]*email-brands/);});
test('branded source exports both functions',()=>{assert.match(renderer,/export function renderBrandedEmailText\(/);assert.match(renderer,/export function renderBrandedEmail\(/);});
