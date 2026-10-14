<script setup lang="ts">
import { computed, useId } from 'vue';
const props = defineProps<{ modelValue?: boolean; id?: string; name?: string; label: string; disabled?: boolean; required?: boolean }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
const uid = useId();
const fieldId = computed(() => props.id || uid);
</script>
<template>
  <label class="vx-checkbox" :for="fieldId"><input :id="fieldId" type="checkbox" :name="name" :checked="!!modelValue" :disabled="disabled" :required="required" @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" /><span>{{ label }}</span></label>
</template>
