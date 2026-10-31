# Camp Forest appearance pack

Opt-in forest-green and warm neutral semantic tokens for CampPulze and PulzeConnect. Existing apps keep their current appearance unless they activate the pack. No duplicate shell, bottom navigation or component library is introduced.

```ts
// Import after base theme/components, theme-modes and command-center styles.
import '@virexen-group/ui-theme/camp-forest.css';
document.documentElement.dataset.vxPack = 'camp-forest';
```

Alternatively place `vx-camp-forest` on the root application container. Existing light/dark controls remain authoritative: both `data-vx-theme="dark"` and legacy `data-theme="dark"` are supported. Remove the pack attribute/class to restore the original tokens. The pack is independent of the light/dark selection; it must not replace user theme preferences.

Reuse the existing components:

- `VAppHeader` and `VSidebar` for staff navigation.
- `VBottomNavigation` (`/vue/bottom-navigation`) for mobile parent/staff navigation. `variant="pill"` or `"floating"`, default mobile visibility below 768px, and emitted `select` for Vue Router actions. Keep items permission filtered in the host. The component has safe-area padding; add corresponding page bottom padding in the host so it never covers content. It does not decide the app's destinations or whether a page should have navigation.
- `VWelcomeBanner` for scenic backgrounds and the existing `forest` preset; supply approved image URLs/blobs through existing storage/branding flows.
- Existing cards, form controls, data tables, tabs, modal/drawer, badges and skeletons for page content.

Primary actions can use `--vx-primary` and `--vx-on-primary`. The latter becomes dark text on the pale green dark-theme primary surface. Do not hardcode white text for every primary action. Related tokens: `--vx-primary-soft`, `--vx-camp-heading`, `--vx-camp-canvas`, `--vx-camp-surface`, `--vx-camp-surface-soft`, `--vx-camp-border`, `--vx-camp-text`, `--vx-camp-muted`, `--vx-camp-selected`, `--vx-camp-selected-text`, `--vx-camp-card-shadow`, `--vx-camp-hero-wash`.

Bottom navigation allows `--vx-bottomnav-surface`, `--vx-bottomnav-text`, `--vx-bottomnav-muted`, `--vx-bottomnav-active`, `--vx-bottomnav-active-bg`, and `--vx-bottomnav-border`; this pack provides coordinated dark forest mobile navigation. These overrides are optional for every other app and preserve the original default styles.

Host responsibilities: preserve permission checks and accessible routing, manage mobile “More” menus using the existing Drawer, render actual records rather than mock counters, reserve mobile navigation clearance, and keep public standalone application/login routes free of authenticated navigation. Background images remain app branding assets, not bundled fake records or fixed demo imagery.
