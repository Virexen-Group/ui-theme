# VWidgetCard (0.6.21)

The card a dashboard widget sits in: a tinted icon, a title (a link with a chevron when `href` is set),
header actions such as a menu, the body and an optional footer. It fills its grid cell, so widgets in a
row line up. Use it inside `VDashboardGrid`'s `item` slot.

```vue
<script setup lang="ts">
import VWidgetCard from '@virexen-group/ui-theme/vue/widget-card';
import VIcon from '@virexen-group/ui-theme/vue/icon';
import '@virexen-group/ui-theme/dashboard.css';
</script>

<template>
  <VWidgetCard title="Websites" href="/websites" tone="green" @open="(event) => { event.preventDefault(); router.push('/websites'); }">
    <template #icon><VIcon name="layers" :size="20" /></template>
    <template #actions><button type="button" aria-label="Widget options">⋯</button></template>
    <strong>3</strong> websites
    <template #footer><button type="button">Create website</button></template>
  </VWidgetCard>
</template>
```

| Prop | |
| --- | --- |
| `title` | Required |
| `subtitle` | Smaller line under the title |
| `href` | Makes the title a link with a chevron |
| `tone` | Icon tint: `neutral` (default), `blue`, `green`, `orange`, `purple`, `pink`, `teal`, `red` |

Event `open(event)` fires when the title link is clicked; call `event.preventDefault()` to route inside a
single-page app. Slots: `icon`, `actions`, default (body), `footer`. Styles are in `dashboard.css` and
use the theme's surface, border, text and muted tokens, so light and dark modes both work.
