# Virexen UI v0.5.3 — Layout & Branding

## Setup

```ts
import '@virexen-group/ui-theme/theme.css';
import '@virexen-group/ui-theme/components.css';
import '@virexen-group/ui-theme/layout.css';
import '@virexen-group/ui-theme/utilities.css'; // optional
import '@virexen-group/ui-theme/brand.css'; // optional palette tokens
```

```vue
<script setup lang="ts">
import { VContainer, VRow, VCol, VBrandLogo } from '@virexen-group/ui-theme/vue';
// Or individual imports: @virexen-group/ui-theme/vue/container etc.
</script>
<template>
  <VContainer size="xl">
    <VBrandLogo :size="48" />
    <VRow :gap="4">
      <VCol :xs="12" :md="6" :lg="4">One</VCol>
      <VCol :xs="12" :md="6" :lg="4">Two</VCol>
      <VCol :xs="12" :md="12" :lg="4">Three</VCol>
    </VRow>
  </VContainer>
</template>
```

You can also use `vx-container`, `vx-row`, `vx-col-12 vx-col-md-6`, `vx-p-3`, `vx-gap-4`, etc. Breakpoints: sm 576, md 768, lg 1024, xl 1280. The existing VGrid and VStack are preserved. Default grid uses flex-wrap and a shared gap.

### Individual imports
`@virexen-group/ui-theme/vue/container`, `/row`, `/col`, `/flex`, `/h-stack`, `/spacer`, `/divider`, `/aspect-ratio`, `/scroll-area`, `/section`, `/brand-logo`. Each path has an entry in package exports. Note: `VGrid` and `VStack` already exist and remain on their existing paths.

### Brand artwork availability
We attempted to obtain the official artwork directly from the provided URLs but the CDN could not be reached from the build environment. **No genuine SVG/PNG artwork was bundled in this release.** `VBrandLogo` points at the exact official URL and shows an accessible V glyph if loading fails. To make it fully offline, download the official icon-512.svg into your source and replace the URL-backed source in the component, or provide `src` pointing to a local asset.

The palette exported as `VIREXEN_BRAND_COLORS` and in `brand.css` is **provisional**: it is based on the existing teal Virexen UI brand, not numerically extracted from the logo. Adjust and approve the swatches after access to the original logo is available. Do not present these hexes as verified brand specifications.

### Manifest
```ts
layout: { containerMaxWidth: '1440px', gutter: 24, gridColumns: 12, density: 'comfortable' },
branding: { brand:'virexen',logoSource:'cdn',logoVariant:'icon' }
```
The layout max width and gutter are applied through CSS custom properties. Grid columns are currently 12; arbitrary runtime grid column counts aren't wired to `VCol`.

### Sandbox
Run `pnpm dev:sandbox` and open `http://127.0.0.1:5173/layout-system.html`. The link is on the sandbox home page.
