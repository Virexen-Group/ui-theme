# Virexen UI Manifest

Define an application manifest as `virexen-ui.config.ts` and register it once in `main.ts`.

```ts
import { defineVirexenUI } from '@virexen-group/ui-theme/vue';
export default defineVirexenUI({
  app: { id: 'camppulze', name: 'CampPulze' },
  theme: { preset: 'calm', appearance: 'system', allowUserSwitch: true },
  branding: { logo: '/logo.png', compactLogo: '/icon.png' },
  components: { buttons: { pack: 'core' }, sidebar: { collapsible: true, mobileMode: 'drawer' } },
  localization: { defaultLanguage: 'en-GB', defaultCurrency: 'GBP' },
  identity: { layout: 'centered', logoPosition: 'outside-card', showCopyright: true }
});
```

```ts
import { createVirexenUI } from '@virexen-group/ui-theme/vue';
import uiConfig from './virexen-ui.config';
app.use(createVirexenUI(uiConfig));
```

Supported presets: `default`, `calm`, `bold`, `enterprise`. Supported appearance preferences: `light`, `dark`, `system`. Import `theme.css`, `theme-modes.css`, `packs-notifications.css` and relevant component CSS in the consuming application.

The plugin provides a typed shared configuration, applies root theme preset tokens and initial appearance, and makes configuration accessible through `useVirexenUI()`. Not all legacy components automatically inherit every manifest option yet; components must explicitly consume relevant configuration. Component props continue to override application defaults. This package provides UI configuration **not** authentication, authorisation, secrets, or server validation.

`initVTheme()` checks saved appearance preferences and system changes. For applications with per-user appearance settings, synchronise those settings with `setVTheme()` when users sign in. Keep server-side rendering and local-storage hydration in mind.
