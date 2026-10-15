<script setup lang="ts">
import VSearchSelect from './VSearchSelect.vue';
const props = defineProps<{modelValue?:string|null; disabled?:boolean; placeholder?:string; country?: string;}>();
const emit=defineEmits<{'update:modelValue':[value:string|null]}>();
</script>
<template><VSearchSelect :model-value="modelValue" data-source="regions" :country="country" :disabled="disabled" :placeholder="placeholder || 'Select region'" @update:model-value="emit('update:modelValue',$event)" /></template>
