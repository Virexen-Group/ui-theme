import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const r=(p)=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('home entry mounts DocsHome, not legacy HomeCatalog',()=>{
 assert.match(r('sandbox/index.html'), /docs-entry\.ts/);
 assert.match(r('sandbox/home-main.ts'), /createApp\(DocsHome\)/);
 assert.doesNotMatch(r('sandbox/home-main.ts'), /HomeCatalog/);
});
test('all eight categories mount the same DocsCategory shell',()=>{
 for(const id of ['forms','navigation','data','layout','feedback','commerce','foundations','media']){
  const html=r('sandbox/'+id+'.html');
  assert.match(html,/category-main\.ts/,id);
  assert.match(html,new RegExp('content="'+id+'"'),id);
 }
 assert.match(r('sandbox/DocsCategory.vue'), /<DocsShell/);
});
test('detailed demos retain sidebar in a playground wrapper',()=>{
 assert.match(r('sandbox/DocsCategory.vue'),/playground\.html\?demo/);
 assert.match(r('sandbox/DocsPlayground.vue'),/<DocsShell/);
 assert.match(r('sandbox/playground.html'),/playground-main\.ts/);
});
