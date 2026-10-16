<script setup lang="ts">
import {computed} from 'vue';
import VIcon from '../icons/VIcon.vue';
export type BottomItem={id:string;label:string;icon?:string;href?:string;description?:string;disabled?:boolean;badge?:string|number};
const props=withDefaults(defineProps<{
  items?:BottomItem[];modelValue?:string;variant?:'classic'|'minimal'|'indicator'|'pill'|'floating'|'raised';
  showLabels?:boolean;showHelperText?:boolean;visibility?:'always'|'mobile';
  fixed?:boolean;preview?:boolean;ariaLabel?:string;
}>(),{items:()=>[],modelValue:'',variant:'classic',showLabels:true,showHelperText:false,visibility:'mobile',fixed:true,preview:false,ariaLabel:'Bottom navigation'});
const emit=defineEmits<{'update:modelValue':[id:string];select:[id:string]}>();
const classes=computed(()=>['vx-bottomnav','vx-bottomnav--'+props.variant,{'vx-bottomnav--fixed':props.fixed&&!props.preview,'vx-bottomnav--mobile':props.visibility==='mobile'&&!props.preview,'vx-bottomnav--preview':props.preview}]);
function select(item:BottomItem){if(item.disabled)return;emit('update:modelValue',item.id);emit('select',item.id)}
</script>
<template>
  <nav :class="classes" :aria-label="ariaLabel">
    <component :is="item.href?'a':'button'" v-for="item in items" :key="item.id"
      class="vx-bottomnav__item" :type="item.href?undefined:'button'" :href="item.href"
      :disabled="item.href?undefined:item.disabled" :aria-disabled="item.disabled?'true':undefined"
      :aria-current="modelValue===item.id?'page':undefined" :title="item.label" @click="select(item)">
      <span class="vx-bottomnav__icon"><VIcon :name="item.icon||'home'" size="lg"/><span v-if="item.badge!=null" class="vx-bottomnav__badge">{{item.badge}}</span></span>
      <span v-if="showLabels" class="vx-bottomnav__text">{{item.label}}</span>
      <small v-if="showHelperText&&item.description" class="vx-bottomnav__helper">{{item.description}}</small>
    </component>
  </nav>
</template>

<style scoped>
.vx-bottomnav{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:space-around!important;gap:4px!important;box-sizing:border-box;width:100%;min-height:72px;padding:10px 8px calc(10px + env(safe-area-inset-bottom,0px));background:var(--vx-surface,#fff);color:var(--vx-text,#1c2940);border:1px solid var(--vx-border,#dce4f2);border-radius:18px 18px 0 0;box-shadow:0 10px 25px #10204015;z-index:100}.vx-bottomnav--fixed{position:fixed;left:0;bottom:0;right:0}.vx-bottomnav--preview{position:relative!important;inset:auto!important;max-width:100%;border-radius:20px}.vx-bottomnav__item{appearance:none!important;display:flex!important;flex:1 1 0!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;min-width:0!important;max-width:none!important;min-height:52px!important;padding:8px 4px!important;color:var(--vx-muted,#64748b)!important;background:transparent!important;border:0!important;border-radius:14px!important;text-decoration:none!important;font:inherit!important;text-align:center!important;cursor:pointer!important;position:relative!important}.vx-bottomnav__icon{position:relative;display:flex;align-items:center;justify-content:center;height:26px}.vx-bottomnav__text{font-size:11px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.vx-bottomnav__helper{font-size:9px;opacity:.75}.vx-bottomnav__badge{position:absolute;top:-8px;right:-17px;background:#d12a4b;color:white;border-radius:20px;font-size:10px;padding:1px 5px}.vx-bottomnav__item[aria-current=page]{color:var(--vx-primary,#193b9f)!important;font-weight:700!important}.vx-bottomnav--pill .vx-bottomnav__item[aria-current=page]{background:color-mix(in srgb,var(--vx-primary,#193b9f) 12%,var(--vx-surface,#fff))!important}.vx-bottomnav--indicator .vx-bottomnav__item[aria-current=page]:before{content:'';position:absolute;top:-10px;left:16%;right:16%;height:3px;border-radius:4px;background:var(--vx-primary,#193b9f)}.vx-bottomnav--floating{border-radius:24px;margin:0 12px 12px;width:calc(100% - 24px)}.vx-bottomnav--raised .vx-bottomnav__item[aria-current=page] .vx-bottomnav__icon{background:var(--vx-primary,#193b9f);color:#fff;width:44px;height:44px;border-radius:50%;margin-top:-22px;border:4px solid var(--vx-surface,#fff)}.vx-bottomnav__item:focus-visible{outline:2px solid var(--vx-primary,#193b9f);outline-offset:-2px}@media(min-width:768px){.vx-bottomnav--mobile:not(.vx-bottomnav--preview){display:none!important}}@media(prefers-reduced-motion:reduce){.vx-bottomnav__item{transition:none}}
</style>
