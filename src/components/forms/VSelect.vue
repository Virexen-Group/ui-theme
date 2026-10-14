<script setup lang="ts">
import { computed, useId } from 'vue';
export type SelectOption = { label: string; value: string; disabled?: boolean };
const props = withDefaults(defineProps<{ modelValue?: string; id?: string; name?: string; options: SelectOption[]; placeholder?: string; disabled?: boolean; required?: boolean; describedby?: string; invalid?: boolean }>(), { disabled: false, required: false, invalid: false });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const uid = useId();
const fieldId = computed(() => props.id || uid);
</script>
<template>
  <select :id="fieldId" class="vx-control" :name="name" :value="modelValue ?? ''" :disabled="disabled" :required="required" :aria-describedby="describedby" :aria-invalid="invalid || undefined" @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">{{ option.label }}</option>
  </select>
</template>
