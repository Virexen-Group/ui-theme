<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from 'vue';
export interface PreviewFile { file: File; url?: string; kind: 'image' | 'other' }
const props = withDefaults(defineProps<{ id?: string; label: string; accept?: string; multiple?: boolean; maxFileSizeMb?: number; disabled?: boolean; showPreview?: boolean }>(), { multiple: false, maxFileSizeMb: 10, showPreview: true });
const emit = defineEmits<{ change: [files: File[]]; error: [message: string] }>();
const fieldId = computed(() => props.id || useIdValue);
const useIdValue = useId(); const input = ref<HTMLInputElement | null>(null); const error = ref(''); const entries = ref<PreviewFile[]>([]); const dragging = ref(false);
function cleanup() { for (const item of entries.value) if (item.url) URL.revokeObjectURL(item.url); }
function apply(files: File[]) {
  const chosen = props.multiple ? files : files.slice(0, 1);
  const tooLarge = chosen.find(f => f.size > props.maxFileSizeMb * 1024 * 1024);
  if (tooLarge) { error.value = `${tooLarge.name} exceeds ${props.maxFileSizeMb} MB.`; emit('error', error.value); return; }
  if (props.accept) {
    const allowed = props.accept.split(',').map(x => x.trim().toLowerCase());
    const invalid = chosen.find(f => !allowed.some(a => a.startsWith('.') ? f.name.toLowerCase().endsWith(a) : a.endsWith('/*') ? f.type.startsWith(a.slice(0, -1)) : a === f.type.toLowerCase()));
    if (invalid) { error.value = `${invalid.name} is not an accepted file type.`; emit('error', error.value); return; }
  }
  cleanup(); error.value = '';
  entries.value = chosen.map(file => ({ file, kind: file.type.startsWith('image/') ? 'image' : 'other', url: props.showPreview && file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined }));
  emit('change', chosen);
}
function onChange(event: Event) { apply(Array.from((event.target as HTMLInputElement).files || [])); }
function onDrop(event: DragEvent) { dragging.value = false; if (!props.disabled) apply(Array.from(event.dataTransfer?.files || [])); }
function remove(index: number) { const remaining = entries.value.filter((_, i) => i !== index).map(e => e.file); apply(remaining); if (input.value) input.value.value = ''; }
function format(bytes: number) { return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`; }
onBeforeUnmount(cleanup);
</script>
<template>
  <div class="vx-file-upload">
    <label class="vx-field__label" :for="fieldId">{{ label }}</label>
    <div class="vx-upload-dropzone" :class="{ 'is-dragging': dragging, 'is-disabled': disabled }" @dragenter.prevent="dragging = true" @dragover.prevent @dragleave.prevent="dragging = false" @drop.prevent="onDrop">
      <span class="vx-upload-icon" aria-hidden="true">↑</span>
      <strong>Drag and drop {{ multiple ? 'files' : 'a file' }} here</strong><span>or choose from your device</span>
      <input ref="input" :id="fieldId" type="file" :accept="accept" :multiple="multiple" :disabled="disabled" :aria-invalid="!!error || undefined" :aria-describedby="error ? `${fieldId}-error` : undefined" @change="onChange" />
      <small>Maximum {{ maxFileSizeMb }} MB per file</small>
    </div>
    <p v-if="error" :id="`${fieldId}-error`" role="alert" class="vx-file__error">{{ error }}</p>
    <ul v-if="entries.length && showPreview" class="vx-upload-previews">
      <li v-for="(entry, index) in entries" :key="`${entry.file.name}-${index}`" class="vx-upload-preview">
        <img v-if="entry.url" :src="entry.url" alt="Selected image preview" /><span v-else class="vx-upload-preview__file" aria-hidden="true">▤</span>
        <span class="vx-upload-preview__text"><strong>{{ entry.file.name }}</strong><small>{{ format(entry.file.size) }} · {{ entry.file.type || 'File' }}</small></span>
        <button type="button" :disabled="disabled" :aria-label="`Remove ${entry.file.name}`" @click="remove(index)">×</button>
      </li>
    </ul>
  </div>
</template>
