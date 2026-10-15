<script setup lang="ts">
import {computed,ref} from 'vue';
import * as UI from '../src/index';
const props=defineProps<{name:string;aliasOf?:string}>();
const copied=ref(false);const active=ref<'preview'|'code'>('preview');
const actual=computed(()=>props.aliasOf||props.name);
const component=computed(()=>(UI as Record<string,unknown>)[actual.value] as object|undefined);
const displayProps=computed<Record<string,unknown>>(()=>{
 const n=actual.value;
 if(n==='VIcon')return {name:'settings',size:26};
 if(n==='VButton')return {variant:'primary'};
 if(n==='VInput')return {label:'First name',placeholder:'Type your name'};
 if(n==='VTextarea')return {label:'Message',placeholder:'Enter a message'};
 if(n==='VValidatedInput')return {label:'Username',minLength:3,placeholder:'Choose a username'};
 if(n==='VEmailInput')return {label:'Email address'};
 if(n==='VDateOfBirth')return {minAge:18};
 if(n==='VBadge')return {tone:'success'};
 if(n==='VNotification')return {type:'success',title:'Saved',description:'Changes have been saved'};
 if(n==='VAlert')return {title:'Information',description:'This is a live component preview'};
 if(n==='VStatCard')return {label:'Active users',value:1284};
 if(n==='VMetricTile')return {title:'Revenue',value:24850};
 if(n==='VProgress')return {value:65,label:'Progress'};
 if(n==='VSkeleton')return {width:'65%',height:'20px'};
 if(n==='VBrandLogo')return {size:64};
 if(n==='VAvatarEditor')return {};
 if(n==='VFileManager')return {multiple:true,maxSizeMb:10};
 if(n==='VDataTable'||n==='VDataGrid'||n==='VAdvancedTable')return {rows:[{id:1,name:'Alex'},{id:2,name:'Jordan'}],columns:[{key:'name',label:'Name'}]};
 if(n==='VImageUploader')return {imageOnly:true};
 if(n==='VMultiSelect')return {modelValue:[],options:[{value:'one',label:'First option'},{value:'two',label:'Second option'}]};
 if(n==='VFormWorkflow')return {sections:[{id:'contact',title:'Contact information',fields:[{key:'name',label:'Name',required:true}]}],modelValue:{name:'Sample user'}};
 if(n==='VCard'||n==='VContainer'||n==='VCol'||n==='VRow'||n==='VStack'||n==='VHStack'||n==='VFlex'||n==='VGrid'||n==='VSection')return {};
 if(n==='VModal'||n==='VDrawer'||n==='VConfirmDialog'||n==='VDetailDrawer'||n==='VCommandPalette'||n==='VIdentitySignIn'||n==='VAppShell'||n==='VSidebar'||n==='VDashboardGrid'||n==='VToastProvider'||n==='VFloatingPopover')return {open:false};
 return {};
});
const safePreviewNames=new Set(['VButton','VInput','VTextarea','VValidatedInput','VEmailInput','VDateOfBirth','VBadge','VNotification','VAlert','VStatCard','VProgress','VSkeleton','VBrandLogo','VCard','VContainer','VCol','VRow','VStack','VHStack','VFlex','VGrid','VSection','VIcon','VMultiSelect']);
const needsSetup=computed(()=>!safePreviewNames.has(actual.value) || ['VIdentitySignIn','VAppShell','VSidebar','VDashboardGrid','VToastProvider','VCommandPalette','VWizardLayout','VDateRange','VDateTimePicker','VDatePicker','VTimePicker','VPaymentMethod','VPriceBreakdown','VInvoicePreview','VSubscriptionPricing','VSessionSelectCard','VProductSelectCard','VProfileView','VOrderSummary','VCalendar','VScheduler'].includes(actual.value));
const snippet=computed(()=>{let attrs=Object.entries(displayProps.value).filter(([k])=>k!=='open').map(([k,v])=>typeof v==='string'?` ${k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}="${v}"`:` :${k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}="${JSON.stringify(v)}"`).join('');return `<script setup lang="ts">\nimport { ${props.name} } from '@virexen-group/ui-theme/vue';\n<\/script>\n\n<template>\n  <${props.name}${attrs}>${['VButton','VCard','VContainer','VCol','VRow','VStack','VHStack','VFlex','VGrid','VSection'].includes(actual.value)?'Example content':''}</${props.name}>\n</template>`});
function copy(){if(typeof navigator!=='undefined'&&navigator.clipboard)navigator.clipboard.writeText(snippet.value).then(()=>{copied.value=true;setTimeout(()=>copied.value=false,1600)}).catch(()=>{});}
</script>
<template><article :id="name" class="vx-docs-example"><div class="vx-docs-example-head"><div><h3>{{name}}</h3><span v-if="aliasOf" class="vx-docs-alias">Compatibility alias of {{aliasOf}}</span></div><div class="vx-docs-example-actions"><button type="button" @click="active=active==='preview'?'code':'preview'">{{active==='preview'?'View code':'Live preview'}}</button><button type="button" @click="copy">{{copied?'Copied!':'Copy code'}}</button></div></div>
<div v-if="active==='preview'" class="vx-docs-example-preview"><p v-if="needsSetup" class="vx-docs-muted">This component needs application data or slots to preview safely. Use its dedicated playground or copy the example as a starting point.</p><component v-else-if="component" :is="component" v-bind="displayProps"><template v-if="['VButton','VCard','VContainer','VCol','VRow','VStack','VHStack','VFlex','VGrid','VSection'].includes(actual)">Example content</template></component><p v-else>Component unavailable in current build.</p></div><pre v-else class="vx-docs-example-code"><code>{{snippet}}</code></pre></article></template>
