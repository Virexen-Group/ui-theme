<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getVirexenAppIconUrl, getVirexenFallbackUrl, type VirexenAppIconName, type VirexenAppIconSize, type VirexenAppIconFormat } from '../../data/app-icons';
const props = withDefaults(defineProps<{
  app: VirexenAppIconName; format?: VirexenAppIconFormat; resolution?: VirexenAppIconSize;
  size?: number | string; alt?: string; loading?: 'lazy'|'eager';
}>(), { format:'svg', resolution:512, size:48, loading:'lazy' });
const primary = computed(() => getVirexenAppIconUrl(props.app, props.format, props.resolution));
const current = ref(primary.value);
const failed = ref(false);
watch(primary, url => { current.value=url; failed.value=false; });
function onError() {
  const fallback=getVirexenFallbackUrl(primary.value);
  if (current.value===primary.value && fallback) current.value=fallback;
  else failed.value=true;
}
const length=(v:number|string) => typeof v==='number'?`${v}px`:v;
const dimensions=computed(()=>({width:length(props.size),height:length(props.size),objectFit:'contain' as const}));
</script>
<template>
  <img v-if="!failed" class="vx-brand-logo vx-app-icon" :src="current" :style="dimensions" :alt="alt || `${app.replaceAll('-', ' ')} icon`" :loading="loading" @error="onError" />
  <span v-else role="img" class="vx-brand-logo-fallback" :aria-label="alt || `${app.replaceAll('-', ' ')} icon`" :style="dimensions">{{app.slice(0,1)}}</span>
</template>
