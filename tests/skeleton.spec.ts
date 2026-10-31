// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import VModal from '../src/components/overlays/VModal.vue';
import VDataTable from '../src/components/data/VDataTable.vue';
import VSkeleton from '../src/components/feedback/VSkeleton.vue';
import VSkeletonLayout from '../src/components/feedback/VSkeletonLayout.vue';
describe('shared skeleton loading', () => {
 it('preserves existing width/height props and hides decorative placeholders', () => { const w=mount(VSkeleton,{props:{width:'60%',height:'24px'}});expect(w.attributes('aria-hidden')).toBe('true');expect(w.attributes('style')).toContain('width: 60%'); });
 it('supports circles and disabling animation',()=>{const w=mount(VSkeleton,{props:{variant:'circle',animation:'none',height:'48px',width:'48px'}});expect(w.attributes('data-animation')).toBe('none');expect(w.attributes('style')).toContain('border-radius: 50%');});
 it.each(['form','table','cards','profile','dashboard','list'] as const)('announces %s loading once and keeps placeholders noninteractive', variant=>{const w=mount(VSkeletonLayout,{props:{variant,label:'Loading campers…'}});expect(w.get('[role="status"]').attributes('aria-busy')).toBe('true');expect(w.text()).toBe('Loading campers…');expect(w.findAll('[role="status"]')).toHaveLength(1);expect(w.findAll('button,input,a')).toHaveLength(0);expect(w.findAll('.vx-skeleton').length).toBeGreaterThan(0);});
 it('bounds large placeholder counts and supports bespoke layouts through slots',()=>{const w=mount(VSkeletonLayout,{props:{variant:'table',rows:100,columns:100}});expect(w.findAll('.vx-skeleton-layout__table-row')).toHaveLength(13);const custom=mount(VSkeletonLayout,{slots:{default:'<div class="custom">Custom layout</div>'}});expect(custom.find('.custom').exists()).toBe(true);});
 it('keeps the modal close control while hiding unloaded form actions', async()=>{const w=mount(VModal,{props:{open:true,title:'Settings',loading:true},slots:{default:'<input aria-label="Real field"/>',footer:'<button>Save</button>'},global:{stubs:{teleport:true}}});expect(w.find('.vx-skeleton-layout--form').exists()).toBe(true);expect(w.find('input').exists()).toBe(false);expect(w.find('footer').exists()).toBe(false);await w.get('[aria-label="Close"]').trigger('click');expect(w.emitted('close')).toHaveLength(1);await w.setProps({loading:false});expect(w.find('input').exists()).toBe(true);w.unmount();});
 it('shows table skeletons instead of an empty result or pagination while loading',async()=>{const w=mount(VDataTable,{props:{rows:[],columns:[{key:'name',label:'Name'}],loading:true}});expect(w.find('.vx-skeleton-layout--table').exists()).toBe(true);expect(w.text()).not.toContain('No matching records');expect(w.find('nav').exists()).toBe(false);await w.setProps({loading:false});expect(w.text()).toContain('No matching records');w.unmount();});
});
