# Virexen UI — Form Workflow extension

## Installation
Copy `src/components/forms/VFormWorkflow.vue`, `src/components/forms/workflow.types.ts` and `src/styles/workflow.css` into the matching paths in your `ui-theme` repo. Copy `sandbox/FormWorkflowExample.vue` into your sandbox folder if desired.

Add to `src/index.ts`:

```ts
export { default as VFormWorkflow } from './components/forms/VFormWorkflow.vue';
export type { WorkflowSection, WorkflowField, FormValues } from './components/forms/workflow.types';
```

In `scripts/build-assets.mjs`, copy `src/styles/workflow.css` into `dist/workflow.css` (or merge it into `src/styles/components.css`). If keeping separate, add to package.json `exports`:

```json
"./workflow.css": "./dist/workflow.css"
```

Then consuming apps import `@virexen-group/ui-theme/workflow.css` and `VFormWorkflow` from `@virexen-group/ui-theme/vue`.

For the sandbox, add `FormWorkflowExample` to the sandbox's App.vue or route it from the component catalogue. The example imports `../src/...`; if you place it under `sandbox/`, those paths point to the repository's `src/` folder.

## API
`v-model`: app-owned plain object with field values. `sections`: ordered array containing `id`, `title`, optional `description`, and `fields: [{key,label,required?,validate?}]`. `mode`: `'wizard' | 'all'`. `showSave`, `showSaveExit`, `busy`, `canSubmit`: optional controls.

Named slots match each `section.id`, receiving `{ values, update, errors, section }`. The app renders its preferred controls. Form workflow supplies section navigation, required checks, errors and status.

Events: `save`, `save-exit`, `submit` (each receives the full values object), and `section-change`.

## Behaviour / security
- A section is complete when its required fields and custom synchronous validators pass.
- Navigation between sections is allowed, but Next is blocked for an incomplete section.
- Submit is disabled until every section validates (including an optional app-level `canSubmit`).
- Save Draft and Save & Exit are allowed on incomplete forms. The consuming app handles persistence and navigation; no API calls are made by the UI package.
- Server must independently validate on submit; client-side validation alone is never enough.
- Hidden conditional sections should be removed from `sections` by the application or represented with app-specific rules.
- Do not put passwords, access tokens or patient records in insecure browser storage; use an authenticated backend for drafts.

To try the example, open it through your existing sandbox app after registering/importing it.


---

## Install

# Virexen UI starter — additive Vue components

This is an **additive overlay**, not a full replacement repository. The ZIP deliberately does NOT contain your existing `src/theme.css`, `src/fonts`, `src/email.js`, `src/email.d.ts`, existing build scripts, or original `package.json`. Keep them untouched.

## 1. Copy files
Copy `src/components/`, `src/styles/`, `src/index.ts`, `src/vue-shim.d.ts`, `vite.config.ts`, `tsconfig.components.json` into your existing `ui-theme` repo. Put `examples/` in the repo for reference.

## 2. Install dev dependencies

```bash
npm install -D vite @vitejs/plugin-vue typescript vue-tsc
npm install -D vue@^3.5
```

Vue is a **peer dependency for consumers**. Include this in package.json:

```json
"peerDependencies": { "vue": "^3.5.0" }
```

If this package is consumed by non-Vue apps that only import the CSS, make Vue an optional peer:

```json
"peerDependenciesMeta": { "vue": { "optional": true } }
```

## 3. Update `package.json` carefully

**Merge** these entries into the EXISTING `package.json`. Do not replace its existing exports or scripts. Example:

```json
{
  "scripts": {
    "build:components": "vite build",
    "typecheck:components": "vue-tsc --noEmit -p tsconfig.components.json"
  },
  "exports": {
    "./vue": {
      "types": "./dist/vue/index.d.ts",
      "import": "./dist/vue/index.js"
    },
    "./components.css": "./src/styles/components.css"
  },
  "files": ["dist", "src/theme.css", "src/styles", "src/fonts", "src/email.js", "src/email.d.ts"]
}
```

IMPORTANT: For npm publishing, prefer shipping compiled styles in `dist` (see note below). The example `./components.css` source export works because `src/styles` is explicitly included in `files`. Keep all your pre-existing exports (including `./theme.css`, `./email`, etc.) and existing `files` entries, adjusting them as necessary. If your existing package uses `./dist/theme.css` instead of `./src/theme.css`, preserve that location.

Vue type declarations: `vite build` does not emit declaration files. Add `vite-plugin-dts` for real types:

```bash
npm install -D vite-plugin-dts
```

Then modify `vite.config.ts`:

```ts
import dts from 'vite-plugin-dts';
// inside plugins: [vue(), dts({ insertTypesEntry: true, outDir: 'dist/vue', include: ['src/**/*.ts', 'src/**/*.vue'] })],
```

Check that `dist/vue/index.d.ts` exists before publishing. If `vite-plugin-dts` generates a different entry path, update the package export rather than publishing a broken declaration reference.

## 4. Build and publish

```bash
npm run typecheck:components
npm run build:components
# Run your existing build script too (if there is one) to preserve legacy dist assets.
npm pack --dry-run
```

Inspect `npm pack --dry-run` and verify font assets, theme.css, email assets, compiled Vue JS and declaration files are present. Then bump package version and publish through your existing GitHub Packages workflow.

## 5. In a Vue app

```ts
import '@virexen-group/ui-theme/theme.css'; // use your EXISTING export path
import '@virexen-group/ui-theme/components.css';
import { VInput, VButton, VFormField } from '@virexen-group/ui-theme/vue';
```

See `examples/ExampleForm.vue`.

## Usage notes
- `VFormField` provides slot props `id`, `describedby`, `invalid`: pass them to the input to associate labels, hints and errors.
- File upload emits browser `File` objects and validates max size client-side. The consuming app handles actual upload, server validation, permissions and security.
- `VInput` emits a string even with `type=number`. Convert/validate in the application if numeric state is needed.
- CSS class names are `vx-*` to avoid collisions with legacy `.field`, `.btn`, etc.
- No router, authentication, API requests, or backend dependencies are included.
- These files are a starter scaffold, not tested against your existing package config; verify build and integration before publication.


---

## Sandbox

# Virexen UI · Local sandbox

This is an **additive overlay** for your existing `ui-theme` repository. It does not replace package.json, your library build's vite.config.ts, your fonts, CSS, or your email.js.

## Installation
1. Extract this archive into the root of your existing `ui-theme` repo (so `sandbox/` and `vite.sandbox.config.ts` sit alongside package.json).
2. Add the following script to the existing `scripts` object in package.json:

   `"dev:sandbox": "vite --config vite.sandbox.config.ts"`

3. Use your existing pnpm dependencies (`vue`, `vite`, `@vitejs/plugin-vue`, `sanitize-html`). From repo root:

   `pnpm install`

   `pnpm dev:sandbox`

4. Open the **Local** URL that Vite prints (normally http://127.0.0.1:5173).

## What it provides
- Component gallery imports actual Vue components directly from `src/index.ts` and styles from `src/theme.css` / `src/styles/components.css`. Changes hot-reload.
- Email editor provides example templates, HTML/text body, subject, title, preheader, recipient, variable JSON, required placeholders, desktop/mobile iframe, and copy HTML/text.
- The POST `/__sandbox/render-email` endpoint uses Vite's SSR loader to call the **actual** `src/email.js` function on the local dev server, so no separate client-side reimplementation of email sanitization is needed. It never sends email or posts to an external email service.
- Email preview uses an iframe with `sandbox=""`; links/scripts cannot escape into the surrounding app. The email's referenced remote logo image may still load over the internet.
- The sandbox is not part of `dist` or published NPM package (`files: ["dist"]`).

## Notes
- Requires the starter Vue components (`src/index.ts` etc.) from the earlier Virexen UI starter to already exist.
- These pages are for local development only, do not expose Vite's dev server on a public interface.
- Email client rendering can vary; test final mail in real Gmail/Outlook/Apple Mail clients.
- For TypeScript, if your existing typecheck config does not include `sandbox/**`, that is fine — the library typecheck remains unchanged.
- This is intentionally separate from the Vite *library* build to avoid bundling Node-only `sanitize-html` into a browser package.
- If your email source uses a Markdown link like `[https://...](https://...)` as the value of `logo`, replace it with only the URL string in `src/email.js`. HTML img src needs a bare URL.


---

## Upgrade

# Virexen UI — Extended components

**Merge into existing `ui-theme`; do not replace `theme.css` or `package.json`.**

## Install
1. Merge the included `src/components` files into your repository; `VFileUpload.vue` intentionally replaces the older file.
2. **Append** `src/styles/upgrade.css` contents to your existing `src/styles/components.css`, or add `@import './upgrade.css';` at the very top of `components.css` and store it beside that file. The existing build-assets script copies only `components.css`; imports are supported but test the packaged output for browser resolution. Appending is simplest.
3. Add the following exports to `src/index.ts`:

```ts
export { default as VSearchSelect } from './components/forms/VSearchSelect.vue';
export type { SearchOption } from './components/forms/VSearchSelect.vue';
export { default as VUserMenu } from './components/account/VUserMenu.vue';
export type { UserMenuItem, UserMenuAccount } from './components/account/VUserMenu.vue';
export { default as VAppHeader } from './components/layout/VAppHeader.vue';
```

4. Optionally copy `sandbox/ExtendedComponents.vue` to your sandbox and render it in a new gallery tab, or import it temporarily into your sandbox app.
5. Run `pnpm typecheck && pnpm build && pnpm test` before publishing.

## API
- `VSearchSelect`: `v-model` is option value string (or null), `options` array `{label,value,disabled?,description?}`, `@search` for remote loading; `remote` means app filters/loads options.
- `VFileUpload`: `@change` emits actual `File[]`; image thumbnails are object URLs revoked on removal/unmount, other files show filename, type and size. Files are not uploaded until your app uploads them. `accept` and size checks are client-side only; repeat checks on server.
- `VUserMenu`: `user` may be null (shows Sign in) and app-supplied `items` array, emits `select` with item ID; implement actual navigation and logout in your application.
- `VAppHeader`: app-supplied brand, optional search, actions slot, brand slot, center slot, user/menu props and event forwarding.

**Notes:** This is an initial shared pattern, not production-ready fully audited accessibility. For complex selects, add stable generated ARIA IDs, active descendant wiring and robust keyboard/mouse-focus handling before a broad rollout. User-menu keyboard navigation should be brought up to WAI-ARIA menu pattern expectations if using menu roles. Do not use the component as authentication or authorization enforcement. For dynamic server search, debounce requests and guard against stale response ordering in the consuming application.


---

## Upgrade 2

# Virexen UI — Extended components

**Merge into existing `ui-theme`; do not replace `theme.css` or `package.json`.**

## Install
1. Merge the included `src/components` files into your repository; `VFileUpload.vue` intentionally replaces the older file.
2. **Append** `src/styles/upgrade.css` contents to your existing `src/styles/components.css`, or add `@import './upgrade.css';` at the very top of `components.css` and store it beside that file. The existing build-assets script copies only `components.css`; imports are supported but test the packaged output for browser resolution. Appending is simplest.
3. Add the following exports to `src/index.ts`:

```ts
export { default as VSearchSelect } from './components/forms/VSearchSelect.vue';
export type { SearchOption } from './components/forms/VSearchSelect.vue';
export { default as VUserMenu } from './components/account/VUserMenu.vue';
export type { UserMenuItem, UserMenuAccount } from './components/account/VUserMenu.vue';
export { default as VAppHeader } from './components/layout/VAppHeader.vue';
```

4. Optionally copy `sandbox/ExtendedComponents.vue` to your sandbox and render it in a new gallery tab, or import it temporarily into your sandbox app.
5. Run `pnpm typecheck && pnpm build && pnpm test` before publishing.

## API
- `VSearchSelect`: `v-model` is option value string (or null), `options` array `{label,value,disabled?,description?}`, `@search` for remote loading; `remote` means app filters/loads options.
- `VFileUpload`: `@change` emits actual `File[]`; image thumbnails are object URLs revoked on removal/unmount, other files show filename, type and size. Files are not uploaded until your app uploads them. `accept` and size checks are client-side only; repeat checks on server.
- `VUserMenu`: `user` may be null (shows Sign in) and app-supplied `items` array, emits `select` with item ID; implement actual navigation and logout in your application.
- `VAppHeader`: app-supplied brand, optional search, actions slot, brand slot, center slot, user/menu props and event forwarding.

**Notes:** This is an initial shared pattern, not production-ready fully audited accessibility. For complex selects, add stable generated ARIA IDs, active descendant wiring and robust keyboard/mouse-focus handling before a broad rollout. User-menu keyboard navigation should be brought up to WAI-ARIA menu pattern expectations if using menu roles. Do not use the component as authentication or authorization enforcement. For dynamic server search, debounce requests and guard against stale response ordering in the consuming application.


---

## Recovery Readme

SAFE RECOVERY BUNDLE. Copy only missing files using unzip -n. NEVER overwrite existing files automatically.
The original tracked theme.css, email.js, email.d.ts, and fonts are not in this bundle. Restore those from Git.
This bundle consolidates starter, upgrade, workflow and sandbox files.
If index.ts/components.css already exist, unzip -n will leave them unchanged: compare manually before replacing.
No existing Git-tracked files should be deleted.
