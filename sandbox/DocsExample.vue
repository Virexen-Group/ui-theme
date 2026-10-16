<script setup lang="ts">
import {computed,ref} from 'vue';
import * as UI from '../src/index';
import DocsPreviewBoundary from './DocsPreviewBoundary.vue';
import {iconNames} from '../src/components/icons/icon-catalog';
import {previewFixtures} from './preview-fixtures';
const props=defineProps<{name:string;aliasOf?:string}>();
const active=ref<'preview'|'code'>('preview');
const copied=ref(false);
const opened=ref(false);const iconQuery=ref(''); const demoText=ref('Manrope makes complex products feel approachable.');const chosenFont=ref('Manrope');const fontOptions=['Manrope','Inter','Arial','Georgia','system-ui'];const matchedIcons=computed(()=>iconNames.filter(n=>n.includes(iconQuery.value.toLowerCase())));
const actual=computed(()=>props.aliasOf||props.name);
const component=computed(()=>(UI as Record<string,unknown>)[actual.value] as object|undefined);
const fixtures=computed(()=>previewFixtures[actual.value]||{});
const overlayNames=new Set(['VModal','VDrawer','VConfirmDialog','VDetailDrawer','VCommandPalette','VFloatingPopover']);
const isOverlay=computed(()=>overlayNames.has(actual.value));
const isSignIn=computed(()=>actual.value==='VIdentitySignIn');
const fullPageUrl=computed(()=>actual.value==='VSidebar'?'/sidebar.html':actual.value==='VAppHeader'?'/header.html':'');
const exampleProps=computed(()=>({...fixtures.value,...(isOverlay.value?{open:opened.value,modelValue:opened.value}:{})}));
const interactiveNames=new Set(['VButton','VCard','VContainer','VCol','VRow','VStacK','VStack','VHStack','VFlex','VGrid','VSection','VCustomTile','VTransition','VReveal','VFormSection','VTooltip','VScrollArea','VAspectRatio','VFormField','VToastProvider']);
const slotContent=computed(()=>interactiveNames.has(actual.value)?'Example content':undefined);
const snippet=computed(()=>{
  const data=JSON.stringify(fixtures.value,null,2);
  const hasProps=Object.keys(fixtures.value).length>0;
  return `<script setup lang="ts">\nimport { ref } from 'vue';\nimport { ${props.name} } from '@virexen-group/ui-theme/vue';${hasProps?`\nconst exampleProps = ${data};`:''}\n<\/script>\n\n<template>\n  <${props.name}${hasProps?' v-bind="exampleProps"':''}>${slotContent.value||''}</${props.name}>\n</template>`;
});
async function copy(){try{await navigator.clipboard.writeText(snippet.value);copied.value=true;setTimeout(()=>copied.value=false,1400)}catch{copied.value=false}}
</script>
<template>
 <article :id="name" class="vx-docs-example">
  <div class="vx-docs-example-head"><div><h3>{{name}}</h3><span v-if="aliasOf" class="vx-docs-alias">Compatibility alias of {{aliasOf}}</span></div>
   <div class="vx-docs-example-actions"><button type="button" @click="active=active==='preview'?'code':'preview'">{{active==='preview'?'View code':'Live preview'}}</button><button type="button" @click="copy">{{copied?'Copied!':'Copy code'}}</button></div>
  </div>
  <div v-if="active==='preview'" class="vx-docs-example-preview">
   <div v-if="fullPageUrl" class="vx-docs-full-page-prompt"><p>{{actual==='VSidebar'?'Sidebar':actual==='VBottomNavigation'?'Bottom navigation':'Header'}} is an application-wide component. Open its dedicated full-page preview to see the correct layout, theming and interaction.</p><a class="vx-docs-preview-button" :href="fullPageUrl">Preview {{actual==='VSidebar'?'sidebar':actual==='VBottomNavigation'?'bottom navigation':'header'}} in full page ↗</a></div>
   <template v-else><div v-if="isSignIn" class="vx-full-component-preview"><p>Virexen Identity uses a full-height centered sign-in layout.</p><a class="vx-docs-preview-button" href="/identity.html">Open full-page Identity preview ↗</a></div><div v-else-if="actual==='VIcon'" class="vx-special-preview"><label class="vx-field__label">Search icons ({{matchedIcons.length}})</label><input class="vx-control" v-model="iconQuery" placeholder="Search the shared icon library"/><div class="vx-icons-preview"><div v-for="n in matchedIcons" :key="n" class="vx-icons-preview__item" :title="n"><component :is="component" :name="n" :size="25"/><small>{{n}}</small></div></div></div>
   <div v-else-if="actual==='VTypography'" class="vx-special-preview"><label class="vx-field__label">Typeface</label><select v-model="chosenFont" class="vx-control"><option v-for="font in fontOptions" :key="font">{{font}}</option></select><input v-model="demoText" class="vx-control" aria-label="Sample typography text"/><div :style="{fontFamily:chosenFont}" class="vx-font-preview"><p class="vx-font-display">{{demoText}}</p><h2>Heading level two</h2><p>The quick brown fox jumps over the lazy dog. 0123456789</p><small>Font family: {{chosenFont}}</small></div></div>
   <div v-else-if="actual==='VPhoneInput'" class="vx-special-preview"><p class="vx-docs-muted">Choose a country code and enter a phone number.</p><component :is="component" v-bind="exampleProps"/></div>
   <div v-else><div v-if="isOverlay" class="vx-docs-preview-launch"><button type="button" @click="opened=true">Open {{name}} preview</button><p>Click to explore the interactive overlay.</p></div>
   <DocsPreviewBoundary :name="name">
    <component v-if="component" :is="component" v-bind="exampleProps" @close="opened=false" @update:open="opened=$event" @update:model-value="(value: unknown)=>{if(isOverlay)opened=Boolean(value)}">
     <template v-if="slotContent">{{slotContent}}</template>
     <template v-if="actual==='VDashboardGrid'" #item="{id}"><div class="vx-docs-demo-widget"><strong>{{id==='revenue'?'Revenue':'Users'}}</strong><p>{{id==='revenue'?'£24,850':'1,284'}}</p></div></template>
     <template v-if="actual==='VFloatingPopover'" #trigger>Open sample popover</template>
    </component>
    <p v-else role="alert">Export {{actual}} was not found in this library build.</p>
   </DocsPreviewBoundary></div></template>
  </div>
  <pre v-else class="vx-docs-example-code"><code>{{snippet}}</code></pre>
 </article>
</template>

<style scoped>.vx-docs-full-page-prompt{display:grid;gap:13px;padding:14px;max-width:600px}.vx-docs-full-page-prompt p{margin:0;line-height:1.65;color:#53637e}.vx-docs-preview-button{display:inline-flex;justify-content:center;align-items:center;max-width:max-content;background:#193b9f;border-radius:10px;padding:12px 18px;color:white;text-decoration:none;font-weight:750}.vx-docs-preview-button:hover{background:#10296e}</style>
