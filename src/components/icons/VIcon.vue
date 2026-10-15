<script setup lang="ts">
import { computed } from 'vue';
import { House, Settings, Users, CalendarDays, Search, Bell, Wallet, ShieldCheck, HeartPulse, FileText, CloudUpload, CircleHelp, ChartNoAxesColumn, Building2, LogOut, ChevronDown, ChevronRight, Check, Boxes, Database, Folder, CreditCard, LayoutGrid, Menu, PanelLeftClose, PanelLeftOpen, TentTree, Activity, CircleUserRound, Layers, Package, type LucideIcon } from '@lucide/vue';
const icons: Record<string, LucideIcon> = {
  home: House, settings: Settings, users: Users, calendar: CalendarDays, search: Search,
  notifications: Bell, finance: Wallet, security: ShieldCheck, health: HeartPulse,
  documents: FileText, upload: CloudUpload, support: CircleHelp, help: CircleHelp,
  activity: Activity, chart: ChartNoAxesColumn, organisation: Building2, building: Building2,
  logout: LogOut, 'chevron-down': ChevronDown, 'chevron-right': ChevronRight,
  check: Check, box: Boxes, database: Database, folder: Folder, file: FileText,
  credit: CreditCard, apps: LayoutGrid, menu: Menu, 'panel-close': PanelLeftClose,
  'panel-open': PanelLeftOpen, camp: TentTree, user: CircleUserRound,
  layers: Layers, package: Package, shield: ShieldCheck
};
const props = withDefaults(defineProps<{ name: string; size?: 'xs'|'sm'|'md'|'lg'|'xl'|number; strokeWidth?:number; color?:string; decorative?:boolean }>(),{size:'md',strokeWidth:1.8,decorative:true});
const sizePx=computed(()=> typeof props.size==='number'?props.size:({xs:14,sm:17,md:21,lg:26,xl:32}[props.size]));
const icon=computed(()=>icons[props.name]||Package);
</script>
<template><component :is="icon" :size="sizePx" :stroke-width="strokeWidth" :color="color||'currentColor'" :aria-hidden="decorative?'true':undefined" :role="decorative?undefined:'img'" /></template>
