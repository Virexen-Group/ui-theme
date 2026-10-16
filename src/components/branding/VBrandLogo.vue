<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getVirexenFallbackUrl } from '../../data/app-icons';
import { VIREXEN_BRAND_ASSETS, getVirexenBrandUrl, type VirexenBrand, type VirexenBrandFormat } from '../../data/virexen-brand';

const props = withDefaults(defineProps<{
  brand?: VirexenBrand;
  format?: VirexenBrandFormat;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  resolution?: 32 | 512;
  src?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
}>(), {
  brand: 'Virexen', format: 'svg', size: 48, resolution: 512, loading: 'lazy'
});
const failed = ref(false);
const current = ref('');
const source = computed(() => {
  if (props.src) return props.src;
  // All family-brand paths use the current 512px PNG or scalable SVG.
  // Retain the older Virexen 32px corporate asset only for explicit resolution=32.
  if (props.brand === 'Virexen' && props.resolution === 32) {
    return props.format === 'png' ? VIREXEN_BRAND_ASSETS.png32 : VIREXEN_BRAND_ASSETS.svg32;
  }
  return getVirexenBrandUrl(props.brand, props.format);
});
const label = computed(() => props.alt ?? props.brand.replaceAll('-', ' ') + ' icon');
const length = (v: number | string) => typeof v === 'number' ? `${v}px` : v;
const dimensions = computed(() => ({
  width: length(props.width ?? props.size),
  height: length(props.height ?? props.size),
  objectFit: 'contain' as const
}));
watch(source, url => { current.value = url; failed.value = false; }, {immediate:true});
function onError() {
  const fallback=getVirexenFallbackUrl(source.value);
  if (current.value===source.value && fallback) current.value=fallback;
  else failed.value=true;
}
</script>
<template>
  <img v-if="!failed" class="vx-brand-logo" :src="current" :alt="label" :style="dimensions" :loading="loading" decoding="async" @error="onError" />
  <span v-else class="vx-brand-logo-fallback" role="img" :aria-label="label" :style="dimensions">{{ brand === 'Virexen' ? 'V' : brand.charAt(0) }}</span>
</template>
