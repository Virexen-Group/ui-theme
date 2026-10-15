<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

/** Uses the same dropzone + file tile language as VFileManager (roadmap.html). */
const props = withDefaults(defineProps<{
  modelValue?: File[];
  maxSize?: number; // legacy bytes-based limit
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  disabled?: boolean;
  imageOnly?: boolean;
  crop?: boolean;
  cropAspectRatio?: number;
  cropOutputType?: 'image/png' | 'image/jpeg' | 'image/webp';
  cropQuality?: number;
}>(), { multiple: false, maxSizeMb: 10, imageOnly: false, crop: false, cropAspectRatio: 1, cropOutputType: 'image/png', cropQuality: .92 });
const emit = defineEmits<{ 'update:modelValue': [files: File[]]; files: [files: File[]]; error: [message: string]; cancelled: []; cropped: [file: File] }>();
const dragging = ref(false);
const uploaded = ref<File[]>([...(props.modelValue || [])]);
watch(() => props.modelValue, value => { if (value) uploaded.value = [...value]; });
const maxBytes = computed(() => props.maxSize ?? props.maxSizeMb * 1024 * 1024);
const previews = new Map<File, string>();
const queue = ref<File[]>([]);
const active = ref<File | null>(null);
const activeUrl = ref('');
const previewCanvas = ref<HTMLCanvasElement | null>(null);
const zoom = ref(1);
const offsetX = ref(0);
const offsetY = ref(0);
const saving = ref(false);
const closeButton = ref<HTMLButtonElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const effectiveAccept = computed(() => props.imageOnly || props.crop ? 'image/*' : props.accept);
const effectiveImageOnly = computed(() => props.imageOnly || props.crop);
const modalOpen = computed(() => !!active.value);
let image: HTMLImageElement | null = null;
let priorFocus: HTMLElement | null = null;

const URL_SUPPORTED = typeof URL !== 'undefined';
const fileLabel = computed(() => effectiveImageOnly.value ? 'Images only' : (props.accept || 'Any supported file'));
function preview(file: File) {
  if (!file.type.startsWith('image/') || !URL_SUPPORTED) return '';
  if (!previews.has(file)) previews.set(file, URL.createObjectURL(file));
  return previews.get(file) || '';
}
function revoke(file: File) { const url = previews.get(file); if (url) URL.revokeObjectURL(url); previews.delete(file); }
function fileAccepted(file: File): boolean {
  if (file.size > maxBytes.value) { emit('error', `${file.name} exceeds ${props.maxSizeMb} MB`); return false; }
  if (effectiveImageOnly.value && !file.type.startsWith('image/')) { emit('error', `${file.name} is not an image`); return false; }
  if (!effectiveImageOnly.value && props.accept) {
    const valid = props.accept.split(',').map(t => t.trim().toLowerCase()).some(t => t === '*/*' || t === file.type.toLowerCase() || (t.endsWith('/*') && file.type.toLowerCase().startsWith(t.slice(0,-1))) || (t.startsWith('.') && file.name.toLowerCase().endsWith(t)));
    if (!valid) { emit('error', `${file.name} is not an accepted file type`); return false; }
  }
  return true;
}
function handle(list: FileList | File[] | null | undefined) {
  dragging.value = false;
  if (props.disabled || !list) return;
  let files = Array.from(list).filter(fileAccepted);
  if (!props.multiple) files = files.slice(0, 1);
  if (!files.length) return;
  if (props.crop) {
    queue.value = props.multiple ? [...queue.value, ...files] : files;
    if (!active.value) void nextCrop();
  } else {
    if (!props.multiple) uploaded.value.forEach(revoke);
    uploaded.value = props.multiple ? [...uploaded.value, ...files] : files;
    notify(props.multiple ? files : uploaded.value);
  }
}
function notify(files: File[]) { emit('update:modelValue', [...uploaded.value]); emit('files', files); }
function onDrop(e: DragEvent) { dragging.value = false; handle(e.dataTransfer?.files); }
function onDragLeave(e: DragEvent) { if (!(e.currentTarget as HTMLElement)?.contains(e.relatedTarget as Node | null)) dragging.value = false; }
function remove(index: number) { const old = uploaded.value[index]; if (old) revoke(old); uploaded.value.splice(index, 1); notify([...uploaded.value]); }
function cleanupActive() { if (activeUrl.value) URL.revokeObjectURL(activeUrl.value); activeUrl.value = ''; image = null; active.value = null; }
async function nextCrop() {
  cleanupActive();
  const next = queue.value.shift();
  if (!next) { priorFocus?.focus(); return; }
  active.value = next;
  zoom.value = 1; offsetX.value = 0; offsetY.value = 0;
  priorFocus = document.activeElement as HTMLElement;
  activeUrl.value = URL.createObjectURL(next);
  const img = new Image(); img.decoding = 'async'; img.src = activeUrl.value;
  try { await img.decode(); if (active.value !== next) return; image = img; await nextTick(); draw(); closeButton.value?.focus(); }
  catch { emit('error', `${next.name} cannot be opened as an image`); void nextCrop(); }
}
function draw() {
  const canvas = previewCanvas.value;
  if (!canvas || !image) return;
  const ratio = props.cropAspectRatio > 0 ? props.cropAspectRatio : 1;
  canvas.width = 720;
  canvas.height = Math.round(720 / ratio);
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const iw = image.naturalWidth, ih = image.naturalHeight;
  const base = Math.max(canvas.width / iw, canvas.height / ih);
  const scale = base * zoom.value;
  const w = iw * scale, h = ih * scale;
  const x = (canvas.width - w) / 2 + (offsetX.value / 100) * Math.max(0,(w-canvas.width)/2);
  const y = (canvas.height - h) / 2 + (offsetY.value / 100) * Math.max(0,(h-canvas.height)/2);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(image,x,y,w,h);
}
watch([zoom,offsetX,offsetY,() => props.cropAspectRatio],draw);
async function applyCrop() {
  if (!active.value || !previewCanvas.value || saving.value) return;
  saving.value = true;
  try {
    draw();
    const blob = await new Promise<Blob | null>(resolve => previewCanvas.value?.toBlob(resolve,props.cropOutputType,props.cropQuality));
    if (!blob) throw new Error('Could not crop image');
    const ext = props.cropOutputType === 'image/jpeg' ? 'jpg' : props.cropOutputType.split('/')[1];
    const file = new File([blob], `${active.value.name.replace(/\.[^.]*$/,'')}-cropped.${ext}`, {type:blob.type,lastModified:Date.now()});
    if (!props.multiple) uploaded.value.forEach(revoke);
    uploaded.value = props.multiple ? [...uploaded.value,file] : [file];
    emit('cropped',file);
    notify(props.multiple ? [file] : uploaded.value);
    void nextCrop();
  } catch(e) { emit('error', e instanceof Error ? e.message : 'Image crop failed'); }
  finally { saving.value = false; }
}
function cancelCrop() { queue.value = []; cleanupActive(); emit('cancelled'); priorFocus?.focus(); }
function modalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); cancelCrop(); }
  if (e.key === 'Tab') {
    const controls = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled])');
    const first = controls[0], last = controls[controls.length-1];
    if (first && last) { if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  }
}
onBeforeUnmount(() => { cleanupActive(); for (const f of previews.keys()) revoke(f); });
</script>

<template>
  <div class="vx-filemanager vx-file-upload-modern" :class="{ 'vx-file-upload-modern--disabled': disabled }">
    <div class="vx-filemanager__drop" :class="{'is-dragging':dragging, 'is-disabled':disabled}" role="button" tabindex="0" :aria-disabled="disabled" aria-label="Choose or drop files" @click="!disabled && fileInput?.click()" @keydown.enter.prevent="!disabled && fileInput?.click()" @keydown.space.prevent="!disabled && fileInput?.click()" @dragenter.prevent="dragging=true" @dragover.prevent="dragging=true" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
      <span class="vx-filemanager__drop-icon" aria-hidden="true">↑</span>
      <strong>Click or drag {{effectiveImageOnly ? 'images' : 'files'}} to attach</strong>
      <small>{{fileLabel}} · up to {{Math.round(maxBytes / 1048576)}} MB{{crop ? ' · Crop before adding' : ''}}</small>
      <input ref="fileInput" class="vx-filemanager__hidden-input" type="file" :accept="effectiveAccept" :multiple="multiple" :disabled="disabled" tabindex="-1" :aria-label="effectiveImageOnly?'Choose images':'Choose files'" @click.stop @change="handle(($event.target as HTMLInputElement).files);($event.target as HTMLInputElement).value=''" />
    </div>
    <div v-if="uploaded.length" class="vx-filemanager__items" aria-live="polite">
      <div v-for="(file,i) in uploaded" :key="file.name+'-'+i" class="vx-filemanager__tile">
        <img v-if="preview(file)" :src="preview(file)" :alt="file.name" />
        <span v-else class="vx-filemanager__fileicon">{{file.type.includes('pdf')?'PDF':'FILE'}}</span>
        <span class="vx-filemanager__filename" :title="file.name">{{file.name}}</span>
        <small>{{(file.size / 1024 / 1024).toFixed(2)}} MB</small>
        <button type="button" class="vx-filemanager__remove" :aria-label="'Remove '+file.name" @click="remove(i)">×</button>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="modalOpen" class="vx-crop-backdrop" @keydown="modalKeydown">
        <section class="vx-crop-dialog" role="dialog" aria-modal="true" aria-labelledby="vx-crop-heading">
          <header><div><h2 id="vx-crop-heading">Crop image</h2><p>Adjust your image before uploading.</p></div><button ref="closeButton" type="button" aria-label="Cancel cropping" @click="cancelCrop">×</button></header>
          <canvas ref="previewCanvas" class="vx-crop-preview" aria-label="Image crop preview" />
          <label>Zoom <input v-model.number="zoom" type="range" min="1" max="3" step="0.05" /></label>
          <label>Horizontal position <input v-model.number="offsetX" type="range" min="-100" max="100" step="1" /></label>
          <label>Vertical position <input v-model.number="offsetY" type="range" min="-100" max="100" step="1" /></label>
          <footer><button type="button" @click="cancelCrop">Cancel</button><button type="button" class="vx-crop-apply" :disabled="saving || !active" @click="applyCrop">{{saving?'Saving…':'Apply crop'}}</button></footer>
        </section>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.vx-filemanager{min-width:0}
.vx-filemanager__drop{display:grid;place-items:center;gap:8px;min-height:158px;padding:30px 20px;border:2px dashed var(--vx-border,#cbd5e1);border-radius:16px;background:var(--vx-surface,#fff);text-align:center;cursor:pointer;transition:border-color .16s,background-color .16s,box-shadow .16s;color:var(--vx-text,#16213a)}
.vx-filemanager__drop:hover,.vx-filemanager__drop:focus-visible,.vx-filemanager__drop.is-dragging{border-color:var(--vx-primary,#193b9f);box-shadow:0 0 0 3px color-mix(in srgb,var(--vx-primary,#193b9f) 14%,transparent)}
.vx-filemanager__drop.is-dragging{background:var(--vx-input,#eef3ff)}
.vx-filemanager__drop.is-disabled{opacity:.5;cursor:not-allowed}
.vx-filemanager__drop-icon{font-size:29px;line-height:1;font-weight:800;color:var(--vx-primary,#193b9f)}
.vx-filemanager__drop small{font-size:.8rem;color:var(--vx-muted,#64748b)}
.vx-filemanager__hidden-input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.vx-filemanager__items{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,130px),1fr));gap:12px;margin-top:12px}
.vx-filemanager__tile{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0;padding:12px;border:1px solid var(--vx-border,#cbd5e1);border-radius:12px;background:var(--vx-surface,#fff)}
.vx-filemanager__tile img{width:100%;height:100px;object-fit:cover;border-radius:8px}
.vx-filemanager__fileicon{display:grid;place-items:center;height:100px;color:var(--vx-primary,#193b9f);font-weight:800}
.vx-filemanager__filename{max-width:100%;overflow-wrap:anywhere;font-size:.8rem}
.vx-filemanager__remove{position:absolute;top:6px;right:6px;width:30px;height:30px;border:0;border-radius:50%;background:#172136;color:#fff;cursor:pointer}
.vx-filemanager__tile small{color:var(--vx-muted,#64748b)}
@media(prefers-reduced-motion:reduce){.vx-filemanager__drop{transition:none}}
</style>
