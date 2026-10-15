import { ref, readonly } from 'vue';
export type VTheme = 'light' | 'dark' | 'system';
const preference = ref<VTheme>('system');
const effective = ref<'light' | 'dark'>('light');
let started = false;
let media: MediaQueryList | undefined;
function apply() {
  if (typeof window === 'undefined') return;
  effective.value = preference.value === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preference.value;
  document.documentElement.setAttribute('data-vx-theme', effective.value);
  document.documentElement.style.colorScheme = effective.value;
}
export function setVTheme(value: VTheme) {
  preference.value = value;
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem('vx-theme', value); } catch { /* storage unavailable */ }
  }
  apply();
}
export function initVTheme() {
  if (typeof window === 'undefined') return;
  if (!started) {
    started = true;
    try {
      const saved = window.localStorage.getItem('vx-theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') preference.value = saved;
    } catch { /* private browsing */ }
    media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', apply);
  }
  apply();
}
export function useVTheme() {
  return { preference: readonly(preference), effective: readonly(effective), setTheme: setVTheme, initTheme: initVTheme };
}
