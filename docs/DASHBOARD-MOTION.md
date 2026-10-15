# Dashboard & Motion — Virexen UI

Import components from `@virexen-group/ui-theme/vue`. Include `@virexen-group/ui-theme/dashboard.css` and `@virexen-group/ui-theme/motion.css` (after publishing them through `package.json` exports).

## Components
- `VDashboardGrid` — responsive CSS grid; supports `columns`, `gap`, `editable`, `v-model` order. On desktop wrap tiles in a `div` with `data-span` and `style="--vx-span:3"`. The application controls permissions and saves layout changes.
- `VMetricTile` — `title`, `value`, optional `currency`, `locale`, `change`, `loading`.
- `VChartTile` — `title`, `points` numeric array, optional `labels`, emits `select(index,value)`.
- `VActionTile` — `title`, `description`, emits `click`.
- `VStatusTile` — `status`: healthy/warning/error/neutral.
- `VProfileTile` — `name`, `subtitle`, `avatarUrl`.
- `VProgressTile` — `title`, `value`, `total`.
- `VActivityTile` — `items` array of `{id,title,description?,time?}`.
- `VCustomTile` — named title and free-form slot.
- `VTransition` — `name`: fade/slide/scale; `duration` in ms.
- `VAnimatedNumber` — `value`, `duration`, `locale`.
- `VReveal` — reveal on scroll, respects reduced motion.
- `useMotion` — shared intensity setting; `useDashboardLayout` — local order with optional localStorage key.

### Example
```vue
<script setup lang="ts">
import { VDashboardGrid, VMetricTile } from '@virexen-group/ui-theme/vue';
import '@virexen-group/ui-theme/dashboard.css';
</script>
<template>
  <VDashboardGrid :columns="12"><div data-span style="--vx-span:3"><VMetricTile title="Revenue" :value="24850" currency="GBP" /></div></VDashboardGrid>
</template>
```

These components provide presentation, not analytics, permissions or server persistence. Resizing and pointer-based drag/drop are not implemented; order-changing helpers are provided instead.
