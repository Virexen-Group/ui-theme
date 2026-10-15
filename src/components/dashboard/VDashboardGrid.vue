<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

export interface DashboardWidgetOption { id: string; label: string; span?: number; description?: string; category?: string }
const props = withDefaults(defineProps<{
  columns?: number; gap?: number; editable?: boolean; startInEditMode?: boolean;
  modelValue?: string[]; sizes?: Record<string, number>;
  availableItems?: DashboardWidgetOption[]; minSpan?: number;
}>(), { columns: 12, gap: 16, editable: false, startInEditMode: true, minSpan: 2 });
const emit = defineEmits<{
  'update:modelValue': [items: string[]]; 'update:sizes': [sizes: Record<string, number>];
  'edit-change': [editing: boolean]; 'save': [layout: {order:string[];sizes:Record<string,number>}]; 'cancel': [];
}>();
const managed = computed(() => props.modelValue !== undefined);
const draftOrder = ref<string[]>([]);
const draftSizes = ref<Record<string,number>>({});
const viewOrder = computed(() => editing.value ? draftOrder.value : (props.modelValue || []));
const viewSizes = computed(() => editing.value ? draftSizes.value : (props.sizes || {}));
function syncDraft() { draftOrder.value = [...(props.modelValue || [])]; draftSizes.value = { ...(props.sizes || {}) }; }
const editing = ref(props.editable && props.startInEditMode);
syncDraft();
watch(() => [props.modelValue, props.sizes], () => { if (!editing.value) syncDraft(); }, { deep: true });
watch(() => props.editable, value => { if (!value) editing.value = false; });
const search = ref('');
const catalogueOpen = ref(false);
const css = computed(() => ({ '--vx-grid-columns': String(props.columns), '--vx-grid-gap': `${props.gap}px` }));
const available = computed(() => props.availableItems || []);
const missing = computed(() => available.value.filter(w => !viewOrder.value.includes(w.id)));
const filtered = computed(() => missing.value.filter(w => `${w.label} ${w.description || ''} ${w.category || ''}`.toLowerCase().includes(search.value.toLowerCase())));
const option = (id: string) => available.value.find(w => w.id === id);
const spanFor = (id: string) => Math.max(1, Math.min(props.columns, viewSizes.value[id] ?? option(id)?.span ?? 3));
const minSize = computed(() => Math.max(1, Math.min(props.columns, props.minSpan)));
function setEditing(value: boolean) { if (!props.editable) return; if (value) syncDraft(); editing.value = value; catalogueOpen.value = false; emit('edit-change', value); }
function save() { emit('update:modelValue', [...draftOrder.value]); emit('update:sizes', {...draftSizes.value}); setEditing(false); emit('save', { order: [...draftOrder.value], sizes: {...draftSizes.value} }); }
function discard() { syncDraft(); setEditing(false); emit('cancel'); }
function move(id: string, delta: number) { if (!editing.value) return; const next = [...draftOrder.value]; const from = next.indexOf(id), to = from + delta; if (from < 0 || to < 0 || to >= next.length) return; next.splice(from,1); next.splice(to,0,id); draftOrder.value = next; }
function remove(id: string) { if (editing.value) draftOrder.value = draftOrder.value.filter(w => w !== id); }
function add(id: string) { if (editing.value && missing.value.some(w => w.id === id)) { draftOrder.value = [...draftOrder.value,id]; } }
function resize(id: string, delta: number) { if (!editing.value) return; draftSizes.value = {...draftSizes.value,[id]: Math.max(minSize.value,Math.min(props.columns,spanFor(id)+delta))}; }
const active = ref<string | null>(null);
const over = ref<string | null>(null);
const offset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const resizing = ref<string|null>(null);
let resizeOrigin = 0; let resizeWidth = 0;
function beginResize(event: PointerEvent,id:string) { if (!editing.value) return; event.stopPropagation(); event.preventDefault(); resizing.value = id; resizeOrigin = event.clientX; resizeWidth = spanFor(id); const element = (event.currentTarget as HTMLElement).closest('.vx-dashboard-grid') as HTMLElement|null; const unit = element ? element.getBoundingClientRect().width / props.columns : 100; const resizeMove = (e:PointerEvent) => { if (resizing.value !== id) return; const width = Math.max(minSize.value,Math.min(props.columns,Math.round(resizeWidth + (e.clientX-resizeOrigin)/unit))); draftSizes.value = {...draftSizes.value,[id]:width}; }; const resizeUp = () => { resizing.value=null; window.removeEventListener('pointermove',resizeMove);window.removeEventListener('pointerup',resizeUp);window.removeEventListener('pointercancel',resizeUp); }; window.addEventListener('pointermove',resizeMove);window.addEventListener('pointerup',resizeUp);window.addEventListener('pointercancel',resizeUp); }
let pointer = -1;
let x = 0; let y = 0;
function interactive(target: EventTarget | null) { return target instanceof Element && Boolean(target.closest('button,a,input,select,textarea,[contenteditable="true"],[data-vx-no-drag]')); }
function start(event: PointerEvent, id: string) {
  if (!editing.value || !managed.value || (event.pointerType === 'mouse' && event.button !== 0) || interactive(event.target)) return;
  cleanup(); active.value = id; pointer = event.pointerId; x = event.clientX; y = event.clientY;
  window.addEventListener('pointermove', track, { passive: false });
  window.addEventListener('pointerup', finish); window.addEventListener('pointercancel', cancel);
}
function track(event: PointerEvent) {
  if (event.pointerId !== pointer || !active.value || resizing.value) return;
  const dx = event.clientX - x, dy = event.clientY - y;
  if (!dragging.value && Math.hypot(dx, dy) < 8) return;
  dragging.value = true;
  offset.value = { x: dx, y: dy };
  if (event.cancelable) event.preventDefault();
  const el = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-vx-widget-id]');
  const id = el?.dataset.vxWidgetId;
  over.value = id && id !== active.value && viewOrder.value.includes(id) ? id : null;
}
function finish(event: PointerEvent) {
  if (event.pointerId !== pointer) return;
  const id = active.value, target = over.value;
  if (dragging.value && id && target) {
    const next = [...draftOrder.value]; const from = next.indexOf(id), to = next.indexOf(target);
    if (from >= 0 && to >= 0) { next.splice(from, 1); next.splice(to, 0, id); draftOrder.value = next; }
  }
  cleanup();
}
function cancel(event: PointerEvent) { if (event.pointerId === pointer) cleanup(); }
function cleanup() {
  window.removeEventListener('pointermove', track); window.removeEventListener('pointerup', finish); window.removeEventListener('pointercancel', cancel);
  pointer = -1; active.value = null; over.value = null; dragging.value = false; offset.value = { x: 0, y: 0 };
}
onBeforeUnmount(cleanup);
</script>
<template>
  <div class="vx-dashboard-editor" :class="{ 'vx-dashboard-editor--editing': editing }">
    <header v-if="managed && editable" class="vx-dashboard-editor__header">
      <div class="vx-dashboard-editor__heading"><strong>Dashboard</strong><span>{{ editing ? 'Drag any tile to arrange your workspace' : 'Your personal overview' }}</span></div>
      <div class="vx-dashboard-editor__header-actions">
        <button v-if="editing" type="button" class="vx-dash-editor-btn vx-dash-editor-btn--subtle" @click="catalogueOpen = !catalogueOpen">＋ Add widget</button>
        <button v-if="editing" type="button" class="vx-dash-editor-btn vx-dash-editor-btn--subtle" @click="discard">Cancel</button><button type="button" class="vx-dash-editor-btn vx-dash-editor-btn--primary" :aria-pressed="editing" @click="editing ? save() : setEditing(true)">{{ editing ? '✓ Save layout' : '✎ Customise dashboard' }}</button>
      </div>
    </header>
    <section v-if="managed && editing && catalogueOpen" class="vx-widget-catalogue" aria-label="Add dashboard widget">
      <div class="vx-widget-catalogue__top"><strong>Widget library</strong><button type="button" aria-label="Close widget library" @click="catalogueOpen = false">✕</button></div>
      <input v-model="search" type="search" class="vx-widget-catalogue__search" placeholder="Search widgets…" aria-label="Search available widgets" />
      <div class="vx-widget-catalogue__items">
        <button v-for="widget in filtered" :key="widget.id" class="vx-widget-catalogue__item" type="button" @click="add(widget.id)"><span class="vx-widget-catalogue__glyph">＋</span><span><strong>{{ widget.label }}</strong><small>{{ widget.description || widget.category || 'Add to your dashboard' }}</small></span></button>
        <p v-if="!filtered.length" class="vx-widget-catalogue__empty">{{ missing.length ? 'No matching widgets.' : 'All available widgets are on your dashboard.' }}</p>
      </div>
    </section>
    <TransitionGroup v-if="managed" name="vx-widget" tag="section" class="vx-dashboard-grid" :style="css" aria-label="Dashboard tiles">
      <article v-for="(id, index) in viewOrder" :key="id" class="vx-dashboard-widget" :class="{ 'vx-dashboard-widget--active': active === id && dragging, 'vx-dashboard-widget--target': over === id }" :data-vx-widget-id="id" data-span :style="{ '--vx-span': spanFor(id), '--vx-drag-x': active === id ? `${offset.x}px` : '0px', '--vx-drag-y': active === id ? `${offset.y}px` : '0px' }" @pointerdown="start($event, id)" @dragstart.prevent>
        <div v-if="editing" class="vx-dashboard-widget__editbar" data-vx-no-drag>
          <span class="vx-dashboard-widget__hint" aria-hidden="true">⠿ Drag tile</span>
          <div class="vx-dashboard-widget__actions">
            <button type="button" :disabled="spanFor(id) <= minSize" :aria-label="`Make ${option(id)?.label || id} narrower`" title="Narrower" @click="resize(id, -1)">−</button>
            <span class="vx-dashboard-widget__width" :title="`${spanFor(id)} of ${columns} columns`">{{ spanFor(id) }}/{{ columns }}</span>
            <button type="button" :disabled="spanFor(id) >= columns" :aria-label="`Make ${option(id)?.label || id} wider`" title="Wider" @click="resize(id, 1)">＋</button>
            <button type="button" :aria-label="`Remove ${option(id)?.label || id}`" title="Remove widget" @click="remove(id)">×</button>
          </div>
        </div>
        <div v-if="editing" class="vx-dashboard-widget__resize-handle" data-vx-no-drag title="Drag to resize" role="separator" aria-label="Resize widget" @pointerdown="beginResize($event,id)">↘</div>
        <div class="vx-dashboard-widget__content" :inert="editing ? true : undefined"><slot name="item" :id="id" :index="index" :move="move" :remove="remove" /></div>
        <div v-if="editing" class="vx-dashboard-widget__keyboard" data-vx-no-drag>
          <button :disabled="index === 0" type="button" :aria-label="`Move ${option(id)?.label || id} earlier`" @click="move(id,-1)">← Earlier</button>
          <button :disabled="index === viewOrder.length-1" type="button" :aria-label="`Move ${option(id)?.label || id} later`" @click="move(id,1)">Later →</button>
        </div>
      </article>
    </TransitionGroup>
    <section v-else class="vx-dashboard-grid" :style="css" aria-label="Dashboard tiles"><slot :move="move" :editable="editable" /></section>
    <p v-if="managed && !viewOrder.length" class="vx-dashboard-editor__empty">No widgets selected. {{ editing ? 'Choose “Add widget” to get started.' : 'Customise your dashboard to add widgets.' }}</p>
  </div>
</template>
