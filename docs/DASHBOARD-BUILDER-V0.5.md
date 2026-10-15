# Virexen UI — Dashboard Builder v0.5.0

## What's changed
- Managed dashboards start in **Edit mode** when `editable` is true (`start-in-edit-mode` defaults to `true`). Click **Done editing** to use interactive tile content; click **Customise dashboard** to edit again.
- Drag **any non-interactive area on the card** — not a Move button. Reordering happens **once on pointer release**, not repeatedly while hovering over neighbouring widgets. A drop target is highlighted and the other cards animate into place after dropping.
- Works with pointer mouse, touch and stylus. Buttons, links and form controls do not initiate dragging. Keyboard **Earlier**/**Later** controls remain in edit mode for accessibility.
- Use **+ / −** controls to adjust tile width in grid columns while editing; sizes have their own two-way binding. There is **no free-form pointer resizing yet**.
- **Add widget** opens a searchable catalogue of available (not yet enabled) widgets. Each tile can be removed and added back. Existing default slots and individually imported tiles are preserved.
- Reordering, sizes, and enabled widgets should be saved by the **application**. The sandbox illustrates localStorage only; your product should use its authenticated API for multi-device persistence.

## Example

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { VDashboardGrid, VMetricTile } from '@virexen-group/ui-theme/vue';

const layout = ref(['revenue', 'users']);
const sizes = ref<Record<string, number>>({ revenue: 6, users: 6 });
const catalog = [
  { id: 'revenue', label: 'Revenue', description: 'Sales summary', span: 6 },
  { id: 'users', label: 'Users', description: 'Active accounts', span: 6 },
  { id: 'applications', label: 'Applications', span: 4 }
];
// Save via your authenticated API, ideally debounced:
watch([layout, sizes], ([ids, widths]) => {
  console.log('Persist dashboard via your API', { ids, widths });
}, { deep: true });
</script>
<template>
  <VDashboardGrid
    v-model="layout"
    v-model:sizes="sizes"
    :available-items="catalog"
    :columns="12"
    :gap="16"
    editable
    :start-in-edit-mode="true"
  >
    <template #item="{ id }">
      <VMetricTile v-if="id === 'revenue'" title="Revenue" :value="24850" currency="GBP" />
      <VMetricTile v-else-if="id === 'users'" title="Users" :value="1284" />
      <p v-else>Applications</p>
    </template>
  </VDashboardGrid>
</template>
```

### Props and emitted events
- `v-model` (`string[]`): enabled widget IDs, ordered.
- `v-model:sizes` (`Record<string, number>`): width in desktop grid columns.
- `available-items`: full list of allowed widget IDs, labels, descriptions, and suggested spans.
- `editable`: enables editing UI; defaults `false` for backwards compatibility.
- `start-in-edit-mode`: defaults `true`, used only when `editable`.
- `columns`: desktop grid column count, default 12.
- `gap`: grid spacing pixels, default 16.
- `min-span`: minimum width in columns, default 2.
- `@edit-change`: fires when Edit mode toggles.

### Permissions and persistence
Server-side permissions MUST gate which widget IDs/data the user may request; hiding a widget in the client is not authorization. Save per-dashboard, per-user (and tenant) layouts through an application API. Validate IDs and sizes when loading them, and use optimistic updates / rollback on failed saves.

### Migration
Existing `VDashboardGrid` default-slot dashboards are unchanged. Managed grids with `editable` will open in edit mode by default; pass `:start-in-edit-mode="false"` if you want the old view-first behaviour. **No additional drag package required**.

### Caveats
Drop-to-reorder is intentionally stable rather than live packing. Pointer resize handles and a server-backed persistence adapter are future additions. The widget library supplies layout/presentation, not authorization or application data.
