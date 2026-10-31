<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'neutral'|'success'|'warning'|'error'|'info'; compact?: boolean }>(), { tone: 'neutral', compact: false });
</script>
<template><span class="vx-badge" :class="{ 'vx-badge--compact': compact }" :data-tone="tone"><span v-if="$slots.icon" class="vx-badge__icon" aria-hidden="true"><slot name="icon" /></span><slot /></span></template>
<style>
.vx-badge--compact { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:500; line-height:1.4; white-space:normal; background:var(--vx-surface-muted, #252525); color:var(--vx-text, #fff); }
.vx-badge--compact[data-tone="neutral"] { background:#27272a; color:#fafafa; }
.vx-badge--compact[data-tone="success"] { background:#e1f7ea; color:#08783a; }
.vx-badge--compact[data-tone="info"] { background:#e9f0ff; color:#215bc6; }
.vx-badge--compact[data-tone="warning"] { background:#fff0dc; color:#9b4b00; }
.vx-badge__icon { display:inline-flex; flex:none; }
[data-vx-theme="dark"] .vx-badge--compact[data-tone="success"] { background:#062b18; color:#38df80; }
[data-vx-theme="dark"] .vx-badge--compact[data-tone="info"] { background:#081b39; color:#86b4ff; }
[data-vx-theme="dark"] .vx-badge--compact[data-tone="warning"] { background:#321a06; color:#ffad50; }
</style>
