# Virexen Master UI — component API reference

All examples use Vue 3 and the published `@virexen-group/ui-theme/vue` entry. Import both `theme.css` and `roadmap.css` (and existing `components.css`) for styling.

```ts
import { VCalendar, VAdvancedTable, VRichTextEditor, VOrderSummary } from '@virexen-group/ui-theme/vue';
import '@virexen-group/ui-theme/theme.css';
import '@virexen-group/ui-theme/components.css';
import '@virexen-group/ui-theme/roadmap.css';
```

| Component | Main props | Events or slots |
|---|---|---|
| VTypography | `as`, `scale`, `muted` | default slot |
| VGrid / VResponsiveCardGrid | `minWidth`, `gap` | default slot |
| VTimePicker | `modelValue`, `label`, `min`, `max`, `step` | `update:modelValue` |
| VDateTimePicker | `modelValue`, `min`, `max`, `required` | `update:modelValue` |
| VMaskedInput | `modelValue`, `mask` (`#` digit, `A` letter, `*` alphanumeric) | `update:modelValue` |
| VRichTextEditor | `modelValue`, `label`, `disabled` | `update:modelValue` |
| VFileManager | `modelValue:File[]`, `multiple`, `accept`, `maxSize` | `update:modelValue`, `error` |
| VBottomNavigation | `items`, `modelValue` | `update:modelValue`, `select` |
| VPermissionMenu | `items`, `permissions` | `select` |
| VChart | `data:{label,value}[]`, `type:'bar'|'line'`, `title` | none |
| VAdvancedTable | `rows`, `columns`, `serverSide`, `total`, `pageSize` | `request`, `select`, `cell-<key>` slots |
| VStatusState | `state`, `title`, `description`, `actionLabel` | `action` |
| VNotificationCentre | `items` | `read`, `clear` |
| VProductSelectCard | `title`, `price`, `currency`, `modelValue`, `image` | `update:modelValue` |
| VOrderSummary | `items:{id,label,quantity,price}[]`, `currency`, `discount`, `tax` | `footer` slot |
| VPaymentMethod | `brand`, `last4`, `expiryMonth`, `expiryYear`, `selected` | `select` |
| VInvoicePreview | `number`, `issuer`, `customer`, `date`, `lines` | none |
| VSubscriptionPricing | `plans`, `currency`, `period`, `modelValue` | `update:modelValue` |
| VDashboardShell | `sidebarWidth` | `sidebar`, `header`, default slots |
| VProfileView | `name`, `subtitle`, `image`, `details`, `status` | `actions`, default slots |
| VCalendar | `events`, `modelValue` | `update:modelValue`, `selectEvent` |
| VScheduler | `items`, `resources` | `select` |

## Example: Scheduling

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VCalendar } from '@virexen-group/ui-theme/vue';
const selectedDate = ref('2026-10-14');
const events = [{ id:'meeting', title:'Staff meeting', date:'2026-10-14' }];
</script>
<template><VCalendar v-model="selectedDate" :events="events" @select-event="id => console.log(id)" /></template>
```

## Scope & production considerations

- Calendar is a **monthly date/event viewer**, not a drag-and-drop resource scheduler. `VScheduler` is a responsive grouped agenda; advanced time-grid collision handling is not included.
- Chart is a **lightweight bar/line SVG/CSS wrapper** without analytics drilldowns or streaming data.
- Rich-text editor supports lightweight formatting but **does not sanitise HTML**. Sanitise on the application backend before storage or display, and before embedding it in email. A production-grade editor will benefit from a reviewed editor engine and additional accessibility work.
- Advanced table supports client filtering, sorting, visible columns and `request` events for server pages; selection is limited to the currently displayed row positions. The application owns persistent selection, filter parsing and server requests.
- Form field and file validation must also be enforced server-side. File-manager previews use temporary object URLs and are not uploaded automatically.
- Invoice and payment displays are **visual-only**: never pass sensitive card numbers, authentication secrets or payment credentials. Applications own payment processing and accounting.
- Permission-aware menus **only hide UI entries**; the server must enforce permissions.
- These components are implementation starters, not an assertion of audited WCAG conformance or payment/health regulatory certification.
