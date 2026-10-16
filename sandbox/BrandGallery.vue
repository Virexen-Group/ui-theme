<script setup lang="ts">
import {ref,computed} from 'vue';
import VBrandLogo from '../src/components/branding/VBrandLogo.vue';
import VAppIcon from '../src/components/branding/VAppIcon.vue';
import { VIREXEN_APP_ICON_NAMES, VIREXEN_APP_ICON_SIZES, getVirexenAppIconUrl, type VirexenAppIconName, type VirexenAppIconFormat, type VirexenAppIconSize } from '../src/data/app-icons';
import {VIREXEN_PRODUCT_BRANDS, getVirexenBrandUrl, type VirexenBrand, type VirexenBrandFormat} from '../src/data/virexen-brand';
const brands = Object.keys(VIREXEN_PRODUCT_BRANDS) as VirexenBrand[];
const format=ref<VirexenBrandFormat>('svg');
const size=ref(88);
const sourceFor=(brand:VirexenBrand)=>getVirexenBrandUrl(brand,format.value);
const snippet=(brand:VirexenBrand)=>`<VBrandLogo brand="${brand}" format="${format.value}" :size="${size.value}" />`;
const notice=ref('');
const appFormat=ref<VirexenAppIconFormat>('svg');
const appResolution=ref<VirexenAppIconSize>(512);
const appSize=ref(88);
const appSourceFor=(app:VirexenAppIconName)=>getVirexenAppIconUrl(app,appFormat.value,appResolution.value);
const appSnippet=(app:VirexenAppIconName)=>`<VAppIcon app="${app}" format="${appFormat.value}" :resolution="${appResolution.value}" :size="${appSize.value}" />`;
async function copy(value:string){try{await navigator.clipboard.writeText(value);notice.value='Copied';}catch{notice.value='Copy not supported';}}
</script>
<template>
<section id="official-brand-gallery" class="vx-brands-docs" aria-label="Official Virexen brand icons">
 <div class="vx-brands-heading"><div><span class="vx-docs-kicker">OFFICIAL BRAND ASSETS</span><h2>All Virexen brand icons</h2><p>10 official CDN-hosted brands. Change image type or display size; copy the Vue component markup or asset URL.</p></div>
 <div class="vx-brands-settings"><label>Format <select v-model="format"><option value="svg">SVG</option><option value="png">PNG</option></select></label><label>Display size <select v-model.number="size"><option :value="48">48px</option><option :value="64">64px</option><option :value="88">88px</option><option :value="128">128px</option></select></label></div></div>
 <div class="vx-brands-grid"><article v-for="brand in brands" :key="brand" class="vx-brand-card"><div class="vx-brand-preview"><VBrandLogo :brand="brand" :format="format" :size="size" loading="eager" /></div><h3>{{brand.replaceAll('-', ' ')}}</h3><code>{{brand}}</code><div class="vx-brand-card-actions"><button type="button" @click="copy(snippet(brand))">Copy Vue</button><button type="button" @click="copy(sourceFor(brand))">Copy URL</button></div><a :href="sourceFor(brand)" target="_blank" rel="noopener noreferrer">View original {{format.toUpperCase()}} ↗</a></article></div>
 <section id="official-app-icon-gallery" class="vx-brands-docs" aria-label="CampPulze application icons">
 <div class="vx-brands-heading"><div><span class="vx-docs-kicker">APPLICATION ASSETS</span><h2>CampPulze application icons</h2><p>CampPulze, CampPulze Health and PulzeConnect. Preview all available formats and sizes.</p></div>
 <div class="vx-brands-settings">
  <label>Format <select v-model="appFormat"><option value="svg">SVG</option><option value="png">PNG</option><option value="webp">WebP</option><option value="ico">ICO</option></select></label>
  <label v-if="appFormat==='png'||appFormat==='webp'">Source resolution <select v-model.number="appResolution"><option v-for="n in VIREXEN_APP_ICON_SIZES" :key="n" :value="n">{{n}} × {{n}}</option></select></label>
  <label>Display size <select v-model.number="appSize"><option :value="48">48px</option><option :value="64">64px</option><option :value="88">88px</option><option :value="128">128px</option></select></label>
 </div></div>
 <div class="vx-brands-grid"><article v-for="app in VIREXEN_APP_ICON_NAMES" :key="app" class="vx-brand-card"><div class="vx-brand-preview"><VAppIcon :app="app" :format="appFormat" :resolution="appResolution" :size="appSize" loading="eager" /></div><h3>{{app.replaceAll('-', ' ')}}</h3><code>{{app}}</code><div class="vx-brand-card-actions"><button type="button" @click="copy(appSnippet(app))">Copy Vue</button><button type="button" @click="copy(appSourceFor(app))">Copy URL</button></div><a :href="appSourceFor(app)" target="_blank" rel="noopener noreferrer">View original {{appFormat.toUpperCase()}} ↗</a></article></div>
 <p class="vx-docs-muted">Images use the official CDN, then retry from edge-fallback.virexengroup.com if loading fails.</p>
 </section>
 <p class="vx-docs-muted" role="status">{{notice}}</p><p class="vx-docs-muted">Icons load from the official edge.virexen.com CDN. A failed CDN request displays the component fallback rather than an invented logo.</p>
</section>
</template>
<style>
.vx-brands-docs{margin:26px 0 34px;scroll-margin-top:22px}.vx-brands-heading{display:flex;justify-content:space-between;align-items:end;flex-wrap:wrap;gap:20px}.vx-brands-heading h2{font-size:27px;margin:7px 0}.vx-brands-heading p{color:#566782;max-width:680px}.vx-brands-settings{display:flex;gap:12px;flex-wrap:wrap}.vx-brands-settings label{display:grid;gap:5px;font-weight:700;font-size:12px}.vx-brands-settings select{padding:9px 12px;border:1px solid #ced8e7;border-radius:10px;background:#fff;color:#182942}.vx-brands-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:16px;margin:20px 0}.vx-brand-card{border:1px solid #dce4ef;border-radius:16px;padding:17px;background:#fff;min-width:0}.vx-brand-preview{background:#f4f7fc;min-height:150px;display:flex;justify-content:center;align-items:center;border-radius:12px}.vx-brand-card h3{font-size:15px;margin:13px 0 6px;overflow-wrap:anywhere}.vx-brand-card code{font-size:11px;color:#566782;overflow-wrap:anywhere}.vx-brand-card-actions{display:flex;gap:7px;flex-wrap:wrap;margin:13px 0 9px}.vx-brand-card button{border:1px solid #cdd7e6;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer;font-weight:700}.vx-brand-card a{font-size:12px;color:#193b9f}
</style>
