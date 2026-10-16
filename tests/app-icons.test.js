import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = path => readFileSync(new URL('../'+path, import.meta.url),'utf8');
test('official app families and fallback URLs declared', () => {
  const source=read('src/data/app-icons.ts');
  for (const name of ['CampPulze','CampPulze-Health','PulzeConnect']) assert.ok(source.includes(name));
  assert.ok(source.includes('https://edge-fallback.virexengroup.com'));
  for (const ext of ['png','webp','svg','ico']) assert.ok(source.includes(ext));
});
test('launcher is exclusively Virexen family', () => {
  const source=read('src/data/virexen-app-launcher.ts');
  assert.match(source,/VIREXEN_PRODUCT_BRANDS/);
  assert.doesNotMatch(source,/CampPulze|PulzeConnect/);
});
test('header exports an app selection event', () => {
  const source=read('src/components/layout/VAppHeader.vue');
  assert.ok(source.includes('appSelect'));
  assert.ok(source.includes('showAppSwitcher'));
});
