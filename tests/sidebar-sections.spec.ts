import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VSidebar from '../src/components/navigation/VSidebar.vue';

const items = [
  { id: 'home', label: 'Overview', section: 'General' },
  { id: 'brands', label: 'Brands', section: 'General' },
  { id: 'health', label: 'System health', section: 'Platform' },
  { id: 'settings', label: 'Settings' },
];

describe('VSidebar sections', () => {
  it('renders one heading before each run of items in the same section', () => {
    const w = mount(VSidebar, { props: { items } });
    expect(w.findAll('.vx-sidebar__section').map(h => h.text())).toEqual(['General', 'Platform']);
    expect(w.find('.vx-sidebar__section').classes()).toContain('vx-sidebar__section--first');
    expect(w.findAll('.vx-sidebar__item')).toHaveLength(4);
  });
  it('renders no headings when items have no section', () => {
    const w = mount(VSidebar, { props: { items: items.map(({ section: _section, ...item }) => item) } });
    expect(w.find('.vx-sidebar__section').exists()).toBe(false);
  });
});
