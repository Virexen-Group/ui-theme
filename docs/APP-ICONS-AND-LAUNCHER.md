# App icons, CDN fallback and Virexen launcher

The package uses the official remote assets at `https://edge.virexen.com`. If an image fails, it retries the same exact pathname under `https://edge-fallback.virexengroup.com`. If both fail, it shows a text placeholder. The fallback domain must actually serve matching paths; this cannot be guaranteed by the UI library.

## CampPulze family icon

```vue
<script setup lang="ts">
import {VAppIcon} from '@virexen-group/ui-theme/vue';
</script>
<template>
  <VAppIcon app="CampPulze" format="svg" :size="64" />
  <VAppIcon app="CampPulze-Health" format="png" :resolution="256" :size="64" />
  <VAppIcon app="PulzeConnect" format="webp" :resolution="128" :size="48" />
</template>
```

Formats: `svg`, `png`, `webp`, `ico`; raster resolutions: `16`, `32`, `48`, `64`, `128`, `192`, `256`, `512`, `1024` pixels. `size` is rendered CSS size; `resolution` selects the raster source. SVG and ICO don't use resolution in the URL.

Single-component import: `@virexen-group/ui-theme/vue/app-icon`.

## Virexen-only nine-dot launcher

`VAppHeader` now provides a nine-dot button next to the user actions. Its default list includes the existing ten Virexen-family brand icons and **excludes CampPulze and PulzeConnect**. It emits `appSelect` when an app is picked. Apps don't get invented destinations; the consuming app provides approved URLs or performs navigation in its event handler.

```vue
<VAppHeader
  :user="currentUser"
  :notification-count="3"
  @app-select="openAuthorizedApp"
/>
```

You can override the list via `:launcher-apps="apps"`, turn it off via `:show-app-switcher="false"`, or embed the existing component yourself with `<VAppSwitcher :apps="apps" active-id="Virexen" trigger="launcher" display="grid" @select="openAuthorizedApp"/>`.

`VAppSwitcher` keeps its existing list layout as default, so old sidebar usage is not changed. The header icon picker is purely presentational and does **not** grant a user access to a product; apps must enforce permissions.

## Sandbox

- `/header.html` — click nine dots in the header
- `/sidebar.html` — header + sidebar
- `/foundations.html` — Virexen brand gallery plus the three CampPulze family app icons

Run `pnpm typecheck && pnpm build && pnpm dev:sandbox` before releasing. Don't tag a new release until CI and browser checks pass.
