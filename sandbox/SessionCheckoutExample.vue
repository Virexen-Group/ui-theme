<script setup lang="ts">
import { computed, ref } from 'vue';
import VFormWorkflow from '../src/components/forms/VFormWorkflow.vue';
import VSessionSelectCard from '../src/components/forms/VSessionSelectCard.vue';
import VPriceBreakdown from '../src/components/finance/VPriceBreakdown.vue';
import VCurrencyAmount from '../src/components/finance/VCurrencyAmount.vue';
import type { WorkflowSection, FormValues } from '../src/components/forms/workflow.types';
import '../src/styles/workflow.css';
import '../src/styles/commerce.css';
const position = ref<'side'|'top'>('top');
const mode = ref<'wizard'|'all'>('wizard');
const notice = ref('');
const sessions = [
 {id:'one',title:'Discover & Grow',dateLabel:'3–7 Jun',subtitle:'Week 1',price:650},
 {id:'two',title:'Create & Innovate',dateLabel:'10–14 Jun',subtitle:'Week 2',price:650},
 {id:'three',title:'Explore & Experience',dateLabel:'17–21 Jun',subtitle:'Week 3',price:650},
 {id:'four',title:'Lead & Make an Impact',dateLabel:'24–28 Jun',subtitle:'Week 4',price:650}
];
const values = ref<FormValues>({name:'',programme:'',sessions:[],extrasAcknowledged:false,agreement:false});
const sections: WorkflowSection[]=[
 {id:'details',title:'Student details',fields:[{key:'name',label:'Full name',required:true}]},
 {id:'programme',title:'Programme selection',fields:[{key:'programme',label:'Programme',required:true}]},
 {id:'sessions',title:'Session select',fields:[{key:'sessions',label:'Sessions',required:true}]},
 {id:'extras',title:'Add-ons',fields:[{key:'extrasAcknowledged',label:'Add-ons reviewed',required:true}]},
 {id:'review',title:'Review & payment',fields:[{key:'agreement',label:'Terms accepted',required:true}]}
];
const chosen = computed(()=>sessions.filter(s=>(values.value.sessions as string[]).includes(s.id)));
const items = computed(()=>chosen.value.map(s=>({id:s.id,label:s.dateLabel,subtitle:s.title,amount:s.price})));
const subtotal = computed(()=>items.value.reduce((sum,item)=>sum+item.amount,0));
const adjustments = computed(()=>subtotal.value>0?[{id:'demo-discount',label:'Example early bird (10%)',amount:Math.round(-subtotal.value*.1*100)/100}]:[]);
function update(key:string,value:unknown){values.value={...values.value,[key]:value};}
function toggleSession(id:string,checked:boolean){const all=(values.value.sessions as string[]);update('sessions',checked?[...all,id]:all.filter(x=>x!==id));}
</script>
<template>
 <div class="vx-demo">
  <div class="vx-demo__settings"><strong>Workflow layout:</strong> <select v-model="position"><option value="top">Top progress stepper</option><option value="side">Sidebar</option></select> <strong>Mode:</strong> <select v-model="mode"><option value="wizard">Step by step</option><option value="all">All sections</option></select></div>
  <p v-if="notice" role="status">{{notice}}</p>
  <VFormWorkflow v-model="values" :sections="sections" :navigation-position="position" :mode="mode" @save="notice='Save draft requested (demo only)'" @save-exit="notice='Save and exit requested (demo only)'" @submit="notice='Valid submission requested (demo only)'">
   <template #details><label class="vx-demo__field">Student name *<input :value="String(values.name)" @input="update('name',($event.target as HTMLInputElement).value)" /></label></template>
   <template #programme><label class="vx-demo__field">Programme *<select :value="String(values.programme)" @change="update('programme',($event.target as HTMLSelectElement).value)"><option value="">Choose a programme</option><option value="summer">Summer camp</option><option value="sports">Sports camp</option></select></label></template>
   <template #sessions><div class="vx-demo__split"><div><h3>Select sessions</h3><p>Choose one or more sessions.</p><div class="vx-demo__choices"><VSessionSelectCard v-for="s in sessions" :key="s.id" :model-value="(values.sessions as string[]).includes(s.id)" :title="s.title" :date-label="s.dateLabel" :subtitle="s.subtitle" :price="s.price" description="Example session description. Content is supplied by the app." @update:model-value="toggleSession(s.id,$event)"/></div></div><VPriceBreakdown title="Tuition breakdown" :items="items" :adjustments="adjustments" note="Example discount only; calculate tuition in your application backend." /></div></template>
   <template #extras><label><input type="checkbox" :checked="values.extrasAcknowledged===true" @change="update('extrasAcknowledged',($event.target as HTMLInputElement).checked)"/> I have reviewed available add-ons *</label></template>
   <template #review><p>Estimated session tuition: <strong><VCurrencyAmount :amount="subtotal+adjustments.reduce((a,b)=>a+b.amount,0)" /></strong></p><label><input type="checkbox" :checked="values.agreement===true" @change="update('agreement',($event.target as HTMLInputElement).checked)"/> I accept the terms *</label></template>
  </VFormWorkflow>
 </div>
</template>
<style scoped>
.vx-demo{width:100%;max-width:1320px;margin:auto}.vx-demo__settings{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 22px}.vx-demo__settings select,.vx-demo__field input,.vx-demo__field select{font:inherit;padding:10px;border:1px solid #b5bfd0;border-radius:10px;min-height:44px}.vx-demo__field{display:grid;gap:7px;max-width:500px}.vx-demo__split{display:grid;gap:20px;min-width:0}.vx-demo__choices{display:grid;gap:10px}.vx-demo__split h3{margin:0 0 8px}.vx-demo__split p{color:var(--vx-muted,#5b6b8c)}@media(min-width:1100px){.vx-demo__split{grid-template-columns:minmax(0,1fr) 300px}}
</style>
