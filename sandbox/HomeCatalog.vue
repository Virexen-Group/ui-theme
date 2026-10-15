<script setup lang="ts">
import { computed, ref } from 'vue';
import VButton from '../src/components/buttons/VButton.vue';
import VNotification from '../src/components/feedback/VNotification.vue';
import VToastProvider from '../src/components/feedback/VToastProvider.vue';
import VConfirmDialog from '../src/components/dialogs/VConfirmDialog.vue';
import VIcon from '../src/components/icons/VIcon.vue';
import VThemeToggle from '../src/components/layout/VThemeToggle.vue';
import { useVToast } from '../src/composables/useVToast';
const toast = useVToast();
const preset = ref<'default'|'calm'|'bold'|'enterprise'>('bold');
const confirmOpen=ref(false);
const search = ref('');
const activeGroup=ref('all');
const packs=['core','soft','outline','elevated'] as const;
const tones=['success','info','warning','error','neutral'] as const;
const icons=[
 ['home','Home'],['settings','Settings'],['users','Users'],['calendar','Calendar'],
 ['search','Search'],['notifications','Alerts'],['finance','Finance'],['security','Security'],
 ['health','Health'],['documents','Documents'],['upload','Upload'],['support','Support'],
 ['activity','Activity'],['organisation','Organisation'],['logout','Log out'],['check','Complete'],
 ['apps','Applications'],['camp','Camp'],['database','Database'],['folder','Folder'],
 ['credit','Payments'],['menu','Navigation'],['layers','Layers'],['package','Package']
] as const;
const filteredIcons=computed(()=>icons.filter(([id,label])=>(id+' '+label).toLowerCase().includes(search.value.toLowerCase())));
const modules=[
 {
  "id": "forms",
  "title": "Forms & Validation",
  "desc": "Every standard and smart input, upload, age and email validation",
  "href": "/forms.html"
 },
 {
  "id": "navigation",
  "title": "Navigation",
  "desc": "Sidebars, menus, tabs, breadcrumbs and command palette",
  "href": "/navigation.html"
 },
 {
  "id": "data",
  "title": "Data & Charts",
  "desc": "Tables, selection, charts, stats, progress and status",
  "href": "/data.html"
 },
 {
  "id": "layout",
  "title": "Layout & Dashboards",
  "desc": "Containers, grids, app shells, dashboard editor and widgets",
  "href": "/layout.html"
 },
 {
  "id": "feedback",
  "title": "Feedback & Overlays",
  "desc": "Toasts, notices, dialogs, drawers and popovers",
  "href": "/feedback.html"
 },
 {
  "id": "commerce",
  "title": "Commerce",
  "desc": "Checkout, pricing, payments and invoices",
  "href": "/commerce.html"
 },
 {
  "id": "foundations",
  "title": "Foundations & Branding",
  "desc": "Theme manifest, tokens, Lucide icons, colours and motion",
  "href": "/foundations.html"
 },
 {
  "id": "media",
  "title": "Media Display",
  "desc": "Image galleries, documents and progress; upload under Forms",
  "href": "/media.html"
 },
 {
  "id": "identity",
  "title": "Identity",
  "desc": "Authentication screen and centred logo layout",
  "href": "/identity.html"
 },
 {
  "id": "animations",
  "title": "Motion Playground",
  "desc": "Transitions and animated numbers",
  "href": "/animations.html"
 },
 {
  "id": "packs",
  "title": "Button Styles",
  "desc": "Button and icon styling",
  "href": "/packs.html"
 },
 {
  "id": "builder",
  "title": "Dashboard Builder",
  "desc": "Drag, resize and save widgets",
  "href": "/dashboard-builder.html"
 }
];
const roadmap=[
 {group:'Foundations',items:['Typography scale','Spacing & layout grid','Colour tokens & themes','Accessibility guidelines','Motion tokens','Icon registry']},
 {group:'Forms',items:['Field groups & validation','Date/time & range pickers','Combobox & multi-select','File manager & previews','Masked inputs','Rich text editor']},
 {group:'Navigation',items:['Sidebar & app switcher','Breadcrumbs','Tabs & pagination','Command palette','Mobile bottom navigation','Page headers']},
 {group:'Data & feedback',items:['Data tables & filters','Empty, loading & error states','Skeleton loaders','Toast & notification centre','Dialogs & drawers','Progress & status indicators']},
 {group:'Commerce',items:['Currency & price breakdown','Selectable product cards','Order summary','Payment method display','Invoice preview','Subscription pricing']},
 {group:'Complex layouts',items:['Dashboard shell','Responsive cards','Chart wrappers','Calendars & scheduling','Permission-aware menus','Profile & detail views']}
];
async function copyIcon(name:string){try{await navigator.clipboard.writeText(`<VIcon name="${name}" />`);toast.success({title:'Icon code copied',description:`${name} copied to clipboard`});}catch{toast.info({title:'Icon',description:name});}}
</script>
<template>
<div class="catalog" :data-vx-preset="preset">
  <header class="catalog-header">
    <a class="catalog-brand" href="/" aria-label="Virexen UI home"><span class="catalog-mark">◆</span><span><strong>Virexen UI</strong><small>Shared design system · Sandbox</small></span></a>
    <nav aria-label="Component categories" class="catalog-nav">
      <a href="#buttons">Buttons</a><a href="#notifications">Notifications</a><a href="#icons">Icons</a><a href="#themes">Themes</a><a href="#demos">Other components</a><a href="/forms.html">Forms</a><a href="/navigation.html">Navigation</a><a href="/data.html">Data</a><a href="/commerce.html">Commerce</a>
    </nav><VThemeToggle/>
  </header>
  <main class="catalog-main">
    <section class="catalog-hero"><div><p class="catalog-eyebrow">@VIREXEN-GROUP/UI-THEME</p><h1>Virexen component library</h1><p>One consistent design across Virexen Cloud, Identity, Pay, CampPulze, PulzeConnect and Silverline. Preview the real shared components below.</p></div><div class="catalog-hero-note"><VIcon name="layers" size="xl"/><strong>Build once. Reuse everywhere.</strong><span>Shared tokens, accessible controls and application-level branding.</span></div></section>
    <div class="catalog-grid">
      <section id="buttons" class="catalog-card"><div class="catalog-heading"><div><h2>Button packs</h2><p>Four styles with the same API and interaction behaviour.</p></div><a href="/packs.html">Extended demo ↗</a></div>
        <div v-for="pack in packs" :key="pack" class="catalog-pack"><div class="catalog-pack-title"><strong>{{pack[0].toUpperCase()+pack.slice(1)}}</strong><small>{{ pack==='core'?'Default balanced style':pack==='soft'?'Subtle pastel surface':pack==='outline'?'Minimal border emphasis':'Subtle shadow & depth' }}</small></div><div class="catalog-buttons"><VButton :pack="pack" variant="primary" @click="toast.success({title:'Action completed',description:`${pack} button pressed`})">Primary</VButton><VButton :pack="pack">Secondary</VButton><VButton :pack="pack" variant="tertiary">Tertiary</VButton><VButton :pack="pack" disabled>Disabled</VButton><VButton :pack="pack" icon="settings" tooltip="Settings" /></div></div>
      </section>
      <section id="notifications" class="catalog-card"><div class="catalog-heading"><div><h2>Notifications & states</h2><p>Inline notices, toast alerts and confirmations.</p></div></div>
        <div class="catalog-notices"><VNotification type="success" title="Success" description="Your changes were saved."/><VNotification type="info" title="Information" description="Your settings will sync across products."/><VNotification type="warning" title="Warning" description="Please check the details before continuing."/><VNotification type="error" title="Error" description="Something went wrong. Please retry."/></div>
        <h3>Try the toast API</h3><div class="catalog-buttons"><VButton v-for="tone in tones" :key="tone" pack="outline" size="sm" @click="toast.notify(tone,{title:`${tone} notification`,description:'Sent using the shared Virexen toast service'})">{{tone}}</VButton><VButton variant="danger" size="sm" @click="confirmOpen=true">Confirm delete</VButton></div>
        <h3>Button states</h3><div class="catalog-buttons"><VButton variant="primary">Default</VButton><VButton variant="primary" loading>Loading</VButton><VButton disabled>Disabled</VButton><VButton variant="danger" @click="confirmOpen=true">Destructive</VButton></div>
      </section>
      <section id="icons" class="catalog-card catalog-span"><div class="catalog-heading"><div><h2>Shared Virexen icon set</h2><p>Semantic icons used across your products. Click an icon to copy its Vue snippet.</p></div><div class="catalog-search"><VIcon name="search" size="sm"/><input v-model="search" aria-label="Search Virexen icons" placeholder="Search icons..." /></div></div>
        <div v-if="filteredIcons.length" class="catalog-icons"><button v-for="[name,label] in filteredIcons" :key="name" type="button" class="catalog-icon" :title="`Copy ${name} icon`" @click="copyIcon(name)"><VIcon :name="name" size="lg"/><strong>{{label}}</strong><small>{{name}}</small></button></div><p v-else>No icons match your search.</p>
      </section>
      <section id="themes" class="catalog-card"><h2>Theme presets</h2><p>Switch presets independently of the button pack.</p><div class="catalog-presets"><button v-for="theme in (['default','calm','bold','enterprise'] as const)" :key="theme" type="button" :class="['catalog-preset',{'selected':preset===theme}]" @click="preset=theme"><span class="catalog-swatch" :data-preset="theme"></span><strong>{{theme}}</strong><small>{{theme==='default'?'Virexen teal':theme==='calm'?'Soft surfaces':theme==='bold'?'High emphasis':'Professional neutral'}}</small></button></div><div class="catalog-buttons"><VButton variant="primary">Save changes</VButton><VButton pack="outline">Cancel</VButton></div></section>
      <section id="demos" class="catalog-card"><h2>Browse components by category</h2><p>Every sandbox preview is linked below. Organised by category. Each component has one primary documentation home.</p><div class="catalog-links"><a v-for="item in modules" :key="item.id" :href="item.href"><span><strong>{{item.title}}</strong><small>{{item.desc}}</small></span><VIcon name="chevron-right" size="sm"/></a></div><p class="catalog-note">The previous sandbox is preserved at <a href="/legacy.html">/legacy.html</a>, including the existing email and form examples.</p></section>
      <section id="roadmap" class="catalog-card catalog-span"><h2>Component categories</h2><p>Forms and validation live together; upload controls are not duplicated in Media or Roadmap. All examples link to the canonical category.</p><div class="catalog-links"><a v-for="item in modules" :key="'catalog-'+item.id" :href="item.href"><span><strong>{{item.title}}</strong><small>{{item.desc}}</small></span><VIcon name="chevron-right" size="sm"/></a></div></section>
    </div>
    <footer class="catalog-footer">Local development sandbox · Not included in the published Virexen UI package</footer>
  </main>
  <VToastProvider position="top-right"/>
  <VConfirmDialog v-model:open="confirmOpen" title="Delete this item?" description="This is a demonstration. Nothing will actually be deleted." danger confirm-label="Delete" confirm-text="DELETE" @confirm="confirmOpen=false;toast.success({title:'Confirmed',description:'Demonstration only'})"/>
</div>
</template>
<style>
.catalog{--catalog-border:#e2e8f0;min-height:100dvh;background:radial-gradient(ellipse at 5% 0%,#e5f8f8,transparent 30%),radial-gradient(ellipse at 90% 0%,#f8eaf2,transparent 30%),#f4f6fa;color:var(--vx-text,#16213a);font-family:Manrope,system-ui,sans-serif;padding:12px}.catalog *{box-sizing:border-box}.catalog-header,.catalog-main{max-width:1480px;margin-inline:auto}.catalog-header{background:#fff;border:1px solid var(--catalog-border);border-radius:18px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:18px;align-items:center;padding:14px 20px}.catalog-brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit}.catalog-brand strong{font-size:17px}.catalog-brand small{display:block;color:#7182a1;font-size:12px}.catalog-mark{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:linear-gradient(130deg,#ffa45e,#14b8a6);color:#10213b;font-weight:800}.catalog-nav{display:flex;flex-wrap:wrap;gap:8px}.catalog-nav a{font-size:12px;font-weight:700;color:#2c3b58;text-decoration:none;padding:9px 12px;border:1px solid var(--catalog-border);border-radius:10px}.catalog-nav a:hover,.catalog-links a:hover{background:#f1f6ff}.catalog-main{padding-top:32px}.catalog-hero{display:grid;gap:20px;margin-bottom:24px}.catalog-eyebrow{font-weight:800;font-size:11px;letter-spacing:.18em;color:#6981a5}.catalog-hero h1{font-size:clamp(2rem,5vw,3rem);margin:4px 0 12px;letter-spacing:-.03em}.catalog-hero p{color:#647595;max-width:760px;margin:0}.catalog-hero-note{display:flex;align-items:flex-start;flex-direction:column;gap:8px;border:1px solid #e5eafa;border-radius:18px;padding:22px;background:rgba(255,255,255,.55)}.catalog-hero-note span{color:#6e7e99;font-size:13px}.catalog-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}.catalog-card{border:1px solid #e6ebf3;background:#fff;border-radius:20px;padding:clamp(16px,2vw,24px);min-width:0}.catalog-card h2{font-size:20px;margin:0 0 4px}.catalog-card h3{font-size:15px;margin:22px 0 12px}.catalog-card p{font-size:13px;color:#6b7b97;margin:0 0 15px}.catalog-heading{display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px}.catalog-heading a,.catalog-note a{font-size:12px;color:#087e79}.catalog-pack{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;border:1px solid #e8ecf3;padding:13px;border-radius:13px;margin-top:9px}.catalog-pack-title{min-width:110px}.catalog-pack-title small,.catalog-icon small,.catalog-links small,.catalog-preset small{display:block;font-size:11px;color:#7687a5}.catalog-buttons{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.catalog-notices{display:grid;gap:8px}.catalog-search{display:flex;align-items:center;gap:8px;background:#f2f5f9;border:1px solid var(--catalog-border);border-radius:10px;padding:0 12px;min-height:42px}.catalog-search input{background:transparent;border:0;outline:0;width:190px;max-width:60vw;font:inherit;font-size:13px}.catalog-icons{display:grid;grid-template-columns:repeat(auto-fill,minmax(105px,1fr));gap:10px}.catalog-icon{display:flex;flex-direction:column;gap:6px;align-items:center;justify-content:center;min-height:112px;padding:12px;border:1px solid var(--catalog-border);background:#fbfcfe;border-radius:12px;color:#263958;cursor:pointer}.catalog-icon:hover,.catalog-icon:focus-visible{border-color:#11a69e;background:#ebfaf7}.catalog-icon strong{font-size:12px}.catalog-icon small{font-size:10px}.catalog-presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:15px 0}.catalog-preset{min-height:112px;border:1px solid var(--catalog-border);background:#fff;border-radius:12px;padding:14px;text-align:left;display:flex;flex-direction:column;align-items:flex-start;gap:7px;cursor:pointer;text-transform:capitalize}.catalog-preset.selected{border:2px solid #0aa99f}.catalog-swatch{width:34px;height:34px;border-radius:50%;background:linear-gradient(120deg,#ffa45e,#10bba7)}.catalog-swatch[data-preset=calm]{background:linear-gradient(120deg,#ddeeff,#80b4ed)}.catalog-swatch[data-preset=bold]{background:linear-gradient(120deg,#325dd5,#061641)}.catalog-swatch[data-preset=enterprise]{background:linear-gradient(120deg,#e7eaf0,#6b788f)}.catalog-links{display:grid;gap:8px}.catalog-links a{display:flex;justify-content:space-between;gap:12px;align-items:center;border:1px solid var(--catalog-border);padding:14px;border-radius:12px;color:inherit;text-decoration:none}.catalog-links a strong{display:block;font-size:13px}.catalog-links a small{margin-top:3px;line-height:1.4}.catalog-note{margin-top:14px!important}.catalog-roadmap{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:12px}.catalog-roadmap>div{border:1px solid var(--catalog-border);border-radius:13px;padding:14px;background:#fafcff}.catalog-roadmap h3{margin:0 0 10px;font-size:14px}.catalog-roadmap ul{padding-left:18px;margin:0}.catalog-roadmap li{font-size:12px;margin:7px 0;line-height:1.45}.catalog-footer{text-align:center;padding:28px;font-size:12px;color:#7182a1}.catalog[data-vx-preset=calm]{--vx-action:#529dc9;--vx-primary:#529dc9}.catalog[data-vx-preset=bold]{--vx-action:#173d9f;--vx-primary:#173d9f}.catalog[data-vx-preset=enterprise]{--vx-action:#475569;--vx-primary:#475569}@media(min-width:980px){.catalog{padding:20px}.catalog-hero{grid-template-columns:minmax(0,1fr) 360px;align-items:center}.catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.catalog-span{grid-column:span 2}.catalog-presets{grid-template-columns:repeat(4,minmax(0,1fr))}}@media(prefers-reduced-motion:reduce){.catalog *{scroll-behavior:auto;transition:none}}
</style>
