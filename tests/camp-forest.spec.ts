// @vitest-environment jsdom
import {describe,it,expect} from 'vitest';
import {mount} from '@vue/test-utils';
import {readFileSync} from 'node:fs';
import VBottomNavigation from '../src/components/navigation/VBottomNavigation.vue';
describe('Reusable mobile navigation',()=>{
 it('emits accessible app routing selection with current location',async()=>{const w=mount(VBottomNavigation,{props:{modelValue:'home',variant:'pill',items:[{id:'home',label:'Home',icon:'home'},{id:'campers',label:'Campers',icon:'users'}]}});expect(w.get('[aria-current=page]').text()).toBe('Home');await w.findAll('button')[1].trigger('click');expect(w.emitted('select')).toEqual([['campers']]);expect(w.emitted('update:modelValue')).toEqual([['campers']]);w.unmount();});
 it('prevents disabled anchors from navigating, as well as suppressing emitted actions',()=>{const w=mount(VBottomNavigation,{props:{items:[{id:'disabled',label:'Unavailable',href:'/protected',disabled:true}]}});const event=new MouseEvent('click',{bubbles:true,cancelable:true});w.get('a').element.dispatchEvent(event);expect(event.defaultPrevented).toBe(true);expect(w.get('a').attributes('aria-disabled')).toBe('true');expect(w.emitted('select')).toBeUndefined();w.unmount();});
 it('supports named landmarks, optional badges and mobile-only layout without a second navigation component',()=>{const w=mount(VBottomNavigation,{props:{ariaLabel:'Camp navigation',variant:'floating',items:[{id:'messages',label:'Messages',badge:3}]}});expect(w.get('nav').attributes('aria-label')).toBe('Camp navigation');expect(w.classes()).toContain('vx-bottomnav--mobile');expect(w.classes()).toContain('vx-bottomnav--floating');expect(w.get('.vx-bottomnav__badge').text()).toBe('3');w.unmount();});
});
describe('Forest pack distribution',()=>{
 it('is opt-in and exported as a standalone stylesheet copied by the existing asset build',()=>{const pkg=JSON.parse(readFileSync('package.json','utf8'));expect(pkg.exports['./camp-forest.css']).toBe('./dist/camp-forest.css');const source=readFileSync('src/styles/camp-forest.css','utf8');expect(source).toContain('[data-vx-pack="camp-forest"]');expect(source).not.toMatch(/^:root\s*\{/m);expect(source).toContain('[data-theme="dark"]');expect(source).toContain('[data-vx-theme="dark"]');expect(readFileSync('scripts/build-assets.mjs','utf8')).toContain("'camp-forest'");});
});
