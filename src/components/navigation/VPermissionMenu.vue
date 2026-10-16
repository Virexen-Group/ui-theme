<script setup lang="ts">
import VIcon from '../icons/VIcon.vue';
export type PermissionItem={id:string;label:string;description?:string;icon?:string;permission?:string;disabled?:boolean};
withDefaults(defineProps<{items?:PermissionItem[];permissions?:string[]}>(),{items:()=>[],permissions:()=>[]});
const emit=defineEmits<{select:[id:string]}>();
</script>
<template><nav class="vx-permission-menu" aria-label="Permitted actions"><template v-for="item in items" :key="item.id"><button v-if="!item.permission||permissions.includes(item.permission)" type="button" :disabled="item.disabled" @click="emit('select',item.id)"><VIcon :name="item.icon||'shield-check'" :size="18"/><span>{{item.label}}<small v-if="item.description">{{item.description}}</small></span><VIcon name="chevron-right" :size="14"/></button></template><p v-if="!items.length" class="vx-permission-menu__empty">No actions configured</p></nav></template>
<style scoped>
.vx-permission-menu{display:grid;gap:5px;max-width:400px;padding:8px;border:1px solid var(--vx-border,#dce4ed);border-radius:16px;background:var(--vx-surface,#fff)}
.vx-permission-menu button{display:flex;align-items:center;gap:12px;padding:12px;border:0;background:transparent;color:var(--vx-text,#172638);border-radius:10px;text-align:left;font:inherit;cursor:pointer;min-height:50px}
.vx-permission-menu button:hover{background:var(--vx-input,#eef3fb)}.vx-permission-menu button>span{display:grid;flex:1;gap:4px;font-size:13px;font-weight:650}.vx-permission-menu small{font-weight:400;color:var(--vx-muted,#65738a);font-size:11px}.vx-permission-menu__empty{padding:12px;color:var(--vx-muted,#667)}
</style>
