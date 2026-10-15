import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('workflow can initialise with optional sections and model value',()=>{const s=fs.readFileSync('src/components/forms/VFormWorkflow.vue','utf8');assert.match(s,/props\.sections \?\? \[\]/);assert.match(s,/if \(!section\) return/)});
test('catalogue category compares id strings',()=>{const s=fs.readFileSync('sandbox/CategoryGallery.vue','utf8');assert.match(s,/const category=computed\(\(\)=>props\.category\)/)});
test('one root readme',()=>{assert.deepEqual(fs.readdirSync('.').filter(x=>x.startsWith('README')&&x.endsWith('.md')),['README.md'])});
test('home html uses dedicated docs entry',()=>{assert.match(fs.readFileSync('sandbox/index.html','utf8'),/docs-entry\.ts/)});
