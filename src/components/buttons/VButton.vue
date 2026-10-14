<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' | 'danger'; type?: 'button' | 'submit' | 'reset'; block?: boolean; disabled?: boolean; loading?: boolean }>(), { variant: 'secondary', type: 'button' });
</script>
<template>
  <button class="vx-button" :class="[`vx-button--${variant}`, { 'vx-button--block': block }]" :type="type" :disabled="disabled || loading" :aria-busy="loading || undefined"><slot />{{ loading ? '…' : '' }}</button>
</template>
