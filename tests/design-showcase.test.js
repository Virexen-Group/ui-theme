import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(name)=>readFileSync(new URL('../sandbox/'+name,import.meta.url),'utf8');
test('showcase uses existing button notification toast components',()=>{
 const s=read('DesignShowcases.vue');
 for(const component of ['VButton.vue','VNotification.vue','VToastProvider.vue','useVToast']) assert.ok(s.includes(component),component);
 for(const preset of ['default','calm','bold','enterprise']) assert.ok(s.includes(preset));
 for(const pack of ['core','soft','outline','elevated']) assert.ok(s.includes(pack));
 assert.ok(s.includes('Copy code'));
});
test('all documentation categories offer the appropriate interactive showcase',()=>{
 const s=read('DocsCategory.vue');
 for(const section of ['themes','buttons','toasts']) assert.ok(s.includes(`section="${section}"`));
 assert.ok(read('category-main.ts').includes('packs-notifications.css'));
});
