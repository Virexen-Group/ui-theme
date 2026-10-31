// @vitest-environment jsdom
import {mount} from '@vue/test-utils';
import {describe,it,expect} from 'vitest';
import VDashboardGrid from '../src/components/dashboard/VDashboardGrid.vue';
import VWelcomeBanner from '../src/components/dashboard/VWelcomeBanner.vue';
import VAccountManagerCard from '../src/components/dashboard/VAccountManagerCard.vue';
describe('shared command centre',()=>{
 it('retains the edited layout until an external save is confirmed',async()=>{
  const w=mount(VDashboardGrid,{props:{editable:true,modelValue:['a','b'],sizes:{a:6,b:6},availableItems:[{id:'a',label:'Alpha'},{id:'b',label:'Beta'}],saveMode:'external'}});
  await w.get('[aria-label="Remove Alpha"]').trigger('click');await w.findAll('button').find(b=>b.text().includes('Save layout'))!.trigger('click');
  expect(w.emitted('save')![0][0]).toEqual({order:['b'],sizes:{a:6,b:6}});expect(w.emitted('update:modelValue')).toBeUndefined();expect(w.find('.vx-dashboard-editor--editing').exists()).toBe(true);
  await w.setProps({saveError:'Could not save',busy:false});expect(w.get('[role="alert"]').text()).toContain('Could not save');expect(w.findAll('[data-vx-widget-id]').map(el=>el.attributes('data-vx-widget-id'))).toEqual(['b']);
  await w.setProps({busy:true,modelValue:['b']});w.vm.commit();await w.vm.$nextTick();expect(w.find('.vx-dashboard-editor--editing').exists()).toBe(false);w.unmount();
 });
 it('keeps the immediate-save behaviour compatible for existing consumers',async()=>{const w=mount(VDashboardGrid,{props:{editable:true,modelValue:['a'],sizes:{a:4}}});await w.findAll('button').find(b=>b.text().includes('Save layout'))!.trigger('click');expect(w.emitted('update:modelValue')![0][0]).toEqual(['a']);expect(w.emitted('edit-change')!.at(-1)).toEqual([false]);w.unmount();});
 it('supports accessible resize and reorder controls without drag gestures',async()=>{const w=mount(VDashboardGrid,{props:{editable:true,modelValue:['a','b'],sizes:{a:4,b:4},availableItems:[{id:'a',label:'Alpha'},{id:'b',label:'Beta'}]}});await w.get('[aria-label="Move Beta earlier"]').trigger('click');await w.get('[aria-label="Make Beta wider"]').trigger('click');await w.findAll('button').find(b=>b.text().includes('Save layout'))!.trigger('click');expect(w.emitted('save')![0][0]).toEqual({order:['b','a'],sizes:{a:4,b:5}});w.unmount();});
 it('renders personalised welcome copy and a decorative image',async()=>{const w=mount(VWelcomeBanner,{props:{name:'Stewart',greeting:'Good afternoon',description:'Your camp',imageUrl:'blob:private',preset:'dusk',editable:true}});expect(w.get('h1').text()).toContain('Stewart');expect(w.get('img').attributes('alt')).toBe('');await w.get('button').trigger('click');expect(w.emitted('edit')).toHaveLength(1);w.unmount();});
 it('does not invent an assigned manager or availability promise',()=>{const w=mount(VAccountManagerCard,{props:{supportHref:'https://support.example.test'}});expect(w.text()).toContain('hasn’t been assigned');expect(w.findAll('a')).toHaveLength(1);expect(w.text()).not.toContain('online');w.unmount();});
 it('shows configured manager contact actions and rejects unsafe image and booking URLs',()=>{const w=mount(VAccountManagerCard,{props:{supportHref:'https://support.example.test',manager:{name:'Actual manager',email:'manager@example.test',avatarUrl:'javascript:alert(1)',bookingUrl:'http://insecure.test'}}});expect(w.find('img').exists()).toBe(false);expect(w.find('a[href="mailto:manager@example.test"]').exists()).toBe(true);expect(w.text()).not.toContain('Book a call');w.unmount();});
});

it('packs fixed-size widgets without exposing resizing while retaining keyboard reordering',async()=>{
 const w=mount(VDashboardGrid,{props:{editable:true,resizable:false,modelValue:['a','b'],sizes:{a:12,b:12},availableItems:[{id:'a',label:'Alpha',span:4},{id:'b',label:'Beta',span:4}],saveMode:'external'}});
 expect(w.find('[aria-label="Resize widget"]').exists()).toBe(false);
 expect(w.find('[title="Wider"]').exists()).toBe(false);
 expect(w.get('[data-vx-widget-id="a"]').attributes('data-span')).toBe('4');
 await w.get('[aria-label="Move Alpha later"]').trigger('click');
 await w.findAll('button').find(b=>b.text().includes('Save layout'))!.trigger('click');
 expect(w.emitted('save')![0][0]).toMatchObject({order:['b','a']});w.unmount();
});

it('exposes catalogue previews and interactive fixed-variant settings outside inert widget content',async()=>{
 const w=mount(VDashboardGrid,{props:{editable:true,resizable:false,modelValue:['a'],availableItems:[{id:'a',label:'Alpha',span:4},{id:'b',label:'Beta',span:12}]},slots:{'item-settings':'<select aria-label="Variant"><option>Medium</option></select>','catalogue-preview':'<span data-preview>Fixed preview</span>'}});
 expect(w.get('[aria-label="Variant"]').element.closest('[inert]')).toBeNull();
 await w.findAll('button').find(b=>b.text().includes('Add widget'))!.trigger('click');
 expect(w.get('[data-preview]').text()).toBe('Fixed preview');
 expect(w.find('[aria-label^="Make Alpha"]').exists()).toBe(false);w.unmount();
});
