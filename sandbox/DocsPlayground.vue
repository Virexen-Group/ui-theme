<script setup lang="ts">
import { computed } from 'vue';
import DocsShell from './DocsShell.vue';
import { catalogCategories } from './catalog-categories';
const pages: Record<string,{title:string;category:string;url:string}> = {
 'forms-gallery':{title:'Forms Playground',category:'forms',url:'/forms-gallery.html'},
 'sidebar':{title:'Sidebar Playground',category:'navigation',url:'/sidebar.html'},
 'data-grid':{title:'Data Grid Playground',category:'data',url:'/data-grid.html'},
 'dashboard-builder':{title:'Dashboard Builder',category:'layout',url:'/dashboard-builder.html'},
 'layout-system':{title:'Layout Playground',category:'layout',url:'/layout-system.html'},
 'feedback-demo':{title:'Feedback Playground',category:'feedback',url:'/feedback-demo.html'},
 'checkout-demo':{title:'Checkout Playground',category:'commerce',url:'/checkout-demo.html'},
 'manifest':{title:'Manifest Playground',category:'foundations',url:'/manifest.html'},
 'animations':{title:'Animation Playground',category:'foundations',url:'/animations.html'},
 'media-demo':{title:'Media Playground',category:'media',url:'/media-demo.html'}
};
const key = new URLSearchParams(window.location.search).get('demo') || '';
const current = computed(()=>pages[key]);
const parent = computed(()=>catalogCategories.find(c=>c.id===current.value?.category));
</script>
<template>
 <DocsShell :active="current?.category">
  <template v-if="current">
    <div class="vx-docs-hero"><span class="vx-docs-kicker">DOCUMENTATION / {{parent?.title}}</span><h1>{{current.title}}</h1>
      <p class="vx-docs-muted">An interactive playground inside the shared Virexen UI documentation.</p>
      <a class="vx-docs-demo-link" :href="parent?.url">← Back to {{parent?.title}}</a>
    </div>
    <div class="vx-docs-frame"><iframe :src="current.url" :title="current.title" loading="eager" /></div>
  </template>
  <div v-else class="vx-docs-guide"><h1>Playground not found</h1><p>Choose a component category from the sidebar.</p></div>
 </DocsShell>
</template>
<style>.vx-docs-frame{border:1px solid #dee5f0;background:white;border-radius:14px;overflow:hidden;min-height:800px}.vx-docs-frame iframe{display:block;width:100%;height:900px;border:0;background:#fff}@media(max-width:900px){.vx-docs-frame iframe{height:850px}}</style>
