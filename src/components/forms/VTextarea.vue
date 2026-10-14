<script setup lang="ts">
import { computed, useId } from 'vue';
const props = withDefaults(defineProps<{ modelValue?: string; id?: string; name?: string; rows?: number; placeholder?: string; disabled?: boolean; required?: boolean; describedby?: string; invalid?: boolean }>(), { rows: 4 });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const uid = useId();
const fieldId = computed(() => props.id || uid);
</script>
<template>
  <textarea :id="fieldId" class="vx-control" :name="name" :rows="rows" :value="modelValue ?? ''" :placeholder="placeholder" :disabled="disabled" :required="required" :aria-describedby="describedby" :aria-invalid="invalid || undefined" @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
</template>
