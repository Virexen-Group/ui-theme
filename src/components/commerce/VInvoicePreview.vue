<script setup lang="ts">
import { computed } from 'vue';
export type InvoiceLine={description:string;quantity:number;unitPrice:number};
const p=withDefaults(defineProps<{number?:string;issuer?:string;customer?:string;date?:string;dueDate?:string;currency?:string;lines?:InvoiceLine[];status?:string}>(),{number:'INV-001',issuer:'Your business',customer:'Customer',date:'',currency:'USD',lines:()=>[]});
const safeLines=computed(()=>Array.isArray(p.lines)?p.lines:[]);
const total=computed(()=>safeLines.value.reduce((a,l)=>a+(Number(l.quantity)||0)*(Number(l.unitPrice)||0),0));
const money=(n:number)=>new Intl.NumberFormat(undefined,{style:'currency',currency:p.currency}).format(n);
</script>
<template>
<article class="vx-invoice vx-invoice-new">
  <header class="vx-invoice-new__head"><div><span class="vx-invoice-new__eyebrow">BILLING DOCUMENT</span><h2>Invoice</h2><p>Invoice #{{number}}</p></div><span v-if="status" class="vx-invoice-new__status">{{status}}</span></header>
  <div class="vx-invoice-new__parties"><div><span>FROM</span><strong>{{issuer}}</strong></div><div><span>BILL TO</span><strong>{{customer}}</strong></div></div>
  <div class="vx-invoice-new__dates"><span v-if="date">Issued {{date}}</span><span v-if="dueDate">Due {{dueDate}}</span></div>
  <div class="vx-invoice-new__scroll"><table><thead><tr><th>Item</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody><tr v-for="(line,i) in safeLines" :key="i"><td>{{line.description}}</td><td>{{line.quantity}}</td><td>{{money(line.unitPrice)}}</td><td>{{money(line.quantity*line.unitPrice)}}</td></tr><tr v-if="!safeLines.length"><td colspan="4" class="vx-invoice-new__empty">No invoice lines added</td></tr></tbody></table></div>
  <footer class="vx-invoice-new__total"><strong>Amount due</strong><strong>{{money(total)}}</strong></footer>
</article>
</template>
<style scoped>
.vx-invoice-new{padding:24px;border:1px solid var(--vx-border,#dce4f2);background:var(--vx-surface,#fff);color:var(--vx-text,#15243d);border-radius:20px;box-shadow:0 12px 28px rgba(20,36,67,.04);width:100%;box-sizing:border-box}.vx-invoice-new__head{display:flex;justify-content:space-between;gap:20px;align-items:start;border-bottom:1px solid var(--vx-border,#e1e6f0);padding-bottom:20px}.vx-invoice-new__head h2{font-size:25px;margin:5px 0}.vx-invoice-new__head p{color:var(--vx-muted,#63738e);margin:0}.vx-invoice-new__eyebrow,.vx-invoice-new__parties span{color:var(--vx-muted,#64748b);letter-spacing:.08em;font-size:11px;font-weight:750}.vx-invoice-new__status{background:color-mix(in srgb,var(--vx-primary,#193b9f) 10%,transparent);color:var(--vx-primary,#193b9f);padding:6px 12px;border-radius:20px;font-size:12px;font-weight:700}.vx-invoice-new__parties{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:22px 0}.vx-invoice-new__parties>div{display:grid;gap:8px;min-width:0;overflow-wrap:anywhere}.vx-invoice-new__dates{display:flex;gap:20px;flex-wrap:wrap;color:var(--vx-muted,#607089);font-size:13px;margin-bottom:18px}.vx-invoice-new__scroll{overflow-x:auto}.vx-invoice-new table{width:100%;border-collapse:collapse;min-width:440px}.vx-invoice-new th{text-align:left;background:var(--vx-input,#f4f7fb);font-weight:700;color:var(--vx-muted,#546580)}.vx-invoice-new td,.vx-invoice-new th{padding:13px;border-bottom:1px solid var(--vx-border,#e6ebf2)}.vx-invoice-new th:not(:first-child),.vx-invoice-new td:not(:first-child){text-align:right}.vx-invoice-new__empty{text-align:center!important;color:var(--vx-muted,#64748b)}.vx-invoice-new__total{display:flex;justify-content:space-between;gap:10px;align-items:center;background:var(--vx-input,#f1f6ff);border-radius:11px;padding:16px;margin-top:18px;font-size:18px}@media(max-width:500px){.vx-invoice-new{padding:15px}.vx-invoice-new__parties{grid-template-columns:1fr}}
</style>
