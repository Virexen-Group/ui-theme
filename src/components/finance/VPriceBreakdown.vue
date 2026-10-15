<script setup lang="ts">
import { computed } from 'vue';
import VCurrencyAmount from './VCurrencyAmount.vue';
export interface PriceLine { id: string; label: string; subtitle?: string; amount: number }
const props = withDefaults(defineProps<{
  title?:string; items:PriceLine[]; adjustments?:PriceLine[]; currency?:string; locale?:string;
  total?:number; note?:string; showSubtotal?:boolean;
}>(), {title:'Price breakdown',currency:'USD',locale:'en-US',showSubtotal:true});
const subtotal = computed(() => props.items.reduce((sum,item)=>sum+item.amount,0));
const computedTotal = computed(()=>props.total ?? (subtotal.value + (props.adjustments ?? []).reduce((sum,item)=>sum+item.amount,0)));
</script>
<template>
  <aside class="vx-breakdown" aria-label="Price breakdown">
    <h2 class="vx-breakdown__title">{{title}}</h2>
    <div class="vx-breakdown__group">
      <h3>Selected items ({{items.length}})</h3>
      <div v-if="!items.length" class="vx-breakdown__empty">No items selected yet.</div>
      <div v-for="item in items" :key="item.id" class="vx-breakdown__line">
        <div><strong>{{item.label}}</strong><small v-if="item.subtitle">{{item.subtitle}}</small></div>
        <VCurrencyAmount :amount="item.amount" :currency="currency" :locale="locale"/>
      </div>
    </div>
    <div v-if="showSubtotal" class="vx-breakdown__line vx-breakdown__subtotal"><strong>Subtotal</strong><VCurrencyAmount :amount="subtotal" :currency="currency" :locale="locale"/></div>
    <div v-if="adjustments?.length" class="vx-breakdown__group">
      <h3>Discounts &amp; adjustments</h3>
      <div v-for="item in adjustments" :key="item.id" class="vx-breakdown__line"><span>{{item.label}}</span><VCurrencyAmount :amount="item.amount" :currency="currency" :locale="locale"/></div>
    </div>
    <div class="vx-breakdown__line vx-breakdown__total"><strong>Total</strong><strong><VCurrencyAmount :amount="computedTotal" :currency="currency" :locale="locale"/></strong></div>
    <p v-if="note" class="vx-breakdown__note">{{ note }}</p>
  </aside>
</template>
