# Virexen UI v0.5.7: consolidated component catalogue

## Pages
- `/` — homepage and category navigation
- `/forms.html` — **all form controls**, validation and the canonical file uploader
- `/dashboard-builder.html` — interactive dashboard editor
- `/data-grid.html` — data-table features
- `/layouts.html` — application layouts
- `/media.html` — media gallery and progress (not upload controls)
- `/feedback.html` — dialogs and notifications
- `/manifest.html` — themes and design tokens
- `/layout-system.html`, `/identity.html`, `/animations.html`, `/sidebar.html`, `/packs.html` etc remain for compatibility

## Canonical file uploader
`VFileManager` is the implementation. `VFileUpload` is a compatibility alias and `VImageUploader` is a compatibility wrapper, not separate uploader implementations. Use `image-only`, `crop`, `crop-aspect-ratio`, `multiple`, `accept`, `max-size-mb`, `disabled` and `v-model`. Styling now lives in `src/styles/components.css`, rather than depending on `roadmap.css`.

```vue
<VFileManager v-model="files" multiple :max-size-mb="10" />
<VFileManager v-model="images" image-only crop :crop-aspect-ratio="1" />
```

## Corrections from supplied console output
- Implicit event-callback types in sandbox; invalid `VCommandPalette` prop; ref assignment.
- Incorrect `ref` auto-unwrapping in crop button; typed workflow event overload.
- `NodeList` iteration without DOM iterable; widened smart language options for `en-GB`/`en-US`.
- Deprecated uploader demonstration removed from Roadmap; it appears under Forms.

## Enhancement suggestions, deliberately not added as dependencies
- **Fonts:** self-host Manrope plus optional variable font via `@font-face`, enforce font-display swap and licensing.
- **Icons:** use existing icon components; evaluate `lucide-vue-next` only after checking existing registry.
- **Floating UI:** `@floating-ui/vue` for accessible tooltip/popover positioning.
- **Colour utilities:** `culori` for accessible OKLCH ramps; calculate contrast rather than guessing.
- **Dashboard sorting:** `@dnd-kit` is React-oriented; for Vue consider `vue-draggable-plus`/SortableJS after keyboard and mobile audit.
- **Testing:** Vitest, Vue Test Utils, Playwright, axe-core; add typecheck and visual regression to CI before publishing.

Dependencies should be evaluated before introduction, especially for tree-shaking, bundle size, accessibility and license.

## Local checks
`pnpm install && pnpm typecheck && pnpm build && pnpm test && pnpm dev:sandbox`
