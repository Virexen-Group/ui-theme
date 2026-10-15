# Virexen brand icon exports (v0.6.0)

The component references **official remote CDN files**. They are not embedded or independently redrawn.

```vue
<script setup lang="ts">
import { VBrandLogo, getVirexenBrandUrl } from '@virexen-group/ui-theme/vue';
</script>
<template>
  <VBrandLogo brand="Virexen-Identity" format="svg" :size="64" />
  <VBrandLogo brand="Virexen-Pay" format="png" :size="96" />
  <VBrandLogo brand="My-Virexen" format="svg" width="2rem" height="2rem" />
</template>
```

Individual component import: `@virexen-group/ui-theme/vue/brand-logo`.

```ts
import { VIREXEN_PRODUCT_BRANDS, getVirexenBrandUrl } from '@virexen-group/ui-theme/vue';
const url = getVirexenBrandUrl('Virexen-Cloud','png');
```

Supported `brand` values: `Virexen`, `Virexen-Pay`, `Virexen-Workspace`, `Virexen-Identity`, `My-Virexen`, `Virexen-Cloud`, `Virexen-CMS`, `Virexen-Support`, `Virexen-Developer`, `Marlo`.

`format`: `svg` (default) or `png`; `size`: number in pixels or CSS length. Optional `width`, `height`, `alt`, `src`, and `loading`. The old `resolution=32` option for the base Virexen icon is preserved.

Visit `/foundations.html` for all 10 icon previews.

**Homepage correction:** `sandbox/home-main.ts` explicitly mounts `DocsHome.vue`; it does not mount `HomeCatalog.vue`. The ZIP is flattened (no enclosing `ui-theme/` directory) to avoid accidentally unpacking into a nested project.

Verify from project root:
```sh
grep -n 'DocsHome' sandbox/home-main.ts
pnpm install
pnpm typecheck
pnpm build
pnpm dev:sandbox
```
