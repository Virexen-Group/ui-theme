import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('multiselect defaults missing options and selected values', () => {
 const code=readFileSync(new URL('../src/components/forms/VMultiSelect.vue',import.meta.url),'utf8');
 assert.match(code,/options:\(\)=>\[\]/);
 assert.match(code,/modelValue:\(\)=>\[\]/);
});
test('documentation previews avoid unconfigured components', () => {
 const code=readFileSync(new URL('../sandbox/DocsExample.vue',import.meta.url),'utf8');
 assert.match(code,/safePreviewNames/);
 assert.match(code,/!safePreviewNames.has\(actual.value\)/);
 assert.match(code,/n==='VMultiSelect'/);
});
