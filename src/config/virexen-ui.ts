import type { App, InjectionKey } from 'vue';
import { inject, readonly, shallowRef } from 'vue';
import { initVTheme, setVTheme } from '../composables/useVTheme';

export type VxThemePreset = 'default' | 'calm' | 'bold' | 'enterprise';
export type VxAppearance = 'light' | 'dark' | 'system';
export interface VirexenUIConfig {
  app?: { id?: string; name?: string };
  theme?: { preset?: VxThemePreset; appearance?: VxAppearance; allowUserSwitch?: boolean; persistPreference?: boolean };
  branding?: { logo?: string; compactLogo?: string; favicon?: string; brand?: string; logoSource?: 'cdn'|'bundled'; logoVariant?: 'icon' };
  layout?: { containerMaxWidth?: string; gutter?: number; gridColumns?: number; density?: 'compact'|'comfortable'|'spacious' };
  components?: {
    buttons?: { pack?: 'core'|'soft'|'outline'|'elevated'; size?: 'sm'|'md'|'lg'; radius?: 'rounded'|'pill'|'square' };
    forms?: { defaultPresentation?: 'embedded'|'fullpage'; navigationPosition?: 'side'|'top'; validationMode?: 'onBlur'|'onInput'|'onSubmit' };
    notifications?: { variant?: 'standard'|'soft'|'accent'; position?: string; duration?: number };
    sidebar?: { collapsible?: boolean; defaultCollapsed?: boolean; mobileMode?: 'drawer'|'accordion' };
  };
  localization?: { defaultLanguage?: string; fallbackLanguage?: string; defaultCountry?: string; defaultCurrency?: string; defaultTimezone?: string };
  accessibility?: { reducedMotion?: 'system'|'always'|'never'; minimumTouchTarget?: number };
  identity?: { layout?: 'centered'; logoPosition?: 'outside-card'; showTerms?: boolean; showCopyright?: boolean; cardMaxWidth?: number };
}
export const defaultVirexenUIConfig: Readonly<VirexenUIConfig> = {
  layout: { containerMaxWidth: '1440px', gutter: 24, gridColumns: 12, density: 'comfortable' },
  branding: { brand: 'virexen', logoSource: 'cdn', logoVariant: 'icon' },
  theme: { preset: 'bold', appearance: 'system', allowUserSwitch: true, persistPreference: true },
  components: { buttons: { pack: 'core', size: 'md', radius: 'rounded' }, forms: { defaultPresentation: 'embedded', navigationPosition: 'side', validationMode: 'onBlur' }, notifications: { variant: 'soft', position: 'top-right', duration: 5000 }, sidebar: { collapsible: true, defaultCollapsed: false, mobileMode: 'drawer' } },
  localization: { defaultLanguage: 'en-GB', fallbackLanguage: 'en', defaultCountry: 'GB', defaultCurrency: 'GBP', defaultTimezone: 'Europe/London' },
  accessibility: { reducedMotion: 'system', minimumTouchTarget: 44 },
  identity: { layout: 'centered', logoPosition: 'outside-card', showTerms: true, showCopyright: true, cardMaxWidth: 420 }
};
export function defineVirexenUI(config: VirexenUIConfig): VirexenUIConfig { return config; }
export function resolveVirexenUI(config: VirexenUIConfig = {}): VirexenUIConfig {
  const d = defaultVirexenUIConfig;
  return { ...d, ...config, app: { ...d.app, ...config.app }, theme: { ...d.theme, ...config.theme }, branding: { ...d.branding, ...config.branding }, layout: { ...d.layout, ...config.layout }, localization: { ...d.localization, ...config.localization }, accessibility: { ...d.accessibility, ...config.accessibility }, identity: { ...d.identity, ...config.identity }, components: { ...d.components, ...config.components, buttons: { ...d.components?.buttons, ...config.components?.buttons }, forms: { ...d.components?.forms, ...config.components?.forms }, notifications: { ...d.components?.notifications, ...config.components?.notifications }, sidebar: { ...d.components?.sidebar, ...config.components?.sidebar } } };
}
const key: InjectionKey<Readonly<VirexenUIConfig>> = Symbol('VirexenUI');
const activeConfig = shallowRef<Readonly<VirexenUIConfig>>(resolveVirexenUI());
export function useVirexenUI(): Readonly<VirexenUIConfig> { return inject(key, activeConfig.value); }
export function getVirexenUI(): Readonly<VirexenUIConfig> { return activeConfig.value; }
export function applyVirexenUI(config: VirexenUIConfig): Readonly<VirexenUIConfig> {
  const resolved = resolveVirexenUI(config);
  activeConfig.value = resolved;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--vx-container-max', resolved.layout?.containerMaxWidth ?? '1440px');
    root.style.setProperty('--vx-layout-gutter', `${resolved.layout?.gutter ?? 24}px`);
    root.setAttribute('data-vx-preset', resolved.theme?.preset ?? 'bold');
    root.setAttribute('data-vx-button-pack', resolved.components?.buttons?.pack ?? 'core');
    root.setAttribute('data-vx-density', 'comfortable');
    initVTheme();
    if (resolved.theme?.persistPreference === false && resolved.theme?.appearance) setVTheme(resolved.theme.appearance);
    else if (resolved.theme?.appearance && resolved.theme.appearance !== 'system') {
      // Honour existing stored user preferences instead of clobbering them.
      try { if (!window.localStorage.getItem('vx-theme')) setVTheme(resolved.theme.appearance); } catch { setVTheme(resolved.theme.appearance); }
    }
  }
  return resolved;
}
export function createVirexenUI(config: VirexenUIConfig = {}) {
  return { install(app: App) { const resolved = applyVirexenUI(config); app.provide(key, readonly(resolved) as Readonly<VirexenUIConfig>); } };
}
