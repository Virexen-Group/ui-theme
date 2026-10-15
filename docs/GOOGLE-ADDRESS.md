# Google Places address autocomplete

`VAddressInput` now supports optional Google Places Autocomplete (New), without storing API keys inside the library.

```vue
<VAddressInput
  v-model="address"
  autocomplete-provider="google"
  :google-api-key="mapsKey"
  default-country="GB"
/>
```

Or use `VGoogleAddressAutocomplete` directly with `@selected="onAddressSelected"` to receive `{country,addressLine1,addressLine2,city,region,postalCode,placeId,formattedAddress}`. The host should review, validate, and save address details on its own backend.

## Sandbox

1. Create `sandbox/.env.local` (the Vite root is sandbox). Add `VITE_GOOGLE_MAPS_API_KEY=...`.
2. Enable **Maps JavaScript API** and **Places API (New)** in a billing-enabled Google Cloud project.
3. Restrict the browser API key by website referrer. Include `http://127.0.0.1:5173/*` for local development and each app's HTTPS domain for production. Restrict its allowed APIs.
4. Run `pnpm dev:sandbox`, visit `/smart.html`, type an address, select a result, and confirm populated fields.

The key is visible in browser requests; that is normal for restricted browser keys. Never put a server secret in VITE_* variables. No key or Maps request is made unless Google autocomplete is enabled and a key is supplied. Manual editing always remains possible.

The Google widget is managed by Google, including its predictions and attribution. It may not precisely match custom Virexen input styling. Google Places Autocomplete has usage-based charges and data-handling terms. This is search assistance, **not** proof that an address exists. For verified addresses, integrate a separate address-validation service.

Note: location/region data structures vary by country; always allow the user to correct fields. Changing a selected country updates autocomplete country restrictions.
