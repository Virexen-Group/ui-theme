import {describe,it,expect} from 'vitest';
import {mount} from '@vue/test-utils';
import VUserMenu from '../src/components/account/VUserMenu.vue';
const user={name:'Alex Morgan'};
async function legal(props:Record<string,unknown>){const w=mount(VUserMenu,{props:{user,...props}});await w.find('.vx-user-menu__trigger').trigger('click');return w.find('.vx-user-menu__legal');}
describe('VUserMenu footer',()=>{
  it('shows the app version without doubling the v',async()=>{expect((await legal({appVersion:'1.1.1'})).find('span').text()).toBe('v1.1.1');expect((await legal({appVersion:'v1.1.1'})).find('span').text()).toBe('v1.1.1');});
  it('leaves the slot blank without a version and keeps the Privacy link',async()=>{const l=await legal({});expect(l.find('span').text()).toBe('');expect(l.text()).not.toContain('Secured by');expect(l.find('a').attributes('href')).toBe('https://virexen.com/privacy');});
  it('lets an explicit footerText win',async()=>{expect((await legal({appVersion:'1.1.1',footerText:'Custom'})).find('span').text()).toBe('Custom');});
});
