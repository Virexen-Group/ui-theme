import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
test('sidebar has an independent showBrand prop and controls',()=>{const v=read('src/components/navigation/VSidebar.vue');assert.match(v,/showBrand\?: boolean/);assert.match(v,/showBrand: true/);assert.match(v,/brandingPlacement === 'sidebar' && showBrand/);const demo=read('sandbox/SidebarDemo.vue');assert.match(demo,/showSidebarBrand/);assert.match(demo,/:show-brand="showSidebarBrand"/);});
test('active Foundations gallery includes all three application icons',()=>{const v=read('sandbox/BrandGallery.vue');assert.match(v,/VIREXEN_APP_ICON_NAMES/);assert.match(v,/VAppIcon/);assert.match(v,/official-app-icon-gallery/);assert.match(v,/appResolution/);const d=read('sandbox/DocsCategory.vue');assert.match(d,/BrandGallery v-if="category==='foundations'"/);});
