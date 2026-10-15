<script setup lang="ts">
import { computed } from 'vue';
const props=withDefaults(defineProps<{title:string;points:number[];labels?:string[];height?:number}>(),{height:94});
const emit=defineEmits<{select:[index:number,value:number]} >();
const max=computed(()=>Math.max(1,...props.points));
const coords=computed(()=>props.points.map((v,i)=>({x:props.points.length===1?50:i*100/(props.points.length-1),y:100-v/max.value*88-6,value:v,index:i})));
const path=computed(()=>coords.value.map((p,i)=>`${i?'L':'M'} ${p.x} ${p.y}`).join(' '));
</script>
<template><article class="vx-dash-tile"><div class="vx-dash-label">{{title}}</div><div class="vx-sparkline" :style="{height:height+'px'}"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" :aria-label="title"><path :d="path" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg><button v-for="point in coords" :key="point.index" class="vx-spark-point" type="button" :style="{left:point.x+'%',top:point.y+'%'}" :aria-label="`${labels?.[point.index]||'Point '+(point.index+1)}: ${point.value}`" :title="`${labels?.[point.index]||point.index+1}: ${point.value}`" @click="emit('select',point.index,point.value)"/></div><slot/></article></template>
