# v0.6.2 documentation entry and full brand gallery fix

## Why v0.6.1 might still show the old homepage
The user's running `sandbox/home-main.ts` was confirmed to mount `HomeCatalog`. Previous ZIPs did not reliably overwrite that active source file. This update removes that dependency: `sandbox/index.html` directly loads `/docs-entry.ts`, whose source explicitly imports `DocsHome.vue`. We also update `home-main.ts` as a compatibility entry point.

## Install correctly
1. **Commit/backup first.** Extract this ZIP into the repository root, replacing existing files (not into a nested `ui-theme` folder).
2. Confirm the ACTIVE files:

```sh
grep -n 'docs-entry.ts' sandbox/index.html
grep -n 'DocsHome' sandbox/docs-entry.ts
grep -n 'DocsHome' sandbox/home-main.ts
```

3. Run `pnpm install && pnpm typecheck && pnpm build && pnpm test && pnpm dev:sandbox`.
4. Open `/` and then `/foundations.html#official-brand-gallery`. The home heading should read **Virexen UI · Documentation centre**, not **Virexen component library**.

## Brands
`VBrandLogo` supports 10 official brands with `brand`, `format='svg'|'png'`, and `size`. The gallery displays them together, supports format and size switching, copying the import snippet and copying the official CDN URL. Brand assets remain CDN-hosted: they are not bundled.

## Validation
Static entrypoint, source import, and ZIP checks are performed during packaging; full browser rendering is not verified in this environment. If the previous homepage still appears after confirming the above three greps, a different HTML source than `sandbox/index.html` is being served.
