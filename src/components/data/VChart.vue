<script setup lang="ts">
import {computed,ref,watch} from 'vue';
export type Point={label:string;value:number;details?:string};
const p=withDefaults(defineProps<{data:Point[];type?:'bar'|'line';title?:string;valueFormat?:Intl.NumberFormatOptions;height?:number;showDetails?:boolean}>(),{type:'bar',height:246,showDetails:true});
const emit=defineEmits<{select:[point:Point,index:number]}>();
const active=ref(-1);const hover=ref(-1);
watch(()=>p.data,()=>active.value=-1);
const max=computed(()=>Math.max(1,...p.data.map(v=>v.value))*1.15);
const fmt=(n:number)=>new Intl.NumberFormat(undefined,p.valueFormat).format(n);
const coords=computed(()=>p.data.map((d,i)=>({x:48+(i+.5)*(640-68)/Math.max(1,p.data.length),y:211-(Math.max(0,d.value)/max.value)*172})));
const path=computed(()=>coords.value.map((c,i)=>(i?'L':'M')+c.x+' '+c.y).join(' '));
const chosen=computed(()=>active.value>=0?p.data[active.value]:null);
function select(i:number){active.value=i;emit('select',p.data[i],i)}
</script>
<template>
<figure class="vx-interactive-chart" :style="{'--vx-chart-height':height+'px'}">
 <div class="vx-interactive-chart__heading"><figcaption v-if="title">{{title}}</figcaption><span v-if="chosen" class="vx-interactive-chart__selection">Selected: {{chosen.label}}</span></div>
 <div class="vx-interactive-chart__scroll">
  <svg viewBox="0 0 640 250" preserveAspectRatio="xMidYMid meet" role="group" :aria-label="title||type+' chart'">
   <g v-for="tick in [0,0.25,0.5,0.75,1]" :key="tick"><line x1="44" x2="628" :y1="211-tick*172" :y2="211-tick*172" stroke="var(--vx-border)" stroke-dasharray="3 6"/><text x="35" :y="215-tick*172" text-anchor="end" fill="var(--vx-muted)" font-size="10">{{fmt(Math.round(max*tick))}}</text></g>
   <path v-if="type==='line' && data.length" :d="path" fill="none" stroke="var(--vx-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
   <g v-for="(point,i) in data" :key="i" class="vx-interactive-chart__datum" tabindex="0" role="button" :aria-label="point.label+': '+fmt(point.value)" :aria-pressed="active===i" @click="select(i)" @mouseenter="hover=i" @mouseleave="hover=-1" @focus="hover=i" @blur="hover=-1" @keydown.enter.prevent="select(i)" @keydown.space.prevent="select(i)">
     <rect v-if="type==='bar'" :x="coords[i].x-Math.min(24,210/Math.max(1,data.length))" :y="coords[i].y" :width="Math.min(48,420/Math.max(1,data.length))" :height="Math.max(0,211-coords[i].y)" rx="5" :fill="active===i?'var(--vx-chart-active,#1749a2)':'var(--vx-primary)'"/>
     <circle v-else :cx="coords[i].x" :cy="coords[i].y" :r="active===i||hover===i?8:5" :fill="active===i?'var(--vx-chart-active,#1749a2)':'var(--vx-primary)'" stroke="var(--vx-surface)" stroke-width="2"/>
     <rect :x="coords[i].x-20" y="35" width="40" height="176" fill="transparent"/>
     <text :x="coords[i].x" y="231" font-size="12" text-anchor="middle" fill="var(--vx-muted)">{{point.label}}</text>
     <g v-if="hover===i || active===i"><rect :x="Math.max(1,Math.min(525,coords[i].x-53))" :y="Math.max(2,coords[i].y-40)" width="106" height="28" rx="7" fill="var(--vx-chart-tooltip,#14213d)"/><text :x="Math.max(1,Math.min(525,coords[i].x-53))+53" :y="Math.max(2,coords[i].y-40)+19" fill="#fff" font-size="12" text-anchor="middle">{{fmt(point.value)}}</text></g>
   </g>
  </svg>
 </div>
 <div v-if="showDetails && chosen" class="vx-interactive-chart__details" aria-live="polite"><strong>{{chosen.label}}</strong><span>{{fmt(chosen.value)}}</span><small v-if="chosen.details">{{chosen.details}}</small></div>
 <p v-if="!data.length" class="vx-interactive-chart__empty">No chart data available.</p>
 <details class="vx-interactive-chart__table"><summary>View accessible data table</summary><table><thead><tr><th>Period</th><th>Value</th></tr></thead><tbody><tr v-for="(d,i) in data" :key="i"><td>{{d.label}}</td><td>{{fmt(d.value)}}</td></tr></tbody></table></details>
</figure>
</template>