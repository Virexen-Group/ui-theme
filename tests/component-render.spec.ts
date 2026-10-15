import {describe,it,expect} from 'vitest';
import {mount} from '@vue/test-utils';
import VContainer from '../src/components/layout/VContainer.vue';
describe('layout components',()=>{it('renders its slot',()=>{const w=mount(VContainer,{slots:{default:'Test content'}});expect(w.text()).toContain('Test content');});});
