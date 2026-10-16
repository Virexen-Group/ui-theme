import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = path => readFileSync(path, 'utf8');
test('full-page navigation demos have dedicated entry points', () => {
  for (const name of ['header','sidebar']) {
    assert.ok(read(`sandbox/${name}.html`).includes(`${name}-main.ts`));
  }
});
test('header and sidebar have full-page previews in Components', () => {
  const docs = read('sandbox/DocsExample.vue');
  assert.ok(docs.includes('fullPageUrl'));
  assert.ok(docs.includes('v-if="fullPageUrl"'));
  const list = read('sandbox/docs-components.ts');
  for (const name of ['VSidebar','VAppHeader']) {
    const match = new RegExp(`"name": "${name}",[\\s\\S]{0,100}"category": "components"`);
    assert.match(list, match);
  }
});
