# Commerce and navigation fixes

The invoice accepts missing lines safely (empty state), and sample invoice lines are supplied to the documentation preview. Payment method supports `@select`, `@edit`, `@more`, `is-default`, `selected`, and `editable`. Price breakdown accepts `items`, `adjustments` with signed amounts, `total`, `currency` and optional line `icon`. Bottom navigation variants are styled directly within the component, including embedded `preview` and fixed/mobile navigation modes.

Examples:

```vue
<VPaymentMethod brand="Visa" last4="4242" holder="Alex Morgan" :expiry-month="12" :expiry-year="2028" is-default @edit="editCard" @more="openMenu" />
<VPriceBreakdown :items="[{ id: 'session', label: 'Session 1', amount: 500, icon: 'camp' }]" :adjustments="[{ id: 'discount', label: 'Discount', amount: -50 }]" currency="USD" />
<VInvoicePreview number="INV-001" issuer="My Business" customer="Alex" :lines="[]" />
<VBottomNavigation v-model="active" :items="tabs" variant="pill" visibility="mobile" />
```

In the sandbox preview, pass `preview` to VBottomNavigation. All buttons and icons use the shared Virexen UI tokens. The UI does not execute payment modifications or upload data; those remain application responsibilities.
