<script setup lang="ts">
import { computed } from 'vue';
import VIcon from '../icons/VIcon.vue';
export interface PriceLine { id:string;label:string;subtitle?:string;amount:number;icon?:string }
const props=withDefaults(defineProps<{title?:string;items?:PriceLine[];adjustments?:PriceLine[];currency?:string;locale?:string;total?:number;note?:string;showSubtotal?:boolean;taxLabel?:string}>(),{title:'Price breakdown',items:()=>[],adjustments:()=>[],currency:'USD',locale:'en-US',showSubtotal:true});
const subtotal=computed(()=>props.items.reduce((sum,item)=>sum+item.amount,0));
const computedTotal=computed(()=>props.total??subtotal.value+props.adjustments.reduce((sum,item)=>sum+item.amount,0));
const money=(n:number)=>new Intl.NumberFormat(props.locale,{style:'currency',currency:props.currency}).format(n);
</script>
<template>
<aside class="vx-breakdown-new" aria-label="Price breakdown">
 <header class="vx-breakdown-new__header"><span class="vx-breakdown-new__titleicon"><VIcon name="finance" size="lg"/></span><div><h2>{{title}}</h2><p>A summary of your selected items and charges.</p></div></header>
 <div class="vx-breakdown-new__panel"><h3>Selected items ({{items.length}})</h3><div v-if="!items.length" class="vx-breakdown-new__empty">No items selected yet.</div>
 <div v-for="item in items" :key="item.id" class="vx-breakdown-new__item"><span class="vx-breakdown-new__itemicon"><VIcon :name="item.icon||'package'" size="lg"/></span><div class="vx-breakdown-new__copy"><strong>{{item.label}}</strong><small v-if="item.subtitle">{{item.subtitle}}</small></div><strong class="vx-breakdown-new__money">{{money(item.amount)}}</strong></div>
 <div class="vx-breakdown-new__summary"><div v-if="showSubtotal"><span>Subtotal ({{items.length}} items)</span><span>{{money(subtotal)}}</span></div><div v-for="item in adjustments" :key="item.id"><span>{{item.label}}</span><span :class="{'vx-breakdown-new__discount':item.amount<0}">{{item.amount<0?'- '+money(Math.abs(item.amount)):money(item.amount)}}</span></div></div>
 <div class="vx-breakdown-new__total"><strong>Total amount due</strong><strong>{{money(computedTotal)}}</strong></div></div>
 <p v-if="note" class="vx-breakdown-new__note">{{note}}</p>
</aside>
</template>
<style scoped>
.vx-breakdown-new{width:100%;box-sizing:border-box;padding:20px;border:1px solid var(--vx-border,#dce4ef);border-radius:20px;background:var(--vx-surface,#fff);color:var(--vx-text,#15213c);box-shadow:0 9px 26px rgba(21,41,80,.04)}.vx-breakdown-new__header{display:flex;align-items:center;gap:14px;margin-bottom:18px}.vx-breakdown-new__titleicon,.vx-breakdown-new__itemicon{display:grid;place-items:center;flex-shrink:0;background:var(--vx-input,#f0f5ff);color:var(--vx-primary,#193b9f);border-radius:11px;width:46px;height:46px}.vx-breakdown-new__header h2{font-size:22px;margin:0 0 4px}.vx-breakdown-new__header p{font-size:14px;color:var(--vx-muted,#60718d);margin:0}.vx-breakdown-new__panel{border:1px solid var(--vx-border,#dde6f2);border-radius:15px;overflow:hidden;padding:15px}.vx-breakdown-new__panel h3{margin:0 0 14px;font-size:17px}.vx-breakdown-new__item{display:flex;gap:12px;align-items:center;margin-bottom:14px}.vx-breakdown-new__itemicon{width:42px;height:42px}.vx-breakdown-new__copy{display:grid;gap:4px;flex:1;min-width:0}.vx-breakdown-new__copy strong{font-weight:700}.vx-breakdown-new__copy small{color:var(--vx-muted,#60718d)}.vx-breakdown-new__money{white-space:nowrap;font-variant-numeric:tabular-nums}.vx-breakdown-new__summary{border-top:1px solid var(--vx-border,#dfe7f1);padding-top:14px;display:grid;gap:10px;margin-top:6px}.vx-breakdown-new__summary>div{display:flex;justify-content:space-between;gap:10px;align-items:center}.vx-breakdown-new__discount{color:#18713c;font-weight:650}.vx-breakdown-new__total{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:16px;background:var(--vx-input,#edf3ff);border-radius:11px;padding:13px 14px;font-size:17px}.vx-breakdown-new__empty{padding:10px;color:var(--vx-muted,#63738e)}.vx-breakdown-new__note{font-size:13px;color:var(--vx-muted,#60718d);margin:13px 4px 0}@media(max-width:480px){.vx-breakdown-new{padding:12px}.vx-breakdown-new__header h2{font-size:19px}.vx-breakdown-new__panel{padding:10px}.vx-breakdown-new__total{font-size:14px}}
</style>
