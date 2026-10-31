<script setup lang="ts">
import VSkeleton from '../feedback/VSkeleton.vue';
import {computed} from 'vue';
const props=withDefaults(defineProps<{title:string;value:number|string;change?:number;detail?:string;currency?:string;locale?:string;loading?:boolean}>(),{locale:'en-GB',loading:false});
const display=computed(()=>typeof props.value==='number'?new Intl.NumberFormat(props.locale,props.currency?{style:'currency',currency:props.currency}:{maximumFractionDigits:2}).format(props.value):props.value);
</script>
<template><article class="vx-dash-tile"><div class="vx-dash-label">{{title}} <slot name="icon"/></div><VSkeleton v-if="loading" width="42%" height="34px"/><div v-else class="vx-dash-value">{{display}}</div><div class="vx-dash-sub"><span v-if="change!==undefined" :class="change>=0?'vx-positive':'vx-negative'">{{change>0?'+':''}}{{change}}%</span> {{detail}}</div><slot/></article></template>
