<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
export interface SearchOption { label: string; value: string; disabled?: boolean; description?: string }
const props = withDefaults(defineProps<{ modelValue?: string | null; options: SearchOption[]; placeholder?: string; searchPlaceholder?: string; emptyText?: string; disabled?: boolean; loading?: boolean; id?: string; name?: string; remote?: boolean }>(), { placeholder: 'Select an option', searchPlaceholder: 'Search options…', emptyText: 'No matching options', remote: false });
const emit = defineEmits<{ 'update:modelValue': [value: string | null]; search: [query: string] }>();
const open = ref(false), query = ref(''), active = ref(0);
const root = ref<HTMLElement | null>(null), searchInput = ref<HTMLInputElement | null>(null);
const chosen = computed(() => props.options.find(o => o.value === props.modelValue));
const filtered = computed(() => props.remote ? props.options : props.options.filter(o => `${o.label} ${o.description || ''}`.toLowerCase().includes(query.value.toLowerCase())));
watch(query, v => { active.value = Math.max(0, filtered.value.findIndex(o => !o.disabled)); emit('search', v); });
watch(filtered, () => { active.value = Math.max(0, filtered.value.findIndex(o => !o.disabled)); });
async function show() { if (props.disabled) return; open.value = true; query.value = ''; await nextTick(); searchInput.value?.focus(); }
function close() { open.value = false; query.value = ''; }
function select(option: SearchOption) { if (option.disabled) return; emit('update:modelValue', option.value); close(); }
function move(direction: number) { if (!filtered.value.length) return; let i = active.value; for (let n = 0; n < filtered.value.length; n++) { i = (i + direction + filtered.value.length) % filtered.value.length; if (!filtered.value[i].disabled) { active.value = i; break; } } }
function keydown(event: KeyboardEvent) { if (event.key === 'Escape') { close(); return; } if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); move(event.key === 'ArrowDown' ? 1 : -1); } if (event.key === 'Enter') { event.preventDefault(); const option = filtered.value[active.value]; if (option) select(option); } }
function blur(event: FocusEvent) { if (event.relatedTarget instanceof Node && root.value?.contains(event.relatedTarget)) return; close(); }
</script>
<template>
  <div ref="root" class="vx-search-select" @focusout="blur" @keydown="keydown">
    <button :id="id" type="button" class="vx-control vx-search-select__trigger" :disabled="disabled" :aria-expanded="open" aria-haspopup="listbox" @click="open ? close() : show()">
      <span :class="{ 'vx-is-placeholder': !chosen }">{{ chosen?.label || placeholder }}</span><span aria-hidden="true">⌄</span>
    </button>
    <input v-if="name" type="hidden" :name="name" :value="modelValue ?? ''" />
    <div v-if="open" class="vx-search-select__panel">
      <input ref="searchInput" v-model="query" class="vx-control" type="search" :placeholder="searchPlaceholder" role="combobox" aria-autocomplete="list" aria-expanded="true" />
      <div class="vx-search-select__options" role="listbox" aria-label="Search results">
        <div v-if="loading" class="vx-search-select__empty" role="status">Loading…</div>
        <template v-else-if="filtered.length"><button v-for="(option, index) in filtered" :key="option.value" type="button" role="option" class="vx-search-select__option" :class="{ 'is-active': active === index, 'is-selected': modelValue === option.value }" :disabled="option.disabled" :aria-selected="modelValue === option.value" @mouseenter="active = index" @click="select(option)"><strong>{{ option.label }}</strong><small v-if="option.description">{{ option.description }}</small></button></template>
        <div v-else class="vx-search-select__empty">{{ emptyText }}</div>
      </div>
    </div>
  </div>
</template>
