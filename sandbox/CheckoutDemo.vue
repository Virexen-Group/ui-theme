<script setup lang="ts">
import { computed, ref } from 'vue';
import VSessionSelectCard from '../src/components/forms/VSessionSelectCard.vue';
import VPriceBreakdown from '../src/components/finance/VPriceBreakdown.vue';
import VFileUpload from '../src/components/forms/VFileUpload.vue';

// App-controlled per-step configuration: no pricing panel before a price-relevant section.
const steps = [
  { id:'details', title:'Student Details', heading:'Student details', summary:false },
  { id:'programme', title:'Programme Selection', heading:'Choose a programme', summary:false },
  { id:'sessions', title:'Session Select', heading:'Select sessions', summary:true },
  { id:'addons', title:'Add-Ons', heading:'Additional options', summary:true },
  { id:'review', title:'Review & Payment', heading:'Review your application', summary:true }
];
const sessions = [
  { id:'s1',title:'Discover & Grow',date:'3–7 Jun 2027',subtitle:'Week 1',price:650 },
  { id:'s2',title:'Create & Innovate',date:'10–14 Jun 2027',subtitle:'Week 2',price:650 },
  { id:'s3',title:'Explore & Experience',date:'17–21 Jun 2027',subtitle:'Week 3',price:650 },
  { id:'s4',title:'Lead & Make an Impact',date:'24–28 Jun 2027',subtitle:'Week 4',price:650 },
  { id:'s5',title:'Future Ready',date:'1–5 Jul 2027',subtitle:'Week 5',price:650 }
];
const step = ref(0);
const studentName = ref('');
const studentEmail = ref('');
const programme = ref('');
const selected = ref<string[]>([]);
const addLunch = ref(false);
const agreement = ref(false);
const currentFiles = ref<File[]>([]);
const notice = ref('');
const confirmed = ref<Record<string,string>>({});
const current = computed(() => steps[step.value]);
const selectedItems = computed(() => sessions.filter(s => selected.value.includes(s.id)));
const items = computed(() => [
  ...selectedItems.value.map(s => ({id:s.id,label:s.date,subtitle:s.title,amount:s.price})),
  ...(addLunch.value ? [{id:'lunch',label:'Lunch programme',amount:40}] : [])
]);
const subtotal = computed(() => items.value.reduce((sum,s)=>sum+s.amount,0));
const sessionSubtotal = computed(()=>selectedItems.value.reduce((sum,s)=>sum+s.price,0));
const adjustments = computed(() => sessionSubtotal.value ? [{id:'early',label:'Example early-bird (10% off sessions)',amount:-sessionSubtotal.value*.1}] : []);
const total = computed(()=>subtotal.value+adjustments.value.reduce((sum,s)=>sum+s.amount,0));
const formatPrice = (value:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
function snapshot(index:number):string {
  switch(index){
    case 0:return JSON.stringify([studentName.value,studentEmail.value]);
    case 1:return JSON.stringify([programme.value]);
    case 2:return JSON.stringify([...selected.value].sort());
    case 3:return JSON.stringify([addLunch.value,currentFiles.value.map(f=>[f.name,f.size,f.lastModified])]);
    case 4:return JSON.stringify([agreement.value]);
    default:return '';
  }
}
function valid(index:number):boolean {
  switch(index){
    case 0:return !!studentName.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail.value);
    case 1:return !!programme.value;
    case 2:return selected.value.length>0;
    case 3:return true; // Optional add-ons
    case 4:return agreement.value;
    default:return false;
  }
}
function complete(index:number):boolean { return valid(index) && confirmed.value[steps[index].id]===snapshot(index); }
const allComplete=computed(()=>steps.every((_,i)=>complete(i)));
function confirm(index:number):boolean {
  if(!valid(index)){ notice.value='Please complete the required fields in this section.';return false; }
  confirmed.value={...confirmed.value,[steps[index].id]:snapshot(index)};
  notice.value='';return true;
}
function next(){ if(!confirm(step.value))return; if(step.value<steps.length-1)step.value++; else if(allComplete.value)notice.value='Example application validated. No data has been submitted.'; }
function save(exit=false){
  steps.forEach((_,i)=>{ if(valid(i))confirmed.value={...confirmed.value,[steps[i].id]:snapshot(i)}; });
  notice.value=exit?'Save & Exit requested — connect the application persistence and navigation.':'Save draft requested — connect the application persistence.';
}
function toggle(id:string,checked:boolean){selected.value=checked?[...new Set([...selected.value,id])]:selected.value.filter(s=>s!==id)}
function navigate(index:number){step.value=index;notice.value=''}
</script>
<template>
<div class="checkout-shell">
  <header class="checkout-header"><div class="checkout-brand"><span class="checkout-logo">V</span><span>Camp<span class="checkout-purple">Pulze</span></span></div><div class="checkout-account" aria-label="Example account">AM</div></header>
  <main class="checkout-main">
    <nav class="checkout-steps" aria-label="Application sections">
      <button v-for="(item,i) in steps" :key="item.id" type="button" class="checkout-step" :class="{done:complete(i),active:i===step}" :aria-current="i===step?'step':undefined" @click="navigate(i)">
        <span class="checkout-bubble">{{complete(i)?'✓':i+1}}</span><span class="checkout-step-label">{{item.title}}</span>
      </button>
    </nav>
    <div class="checkout-grid" :class="{'checkout-grid--no-summary':!current.summary}">
      <section class="checkout-card">
        <h1>{{current.heading}}</h1>
        <template v-if="step===0">
          <p>Begin your application with the camper's details.</p>
          <div class="app-fields"><label class="app-field">Camper's full name <span>*</span><input v-model="studentName" type="text" autocomplete="name" placeholder="Enter full name" required /></label>
          <label class="app-field">Contact email <span>*</span><input v-model="studentEmail" type="email" autocomplete="email" placeholder="name@example.com" required /></label></div>
        </template>
        <template v-else-if="step===1">
          <p>Select the programme for this application.</p>
          <div class="app-fields"><label class="app-field">Programme <span>*</span><select v-model="programme" required><option value="">Choose a programme</option><option value="day">Day Camp</option><option value="overnight">Overnight Camp</option></select></label></div>
        </template>
        <template v-else-if="step===2">
          <p>Choose the sessions you would like to enrol in. Select at least one.</p>
          <div class="checkout-sessions"><VSessionSelectCard v-for="s in sessions" :key="s.id" :model-value="selected.includes(s.id)" :title="s.title" :date-label="s.date" :subtitle="s.subtitle" :price="s.price" description="Example session: the application supplies dates, eligibility and availability." @update:model-value="toggle(s.id,$event)" /></div>
        </template>
        <template v-else-if="step===3">
          <p>Optional additions to your selected sessions.</p>
          <label class="app-checkbox"><input v-model="addLunch" type="checkbox" /> Add lunch programme ({{formatPrice(40)}})</label>
          <div class="app-upload"><VFileUpload label="Optional supporting document" accept=".pdf,.png,.jpg,.jpeg,.webp" :max-file-size-mb="10" @change="currentFiles=$event" /></div>
        </template>
        <template v-else>
          <p>Confirm all sections before submitting. This is a demonstration and won't charge a card.</p>
          <div class="app-review"><div><strong>Camper</strong><span>{{studentName || 'Not provided'}}</span></div><div><strong>Programme</strong><span>{{programme || 'Not selected'}}</span></div><div><strong>Sessions</strong><span>{{selected.length}}</span></div><div><strong>Illustrative total</strong><span>{{formatPrice(total)}}</span></div></div>
          <label class="app-checkbox"><input v-model="agreement" type="checkbox" /> I have reviewed this application and agree to continue <span>*</span></label>
        </template>
        <p v-if="complete(step)" class="app-confirmed">✓ Section confirmed</p>
      </section>
      <div v-if="current.summary" class="checkout-sidebar"><VPriceBreakdown title="Tuition Breakdown" :items="items" :adjustments="adjustments" :note="selected.length ? 'Illustrative amounts only. The camp supplies final tuition rules.' : undefined" /></div>
    </div>
    <p v-if="notice" class="checkout-notice" role="status">{{notice}}</p>
  </main>
  <footer class="checkout-footer"><button class="checkout-back" type="button" :disabled="step===0" @click="navigate(Math.max(0,step-1))">← Back</button><div class="checkout-footer-right"><button class="checkout-save" type="button" @click="save(false)">Save draft</button><button class="checkout-save" type="button" @click="save(true)">Save &amp; exit</button><button class="checkout-next" type="button" @click="next">{{step===steps.length-1?'Submit example':'Continue'}} →</button></div></footer>
</div>
</template>
<style>
:root{--vx-primary:#5243d6;--vx-border:#dce2eb;--vx-surface:#fff;--vx-muted:#53647e;--vx-text:#111b35}
body{margin:0;background:#f6f8fc;color:#111b35;font-family:var(--font-body,'Manrope',sans-serif)}
.checkout-shell{min-height:100dvh;display:flex;flex-direction:column;background:linear-gradient(130deg,#f9fbff,#f3f5fa)}
.checkout-header{display:flex;justify-content:space-between;align-items:center;gap:12px;background:#fff;border-bottom:1px solid #e6e9ef;padding:14px max(20px,calc((100vw - 1440px)/2));min-height:72px}
.checkout-brand{display:flex;align-items:center;gap:13px;font-size:clamp(1.2rem,3vw,2rem);font-weight:800;letter-spacing:-.04em}.checkout-purple{color:#4c3ed3}.checkout-logo{display:grid;place-items:center;background:linear-gradient(135deg,#7863ed,#3529b6);color:#fff;border-radius:11px;width:43px;height:43px;font-size:25px}.checkout-account{width:42px;height:42px;border-radius:50%;background:#eef1f8;display:grid;place-items:center;font-size:.78rem;font-weight:700}
.checkout-main{flex:1;width:100%;max-width:1440px;margin:0 auto;padding:22px 20px 30px}
.checkout-steps{display:flex;overflow-x:auto;gap:0;padding:6px 0 26px;scrollbar-width:thin}.checkout-step{appearance:none;flex:1 0 130px;min-width:0;border:0;background:none;display:flex;flex-direction:column;align-items:center;position:relative;gap:10px;cursor:pointer;font:inherit;color:#55637d;white-space:normal;text-align:center}.checkout-step:not(:last-child):after{content:'';height:2px;background:#d0d6e1;position:absolute;left:calc(50% + 23px);right:calc(-50% + 23px);top:18px}.checkout-step.done:not(:last-child):after{background:#5545d5}.checkout-bubble{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#b8bfcc;color:#fff;font-weight:700;position:relative;z-index:1}.checkout-step.done .checkout-bubble,.checkout-step.active .checkout-bubble{background:#5143d5}.checkout-step.done .checkout-bubble{background:#168c59}.checkout-step.active .checkout-bubble{outline:3px solid #d7d2ff}.checkout-step-label{font-size:.85rem}.checkout-step.active .checkout-step-label{color:#4c3ed3;font-weight:700}
.checkout-grid{display:grid;gap:18px;align-items:start}.checkout-grid--no-summary{grid-template-columns:minmax(0,1fr)!important;max-width:900px;margin-inline:auto}.checkout-card{background:#fff;border:1px solid #e1e6f0;border-radius:18px;padding:20px;min-width:0}.checkout-card h1{font-size:clamp(1.35rem,2vw,1.8rem);margin:0 0 4px}.checkout-card>p{color:#53647e;margin:0 0 22px}.checkout-sessions{display:grid;gap:12px}.checkout-sidebar{min-width:0}.checkout-sidebar .vx-breakdown{border-radius:18px}.checkout-subtle{margin-top:20px!important}.checkout-notice{color:#b03d4c;margin:14px 0}
.checkout-footer{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;background:#fff;border-top:1px solid #e2e6ed;padding:16px max(20px,calc((100vw - 1440px)/2))}.checkout-footer-right{display:flex;gap:10px;flex-wrap:wrap}.checkout-footer button{border-radius:12px;min-height:48px;font:inherit;font-weight:700;padding:10px 22px;cursor:pointer}.checkout-back,.checkout-save{background:#fff;border:1px solid #ccd3df;color:#172138}.checkout-next{background:#5143d5;color:#fff;border:1px solid #5143d5}
@media(min-width:960px){.checkout-main{padding:30px 30px 44px}.checkout-steps{padding-bottom:35px}.checkout-grid{grid-template-columns:minmax(0,1.95fr) minmax(300px,1fr);gap:22px}.checkout-card{padding:28px}.checkout-header{padding-left:48px;padding-right:48px}}
@media(max-width:520px){.checkout-header{min-height:60px}.checkout-footer button{flex:1}.checkout-footer-right{width:100%}.checkout-step{flex-basis:110px}.checkout-step-label{font-size:.72rem}}

.app-fields{display:grid;gap:18px;max-width:680px}.app-field{display:grid;gap:7px;font-size:.9rem;font-weight:700}.app-field span,.app-checkbox span{color:#b42345}.app-field input,.app-field select{min-height:48px;width:100%;padding:12px 14px;background:#f5f7fc;border:1px solid #ccd4e1;border-radius:11px;font:inherit;color:#172138}.app-field input:focus-visible,.app-field select:focus-visible{outline:3px solid #dad5ff}.app-checkbox{display:flex;align-items:center;gap:12px;padding:16px;border:1px solid #e1e5ed;border-radius:12px;margin-top:15px;cursor:pointer}.app-checkbox input{width:20px;height:20px;accent-color:#5143d5}.app-upload{margin-top:18px}.app-review{display:grid;gap:14px;max-width:720px}.app-review>div{display:flex;justify-content:space-between;gap:18px;border-bottom:1px solid #e1e6ed;padding-bottom:10px}.app-confirmed{margin-top:20px!important;color:#168c59!important;font-weight:700}.checkout-back:disabled{opacity:.5;cursor:not-allowed}
</style>
