<script setup lang="ts">
import {ref,computed} from 'vue';
import VButton from '../src/components/buttons/VButton.vue';
import VNotification from '../src/components/feedback/VNotification.vue';
import VToastProvider from '../src/components/feedback/VToastProvider.vue';
import {useVToast} from '../src/composables/useVToast';
const props=withDefaults(defineProps<{section?:'buttons'|'themes'|'toasts'|'all'}>(),{section:'all'});
const toast=useVToast();
const preset=ref<'default'|'calm'|'bold'|'enterprise'>('bold');
const pack=ref<'core'|'soft'|'outline'|'elevated'>('core');
const appearance=ref<'soft'|'standard'|'accent'>('soft');
const showCode=ref<Record<string,boolean>>({});
const copied=ref('');
const packs=['core','soft','outline','elevated'] as const;
const presets=['default','calm','bold','enterprise'] as const;
const types=['success','info','warning','error','neutral'] as const;
const snippet=(id:string)=>id==='buttons'?`<script setup lang="ts">\nimport { VButton } from '@virexen-group/ui-theme/vue';\n<\/script>\n\n<template>\n  <VButton pack="${pack.value}" variant="primary">Continue</VButton>\n  <VButton pack="${pack.value}" variant="secondary">Cancel</VButton>\n</template>`:id==='themes'?`<template>\n  <main data-vx-preset="${preset.value}">\n    <VButton variant="primary">Action</VButton>\n  </main>\n</template>\n\n<!-- Or configure theme.preset in virexen-ui.config.ts -->`:`<script setup lang="ts">\nimport { useVToast, VToastProvider } from '@virexen-group/ui-theme/vue';\nconst toast = useVToast();\nfunction notify() { toast.success({ title: 'Changes saved', description: 'Your data was saved.' }); }\n<\/script>\n<template>\n  <VButton @click="notify">Show toast</VButton>\n  <VToastProvider position="top-right" />\n</template>`;
function copy(id:string){ const code=snippet(id); if (typeof navigator!=='undefined'&&navigator.clipboard) navigator.clipboard.writeText(code).then(()=>copied.value=id).catch(()=>{}); }
function notify(type:typeof types[number]) {toast.notify(type,{title:type[0].toUpperCase()+type.slice(1)+' notification',description:'This is a real Virexen UI toast triggered from the documentation.',duration:4800});}
</script>
<template>
<div class="vx-showcases" :data-vx-preset="preset">
<section v-if="section==='all'||section==='themes'" id="theme-playground" class="vx-showcase-section">
  <div class="vx-showcase-heading"><div><h2>Theme presets</h2><p>Compare the actual Virexen presets. The selected theme applies to the previews below.</p></div><span class="vx-showcase-tag">Live</span></div>
  <div class="vx-theme-options"><button v-for="name in presets" :key="name" class="vx-theme-choice" :class="{'is-selected':preset===name}" :data-vx-preset="name" :aria-pressed="preset===name" @click="preset=name"><span class="vx-theme-swatch"></span><strong>{{name==='default'?'Default · Teal':name==='calm'?'Calm · Soft':name==='bold'?'Bold · Blue':'Enterprise · Slate'}}</strong><small>{{name}}</small></button></div>
  <div class="vx-showcase-preview"><VButton variant="primary">Primary</VButton><VButton variant="secondary">Secondary</VButton><VButton variant="danger">Destructive</VButton></div>
  <div class="vx-showcase-footer"><button type="button" @click="showCode.themes=!showCode.themes">{{showCode.themes?'Hide':'View'}} Vue code</button><button type="button" @click="copy('themes')">{{copied==='themes'?'Copied':'Copy code'}}</button></div><pre v-if="showCode.themes"><code>{{snippet('themes')}}</code></pre>
</section>
<section v-if="section==='all'||section==='buttons'" id="button-packs" class="vx-showcase-section">
  <div class="vx-showcase-heading"><div><h2>Button packs & states</h2><p>All four existing packs, displayed with the real shared VButton component.</p></div><span class="vx-showcase-tag">Interactive</span></div>
  <div v-for="p in packs" :key="p" class="vx-showcase-line"><div class="vx-showcase-label"><strong>{{p[0].toUpperCase()+p.slice(1)}}</strong><small>{{p}} pack</small></div><div class="vx-showcase-preview"><VButton :pack="p" variant="primary">Primary</VButton><VButton :pack="p" variant="secondary">Secondary</VButton><VButton :pack="p" variant="tertiary">Tertiary</VButton><VButton :pack="p" disabled>Disabled</VButton><VButton :pack="p" icon="settings" tooltip="Settings"/></div></div>
  <div class="vx-showcase-row"><label for="vx-demo-pack">Example pack</label><select id="vx-demo-pack" v-model="pack"><option v-for="p in packs" :key="p" :value="p">{{p}}</option></select><VButton :pack="pack" size="sm">Small</VButton><VButton :pack="pack" size="lg" shape="pill">Pill</VButton><VButton :pack="pack" loading>Loading</VButton></div>
  <div class="vx-showcase-footer"><button type="button" @click="showCode.buttons=!showCode.buttons">{{showCode.buttons?'Hide':'View'}} Vue code</button><button type="button" @click="copy('buttons')">{{copied==='buttons'?'Copied':'Copy code'}}</button></div><pre v-if="showCode.buttons"><code>{{snippet('buttons')}}</code></pre>
</section>
<section v-if="section==='all'||section==='toasts'" id="toast-playground" class="vx-showcase-section">
  <div class="vx-showcase-heading"><div><h2>Notifications & toasts</h2><p>Test the five states, change notification appearance, and fire real toast notifications.</p></div><span class="vx-showcase-tag">Interactive</span></div>
  <div class="vx-showcase-row"><label for="vx-demo-appearance">Appearance</label><select id="vx-demo-appearance" v-model="appearance"><option value="soft">Soft</option><option value="standard">Standard</option><option value="accent">Accent</option></select></div>
  <div class="vx-notification-examples"><VNotification v-for="type in types" :key="type" :type="type" :appearance="appearance" :title="type[0].toUpperCase()+type.slice(1)" :description="'Example '+type+' notification with Virexen styling.'" /></div>
  <div class="vx-showcase-row"><strong>Try a toast:</strong><VButton v-for="type in types" :key="type" size="sm" @click="notify(type)">{{type}}</VButton><VButton size="sm" variant="tertiary" @click="toast.notify('loading',{title:'Loading',description:'Working on your request',duration:2500})">Loading</VButton></div>
  <div class="vx-showcase-footer"><button type="button" @click="showCode.toasts=!showCode.toasts">{{showCode.toasts?'Hide':'View'}} Vue code</button><button type="button" @click="copy('toasts')">{{copied==='toasts'?'Copied':'Copy code'}}</button></div><pre v-if="showCode.toasts"><code>{{snippet('toasts')}}</code></pre>
  <VToastProvider position="top-right"/>
</section>
</div>
</template>
<style scoped>
.vx-showcases{--vx-action:#193b9f;display:grid;gap:22px}.vx-showcase-section{background:var(--color-panel-strong,#fff);border:1px solid var(--color-line-strong,#dde5ef);border-radius:16px;padding:24px;min-width:0}.vx-showcase-heading{display:flex;align-items:start;justify-content:space-between;gap:12px;margin-bottom:20px}.vx-showcase-heading h2{margin:0 0 5px;font-size:21px}.vx-showcase-heading p{margin:0;color:var(--color-text-muted,#62718a)}.vx-showcase-tag{border:1px solid var(--color-line-strong,#dde5ef);border-radius:20px;padding:4px 10px;font-size:12px}.vx-showcase-line{display:flex;align-items:center;gap:16px;border-top:1px solid #e4e8f0;padding:13px 0}.vx-showcase-label{width:110px;display:flex;flex-direction:column;flex-shrink:0}.vx-showcase-label small{font-size:11px;opacity:.7}.vx-showcase-preview,.vx-showcase-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.vx-showcase-row{margin:16px 0}.vx-showcase-row select{padding:8px;border:1px solid #d5dce8;border-radius:8px}.vx-theme-options{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:16px}.vx-theme-choice{background:var(--vx-surface,#fff);border:2px solid var(--vx-border,#e4e8f0);border-radius:12px;text-align:left;display:grid;gap:6px;padding:12px;cursor:pointer;color:var(--vx-text,#17233a)}.vx-theme-choice.is-selected{outline:2px solid var(--vx-action);outline-offset:2px}.vx-theme-swatch{height:24px;width:48px;border-radius:7px;background:var(--vx-action)}.vx-theme-choice small{opacity:.7}.vx-showcase-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:14px}.vx-showcase-footer button{padding:7px 11px;border:1px solid #d8e1ef;border-radius:8px;background:transparent;cursor:pointer;color:inherit}.vx-showcase-section pre{white-space:pre-wrap;overflow-wrap:anywhere;overflow:auto;border-radius:10px;padding:18px;background:#172235;color:#e5edff;font-size:12px}.vx-notification-examples{display:grid;gap:9px}@media(max-width:620px){.vx-showcase-line{align-items:flex-start;flex-direction:column}.vx-showcase-label{width:auto}.vx-showcase-section{padding:15px}}
</style>
