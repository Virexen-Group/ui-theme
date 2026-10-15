<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useFloatingPosition } from '../../composables/useFloatingPosition';
import type { Placement } from '@floating-ui/vue';
const props = withDefaults(defineProps<{ modelValue?: boolean; placement?: Placement; label?: string }>(), { modelValue: false, placement: 'bottom-start', label: 'More information' });
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
const { reference, floating, floatingStyles, placement } = useFloatingPosition(props.placement);
watch(() => props.placement, value => { placement.value = value; });
const button = ref<HTMLElement | null>(null);
function handleDocument(e: PointerEvent){ if(props.modelValue && e.target instanceof Node && !reference.value?.contains(e.target) && !floating.value?.contains(e.target)) emit('update:modelValue', false); }
onMounted(() => document.addEventListener('pointerdown', handleDocument));
onUnmounted(() => document.removeEventListener('pointerdown', handleDocument));
</script>
<template>
  <span ref="reference" class="vx-floating-anchor"><button ref="button" type="button" :aria-expanded="modelValue" :aria-label="label" @click="emit('update:modelValue', !modelValue)"><slot name="trigger">{{ label }}</slot></button></span>
  <Teleport to="body"><div v-if="modelValue" ref="floating" :style="floatingStyles" role="dialog" :aria-label="label" class="vx-floating-popover" @keydown.esc="emit('update:modelValue',false)"><slot /></div></Teleport>
</template>
<style scoped>.vx-floating-anchor{display:inline-flex}.vx-floating-anchor button{cursor:pointer}.vx-floating-popover{z-index:2000;max-width:min(360px,calc(100vw - 24px));padding:15px;background:var(--vx-surface,#fff);color:var(--vx-text,#15213b);border:1px solid var(--vx-border,#dbe3ec);border-radius:12px;box-shadow:0 12px 36px #0002}</style>
