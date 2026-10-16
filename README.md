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


## Header & Sidebar preview

Open `http://127.0.0.1:5173/sidebar.html` or choose **Navigation → Header & sidebar interactive playground**. The playground has a link back to the docs homepage.

`VAppHeader` retains its existing props/events and adds `showNotifications`, `notificationCount`, `notificationHref`, `showSupport`, `supportHref` and `showBrand`, plus `notificationsClick` and `supportClick` events. Search is left-aligned; actions and `VUserMenu` are right-aligned. `VSidebar` is reused, not duplicated.

```vue
<VAppHeader :user="user" :notification-count="3" @search="search" @notifications-click="openNotifications" @support-click="openSupport" />
<VSidebar :items="items" v-model:expanded="expanded" @navigate="navigate" />
```


## Public Virexen launcher & Other Apps

`VAppHeader` includes public destinations for Virexen, Virexen Pay, My Virexen, Workspace, Support and Marlo. Cloud, CMS, Identity and Developer are not default launcher entries. The brand assets remain exportable separately.

Pass `launcherOtherApps` from your authenticated backend account entitlements. The UI library **does not fetch or grant permissions** and must not contain private endpoints or authentication tokens. For example:

```vue
<VAppHeader
  :launcher-other-apps="authorisedApps"
  @app-select="app => console.log(app.id)"
/>
```

```ts
const authorisedApps = [
  { id: 'camppulze', label: 'CampPulze', logoUrl: 'https://edge.virexen.com/apps/CampPulze/SVG/CampPulze.svg', href: 'https://camppulze.app' }
];
```

With `VSidebar`, use the existing `apps` and new `otherApps` props. Selecting an item that has an HTTPS `href` navigates to that destination; the `select` event still fires.


## Sidebar branding and application icons

`VSidebar` supports three independent props (all default to `true`):

```vue
<VSidebar
  branding-placement="sidebar"
  :items="items"
  :show-brand="true"
  :show-logo="false"
  :show-app-switcher="false"
/>
```

`show-brand=false` hides the entire sidebar branding area, including the app selector and product label. `show-logo=false` hides only the image; `show-app-switcher=false` hides only the picker (the remaining branding may still be shown). To show the branding in the sidebar, set `branding-placement="sidebar"`.

Visit `/foundations.html#official-app-icon-gallery` to preview CampPulze, CampPulze Health and PulzeConnect with SVG, PNG, WebP and ICO controls, size selection and copyable asset links. `/sidebar.html` has the interactive sidebar branding switch.


## User account menu

`VUserMenu` is the existing shared account dropdown, redesigned with a compact dark menu, account identity summary, profile/settings/workspaces/notifications actions, Light/Dark/System selector, Help & support, Sign out, and Identity footer. Default rows are used only when `items` is empty and `useDefaultItems` is true.

```vue
<VAppHeader :user="{ name: 'Demo User', email: 'demo@virexen.com' }"
  user-appearance="system"
  @user-appearance-change="setAppearance"
  @menu-select="handleAccountAction" />
```

`@menu-select` is an action request; the application must perform navigation, authentication changes, and enforce permissions. Appearance is controlled by `userAppearance` and `@user-appearance-change` and is not applied automatically to the document. The demo is at `/header.html`.


## Interactive component showcases

The documentation now contains the original component styles within its current shared navigation: `components.html#button-packs` for all four button packs and states; `foundations.html#theme-playground` for Default, Calm, Bold and Enterprise; and `feedback.html#toast-playground` for notification variants and real toasts. Every showcase includes View code and Copy code controls. The original `packs.html` playground is kept for backward compatibility.
