<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import VIcon from '../icons/VIcon.vue';
import {getVirexenFallbackUrl} from '../../data/app-icons';
export interface VirexenApp { id: string; label: string; description?: string; icon?: string; logoUrl?: string; href?: string; disabled?: boolean }
const props = withDefaults(defineProps<{ apps: VirexenApp[]; activeId: string; otherApps?: VirexenApp[]; compact?: boolean; label?: string; logoUrl?: string; compactLogoUrl?: string; display?: 'list'|'grid'; trigger?: 'identity'|'launcher' }>(), {compact:false,label:'Virexen',display:'list',trigger:'identity',otherApps:()=>[]});
const emit=defineEmits<{ select: [app: VirexenApp] }>();
const open=ref(false); const root=ref<HTMLElement|null>(null); const selected=computed(()=>props.apps.find(a=>a.id===props.activeId));
const logoSources=ref<Record<string,string>>({});
const brokenLogos=ref<string[]>([]);
function logo(app:VirexenApp){return logoSources.value[app.id] || app.logoUrl || ''}
function logoError(app:VirexenApp){
  if (!app.logoUrl) return;
  const next=getVirexenFallbackUrl(app.logoUrl);
  if (next && logo(app)===app.logoUrl) logoSources.value={...logoSources.value,[app.id]:next};
  else brokenLogos.value=[...brokenLogos.value,app.id];
}
function choose(app:VirexenApp){if(app.disabled)return;open.value=false;emit('select',app);if(app.href && /^https:\/\//i.test(app.href)){window.location.assign(app.href)}}
function outside(event:PointerEvent){if(root.value&&!root.value.contains(event.target as Node))open.value=false}
function keyboard(event:KeyboardEvent){if(event.key==='Escape')open.value=false}
onMounted(()=>{document.addEventListener('pointerdown',outside);document.addEventListener('keydown',keyboard)});
onBeforeUnmount(()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keyboard)});
</script>
<template>
  <div ref="root" class="vx-switcher" :class="{'vx-switcher--compact':compact, 'vx-switcher--grid':display==='grid'}">
    <button v-if="trigger==='launcher'" type="button" class="vx-switcher__launcher" aria-label="Virexen applications" title="Virexen applications" :aria-expanded="open" aria-haspopup="dialog" @click="open=!open">
      <VIcon name="apps" /><span class="vx-sr-only">Open Virexen applications</span>
    </button>
    <button v-else type="button" class="vx-switcher__trigger" :aria-label="`Switch application, current: ${selected?.label||label}`" :aria-expanded="open" aria-haspopup="menu" @click="open=!open">
      <img v-if="(compact?compactLogoUrl||logoUrl:logoUrl)||selected?.logoUrl" class="vx-switcher__logo" :src="(compact?compactLogoUrl||logoUrl:logoUrl)||selected?.logoUrl" alt="" />
      <span v-else class="vx-switcher__logo vx-switcher__logo--fallback"><VIcon :name="selected?.icon||'apps'" /></span>
      <span v-if="!compact" class="vx-switcher__identity"><strong>{{selected?.label||label}}</strong><small>{{selected?.description||'Switch application'}}</small></span>
      <VIcon v-if="!compact" name="chevron-down" size="sm" />
    </button>
    <div v-if="open" class="vx-switcher__menu" :class="{'vx-switcher__menu--grid':display==='grid'}" :role="display==='grid'?'dialog':'menu'" aria-label="Virexen applications">
      <div class="vx-switcher__heading">Virexen applications <button type="button" class="vx-switcher__close" aria-label="Close app launcher" @click="open=false">×</button></div>
      <div class="vx-switcher__choices" :class="{'vx-switcher__choices--grid':display==='grid'}">
      <button v-for="app in apps" :key="app.id" class="vx-switcher__choice" :class="{'vx-switcher__choice--active':app.id===activeId}" type="button"  :role="display==='grid'?undefined:'menuitemradio'" :aria-checked="display==='grid'?undefined:app.id===activeId" :disabled="app.disabled" @click="choose(app)">
        <img v-if="app.logoUrl && !brokenLogos.includes(app.id)" class="vx-switcher__choice-logo" :src="logo(app)" alt="" @error="logoError(app)" />
        <span v-else class="vx-switcher__choice-logo vx-switcher__choice-logo--fallback"><VIcon :name="app.icon||'apps'" /></span>
        <span class="vx-switcher__choice-text"><strong>{{app.label}}</strong><small>{{app.description}}</small></span>
        <VIcon v-if="app.id===activeId" name="check" color="#2563eb" size="sm" />
      </button>
      </div>
      <template v-if="otherApps.length">
        <div class="vx-switcher__heading vx-switcher__section-title">Other Apps</div>
        <div class="vx-switcher__choices" :class="{'vx-switcher__choices--grid':display==='grid'}">
          <button v-for="app in otherApps" :key="'other-'+app.id" class="vx-switcher__choice" type="button" :disabled="app.disabled" @click="choose(app)">
            <img v-if="app.logoUrl && !brokenLogos.includes(app.id)" class="vx-switcher__choice-logo" :src="logo(app)" alt="" @error="logoError(app)" />
            <span v-else class="vx-switcher__choice-logo vx-switcher__choice-logo--fallback"><VIcon :name="app.icon||'apps'" /></span>
            <span class="vx-switcher__choice-text"><strong>{{app.label}}</strong><small>{{app.description}}</small></span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
