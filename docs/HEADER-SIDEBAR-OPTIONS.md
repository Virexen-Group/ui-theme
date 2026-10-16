# Header and sidebar appearance

Both navigation components retain their existing API. `showLogo` only controls the brand icon; `showBrand` controls the entire brand group in the header. `showAppSwitcher` independently enables/disables application selection.

```vue
<VAppHeader
  surface="subtle"
  :show-brand="true"
  :show-logo="true"
  :show-app-switcher="true"
  :user="user"
  @notifications-click="openNotifications"
  @support-click="openSupport"
/>

<VSidebar
  :items="items"
  branding-placement="sidebar"
  :show-logo="false"
  :show-app-switcher="true"
  :apps="apps"
/>
```

Header `surface` options: `subtle` (default), `solid`, `transparent`. The subtle surface mixes shared theme background/surface tokens, preserves a thin border, and applies backdrop blur. Header action icons use the shared `VIcon` system (`headset`, `bell-ring`).

The header app launcher defaults to the Virexen-only catalogue. Sidebar apps are provided by the consuming application and can be empty. `showLogo` does not hide app names. Existing `showBrand` and `brandingPlacement` options remain supported.

Preview at `/header.html` and `/sidebar.html`.
