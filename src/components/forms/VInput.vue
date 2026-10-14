<script setup lang="ts">
import { computed, useId } from 'vue';
const props = withDefaults(defineProps<{ modelValue?: string | number; id?: string; type?: string; name?: string; placeholder?: string; autocomplete?: string; disabled?: boolean; required?: boolean; describedby?: string; invalid?: boolean }>(), { type: 'text', disabled: false, required: false, invalid: false });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const uid = useId();
const fieldId = computed(() => props.id || uid);
</script>
<template>
  <input :id="fieldId" class="vx-control" :type="type" :name="name" :value="modelValue ?? ''" :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled" :required="required" :aria-describedby="describedby" :aria-invalid="invalid || undefined" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>
