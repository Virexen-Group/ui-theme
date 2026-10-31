<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { packDashboard, appendDashboardPosition, type DashboardPosition } from './dashboard-packing';

export interface DashboardWidgetOption { id: string; label: string; span?: number; description?: string; category?: string }
const props = withDefaults(defineProps<{
  columns?: number; gap?: number; editable?: boolean; startInEditMode?: boolean; resizable?: boolean; editLabel?: string;
  modelValue?: string[]; sizes?: Record<string, number>;
  packed?: boolean; positions?: Record<string,DashboardPosition>; heights?: Record<string,number>;
  availableItems?: DashboardWidgetOption[]; minSpan?: number;
  saveMode?: "immediate" | "external"; busy?: boolean; saveError?: string;
}>(), { columns: 12, gap: 16, editable: false, startInEditMode: true, minSpan: 2, resizable: true, editLabel: 'Customise dashboard', saveMode: "immediate", busy: false });
const emit = defineEmits<{
  'update:modelValue': [items: string[]]; 'update:sizes': [sizes: Record<string, number>];
  'update:positions':[positions:Record<string,DashboardPosition>];
  'edit-change': [editing: boolean]; 'save': [layout: {order:string[];sizes:Record<string,number>;positions?:Record<string,DashboardPosition>}]; 'cancel': [];
}>();
const managed = computed(() => props.modelValue !== undefined);
const draftOrder = ref<string[]>([]);
const draftSizes = ref<Record<string,number>>({});
const draftPositions = ref<Record<string,DashboardPosition>>({});
const responsiveColumns=ref(props.columns);
function updateResponsive(){responsiveColumns.value=(window.matchMedia?.("(min-width:1024px)").matches??window.innerWidth>=1024)?props.columns:(window.matchMedia?.("(min-width:600px)").matches??window.innerWidth>=600)?2:1;}
onMounted(()=>{updateResponsive();window.addEventListener("resize",updateResponsive);});
onBeforeUnmount(()=>window.removeEventListener("resize",updateResponsive));
const viewOrder = computed(() => editing.value ? draftOrder.value : (props.modelValue || []));
const viewSizes = computed(() => editing.value ? draftSizes.value : (props.sizes || {}));
function syncDraft() { draftOrder.value = [...(props.modelValue || [])]; draftSizes.value = { ...(props.sizes || {}) }; draftPositions.value=Object.fromEntries(Object.entries(props.positions||{}).map(([id,value])=>[id,{...value}])); }
const editing = ref(props.editable && props.startInEditMode);
syncDraft();
watch(() => [props.modelValue, props.sizes, props.positions], () => { if (!editing.value) syncDraft(); }, { deep: true });
watch(() => props.editable, value => { if (!value) editing.value = false; });
const search = ref('');
const catalogueOpen = ref(false);
const css = computed(() => ({ '--vx-grid-columns': String(props.columns), '--vx-grid-gap': `${props.gap}px`, ...(props.packed?{gridTemplateColumns:`repeat(${responsiveColumns.value},minmax(0,1fr))`,gridAutoRows:'20px',rowGap:'0px',alignItems:'start'}:{}) }));
const available = computed(() => props.availableItems || []);
const missing = computed(() => available.value.filter(w => !viewOrder.value.includes(w.id)));
const filtered = computed(() => missing.value.filter(w => `${w.label} ${w.description || ''} ${w.category || ''}`.toLowerCase().includes(search.value.toLowerCase())));
const option = (id: string) => available.value.find(w => w.id === id);
const spanFor = (id: string) => Math.max(1, Math.min(props.columns, (props.resizable ? viewSizes.value[id] : option(id)?.span) ?? props.sizes?.[id] ?? option(id)?.span ?? 3));
const dimensions=computed(()=>Object.fromEntries(viewOrder.value.map(id=>[id,{columns:spanFor(id),height:props.heights?.[id]||320}])));
const canonicalLayout=computed(()=>props.packed?packDashboard(viewOrder.value,dimensions.value,editing.value?draftPositions.value:props.positions,props.columns,props.gap):{});
const packedLayout=computed(()=>!props.packed?{}:responsiveColumns.value===props.columns?canonicalLayout.value:packDashboard(viewOrder.value,Object.fromEntries(viewOrder.value.map(id=>[id,{columns:1,height:props.heights?.[id]||320}])),{},responsiveColumns.value,props.gap));
function savedPositions(){return Object.fromEntries(Object.entries(canonicalLayout.value).map(([id,item])=>[id,{column:item.column,row:item.row}]));}
function placementStyle(id:string){const item=packedLayout.value[id];return item?{gridColumn:`${item.column+1} / span ${item.columns}`,gridRow:`${item.row+1} / span ${Math.ceil(item.height/20)}`,height:`${item.height}px`,alignSelf:'start'}:{};}
function closeCatalogue(){catalogueOpen.value=false;}
const minSize = computed(() => Math.max(1, Math.min(props.columns, props.minSpan)));
function setEditing(value: boolean) { if(props.busy)return; if (!props.editable) return; if (value) syncDraft(); editing.value = value; catalogueOpen.value = false; emit('edit-change', value); }
function save() { if(props.busy)return; if(props.saveMode==='external'){ emit('save',{order:[...draftOrder.value],sizes:{...draftSizes.value},...(props.packed?{positions:savedPositions()}:{})});return; } emit('update:modelValue', [...draftOrder.value]); emit('update:sizes', {...draftSizes.value}); const positions=props.packed?savedPositions():undefined;if(positions)emit('update:positions',positions);setEditing(false); emit('save', { order: [...draftOrder.value], sizes: {...draftSizes.value},...(positions?{positions}:{}) }); }
function discard() { if(props.busy)return; syncDraft(); setEditing(false); emit('cancel'); }
function move(id: string, delta: number) { if (props.busy || !editing.value) return; const next = [...draftOrder.value]; const from = next.indexOf(id), to = from + delta; if (from < 0 || to < 0 || to >= next.length) return; next.splice(from,1); next.splice(to,0,id); draftOrder.value = next; if(props.packed)draftPositions.value=Object.fromEntries(Object.entries(packDashboard(next,dimensions.value,{},props.columns,props.gap)).map(([key,item])=>[key,{column:item.column,row:item.row}])); }
function remove(id: string) { if (!props.busy && editing.value) draftOrder.value = draftOrder.value.filter(w => w !== id); }
function add(id: string) { if (!props.busy && editing.value && missing.value.some(w => w.id === id)) { if(props.packed)draftPositions.value={...savedPositions(),[id]:appendDashboardPosition(canonicalLayout.value)}; draftOrder.value = [...draftOrder.value,id]; } }
function resize(id: string, delta: number) { if (props.busy || !editing.value || !props.resizable) return; draftSizes.value = {...draftSizes.value,[id]: Math.max(minSize.value,Math.min(props.columns,spanFor(id)+delta))}; }
const active = ref<string | null>(null);
const over = ref<string | null>(null);
const offset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const resizing = ref<string|null>(null);
const gridElement=ref<HTMLElement|{$el:HTMLElement}>();
const dropPosition=ref<DashboardPosition|null>(null);let grabX=0,grabY=0;
const dropStyle=computed(()=>dropPosition.value&&active.value?{gridColumn:`${dropPosition.value.column+1} / span ${spanFor(active.value)}`,gridRow:`${dropPosition.value.row+1} / span ${Math.ceil((props.heights?.[active.value]||320)/20)}`,height:`${props.heights?.[active.value]||320}px`}:{});
function gridNode(){const value=gridElement.value;return value&&('$el'in value?value.$el:value);}
let resizeOrigin = 0; let resizeWidth = 0;
function beginResize(event: PointerEvent,id:string) { if (props.busy || !editing.value || !props.resizable) return; event.stopPropagation(); event.preventDefault(); resizing.value = id; resizeOrigin = event.clientX; resizeWidth = spanFor(id); const element = (event.currentTarget as HTMLElement).closest('.vx-dashboard-grid') as HTMLElement|null; const unit = element ? element.getBoundingClientRect().width / props.columns : 100; const resizeMove = (e:PointerEvent) => { if (resizing.value !== id) return; const width = Math.max(minSize.value,Math.min(props.columns,Math.round(resizeWidth + (e.clientX-resizeOrigin)/unit))); draftSizes.value = {...draftSizes.value,[id]:width}; }; const resizeUp = () => { resizing.value=null; window.removeEventListener('pointermove',resizeMove);window.removeEventListener('pointerup',resizeUp);window.removeEventListener('pointercancel',resizeUp); }; window.addEventListener('pointermove',resizeMove);window.addEventListener('pointerup',resizeUp);window.addEventListener('pointercancel',resizeUp); }
let pointer = -1;
let x = 0; let y = 0;
function interactive(target: EventTarget | null) { return target instanceof Element && Boolean(target.closest('button,a,input,select,textarea,[contenteditable="true"],[data-vx-no-drag]')); }
function start(event: PointerEvent, id: string) {
  if (props.busy || !editing.value || !managed.value || (event.pointerType === 'mouse' && event.button !== 0) || interactive(event.target)) return;
  cleanup(); active.value = id; pointer = event.pointerId; x = event.clientX; y = event.clientY;const rect=(event.currentTarget as HTMLElement).getBoundingClientRect();grabX=x-rect.left;grabY=y-rect.top;
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
  if(props.packed&&responsiveColumns.value===props.columns){const area=gridNode()?.getBoundingClientRect();if(area&&event.clientX>=area.left&&event.clientX<=area.right){const columns=spanFor(active.value);dropPosition.value={column:Math.max(0,Math.min(props.columns-columns,Math.round((event.clientX-grabX-area.left)/((area.width+props.gap)/props.columns)))),row:Math.max(0,Math.min(1024-Math.ceil((props.heights?.[active.value]||320)/20),Math.round((event.clientY-grabY-area.top)/20)))};}else dropPosition.value=null;}
  const el = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-vx-widget-id]');
  const id = el?.dataset.vxWidgetId;
  over.value = id && id !== active.value && viewOrder.value.includes(id) ? id : null;
}
function finish(event: PointerEvent) {
  if (event.pointerId !== pointer) return;
  const id = active.value, target = over.value;
  if(props.packed&&dragging.value&&id&&dropPosition.value){const next=packDashboard(draftOrder.value,dimensions.value,{...savedPositions(),[id]:dropPosition.value},props.columns,props.gap,id);draftPositions.value=Object.fromEntries(Object.entries(next).map(([key,item])=>[key,{column:item.column,row:item.row}]));draftOrder.value=[...draftOrder.value].sort((a,b)=>next[a].row-next[b].row||next[a].column-next[b].column);}
  else if (dragging.value && id && target) {
    const next = [...draftOrder.value]; const from = next.indexOf(id), to = next.indexOf(target);
    if (from >= 0 && to >= 0) { next.splice(from, 1); next.splice(to, 0, id); draftOrder.value = next;if(props.packed)draftPositions.value=Object.fromEntries(Object.entries(packDashboard(next,dimensions.value,{},props.columns,props.gap)).map(([key,item])=>[key,{column:item.column,row:item.row}])); }
  }
  cleanup();
}
function cancel(event: PointerEvent) { if (event.pointerId === pointer) cleanup(); }
function cleanup() {
  window.removeEventListener('pointermove', track); window.removeEventListener('pointerup', finish); window.removeEventListener('pointercancel', cancel);
  dropPosition.value=null;pointer = -1; active.value = null; over.value = null; dragging.value = false; offset.value = { x: 0, y: 0 };
}
onBeforeUnmount(cleanup);
defineExpose({setEditing, add, closeCatalogue, reload:syncDraft, commit:()=>{editing.value=false;catalogueOpen.value=false;emit('edit-change',false)}});
</script>
<template>
  <div class="vx-dashboard-editor" :class="{ 'vx-dashboard-editor--editing': editing }">
    <header v-if="managed && editable" class="vx-dashboard-editor__header">
      <div class="vx-dashboard-editor__heading"><slot name="heading" :editing="editing"><strong>Dashboard</strong><span>{{ editing ? 'Drag any tile to arrange your workspace' : 'Your personal overview' }}</span></slot></div>
      <div class="vx-dashboard-editor__header-actions">
        <slot name="toolbar-actions" :editing="editing" />
        <button v-if="editing" type="button" class="vx-dash-editor-btn vx-dash-editor-btn--subtle" @click="catalogueOpen = !catalogueOpen">＋ Add widget</button>
        <button v-if="editing" type="button" class="vx-dash-editor-btn vx-dash-editor-btn--subtle" @click="discard">Cancel</button><button type="button" class="vx-dash-editor-btn vx-dash-editor-btn--primary" :aria-pressed="editing" :disabled="busy" @click="editing ? save() : setEditing(true)">{{ busy ? 'Saving…' : editing ? '✓ Save layout' : '✎ ' + editLabel }}</button>
      </div>
    </header>
    <p v-if="saveError" class="vx-dashboard-editor__error" role="alert">{{saveError}}</p>
    <slot v-if="$slots.catalogue" name="catalogue" :open="managed && editing && catalogueOpen" :items="missing" :add="add" :close="closeCatalogue" />
    <section v-else-if="managed && editing && catalogueOpen" class="vx-widget-catalogue" aria-label="Add dashboard widget">
      <div class="vx-widget-catalogue__top"><strong>Widget library</strong><button type="button" aria-label="Close widget library" @click="catalogueOpen = false">✕</button></div>
      <input v-model="search" type="search" class="vx-widget-catalogue__search" placeholder="Search widgets…" aria-label="Search available widgets" />
      <div class="vx-widget-catalogue__items">
        <button v-for="widget in filtered" :key="widget.id" class="vx-widget-catalogue__item" type="button" @click="add(widget.id)"><slot name="catalogue-preview" :item="widget"><span class="vx-widget-catalogue__glyph">＋</span></slot><span><strong>{{ widget.label }}</strong><small>{{ widget.description || widget.category || 'Add to your dashboard' }}</small></span></button>
        <p v-if="!filtered.length" class="vx-widget-catalogue__empty">{{ missing.length ? 'No matching widgets.' : 'All available widgets are on your dashboard.' }}</p>
      </div>
    </section>
    <TransitionGroup v-if="managed" ref="gridElement" name="vx-widget" tag="section" class="vx-dashboard-grid" :style="css" aria-label="Dashboard tiles">
      <div v-if="packed && dragging && dropPosition && responsiveColumns === columns" key="__vx-drop-preview" class="vx-dashboard-drop-preview" :style="dropStyle" aria-hidden="true" />
      <article v-for="(id, index) in viewOrder" :key="id" class="vx-dashboard-widget" :class="{ 'vx-dashboard-widget--active': active === id && dragging, 'vx-dashboard-widget--target': over === id }" :data-vx-widget-id="id" :data-span="spanFor(id)" :style="{ '--vx-span': spanFor(id), '--vx-drag-x': active === id ? `${offset.x}px` : '0px', '--vx-drag-y': active === id ? `${offset.y}px` : '0px', ...placementStyle(id) }" @pointerdown="start($event, id)" @dragstart.prevent>
        <div v-if="editing" class="vx-dashboard-widget__editbar" data-vx-no-drag>
          <span class="vx-dashboard-widget__hint" aria-hidden="true">⠿ Drag tile</span>
          <div class="vx-dashboard-widget__actions">
            <button v-if="resizable" type="button" :disabled="spanFor(id) <= minSize" :aria-label="`Make ${option(id)?.label || id} narrower`" title="Narrower" @click="resize(id, -1)">−</button>
            <span v-if="resizable" class="vx-dashboard-widget__width" :title="`${spanFor(id)} of ${columns} columns`">{{ spanFor(id) }}/{{ columns }}</span>
            <button v-if="resizable" type="button" :disabled="spanFor(id) >= columns" :aria-label="`Make ${option(id)?.label || id} wider`" title="Wider" @click="resize(id, 1)">＋</button>
            <button type="button" :aria-label="`Remove ${option(id)?.label || id}`" title="Remove widget" @click="remove(id)">×</button>
          </div>
        </div>
        <div v-if="editing && resizable" class="vx-dashboard-widget__resize-handle" data-vx-no-drag title="Drag to resize" role="separator" aria-label="Resize widget" @pointerdown="beginResize($event,id)">↘</div>
        <div v-if="editing && $slots['item-settings']" class="vx-dashboard-widget__settings" data-vx-no-drag><slot name="item-settings" :id="id" /></div>
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

<style scoped>
.vx-dashboard-drop-preview{box-sizing:border-box;min-width:0;border:2px dashed var(--vx-primary,#148f89);border-radius:12px;background:color-mix(in srgb,var(--vx-primary,#148f89) 10%,transparent);pointer-events:none;z-index:0}
</style>
