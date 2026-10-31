// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import VBadge from '../src/components/feedback/VBadge.vue';
it('keeps existing badges compatible and supports reusable compact status pills', () => {
  const basic = mount(VBadge, { slots: { default: 'Existing badge' } });
  expect(basic.classes()).toContain('vx-badge');
  expect(basic.classes()).not.toContain('vx-badge--compact');
  const status = mount(VBadge, { props: { compact: true, tone: 'success' }, slots: { default: 'Enrolled Camper - 2027', icon: '<svg />' } });
  expect(status.classes()).toContain('vx-badge--compact');
  expect(status.attributes('data-tone')).toBe('success');
  expect(status.find('.vx-badge__icon').attributes('aria-hidden')).toBe('true');
  expect(status.text()).toBe('Enrolled Camper - 2027');
});
