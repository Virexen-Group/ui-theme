<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{
  height?: string; width?: string;
  variant?: 'text' | 'rectangle' | 'circle';
  animation?: 'shimmer' | 'pulse' | 'none';
}>(), { height: '18px', width: '100%', variant: 'text', animation: 'shimmer' });
const style = computed(() => ({ height: props.height, width: props.width, borderRadius: props.variant === 'circle' ? '50%' : props.variant === 'text' ? 'var(--vx-skeleton-radius, 6px)' : 'var(--vx-skeleton-radius, 12px)' }));
</script>
<template><div aria-hidden="true" class="vx-skeleton" :data-animation="animation" :data-variant="variant" :style="style" /></template>
<style>
.vx-skeleton[data-animation] {
  display: block; flex-shrink: 0; max-width: 100%; overflow: hidden; position: relative;
  background: var(--vx-skeleton-base, color-mix(in srgb, var(--color-muted, #6c7b91) 16%, var(--color-panel-strong, #fff)));
  background-size: auto; animation: none;
}
.vx-skeleton::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 15%, var(--vx-skeleton-highlight, color-mix(in srgb, var(--color-panel-strong, #fff) 68%, transparent)) 50%, transparent 85%); transform: translateX(-100%); }
.vx-skeleton[data-animation='shimmer']::after { animation: vx-skeleton-shimmer 1.8s ease-in-out infinite; }
.vx-skeleton[data-animation='pulse'] { animation: vx-skeleton-pulse 1.8s ease-in-out infinite; }
.vx-skeleton[data-animation='none']::after, .vx-skeleton[data-animation='pulse']::after { display: none; }
@keyframes vx-skeleton-shimmer { to { transform: translateX(100%); } }
@keyframes vx-skeleton-pulse { 50% { opacity: .5; } }
@media (prefers-reduced-motion: reduce) { .vx-skeleton, .vx-skeleton::after { animation: none !important; } .vx-skeleton::after { display: none; } }
</style>
