<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import VIcon from '../icons/VIcon.vue';
export interface VirexenApp { id: string; label: string; description?: string; icon?: string; logoUrl?: string; href?: string; disabled?: boolean }
const props = withDefaults(defineProps<{ apps: VirexenApp[]; activeId: string; compact?: boolean; label?: string; logoUrl?: string; compactLogoUrl?: string }>(), {compact:false,label:'Virexen'});
const emit=defineEmits<{ select: [app: VirexenApp] }>();
const open=ref(false); const root=ref<HTMLElement|null>(null); const selected=computed(()=>props.apps.find(a=>a.id===props.activeId));
function choose(app:VirexenApp){if(app.disabled)return;open.value=false;emit('select',app)}
function outside(event:PointerEvent){if(root.value&&!root.value.contains(event.target as Node))open.value=false}
function keyboard(event:KeyboardEvent){if(event.key==='Escape')open.value=false}
onMounted(()=>{document.addEventListener('pointerdown',outside);document.addEventListener('keydown',keyboard)});
onBeforeUnmount(()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keyboard)});
</script>
<template>
  <div ref="root" class="vx-switcher" :class="{'vx-switcher--compact':compact}">
    <button type="button" class="vx-switcher__trigger" :aria-label="`Switch application, current: ${selected?.label||label}`" :aria-expanded="open" aria-haspopup="menu" @click="open=!open">
      <img v-if="(compact?compactLogoUrl||logoUrl:logoUrl)||selected?.logoUrl" class="vx-switcher__logo" :src="(compact?compactLogoUrl||logoUrl:logoUrl)||selected?.logoUrl" alt="" />
      <span v-else class="vx-switcher__logo vx-switcher__logo--fallback"><VIcon :name="selected?.icon||'apps'" /></span>
      <span v-if="!compact" class="vx-switcher__identity"><strong>{{selected?.label||label}}</strong><small>{{selected?.description||'Switch application'}}</small></span>
      <VIcon v-if="!compact" name="chevron-down" size="sm" />
    </button>
    <div v-if="open" class="vx-switcher__menu" role="menu" aria-label="Switch application">
      <div class="vx-switcher__heading">Switch application</div>
      <button v-for="app in apps" :key="app.id" class="vx-switcher__choice" :class="{'vx-switcher__choice--active':app.id===activeId}" type="button" role="menuitemradio" :aria-checked="app.id===activeId" :disabled="app.disabled" @click="choose(app)">
        <img v-if="app.logoUrl" class="vx-switcher__choice-logo" :src="app.logoUrl" alt="" />
        <span v-else class="vx-switcher__choice-logo vx-switcher__choice-logo--fallback"><VIcon :name="app.icon||'apps'" /></span>
        <span class="vx-switcher__choice-text"><strong>{{app.label}}</strong><small>{{app.description}}</small></span>
        <VIcon v-if="app.id===activeId" name="check" color="#2563eb" size="sm" />
      </button>
    </div>
  </div>
</template>
