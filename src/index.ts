export { default as VButton } from './components/buttons/VButton.vue';
export { default as VAlert } from './components/feedback/VAlert.vue';
export { default as VFormField } from './components/forms/VFormField.vue';
export { default as VInput } from './components/forms/VInput.vue';
export { default as VSelect } from './components/forms/VSelect.vue';
export { default as VTextarea } from './components/forms/VTextarea.vue';
export { default as VCheckbox } from './components/forms/VCheckbox.vue';
export { default as VFileUpload } from './components/forms/VFileManager.vue';
export type { SelectOption } from './components/forms/VSelect.vue';

export { default as VSearchSelect } from './components/forms/VSearchSelect.vue';
export { default as VUserMenu } from './components/account/VUserMenu.vue';
export { default as VAppHeader } from './components/layout/VAppHeader.vue';
export { default as VFormWorkflow } from './components/forms/VFormWorkflow.vue';

export { default as VCard } from './components/layout/VCard.vue';
export { default as VPageHeader } from './components/layout/VPageHeader.vue';
export { default as VStack } from './components/layout/VStack.vue';
export { default as VEmptyState } from './components/layout/VEmptyState.vue';
export { default as VBadge } from './components/feedback/VBadge.vue';
export { default as VProgress } from './components/feedback/VProgress.vue';
export { default as VSkeleton } from './components/feedback/VSkeleton.vue';
export { default as VSwitch } from './components/forms/VSwitch.vue';
export { default as VDatePicker } from './components/forms/VDatePicker.vue';
export { default as VDateRange } from './components/forms/VDateRange.vue';
export { default as VMultiSelect } from './components/forms/VMultiSelect.vue';
export { default as VCurrencyInput } from './components/forms/VCurrencyInput.vue';
export { default as VFormSection } from './components/forms/VFormSection.vue';
export { default as VTabs } from './components/navigation/VTabs.vue';
export { default as VBreadcrumbs } from './components/navigation/VBreadcrumbs.vue';
export { default as VPagination } from './components/navigation/VPagination.vue';
export { default as VDrawer } from './components/overlays/VDrawer.vue';
export { default as VModal } from './components/overlays/VModal.vue';
export { default as VTooltip } from './components/overlays/VTooltip.vue';
export { default as VDataTable } from './components/data/VDataTable.vue';
export { default as VStatCard } from './components/data/VStatCard.vue';
export { default as VCommandPalette } from './components/navigation/VCommandPalette.vue';
export { default as VIcon } from './components/icons/VIcon.vue';
export { default as VSidebar } from './components/navigation/VSidebar.vue';
export { default as VAppSwitcher } from './components/navigation/VAppSwitcher.vue';
export { default as VNotification } from './components/feedback/VNotification.vue';
export { default as VToastProvider } from './components/feedback/VToastProvider.vue';
export { default as VConfirmDialog } from './components/dialogs/VConfirmDialog.vue';
export { default as VSessionSelectCard } from './components/forms/VSessionSelectCard.vue';
export { default as VCurrencyAmount } from './components/finance/VCurrencyAmount.vue';
export { default as VPriceBreakdown } from './components/finance/VPriceBreakdown.vue';
export {useVToast} from './composables/useVToast';

export { default as VThemeToggle } from './components/layout/VThemeToggle.vue';
export { default as VIdentitySignIn } from './components/identity/VIdentitySignIn.vue';
export { useVTheme, initVTheme, setVTheme } from './composables/useVTheme';
export type { VTheme } from './composables/useVTheme';

// Master UI roadmap extensions
export { default as VTypography } from './components/foundations/VTypography.vue';
export { default as VGrid } from './components/foundations/VGrid.vue';
export { default as VTimePicker } from './components/forms/VTimePicker.vue';
export { default as VDateTimePicker } from './components/forms/VDateTimePicker.vue';
export { default as VMaskedInput } from './components/forms/VMaskedInput.vue';
export { default as VRichTextEditor } from './components/forms/VRichTextEditor.vue';
export { default as VFileManager } from './components/forms/VFileManager.vue';
export { default as VBottomNavigation } from './components/navigation/VBottomNavigation.vue';
export { default as VPermissionMenu } from './components/navigation/VPermissionMenu.vue';
export { default as VChart } from './components/data/VChart.vue';
export { default as VAdvancedTable } from './components/data/VAdvancedTable.vue';
export { default as VStatusState } from './components/data/VStatusState.vue';
export { default as VNotificationCentre } from './components/feedback/VNotificationCentre.vue';
export { default as VProductSelectCard } from './components/commerce/VProductSelectCard.vue';
export { default as VOrderSummary } from './components/commerce/VOrderSummary.vue';
export { default as VPaymentMethod } from './components/commerce/VPaymentMethod.vue';
export { default as VInvoicePreview } from './components/commerce/VInvoicePreview.vue';
export { default as VSubscriptionPricing } from './components/commerce/VSubscriptionPricing.vue';
export { default as VDashboardShell } from './components/layout/VDashboardShell.vue';
export { default as VProfileView } from './components/layout/VProfileView.vue';
export { default as VResponsiveCardGrid } from './components/layout/VResponsiveCardGrid.vue';
export { default as VCalendar } from './components/calendar/VCalendar.vue';
export { default as VScheduler } from './components/calendar/VScheduler.vue';

export { default as VPhoneInput } from './components/forms/VPhoneInput.vue';

// Smart Data Inputs
export {getSmartOptions,countries,languages,timezones,regionsByCountry} from './data/smart-options';
export type {SmartOption,SmartDataSource} from './data/smart-options';
export {getAddressRules,validatePostalCode,addressRules} from './utils/postal';
export {default as VCountrySelect} from './components/forms/VCountrySelect.vue';
export {default as VTimezoneSelect} from './components/forms/VTimezoneSelect.vue';
export {default as VLanguageSelect} from './components/forms/VLanguageSelect.vue';
export {default as VRegionSelect} from './components/forms/VRegionSelect.vue';
export {default as VPostalCodeInput} from './components/forms/VPostalCodeInput.vue';
export {default as VAddressInput} from './components/forms/VAddressInput.vue';

export { default as VGoogleAddressAutocomplete } from './components/forms/VGoogleAddressAutocomplete.vue';

export {default as VNameInput} from './components/forms/VNameInput.vue';
export {default as VValidatedDate} from './components/forms/VValidatedDate.vue';
export {default as VDateOfBirth} from './components/forms/VDateOfBirth.vue';
export {default as VEmailInput} from './components/forms/VEmailInput.vue';
export {default as VValidatedInput} from './components/forms/VValidatedInput.vue';
export {getLanguageOptions} from './data/smart-options';
export type {LanguageDisplayFormat} from './data/smart-options';

export { defineVirexenUI, resolveVirexenUI, createVirexenUI, applyVirexenUI, getVirexenUI, useVirexenUI, defaultVirexenUIConfig } from './config/virexen-ui';
export type { VirexenUIConfig, VxThemePreset, VxAppearance } from './config/virexen-ui';

// Virexen Dashboard & Motion
export { default as VDashboardGrid } from './components/dashboard/VDashboardGrid.vue';
export { default as VMetricTile } from './components/dashboard/VMetricTile.vue';
export { default as VChartTile } from './components/dashboard/VChartTile.vue';
export { default as VActionTile } from './components/dashboard/VActionTile.vue';
export { default as VStatusTile } from './components/dashboard/VStatusTile.vue';
export { default as VProfileTile } from './components/dashboard/VProfileTile.vue';
export { default as VProgressTile } from './components/dashboard/VProgressTile.vue';
export { default as VActivityTile } from './components/dashboard/VActivityTile.vue';
export { default as VCustomTile } from './components/dashboard/VCustomTile.vue';
export { default as VTransition } from './components/motion/VTransition.vue';
export { default as VAnimatedNumber } from './components/motion/VAnimatedNumber.vue';
export { default as VReveal } from './components/motion/VReveal.vue';
export { useMotion } from './composables/useMotion';
export { useDashboardLayout } from './composables/useDashboardLayout';

// v0.5.1 application toolkit
export { default as VDataGrid } from './components/data/VDataGrid.vue';
export { default as VAppShell } from './components/layout/VAppShell.vue';
export { default as VSettingsLayout } from './components/layout/VSettingsLayout.vue';
export { default as VProfileLayout } from './components/layout/VProfileLayout.vue';
export { default as VWizardLayout } from './components/layout/VWizardLayout.vue';
export { default as VDetailDrawer } from './components/overlays/VDetailDrawer.vue';
export { default as VImageUploader } from './components/forms/VImageUploader.vue';
export { default as VDocumentViewer } from './components/data/VDocumentViewer.vue';
export { default as VMediaGallery } from './components/data/VMediaGallery.vue';
export { default as VAvatarEditor } from './components/account/VAvatarEditor.vue';
export { default as VUploadProgress } from './components/feedback/VUploadProgress.vue';
export { default as VUnsavedChanges } from './components/feedback/VUnsavedChanges.vue';
export { default as VFeedbackBanner } from './components/feedback/VFeedbackBanner.vue';
export { useNamedDashboards } from './composables/useNamedDashboards';
export type { SavedDashboard } from './composables/useNamedDashboards';

export { default as VContainer } from './components/layout/VContainer.vue';
export { default as VRow } from './components/layout/VRow.vue';
export { default as VCol } from './components/layout/VCol.vue';
export { default as VFlex } from './components/layout/VFlex.vue';
export { default as VHStack } from './components/layout/VHStack.vue';
export { default as VSpacer } from './components/layout/VSpacer.vue';
export { default as VDivider } from './components/layout/VDivider.vue';
export { default as VAspectRatio } from './components/layout/VAspectRatio.vue';
export { default as VScrollArea } from './components/layout/VScrollArea.vue';
export { default as VSection } from './components/layout/VSection.vue';
export { default as VBrandLogo } from './components/branding/VBrandLogo.vue';
export { VIREXEN_BRAND_ASSETS, VIREXEN_BRAND_COLORS, VIREXEN_PRODUCT_BRANDS, getVirexenBrandUrl } from './data/virexen-brand';
export type { VirexenBrand, VirexenBrandFormat } from './data/virexen-brand';

export { useFloatingPosition } from './composables/useFloatingPosition';
export { generateBrandPalette, meetsTextContrast } from './utils/brand-colors';
export { default as VFloatingPopover } from './components/overlays/VFloatingPopover.vue';

export {default as VAppIcon} from './components/branding/VAppIcon.vue';
export {getVirexenAppIconUrl,getVirexenFallbackUrl,VIREXEN_APP_ICON_NAMES,VIREXEN_APP_ICON_SIZES} from './data/app-icons';
export type {VirexenAppIconName,VirexenAppIconFormat,VirexenAppIconSize} from './data/app-icons';
export { VIREXEN_LAUNCHER_APPS } from './data/virexen-app-launcher';

export {default as VSecureInput} from './components/forms/VSecureInput.vue';
export {default as VCodeInput} from './components/forms/VCodeInput.vue';

// Commerce & billing presentation components
export {default as VProductCard} from './components/commerce/VProductCard.vue';
export {default as VProductSelector} from './components/commerce/VProductSelector.vue';
export {default as VQuantitySelector} from './components/commerce/VQuantitySelector.vue';
export {default as VDiscountCode} from './components/commerce/VDiscountCode.vue';
export {default as VDiscountBadge} from './components/commerce/VDiscountBadge.vue';
export {default as VBillingCycleSelector} from './components/commerce/VBillingCycleSelector.vue';
export {default as VPlanComparison} from './components/commerce/VPlanComparison.vue';
export {default as VCheckoutSteps} from './components/commerce/VCheckoutSteps.vue';
export {default as VPaymentMethodSelector} from './components/commerce/VPaymentMethodSelector.vue';
export {default as VPaymentMethodForm} from './components/commerce/VPaymentMethodForm.vue';
export {default as VSecurePaymentNotice} from './components/commerce/VSecurePaymentNotice.vue';
export {default as VPaymentSchedule} from './components/commerce/VPaymentSchedule.vue';
export {default as VCheckoutSummary} from './components/commerce/VCheckoutSummary.vue';
export {default as VPaymentStatus} from './components/commerce/VPaymentStatus.vue';
export {default as VPaymentConfirmation} from './components/commerce/VPaymentConfirmation.vue';
export {default as VInvoiceCard} from './components/commerce/VInvoiceCard.vue';
export {default as VInvoiceLineItems} from './components/commerce/VInvoiceLineItems.vue';
export {default as VInvoiceTimeline} from './components/commerce/VInvoiceTimeline.vue';
export {default as VReceiptPreview} from './components/commerce/VReceiptPreview.vue';
export {default as VSubscriptionCard} from './components/commerce/VSubscriptionCard.vue';
export {default as VPlanChangeSummary} from './components/commerce/VPlanChangeSummary.vue';
export {default as VRenewalNotice} from './components/commerce/VRenewalNotice.vue';
export {default as VOverdueNotice} from './components/commerce/VOverdueNotice.vue';
export {default as VTransactionList} from './components/commerce/VTransactionList.vue';
export {default as VTransactionDetails} from './components/commerce/VTransactionDetails.vue';
export {default as VRefundSummary} from './components/commerce/VRefundSummary.vue';
export {default as VAccountBalance} from './components/commerce/VAccountBalance.vue';
export {default as VFeeBreakdown} from './components/commerce/VFeeBreakdown.vue';

// Commerce & billing presentation components

export {default as VSettingsLinkCard} from './components/navigation/VSettingsLinkCard.vue';
export {default as VPaymentBrandIcon} from './components/commerce/VPaymentBrandIcon.vue';

export {default as VAccountListItem} from './components/account/VAccountListItem.vue';
