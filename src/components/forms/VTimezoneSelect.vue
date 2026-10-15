<script setup lang="ts">
import VSearchSelect from './VSearchSelect.vue';
const props = defineProps<{modelValue?:string|null; disabled?:boolean; placeholder?:string; }>();
const emit=defineEmits<{'update:modelValue':[value:string|null]}>();
</script>
<template><VSearchSelect :model-value="modelValue" data-source="timezones" :country="undefined" :disabled="disabled" :placeholder="placeholder || 'Select timezone'" @update:model-value="emit('update:modelValue',$event)" /></template>
