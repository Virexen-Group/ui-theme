<script setup lang="ts">
import { computed, useId } from 'vue';
const props = withDefaults(defineProps<{ label: string; forId?: string; hint?: string; error?: string; required?: boolean }>(), { required: false });
const internalId = useId();
const id = computed(() => props.forId || internalId);
const hintId = computed(() => `${id.value}-hint`);
const errorId = computed(() => `${id.value}-error`);
</script>
<template>
  <div class="vx-field">
    <label class="vx-field__label" :for="id">{{ label }}<span v-if="required" class="vx-field__required" aria-hidden="true">*</span></label>
    <slot :id="id" :describedby="[hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined" :invalid="!!error" />
    <div v-if="hint" :id="hintId" class="vx-field__hint">{{ hint }}</div>
    <div v-if="error" :id="errorId" class="vx-field__error" role="alert">{{ error }}</div>
  </div>
</template>
