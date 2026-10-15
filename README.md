# Virexen Master UI

Reusable Vue 3 / TypeScript UI components for Virexen applications.

## Quick start

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm test
pnpm dev:sandbox
```

Visit **http://127.0.0.1:5173/** for the documentation centre and searchable category navigation.

## Documentation and previews

| Category | Sandbox route |
| --- | --- |
| Forms, smart inputs, validation and uploads | `/forms.html` |
| Navigation | `/navigation.html` |
| Data and charts | `/data.html` |
| Layout and dashboards | `/layout.html` |
| Feedback and overlays | `/feedback.html` |
| Commerce | `/commerce.html` |
| Foundations, themes, brand icons | `/foundations.html` |
| Media display | `/media.html` |

The application documentation shell is shared between these routes. Each documented component has a preview (when it can be mounted safely) and a Vue usage snippet. Complex components have specialised demos.

## Imports

```ts
import { VInput, VFileManager, VBrandLogo } from '@virexen-group/ui-theme/vue';
// Or individual component entrypoints:
import VInput from '@virexen-group/ui-theme/vue/input';
```

Existing CSS entrypoints include `theme.css`, `components.css`, `layout.css`, `utilities.css` and other specialised CSS exports. Import relevant styles at your app entrypoint.

## Uploader

`VFileManager` is the canonical reusable form uploader. `VFileUpload` and `VImageUploader` remain compatibility aliases/wrappers.

```vue
<VFileManager v-model="files" multiple :max-size-mb="10" />
<VFileManager v-model="images" image-only crop :crop-aspect-ratio="1" />
```

## Brands

```vue
<VBrandLogo brand="Virexen-Identity" format="svg" :size="64" />
```

All ten brand icon paths map to the official Virexen CDN. The sandbox Foundations page lists them.

## Testing

```bash
pnpm typecheck
pnpm build
pnpm test
pnpm test:unit
pnpm test:e2e
```

The Playwright tests require `pnpm exec playwright install chromium` once. Typecheck must pass separately: a Vite output bundle does not guarantee clean TypeScript diagnostics.

## Fixes in this package

- `VFormWorkflow`: missing `sections`/`modelValue` no longer throws `findIndex` during initialisation; a complete demo is provided. Applications should continue passing their actual data.
- `CategoryGallery`: category ID and category metadata are distinct types, fixing incorrect string/object comparisons.
- Culori: explicitly typed API declarations added for the three used functions.
- Documentation previews: complex components requiring application data do not mount with broken default props.
- One root README, with detailed docs retained in `docs/`.

**Source provenance:** This package extends the last provided v0.6.2 archive, not your current Git checkout. Review source changes before replacing local modifications.


## v0.6.4 documentation preview safety

`VMultiSelect` accepts omitted `options` and `modelValue`, defaulting to empty arrays. The documentation renderer mounts only components with safe self-contained defaults; complex controls show their code and links to detailed playgrounds instead of mounting incomplete examples. This avoids a missing required prop causing an entire catalogue page to render blank.

Run `pnpm typecheck && pnpm build && pnpm test` and, with the sandbox running, `pnpm test:e2e` to verify in your local environment.
