import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VWidgetCard from '../src/components/dashboard/VWidgetCard.vue';

describe('VWidgetCard', () => {
  it('renders its title, icon, actions, body and footer', () => {
    const card = mount(VWidgetCard, { props: { title: 'Websites', subtitle: 'All of them', tone: 'green' }, slots: { icon: '<svg/>', actions: '<button>Menu</button>', default: 'Body', footer: 'Footer' } });
    expect(card.find('.vx-widget-card__title').text()).toBe('Websites');
    expect(card.find('.vx-widget-card__icon').attributes('data-tone')).toBe('green');
    expect(card.text()).toContain('All of them');
    expect(card.find('.vx-widget-card__actions').text()).toBe('Menu');
    expect(card.find('.vx-widget-card__body').text()).toBe('Body');
    expect(card.find('.vx-widget-card__footer').text()).toBe('Footer');
  });

  it('makes the title a link that emits open', async () => {
    const card = mount(VWidgetCard, { props: { title: 'Domains', href: '/domains' } });
    const link = card.find('a.vx-widget-card__link');
    expect(link.attributes('href')).toBe('/domains');
    await link.trigger('click');
    expect(card.emitted('open')).toHaveLength(1);
  });

  it('leaves out empty parts', () => {
    const card = mount(VWidgetCard, { props: { title: 'Plain' } });
    expect(card.find('.vx-widget-card__icon').exists()).toBe(false);
    expect(card.find('.vx-widget-card__actions').exists()).toBe(false);
    expect(card.find('.vx-widget-card__footer').exists()).toBe(false);
    expect(card.find('a').exists()).toBe(false);
  });
});
