// @vitest-environment jsdom
import {describe,it,expect,vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {packDashboard,appendDashboardPosition,rectangleFits} from '../src/components/dashboard/dashboard-packing';
import VDashboardGrid from '../src/components/dashboard/VDashboardGrid.vue';
const dimensions={short:{columns:4,height:180},tall:{columns:8,height:600},third:{columns:4,height:200}};
describe('bounded two-dimensional widget packing',()=>{
 it('fills the gap below a short left widget without moving its tall right neighbour',()=>{
  const result=packDashboard(['short','tall','third'],dimensions);
  expect(result.short).toMatchObject({column:0,row:0});expect(result.tall).toMatchObject({column:4,row:0});
  expect(result.third).toMatchObject({column:0,row:10});
  expect(result.third.row*20).toBeLessThan(result.tall.height);
 });
 it('accepts an explicit drop into the left gap while keeping unrelated positions stable',()=>{
  const result=packDashboard(['short','tall','third'],dimensions,{short:{column:0,row:0},tall:{column:4,row:0},third:{column:0,row:10}},12,14,'third');
  expect(result.third).toMatchObject({column:0,row:10});expect(result.tall).toMatchObject({column:4,row:0});
  expect(rectangleFits(result.third,result.tall)).toBe(false);
 });
 it('appends a new widget below the bottom, leaving intentional gaps untouched',()=>{
  const old=packDashboard(['short','tall'],dimensions),position=appendDashboardPosition(old);
  const next=packDashboard(['short','tall','third'],dimensions,{short:old.short,tall:old.tall,third:position});
  expect(next.third.row*20).toBeGreaterThanOrEqual(600);expect(next.tall).toEqual(old.tall);
 });
 it('reflows only a collision and clamps a widened widget back inside twelve columns',()=>{
  const old={short:{column:8,row:0},tall:{column:0,row:0},third:{column:0,row:40}};
  const result=packDashboard(['short','tall','third'],{...dimensions,short:{columns:6,height:180}},old,12,14,'short');
  expect(result.short.column).toBe(6);expect(result.third).toMatchObject(old.third);
  for(const [id,a]of Object.entries(result))for(const [other,b]of Object.entries(result))if(id!==other)expect(rectangleFits(a,b)).toBe(false);
 });
 it('normalises invalid positions and never creates an unbounded canvas',()=>{
  const result=packDashboard(['short','tall'],dimensions,{short:{column:99,row:999999},tall:{column:-10,row:-1}});
  expect(result.short.row).toBeLessThan(1024);expect(result.short.column+result.short.columns).toBeLessThanOrEqual(12);expect(result.tall.row).toBeGreaterThanOrEqual(0);
 });
});
it('provides a custom picker slot without rendering the legacy library and appends via its callback',async()=>{
 const w=mount(VDashboardGrid,{props:{editable:true,packed:true,modelValue:['short','tall'],sizes:{short:4,tall:8,third:4},heights:{short:180,tall:600,third:200},availableItems:[{id:'short',label:'Short'},{id:'tall',label:'Tall'},{id:'third',label:'Third'}],saveMode:'external'},slots:{catalogue:'<template #default="props"><button v-if="props.open" data-add @click="props.add(\'third\');props.close()">Custom add</button></template>'}});
 await w.findAll('button').find(b=>b.text().includes('Add widget'))!.trigger('click');expect(w.find('.vx-widget-catalogue').exists()).toBe(false);await w.get('[data-add]').trigger('click');
 await w.findAll('button').find(b=>b.text().includes('Save layout'))!.trigger('click');
 expect((w.emitted('save')![0][0] as {positions:Record<string,{row:number}>}).positions.third.row).toBeGreaterThanOrEqual(31);w.unmount();
});
