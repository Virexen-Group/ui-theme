<script setup lang="ts">
import { ref } from 'vue';
import { VContainer, VRow, VCol, VFlex, VHStack, VSection, VDivider, VBrandLogo } from '../src/index';
import { VIREXEN_BRAND_COLORS } from '../src/data/virexen-brand';
const fluid=ref(false);
const swatches=Object.entries(VIREXEN_BRAND_COLORS.teal);
import SandboxNav from './SandboxNav.vue';
</script>
<template>
<SandboxNav/>
<main class="vx-layout-lab">
  <VContainer size="xl" :fluid="fluid">
    <VHStack :gap="3" justify="space-between"><a href="/">← Sandbox home</a><VBrandLogo :size="48" /></VHStack>
    <VSection spacing="md"><p class="vx-kicker">MASTER UI / LAYOUT SYSTEM</p><h1>Responsive layout & Virexen branding</h1><p>Components, Bootstrap-style utility classes and the official Virexen icon.</p><label><input type="checkbox" v-model="fluid" /> Full-width container</label></VSection>
    <VDivider />
    <VSection spacing="md"><h2>Responsive twelve-column grid</h2><p>Resize your browser to see 1, 2 or 3 columns.</p>
      <VRow :gap="4"><VCol v-for="n in 3" :key="n" :xs="12" :md="6" :lg="4"><div class="vx-demo-tile"><strong>Widget {{n}}</strong><p>xs 12 · md 6 · lg 4</p></div></VCol></VRow>
    </VSection>
    <VSection spacing="md"><h2>Brand colour palette</h2><p>Provisional palette based on existing Virexen teal tokens; not yet sampled from the official SVG.</p><div class="vx-swatches"><div v-for="[key,value] in swatches" :key="key" class="vx-swatch"><div :style="{background:value}" class="vx-swatch-block"/><strong>{{key}}</strong><code>{{value}}</code></div></div></VSection>
    <VSection spacing="md"><h2>Flex row and utilities</h2><VFlex gap="12px" wrap><span class="vx-demo-chip">.vx-p-3</span><span class="vx-demo-chip">.vx-gap-3</span><span class="vx-demo-chip">.vx-text-brand</span></VFlex></VSection>
    <VSection spacing="sm"><small>Brand artwork is loaded from the exact Virexen CDN URL supplied by the owner. If unavailable, the component renders an accessible fallback.</small></VSection>
  </VContainer>
</main>
</template>
<style scoped>
.vx-layout-lab{min-height:100vh;background:var(--vx-surface,#f8fafb);color:var(--vx-text,#183438);font-family:Manrope,system-ui,sans-serif}.vx-layout-lab a{color:#10887f}.vx-layout-lab h1{font-size:clamp(1.8rem,4vw,3rem);margin:0 0 8px}.vx-layout-lab h2{margin:0 0 12px}.vx-kicker{color:#10887f;font-size:12px;font-weight:800;letter-spacing:1px}.vx-demo-tile{border:1px solid #cbdeda;background:white;border-radius:14px;padding:25px;min-height:95px}.vx-demo-tile p{color:#64777c}.vx-swatches{display:flex;flex-wrap:wrap;gap:10px}.vx-swatch{min-width:75px;display:flex;flex-direction:column;gap:4px;font-size:12px}.vx-swatch-block{width:76px;height:76px;border-radius:10px;border:1px solid #c7d7d7}.vx-swatch code{font-size:11px}.vx-demo-chip{padding:12px;background:#e9f8f7;border-radius:10px}
</style>
