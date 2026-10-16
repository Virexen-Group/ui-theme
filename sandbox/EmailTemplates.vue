<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import DocsShell from './DocsShell.vue';
import VInput from '../src/components/forms/VInput.vue';
import VTextarea from '../src/components/forms/VTextarea.vue';
import VSelect from '../src/components/forms/VSelect.vue';
const brands = ['Virexen','Virexen-Pay','Virexen-Workspace','Virexen-Identity','My-Virexen','Virexen-Cloud','Virexen-CMS','Virexen-Support','Virexen-Developer','Marlo','CampPulze','CampPulze-Health','PulzeConnect','Silverline'];
const selected=ref('Virexen'); const subject=ref('Welcome to your account'); const recipient=ref('alex@example.com'); const reason=ref('you have an account with this service.'); const preheader=ref('An update from our team');
const body=ref('<p>Hello Alex,</p><p>Your account is ready. This is an example of the shared message body.</p><p><strong>Thank you,</strong><br>Our team</p>');
const secondary=ref(true); const previewMode=ref<'desktop'|'mobile'>('desktop'); const background=ref<'light'|'neutral'|'dark'>('neutral'); const preview=ref(''); const plaintext=ref(''); const error=ref(''); const viewHtml=ref(false); const copied=ref(false); const busy=ref(false);
const brandOptions = computed(()=>brands.map(id=>({value:id,label:id.replaceAll('-', ' ')})));
async function render() { busy.value=true;error.value='';try {const r=await fetch('/__sandbox/render-brand-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brand:selected.value,subject:subject.value,to:recipient.value,reason:reason.value,preheader:preheader.value,bodyHtml:body.value,secondaryBranding:secondary.value})});const result=await r.json(); if(!r.ok)throw Error(result.error||'Unable to render');preview.value=result.html;plaintext.value=result.text||'';}catch(e){error.value=String(e)}finally{busy.value=false}}
watch([selected,subject,recipient,reason,preheader,body,secondary],render);onMounted(render);
async function copyHtml(){try{await navigator.clipboard.writeText(preview.value);copied.value=true;}catch{copied.value=false}}
function openPreview(){const blob=new Blob([preview.value],{type:'text/html;charset=utf-8'});const url=URL.createObjectURL(blob);const tab=window.open(url,'_blank','noopener,noreferrer');if(!tab){URL.revokeObjectURL(url);return;}setTimeout(()=>URL.revokeObjectURL(url),120000)}
</script>
<template>
<DocsShell active="email">
<section class="vx-docs-hero"><span class="vx-docs-kicker">EMAIL / DESIGN STUDIO</span><h1>Email templates</h1><p class="vx-docs-muted">Configure any brand, preview email-safe HTML and copy the finished shell for use in your services.</p></section>
<div class="vx-email-studio">
  <aside class="vx-email-config"><header><h2>Email configuration</h2><p>Changes below update the live email preview.</p></header>
    <div class="vx-email-config-fields"><label>Brand<VSelect v-model="selected" :options="brandOptions" /></label>
    <label>Subject<VInput v-model="subject" /></label><label>Preheader<VInput v-model="preheader" /></label>
    <label>Recipient<VInput v-model="recipient" /></label><label>Why you received this<VInput v-model="reason" /></label>
    <label>Message content (HTML)<VTextarea v-model="body" :rows="9" /></label>
    <label class="vx-email-check"><input v-model="secondary" type="checkbox" /> Show secondary branding</label>
    <button class="vx-email-render" type="button" @click="render">Refresh preview</button>
    </div>
  </aside>
  <section class="vx-email-stage" :data-background="background">
    <header class="vx-email-toolbar"><div class="vx-email-preview-title"><b>{{selected.replaceAll('-', ' ')}}</b><small>{{previewMode==='desktop'?'Desktop':'Mobile'}} preview</small></div>
    <div class="vx-email-toolbar-controls"><div class="vx-email-toggle" aria-label="Preview size"><button :class="{active:previewMode==='desktop'}" @click="previewMode='desktop'">Desktop</button><button :class="{active:previewMode==='mobile'}" @click="previewMode='mobile'">Mobile</button></div>
      <select v-model="background" aria-label="Preview background"><option value="light">Light</option><option value="neutral">Neutral</option><option value="dark">Dark</option></select>
      <button @click="render" :disabled="busy">Refresh</button><button @click="viewHtml=!viewHtml">{{viewHtml?'View email':'View HTML'}}</button><button @click="copyHtml">{{copied?'Copied':'Copy HTML'}}</button><button @click="openPreview">Open preview ↗</button>
    </div></header>
    <p v-if="error" class="vx-email-error" role="alert">{{error}}</p>
    <div class="vx-email-canvas"><pre v-if="viewHtml" class="vx-email-code">{{preview}}</pre><iframe v-else :key="previewMode" title="Live HTML email preview" :srcdoc="preview" sandbox="" class="vx-email-frame" :class="'vx-email-frame--'+previewMode" /></div>
    <details class="vx-email-text"><summary>Plaintext alternative</summary><pre>{{plaintext}}</pre></details>
  </section>
</div>
<section class="vx-docs-guide"><h2>Developer integration</h2><p>All brands share <code>renderBrandedEmail</code>. The sender supplies message HTML and brand configuration, not a separate hardcoded template per application.</p><pre><code>import { renderBrandedEmail } from '@virexen-group/ui-theme/email';

const result = renderBrandedEmail({
  brand: 'Virexen-Pay',
  subject: 'Payment receipt',
  bodyHtml: '&lt;p&gt;Your receipt is ready.&lt;/p&gt;',
  to: 'alex@example.com',
  reason: 'you made a payment'
});</code></pre><p>CampPulze Health uses the exact same renderer with <code>brand: 'CampPulze-Health'</code>. The output includes HTML and a plaintext alternative.</p></section>
</DocsShell>
</template>
<style scoped>
.vx-email-studio{display:grid;grid-template-columns:minmax(340px,370px) minmax(0,1fr);gap:20px;align-items:start}.vx-email-config{background:#fff;border:1px solid #e0e6ef;box-shadow:0 9px 30px #1b31540b;border-radius:17px;overflow:hidden;position:sticky;top:20px}.vx-email-config header{padding:22px 22px 15px;border-bottom:1px solid #edf1f6}.vx-email-config h2{margin:0;font-size:18px}.vx-email-config p{margin:8px 0 0;font-size:13px;color:#64748b;line-height:1.5}.vx-email-config-fields{display:grid;gap:18px;padding:20px 22px;max-height:calc(100vh - 220px);overflow-y:auto}.vx-email-config label{display:grid;gap:7px;font-size:13px;font-weight:650}.vx-email-check{display:flex!important;align-items:center;gap:9px!important}.vx-email-render{border:0;background:#193b9f;color:white;padding:12px;border-radius:10px;font-weight:650;cursor:pointer}.vx-email-stage{min-width:0;border:1px solid #e1e6ef;border-radius:18px;overflow:hidden;background:#f1f5fa}.vx-email-stage[data-background=light]{background:#fff}.vx-email-stage[data-background=dark]{background:#283449}.vx-email-toolbar{background:#fff;border-bottom:1px solid #e0e6ef;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.vx-email-preview-title{display:grid;gap:3px}.vx-email-preview-title small{color:#64748b}.vx-email-toolbar-controls{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.vx-email-toolbar button,.vx-email-toolbar select{font:inherit;font-size:12px;border:1px solid #d4deeb;background:#fff;padding:8px 10px;border-radius:9px;color:#1d3250;cursor:pointer}.vx-email-toggle{display:flex;gap:2px;background:#f3f5f9;border-radius:10px;padding:3px}.vx-email-toggle button{border:0;background:transparent}.vx-email-toggle button.active{background:#fff;box-shadow:0 1px 5px #2330461d;color:#193b9f}.vx-email-canvas{padding:32px 16px;display:flex;align-items:flex-start;justify-content:center;overflow:auto;min-height:650px}.vx-email-frame{width:100%;max-width:600px;height:850px;border:0;background:#fff;box-shadow:0 15px 50px #182e4718;transition:max-width .2s}.vx-email-frame--mobile{max-width:375px}.vx-email-code{margin:0;width:100%;max-width:750px;background:#101d31;color:#dfedff;padding:20px;border-radius:12px;white-space:pre-wrap;overflow:auto;max-height:760px;font:12px/1.65 monospace}.vx-email-error{color:#9b1c30;padding:12px 18px}.vx-email-text{background:#fff;border-top:1px solid #e1e6ef;padding:12px 18px;font-size:13px}.vx-email-text pre{white-space:pre-wrap;font:12px/1.5 monospace}@media(max-width:1120px){.vx-email-studio{grid-template-columns:310px minmax(0,1fr)}}@media(max-width:860px){.vx-email-studio{grid-template-columns:1fr}.vx-email-config{position:static}.vx-email-config-fields{max-height:none}.vx-email-canvas{padding:16px 8px;min-height:460px}.vx-email-frame{height:740px}}
</style>
