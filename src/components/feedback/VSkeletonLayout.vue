<script setup lang="ts">
import { computed } from 'vue';
import VSkeleton from './VSkeleton.vue';
const props = withDefaults(defineProps<{
  variant?: 'form' | 'table' | 'cards' | 'profile' | 'dashboard' | 'list';
  rows?: number; columns?: number; label?: string;
  animation?: 'shimmer' | 'pulse' | 'none';
}>(), { variant: 'list', rows: 4, columns: 3, label: 'Loading content…', animation: 'shimmer' });
const count = computed(() => Math.max(1, Math.min(12, Math.floor(props.rows) || 4)));
const columns = computed(() => Math.max(1, Math.min(6, Math.floor(props.columns) || 3)));
</script>
<template>
  <div class="vx-skeleton-layout" :class="`vx-skeleton-layout--${variant}`" role="status" aria-live="polite" aria-busy="true" :style="{ '--vx-skeleton-columns': columns }">
    <span class="vx-skeleton-layout__label">{{ label }}</span>
    <div aria-hidden="true" class="vx-skeleton-layout__content">
      <slot>
        <template v-if="variant === 'profile'">
          <div class="vx-skeleton-layout__panel vx-skeleton-layout__hero"><VSkeleton variant="rectangle" width="128px" height="128px" :animation="animation"/><div class="vx-skeleton-layout__lines"><VSkeleton width="62%" height="30px" :animation="animation"/><VSkeleton width="82%" :animation="animation"/><VSkeleton width="45%" :animation="animation"/></div></div>
          <div class="vx-skeleton-layout__tabs"><VSkeleton v-for="n in 5" :key="n" width="100px" height="24px" :animation="animation"/></div>
          <div class="vx-skeleton-layout__grid"><div v-for="n in columns" :key="n" class="vx-skeleton-layout__panel vx-skeleton-layout__lines"><VSkeleton width="54%" height="22px" :animation="animation"/><VSkeleton v-for="row in count" :key="row" :width="row % 2 ? '100%' : '78%'" :animation="animation"/></div></div>
        </template>
        <template v-else-if="variant === 'dashboard'">
          <div class="vx-skeleton-layout__panel vx-skeleton-layout__banner"><VSkeleton width="24%" height="18px" :animation="animation"/><VSkeleton width="46%" height="40px" :animation="animation"/><VSkeleton width="60%" :animation="animation"/></div>
          <div class="vx-skeleton-layout__grid"><div v-for="n in columns" :key="n" class="vx-skeleton-layout__panel vx-skeleton-layout__lines"><VSkeleton width="58%" :animation="animation"/><VSkeleton width="36%" height="34px" :animation="animation"/></div></div>
          <div class="vx-skeleton-layout__grid"><div v-for="n in columns" :key="n" class="vx-skeleton-layout__panel vx-skeleton-layout__lines"><VSkeleton width="54%" height="24px" :animation="animation"/><VSkeleton variant="rectangle" height="160px" :animation="animation"/><VSkeleton width="75%" :animation="animation"/></div></div>
        </template>
        <template v-else-if="variant === 'form'">
          <VSkeleton width="46%" height="24px" :animation="animation"/>
          <div class="vx-skeleton-layout__fields"><div v-for="n in count" :key="n" class="vx-skeleton-layout__lines"><VSkeleton width="42%" height="13px" :animation="animation"/><VSkeleton variant="rectangle" height="44px" :animation="animation"/></div></div>
          <div class="vx-skeleton-layout__actions"><VSkeleton width="100px" height="40px" :animation="animation"/><VSkeleton width="120px" height="40px" :animation="animation"/></div>
        </template>
        <template v-else-if="variant === 'table'">
          <div class="vx-skeleton-layout__panel"><div v-for="row in count + 1" :key="row" class="vx-skeleton-layout__table-row"><VSkeleton v-for="column in columns" :key="column" :height="row === 1 ? '13px' : '20px'" :width="column % 2 ? '80%' : '60%'" :animation="animation"/></div></div>
        </template>
        <template v-else-if="variant === 'cards'">
          <div class="vx-skeleton-layout__grid"><div v-for="n in count" :key="n" class="vx-skeleton-layout__panel vx-skeleton-layout__lines"><VSkeleton variant="rectangle" height="90px" :animation="animation"/><VSkeleton width="62%" height="22px" :animation="animation"/><VSkeleton :animation="animation"/><VSkeleton width="75%" :animation="animation"/></div></div>
        </template>
        <template v-else><div v-for="n in count" :key="n" class="vx-skeleton-layout__list-row"><VSkeleton variant="circle" width="42px" height="42px" :animation="animation"/><div class="vx-skeleton-layout__lines"><VSkeleton width="56%" :animation="animation"/><VSkeleton width="82%" height="13px" :animation="animation"/></div></div></template>
      </slot>
    </div>
  </div>
</template>
<style>
.vx-skeleton-layout { width: 100%; min-width: 0; padding-block: 4px; }
.vx-skeleton-layout__label { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.vx-skeleton-layout__content, .vx-skeleton-layout__lines { display: grid; gap: 14px; min-width: 0; }
.vx-skeleton-layout__lines { flex: 1; align-content: start; }
.vx-skeleton-layout__panel { padding: 20px; border: 1px solid var(--color-line, #e0e6ee); border-radius: var(--vx-skeleton-panel-radius, 14px); background: var(--color-panel-strong, #fff); min-width: 0; box-shadow: 0 2px 8px color-mix(in srgb, var(--color-text, #17243a) 3%, transparent); }
.vx-skeleton-layout__hero, .vx-skeleton-layout__list-row { display: flex; align-items: center; gap: 20px; }
.vx-skeleton-layout__banner { display: grid; align-content: center; gap: 20px; min-height: 210px; }
.vx-skeleton-layout__grid { display: grid; grid-template-columns: repeat(var(--vx-skeleton-columns,3),minmax(0,1fr)); gap: 16px; }
.vx-skeleton-layout__tabs { display: flex; gap: 24px; overflow: hidden; padding-block: 12px; }
.vx-skeleton-layout__fields { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 22px; }
.vx-skeleton-layout__actions { display: flex; gap: 12px; justify-content: flex-end; padding-top: 10px; }
.vx-skeleton-layout__table-row { display: grid; grid-template-columns: repeat(var(--vx-skeleton-columns,3),minmax(0,1fr)); gap: 18px; padding: 17px 0; }
.vx-skeleton-layout__table-row + .vx-skeleton-layout__table-row { border-top: 1px solid var(--color-line,#e0e6ee); }
.vx-skeleton-layout__list-row { padding-block: 12px; }
@media(max-width:900px) { .vx-skeleton-layout__grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
@media(max-width:600px) { .vx-skeleton-layout__grid, .vx-skeleton-layout__fields { grid-template-columns: minmax(0,1fr); } .vx-skeleton-layout__panel { padding: 16px; } .vx-skeleton-layout__hero { align-items: flex-start; gap: 14px; } .vx-skeleton-layout__hero > .vx-skeleton { width: 80px !important; height: 96px !important; } .vx-skeleton-layout__table-row { gap: 12px; } }
</style>
