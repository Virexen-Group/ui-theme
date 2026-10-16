import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const get = p => readFileSync(p,'utf8');
test('email templates are in documentation sidebar categories',()=>{assert.match(get('sandbox/catalog-categories.ts'),/id:"email"/);assert.match(get('sandbox/EmailTemplates.vue'),/DocsShell active="email"/)});
test('email toolbar includes preview and HTML actions',()=>{const s=get('sandbox/EmailTemplates.vue');for(const x of ['View HTML','Copy HTML','Open preview','Desktop','Mobile'])assert.ok(s.includes(x),x)});
test('header supports opt-in brand menu and app slots',()=>{const s=get('src/components/layout/VAppHeader.vue');for(const x of ['brandSelectable','brandSelectionAction','brandSelect','actions-start','actions-end'])assert.ok(s.includes(x),x)});
test('all branded emails retain corporate copyright and logo',()=>{const s=get('src/email-brands.js');assert.match(s,/Virexen Group\. All rights reserved/);assert.match(s,/VIREXEN_GROUP_WORDMARK/);assert.match(s,/sanitizeEmailHtml/)});
