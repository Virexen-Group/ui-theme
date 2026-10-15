<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { countries } from '../../data/smart-options';

/** Controlled country select. modelValue is the ISO 3166-1 alpha-2 country code. */
const props = withDefaults(defineProps<{
  modelValue?: string | null;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean;
}>(), { placeholder: 'Select country', disabled: false, required: false });
const emit = defineEmits<{ 'update:modelValue': [value: string]; change: [value: string] }>();

const normalized = (value?: string | null) => (value ?? '').trim().toUpperCase();
const selection = ref(normalized(props.modelValue));
const opened = ref(false);
const search = ref('');
const focusedIndex = ref(0);
const root = ref<HTMLElement | null>(null);
const searchEl = ref<HTMLInputElement | null>(null);
const buttonEl = ref<HTMLButtonElement | null>(null);
const allCountries = countries.map(item => ({ code: item.code, flag: item.flag, name: item.name }));
const selected = computed(() => allCountries.find(item => item.code === selection.value));
const matches = computed(() => {
  const term = search.value.trim().toLocaleLowerCase();
  return term ? allCountries.filter(item => item.name.toLocaleLowerCase().includes(term) || item.code.toLocaleLowerCase().includes(term)) : allCountries;
});
watch(() => props.modelValue, value => { selection.value = normalized(value); });
watch(matches, () => { focusedIndex.value = 0; });
watch(() => props.disabled, disabled => { if (disabled) close(); });
async function toggle() {
  if (props.disabled) return;
  if (opened.value) { close(); return; }
  opened.value = true;
  search.value = '';
  focusedIndex.value = Math.max(0, matches.value.findIndex(c => c.code === selection.value));
  await nextTick();
  searchEl.value?.focus();
}
function close(restoreFocus = false) {
  opened.value = false;
  search.value = '';
  if (restoreFocus) nextTick(() => buttonEl.value?.focus());
}
function choose(code: string) {
  const value = normalized(code);
  if (props.disabled) return;
  selection.value = value; // Update the visible label immediately.
  emit('update:modelValue', value); // Keep the parent v-model authoritative.
  emit('change', value);
  close(true);
}
function onKeydown(event: KeyboardEvent) {
  if (!opened.value) return;
  if (event.key === 'Escape') { event.preventDefault(); close(true); }
  else if (event.key === 'ArrowDown') { event.preventDefault(); focusedIndex.value = Math.min(matches.value.length - 1, focusedIndex.value + 1); }
  else if (event.key === 'ArrowUp') { event.preventDefault(); focusedIndex.value = Math.max(0, focusedIndex.value - 1); }
  else if (event.key === 'Enter' && matches.value[focusedIndex.value]) { event.preventDefault(); choose(matches.value[focusedIndex.value].code); }
}
function outside(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) close();
}
if (typeof document !== 'undefined') document.addEventListener('pointerdown', outside);
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('pointerdown', outside); });
</script>

<template>
  <div ref="root" class="vx-country-picker" @keydown="onKeydown">
    <button
      ref="buttonEl" :id="id" type="button"
      class="vx-control vx-country-picker__trigger" :disabled="disabled"
      :aria-expanded="opened" aria-haspopup="listbox" :aria-label="selected ? `Country: ${selected.name}` : placeholder"
      @click="toggle"
    >
      <span v-if="selected" class="vx-country-picker__selected">
        <span class="vx-country-picker__flag" aria-hidden="true">{{ selected.flag }}</span>
        <span>{{ selected.name }}</span>
      </span>
      <span v-else class="vx-country-picker__placeholder">{{ placeholder }}</span>
      <span class="vx-country-picker__chevron" aria-hidden="true">⌄</span>
    </button>
    <input v-if="name" type="hidden" :name="name" :value="selection" />
    <div v-if="opened" class="vx-country-picker__menu">
      <input ref="searchEl" v-model="search" type="search" class="vx-control vx-country-picker__search" placeholder="Search countries…" aria-label="Search countries" autocomplete="off" />
      <div class="vx-country-picker__options" role="listbox" aria-label="Countries">
        <button v-for="(item,index) in matches" :key="item.code" type="button" role="option"
          class="vx-country-picker__option" :class="{ 'is-active': focusedIndex === index, 'is-selected': selection === item.code }"
          :aria-selected="selection === item.code" @mouseenter="focusedIndex=index" @click="choose(item.code)">
          <span class="vx-country-picker__flag" aria-hidden="true">{{ item.flag }}</span>
          <span>{{ item.name }}</span><small>{{ item.code }}</small>
        </button>
        <p v-if="!matches.length" class="vx-country-picker__empty">No matching countries</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vx-country-picker { position:relative; min-width:0; width:100%; }
.vx-country-picker__trigger { display:flex; align-items:center; justify-content:space-between; gap:12px; text-align:left; cursor:pointer; }
.vx-country-picker__selected { display:flex; align-items:center; gap:10px; min-width:0; }
.vx-country-picker__selected > span:last-child { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.vx-country-picker__flag { font-size:1.25rem; flex:none; line-height:1.3; }
.vx-country-picker__placeholder { color:var(--vx-muted,#64748b); }
.vx-country-picker__chevron { margin-left:auto; font-size:1.3rem; flex:none; }
.vx-country-picker__menu { position:absolute; z-index:1000; top:calc(100% + 6px); left:0; right:0; min-width:min(100%, 260px); padding:8px; background:var(--vx-surface,#fff); color:var(--vx-text,#16213a); border:1px solid var(--vx-border,#cbd5e1); border-radius:14px; box-shadow:0 12px 32px rgba(15,23,42,.18); }
.vx-country-picker__search { width:100%; margin-bottom:8px; }
.vx-country-picker__options { max-height:min(320px, 45dvh); overflow-y:auto; overscroll-behavior:contain; }
.vx-country-picker__option { display:flex; gap:10px; align-items:center; width:100%; min-height:44px; border:0; border-radius:9px; background:transparent; color:inherit; padding:8px 10px; font:inherit; text-align:left; cursor:pointer; }
.vx-country-picker__option > span:nth-child(2) { flex:1; }
.vx-country-picker__option small { color:var(--vx-muted,#64748b); }
.vx-country-picker__option:hover,.vx-country-picker__option.is-active { background:var(--vx-input,#eef1f6); }
.vx-country-picker__option.is-selected { color:var(--vx-primary,#1fb5ab); font-weight:700; }
.vx-country-picker__option:focus-visible { outline:2px solid var(--vx-primary,#1fb5ab); outline-offset:-2px; }
.vx-country-picker__empty { padding:10px; color:var(--vx-muted,#64748b); }
@media (prefers-reduced-motion:reduce) { .vx-country-picker__menu { scroll-behavior:auto; } }
</style>
