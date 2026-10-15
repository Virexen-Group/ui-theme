# Individual component imports and native-language labels

Install `@virexen-group/ui-theme` from GitHub Packages as before. No additional runtime dependencies are introduced.

## Individual imports

```vue
<script setup lang="ts">
import VInput from '@virexen-group/ui-theme/vue/input';
import VLanguageSelect from '@virexen-group/ui-theme/vue/language-select';
import VDateOfBirth from '@virexen-group/ui-theme/vue/date-of-birth';
import '@virexen-group/ui-theme/theme.css';
import '@virexen-group/ui-theme/components.css';
</script>
```

Existing named imports from `@virexen-group/ui-theme/vue` remain supported. The new subpaths are direct bundle entrypoints with generated TypeScript declarations, not separate pnpm packages. The underlying dependencies and styles still need to be loaded.

## Language display

```vue
<VLanguageSelect v-model="language" display-format="english-native" />
<VLanguageSelect v-model="language" display-format="native" />
<VLanguageSelect v-model="language" display-format="native-english" />
<VLanguageSelect v-model="language" display-format="english" />
```

Default is `english-native`: e.g. `French (français)`, `Japanese (日本語)`. Identical names appear just once. Values remain ISO codes (`fr`, `ja`, etc.). Both names and codes can be searched. Native labels use the browser's `Intl.DisplayNames`, so unusual/deprecated codes may fall back to English.

The generic `VSearchSelect data-source="languages"` also uses the new default labels.

## Available direct import paths

- `@virexen-group/ui-theme/vue/button` — `VButton`
- `@virexen-group/ui-theme/vue/alert` — `VAlert`
- `@virexen-group/ui-theme/vue/form-field` — `VFormField`
- `@virexen-group/ui-theme/vue/input` — `VInput`
- `@virexen-group/ui-theme/vue/select` — `VSelect`
- `@virexen-group/ui-theme/vue/textarea` — `VTextarea`
- `@virexen-group/ui-theme/vue/checkbox` — `VCheckbox`
- `@virexen-group/ui-theme/vue/file-upload` — `VFileUpload`
- `@virexen-group/ui-theme/vue/search-select` — `VSearchSelect`
- `@virexen-group/ui-theme/vue/user-menu` — `VUserMenu`
- `@virexen-group/ui-theme/vue/app-header` — `VAppHeader`
- `@virexen-group/ui-theme/vue/form-workflow` — `VFormWorkflow`
- `@virexen-group/ui-theme/vue/card` — `VCard`
- `@virexen-group/ui-theme/vue/page-header` — `VPageHeader`
- `@virexen-group/ui-theme/vue/stack` — `VStack`
- `@virexen-group/ui-theme/vue/empty-state` — `VEmptyState`
- `@virexen-group/ui-theme/vue/badge` — `VBadge`
- `@virexen-group/ui-theme/vue/progress` — `VProgress`
- `@virexen-group/ui-theme/vue/skeleton` — `VSkeleton`
- `@virexen-group/ui-theme/vue/switch` — `VSwitch`
- `@virexen-group/ui-theme/vue/date-picker` — `VDatePicker`
- `@virexen-group/ui-theme/vue/date-range` — `VDateRange`
- `@virexen-group/ui-theme/vue/multi-select` — `VMultiSelect`
- `@virexen-group/ui-theme/vue/currency-input` — `VCurrencyInput`
- `@virexen-group/ui-theme/vue/form-section` — `VFormSection`
- `@virexen-group/ui-theme/vue/tabs` — `VTabs`
- `@virexen-group/ui-theme/vue/breadcrumbs` — `VBreadcrumbs`
- `@virexen-group/ui-theme/vue/pagination` — `VPagination`
- `@virexen-group/ui-theme/vue/drawer` — `VDrawer`
- `@virexen-group/ui-theme/vue/modal` — `VModal`
- `@virexen-group/ui-theme/vue/tooltip` — `VTooltip`
- `@virexen-group/ui-theme/vue/data-table` — `VDataTable`
- `@virexen-group/ui-theme/vue/stat-card` — `VStatCard`
- `@virexen-group/ui-theme/vue/command-palette` — `VCommandPalette`
- `@virexen-group/ui-theme/vue/icon` — `VIcon`
- `@virexen-group/ui-theme/vue/sidebar` — `VSidebar`
- `@virexen-group/ui-theme/vue/app-switcher` — `VAppSwitcher`
- `@virexen-group/ui-theme/vue/notification` — `VNotification`
- `@virexen-group/ui-theme/vue/toast-provider` — `VToastProvider`
- `@virexen-group/ui-theme/vue/confirm-dialog` — `VConfirmDialog`
- `@virexen-group/ui-theme/vue/session-select-card` — `VSessionSelectCard`
- `@virexen-group/ui-theme/vue/currency-amount` — `VCurrencyAmount`
- `@virexen-group/ui-theme/vue/price-breakdown` — `VPriceBreakdown`
- `@virexen-group/ui-theme/vue/theme-toggle` — `VThemeToggle`
- `@virexen-group/ui-theme/vue/identity-sign-in` — `VIdentitySignIn`
- `@virexen-group/ui-theme/vue/typography` — `VTypography`
- `@virexen-group/ui-theme/vue/grid` — `VGrid`
- `@virexen-group/ui-theme/vue/time-picker` — `VTimePicker`
- `@virexen-group/ui-theme/vue/date-time-picker` — `VDateTimePicker`
- `@virexen-group/ui-theme/vue/masked-input` — `VMaskedInput`
- `@virexen-group/ui-theme/vue/rich-text-editor` — `VRichTextEditor`
- `@virexen-group/ui-theme/vue/file-manager` — `VFileManager`
- `@virexen-group/ui-theme/vue/bottom-navigation` — `VBottomNavigation`
- `@virexen-group/ui-theme/vue/permission-menu` — `VPermissionMenu`
- `@virexen-group/ui-theme/vue/chart` — `VChart`
- `@virexen-group/ui-theme/vue/advanced-table` — `VAdvancedTable`
- `@virexen-group/ui-theme/vue/status-state` — `VStatusState`
- `@virexen-group/ui-theme/vue/notification-centre` — `VNotificationCentre`
- `@virexen-group/ui-theme/vue/product-select-card` — `VProductSelectCard`
- `@virexen-group/ui-theme/vue/order-summary` — `VOrderSummary`
- `@virexen-group/ui-theme/vue/payment-method` — `VPaymentMethod`
- `@virexen-group/ui-theme/vue/invoice-preview` — `VInvoicePreview`
- `@virexen-group/ui-theme/vue/subscription-pricing` — `VSubscriptionPricing`
- `@virexen-group/ui-theme/vue/dashboard-shell` — `VDashboardShell`
- `@virexen-group/ui-theme/vue/profile-view` — `VProfileView`
- `@virexen-group/ui-theme/vue/responsive-card-grid` — `VResponsiveCardGrid`
- `@virexen-group/ui-theme/vue/calendar` — `VCalendar`
- `@virexen-group/ui-theme/vue/scheduler` — `VScheduler`
- `@virexen-group/ui-theme/vue/phone-input` — `VPhoneInput`
- `@virexen-group/ui-theme/vue/country-select` — `VCountrySelect`
- `@virexen-group/ui-theme/vue/timezone-select` — `VTimezoneSelect`
- `@virexen-group/ui-theme/vue/language-select` — `VLanguageSelect`
- `@virexen-group/ui-theme/vue/region-select` — `VRegionSelect`
- `@virexen-group/ui-theme/vue/postal-code-input` — `VPostalCodeInput`
- `@virexen-group/ui-theme/vue/address-input` — `VAddressInput`
- `@virexen-group/ui-theme/vue/google-address-autocomplete` — `VGoogleAddressAutocomplete`
- `@virexen-group/ui-theme/vue/name-input` — `VNameInput`
- `@virexen-group/ui-theme/vue/validated-date` — `VValidatedDate`
- `@virexen-group/ui-theme/vue/date-of-birth` — `VDateOfBirth`
- `@virexen-group/ui-theme/vue/email-input` — `VEmailInput`
- `@virexen-group/ui-theme/vue/validated-input` — `VValidatedInput`
