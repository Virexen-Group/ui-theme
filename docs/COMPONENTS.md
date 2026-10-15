# Virexen UI component reference

Import shared components from `@virexen-group/ui-theme/vue` and CSS from explicit package exports.

```ts
import { VSidebar, VButton, VFormWorkflow, VIdentitySignIn } from '@virexen-group/ui-theme/vue';
import '@virexen-group/ui-theme/theme.css';
import '@virexen-group/ui-theme/components.css';
```

## Component index

### Account

- `VUserMenu` — `src/components/account/VUserMenu.vue`

### Buttons

- `VButton` — `src/components/buttons/VButton.vue`

### Data

- `VDataTable` — `src/components/data/VDataTable.vue`
- `VStatCard` — `src/components/data/VStatCard.vue`

### Dialogs

- `VConfirmDialog` — `src/components/dialogs/VConfirmDialog.vue`

### Feedback

- `VAlert` — `src/components/feedback/VAlert.vue`
- `VBadge` — `src/components/feedback/VBadge.vue`
- `VProgress` — `src/components/feedback/VProgress.vue`
- `VSkeleton` — `src/components/feedback/VSkeleton.vue`
- `VNotification` — `src/components/feedback/VNotification.vue`
- `VToastProvider` — `src/components/feedback/VToastProvider.vue`

### Finance

- `VCurrencyAmount` — `src/components/finance/VCurrencyAmount.vue`
- `VPriceBreakdown` — `src/components/finance/VPriceBreakdown.vue`

### Forms

- `VFormField` — `src/components/forms/VFormField.vue`
- `VInput` — `src/components/forms/VInput.vue`
- `VSelect` — `src/components/forms/VSelect.vue`
- `VTextarea` — `src/components/forms/VTextarea.vue`
- `VCheckbox` — `src/components/forms/VCheckbox.vue`
- `VFileUpload` — `src/components/forms/VFileUpload.vue`
- `VSearchSelect` — `src/components/forms/VSearchSelect.vue`
- `VFormWorkflow` — `src/components/forms/VFormWorkflow.vue`
- `VSwitch` — `src/components/forms/VSwitch.vue`
- `VDatePicker` — `src/components/forms/VDatePicker.vue`
- `VDateRange` — `src/components/forms/VDateRange.vue`
- `VMultiSelect` — `src/components/forms/VMultiSelect.vue`
- `VCurrencyInput` — `src/components/forms/VCurrencyInput.vue`
- `VFormSection` — `src/components/forms/VFormSection.vue`
- `VSessionSelectCard` — `src/components/forms/VSessionSelectCard.vue`

### Icons

- `VIcon` — `src/components/icons/VIcon.vue`

### Identity

- `VIdentitySignIn` — `src/components/identity/VIdentitySignIn.vue`

### Layout

- `VAppHeader` — `src/components/layout/VAppHeader.vue`
- `VCard` — `src/components/layout/VCard.vue`
- `VPageHeader` — `src/components/layout/VPageHeader.vue`
- `VStack` — `src/components/layout/VStack.vue`
- `VEmptyState` — `src/components/layout/VEmptyState.vue`
- `VThemeToggle` — `src/components/layout/VThemeToggle.vue`

### Navigation

- `VTabs` — `src/components/navigation/VTabs.vue`
- `VBreadcrumbs` — `src/components/navigation/VBreadcrumbs.vue`
- `VPagination` — `src/components/navigation/VPagination.vue`
- `VCommandPalette` — `src/components/navigation/VCommandPalette.vue`
- `VSidebar` — `src/components/navigation/VSidebar.vue`
- `VAppSwitcher` — `src/components/navigation/VAppSwitcher.vue`

### Overlays

- `VDrawer` — `src/components/overlays/VDrawer.vue`
- `VModal` — `src/components/overlays/VModal.vue`
- `VTooltip` — `src/components/overlays/VTooltip.vue`

## Shared sidebar example

```vue
<script setup lang="ts">
import { VSidebar } from '@virexen-group/ui-theme/vue';
// Supply menu items, current route, app permissions and click handlers from your application.
</script>
```

See `sandbox/SidebarDemo.vue` for actual props and events supported by this package.

## Form workflows
See `sandbox/FormWorkflowExample.vue` and `sandbox/CheckoutDemo.vue`. Validation and persistence remain app responsibilities.

## Identity login component

```vue
<script setup lang="ts">
import { VIdentitySignIn } from '@virexen-group/ui-theme/vue';
function beginSignIn() {
  // Start app-controlled, server-validated OIDC Authorization Code + PKCE flow
}
</script>
<template>
  <VIdentitySignIn application-name="CampPulze" @sign-in="beginSignIn" />
</template>
```

Do not embed client secrets, passwords, passkeys, or token exchanges inside this component. For a secure deployment, redirect to the configured Virexen Identity authorization endpoint; your app backend manages state, nonce, PKCE and callback validation.

## Theme switching

```ts
import { initVTheme, setVTheme } from '@virexen-group/ui-theme/vue';
initVTheme(); // once during client startup
setVTheme('dark'); // 'light' | 'dark' | 'system'
```

```vue
<VThemeToggle />
```

Load `theme.css` and `theme-modes.css` before component styles. The selected preference is stored in browser localStorage and system mode follows OS colour preference.

## Extra styles

| Import | Purpose |
|---|---|
| `@virexen-group/ui-theme/theme.css` | theme styles |
| `@virexen-group/ui-theme/theme-modes.css` | theme-modes styles |
| `@virexen-group/ui-theme/components.css` | components styles |
| `@virexen-group/ui-theme/workflow.css` | workflow styles |
| `@virexen-group/ui-theme/commerce.css` | commerce styles |
| `@virexen-group/ui-theme/sidebar.css` | sidebar styles |
| `@virexen-group/ui-theme/packs-notifications.css` | packs-notifications styles |
| `@virexen-group/ui-theme/master.css` | master styles |
| `@virexen-group/ui-theme/identity.css` | identity styles |

## Documentation demos

- `/` master component catalogue
- `/master.html` interactive component lab
- `/sidebar.html` collapsed/expanded sidebar
- `/identity.html` shared SSO sign-in design
- `/checkout-demo.html` full-page application flow
- `/legacy.html` email playground and earlier demos


### English language variants

`VLanguageSelect` includes `English` (`en`), `English (UK)` (`en-GB`), and `English (US)` (`en-US`). These variants are searchable and returned through `v-model` as BCP 47 codes. The base `en` option remains for existing applications.
