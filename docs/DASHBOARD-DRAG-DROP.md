# Dashboard drag/drop and widget management (v0.4.9)

```vue
<script setup lang="ts">
import { VDashboardGrid, VMetricTile, useDashboardLayout } from '@virexen-group/ui-theme/vue';
const widgets = [ {id:'revenue',label:'Revenue',span:6}, {id:'users',label:'Users',span:6} ];
const { layout, reset } = useDashboardLayout(widgets.map(w=>w.id), 'my-dashboard-v1');
</script>
<template>
  <VDashboardGrid v-model="layout" :available-items="widgets" editable :columns="12">
    <template #item="{ id }">
      <VMetricTile v-if="id === 'revenue'" title="Revenue" :value="1000" />
      <VMetricTile v-else title="Users" :value="32" />
    </template>
  </VDashboardGrid>
</template>
```

**Features:** pointer dragging (mouse, touch, stylus) from a handle; animated reorder via Vue `TransitionGroup`; add/remove widget toolbar; keyboard-friendly arrow buttons; optional localStorage persistence via `useDashboardLayout`; reset. Only the handle disables touch scrolling. Dragging changes order, not tile dimensions; column spans are configured per widget, and resize-by-drag is not included. If permission logic is needed, filter `availableItems` on the app side and validate updates on the server. For shared cross-device layouts, persist `update:modelValue` to your backend instead of relying exclusively on localStorage.

**Compatibility:** existing `VDashboardGrid` default-slot usage still works. The interactive mode is opt-in via `v-model` plus `#item` slot.
