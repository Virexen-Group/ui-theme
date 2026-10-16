import {test} from 'node:test';import {strict as assert} from 'node:assert';import {readFileSync,existsSync} from 'node:fs';
const read=(x)=>readFileSync(x,'utf8');
test('secure and segmented inputs export once',()=>{const index=read('src/index.ts');for(const name of ['VSecureInput','VCodeInput']){assert.equal((index.match(new RegExp(`as ${name}\\b`,'g'))||[]).length,1);assert.ok(existsSync(`src/components/forms/${name}.vue`))}});
test('all email brands registered',()=>{const src=read('src/email-brands.js');for(const name of ['Virexen-Identity','Virexen-Pay','CampPulze','CampPulze-Health','PulzeConnect'])assert.ok(src.includes(name))});
test('email gallery linked and route exists',()=>{assert.ok(existsSync('sandbox/email-templates.html'));assert.ok(read('sandbox/DocsCategory.vue').includes('/email-templates.html'))});
test('pricing previews include three realistic plans',()=>{const src=read('sandbox/preview-fixtures.ts');for(const word of ['Starter','Growth','Enterprise'])assert.ok(src.includes(word))});
