import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const entry=fs.readFileSync('sandbox/home-main.ts','utf8');
test('homepage mounts DocsHome instead of HomeCatalog',()=>{assert.match(entry,/import DocsHome from/);assert.match(entry,/createApp\(DocsHome\)/);assert.doesNotMatch(entry,/HomeCatalog/)});
const brand=fs.readFileSync('src/data/virexen-brand.ts','utf8');
test('all ten Virexen brands have both PNG and SVG URLs',()=>{for(const b of ['Virexen','Virexen-Pay','Virexen-Workspace','Virexen-Identity','My-Virexen','Virexen-Cloud','Virexen-CMS','Virexen-Support','Virexen-Developer','Marlo']){assert.ok(brand.includes(`/brands/${b}/PNG/${b}-512x512.png`));assert.ok(brand.includes(`/brands/${b}/SVG/${b}.svg`));}});
