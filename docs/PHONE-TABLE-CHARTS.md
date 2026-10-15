# Phone, table and chart components (v0.4.1)

## VPhoneInput

```vue
<VPhoneInput v-model="phoneE164" country="GB" label="Phone number" />
<VPhoneInput v-model="usPhone" force-country="US" label="US only" />
<VPhoneInput v-model="ukPhone" :force-code="44" label="UK only" />
```

`v-model` emits `+` plus the dialling code and national number (E.164-style). `valid` emits validity of a complete phone number; `update:country` emits the selected ISO 3166-1 alpha-2 country. `force-country` is recommended for ambiguous dial codes, particularly +1 (shared across NANP territories). `force-code` resolves to the first allowed matching country, for instance +44→GB. Locking a code disables the country picker. `countries` can restrict the allowed choices. `modelValue` is a string and is not a guarantee the number is valid—check `valid` or validate server-side.

The field formats dynamically via libphonenumber-js; it is a separate component from the generic `VMaskedInput`. Integrate with your form field validation and preserve the submitted E.164 value. Flag glyphs use emoji and depend on OS font support.

## VAdvancedTable

```vue
<VAdvancedTable :rows="records" :columns="columns" row-key="id" @select="selected=$event" @row-click="openRow" />
```

Columns use `{key,label,sortable}`. Client-side searching, sorting, pagination and visible columns are built in. Use `server-side` and `@request` when the app handles filtering and paging. Include a durable unique `row-key` when selecting rows across pages. Use `#cell-status` or other named cell slots for badges and custom formatting.

## VChart

```vue
<VChart title="Signups" type="line" :data="monthly" @select="({label,value})=>selectedPeriod=label" />
<VChart title="Bookings" type="bar" :data="monthly" @select="onChartPoint" />
```

Each point is `{label,value,details?}`. Supports mouse and keyboard selection (Enter/Space), hover details, a selected-point panel and an accessible data table. For dense time-series, zooming and complex visualizations, consider a future Chart.js-backed optional adapter. No external chart dependency is required for the current SVG components.

Import `@virexen-group/ui-theme/data-polish.css` in the consuming app as well as the base component CSS.
