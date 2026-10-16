# Account dropdown and header options

`VUserMenu` is a single shared component. Application-controlled links come from `items` (or `VAppHeader`'s `user-items`). The dropdown always ends with a Help & Support link and a Logout action. Those two fixed entries are not duplicated even if legacy callers include them in the `items` array. A missing `items` array produces no application entries.

```vue
<VAppHeader
  :user="user"
  :user-items="[
    { id: 'profile', label: 'My profile', icon: 'user-round' },
    { id: 'workspace', label: 'Workspace', icon: 'building-2' }
  ]"
  :user-show-appearance="true"
  user-support-href="https://support.virexen.com"
  @menu-select="onUserAction"
  @user-appearance-change="setTheme"
/>
```

Set `:user-show-appearance="false"` to omit the Light/Dark/System selector. In all cases, Help & Support and Logout follow the app-defined links and optional theme selector. Handle `menu-select` values `logout` and `support` in the host application; the UI component does not log users out itself. Help & Support is also a real link to `supportHref` (default `https://support.virexen.com`).

The header no longer renders a support icon. It still supports search, launcher, notifications, and the account picker. Its menu surface follows `data-vx-theme="light"` / `"dark"` on the root and accepts the existing semantic colour tokens. For automatic system mode, configure the theme composable used by your app.

`useDefaultItems` is retained as a deprecated prop for compatibility but has no effect: app items must be provided explicitly.

Preview: `http://127.0.0.1:5173/header.html` (click the account control).
