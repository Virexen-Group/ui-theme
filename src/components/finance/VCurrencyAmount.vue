<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{ amount: number; currency?: string; locale?: string; minimumFractionDigits?: number; maximumFractionDigits?: number; negativeStyle?: 'minus' | 'accounting' }>(), { currency:'USD', locale:'en-US', negativeStyle:'minus' });
const formatted = computed(() => new Intl.NumberFormat(props.locale, {style:'currency',currency:props.currency, minimumFractionDigits:props.minimumFractionDigits, maximumFractionDigits:props.maximumFractionDigits, currencySign:props.negativeStyle === 'accounting' ? 'accounting' : 'standard'}).format(props.amount));
</script>
<template><span class="vx-money" :class="{'vx-money--negative':amount < 0}">{{ formatted }}</span></template>
