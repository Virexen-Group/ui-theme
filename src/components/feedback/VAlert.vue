<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'default' | 'error' | 'success' | 'warning' }>(), { variant: 'default' });
</script>
<template><div class="vx-alert" :class="`vx-alert--${variant}`" :role="variant === 'error' ? 'alert' : 'status'"><slot /></div></template>
