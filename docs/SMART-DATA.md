# Smart Data Inputs (v0.4.2)

Import from `@virexen-group/ui-theme/vue`:

```vue
<VSearchSelect v-model="country" data-source="countries" />
<VSearchSelect v-model="language" data-source="languages" />
<VSearchSelect v-model="timezone" data-source="timezones" />
<VSearchSelect v-model="region" data-source="regions" country="US" />
<VCountrySelect v-model="country" />
<VTimezoneSelect v-model="timezone" />
<VLanguageSelect v-model="language" />
<VRegionSelect v-model="region" :country="country" />
<VPostalCodeInput v-model="postalCode" country="GB" required />
<VAddressInput v-model="address" default-country="GB" required />
```

`address` is `{country,addressLine1,addressLine2,city,region,postalCode}`. `force-country="US"` locks the address country; `show-company` and `:show-address-line-2="false"` configure fields.

Country choices use ISO 3166-1 alpha-2; languages ISO 639-1; time zones are bundled IANA IDs. `regions` includes complete state/province lists for US, Canada, and Australia, not a global comprehensive subdivision database. Other countries accept an optional free-text region when populated; expand datasets as needed. Postal validation is format-only and must not be confused with address deliverability. Verify addresses server-side for critical uses. Localized language labels, address lookup and international subdivision coverage require future providers.

Run `pnpm dev:sandbox` and open `/smart.html`.
