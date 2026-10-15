# Virexen UI v0.5.8 — tooling and catalogue

## Installation

Run `pnpm install` to install newly declared dependencies. Version ranges are in `package.json`; no lockfile is included because package registry access was unavailable during packaging. Commit the generated `pnpm-lock.yaml` from your development environment.

## Tooling

- **Floating UI**: `VFloatingPopover` and `useFloatingPosition` use `@floating-ui/vue` with `autoUpdate`, flip, shift and offset middleware. Existing popovers remain backward compatible; migrating other components is future work.
- **Lucide**: Existing `VIcon` already uses `@lucide/vue` with a semantic icon map. This integration is retained rather than installing a redundant icon package.
- **Culori**: `generateBrandPalette(seed)` generates OKLCH swatches and `meetsTextContrast` uses WCAG contrast. Palette is algorithmic, **not extracted from logo pixels**.
- **Vitest**: `pnpm test:unit` runs new component and palette tests.
- **Playwright**: `pnpm exec playwright install chromium` once, followed by `pnpm test:e2e`. Browser tests inspect category links and uploader appearance; update selectors if the canonical uploader CSS class changes.

## Canonical sandbox navigation

- `/forms.html`: core inputs, validation, smart inputs, address, country/language/timezone, uploader with optional crop
- `/navigation.html`: navigation demos and links to sidebar
- `/data.html`: tables, metrics and data grid
- `/layout.html`: responsive grid and links to dashboard builder and layout shell
- `/feedback.html`: dialogs, alerts, and overlays
- `/commerce.html`: checkout examples
- `/foundations.html`: tokens, branding, colour scale, icon links
- `/media.html`: media viewing and progress only; uploads belong under Forms
- `/`: categorised catalogue home

Legacy `/smart.html`, `/validation.html`, `/roadmap.html` and `/master.html` redirect to category homes instead of duplicating examples. Specific older demos continue to be accessible through their canonical links.

## Usage

```ts
import { generateBrandPalette, meetsTextContrast, useFloatingPosition, VFloatingPopover } from '@virexen-group/ui-theme/vue';
const swatches = generateBrandPalette('#193B9F');
console.log(meetsTextContrast('#ffffff', '#193B9F'));
```

```vue
<VFloatingPopover v-model="showHelp" placement="bottom-end" label="Account help">
  <template #trigger>Help</template>
  <p>Positioned by Floating UI</p>
</VFloatingPopover>
```

## Verification

`pnpm typecheck`, `pnpm build`, `pnpm test:unit` and `pnpm test:e2e` require installation. Do not publish without running them. The existing uploader and dashboard should additionally receive visual screenshots in your own project environment.
