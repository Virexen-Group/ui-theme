<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import VIcon from '../icons/VIcon.vue';
import VAppSwitcher, {type VirexenApp} from './VAppSwitcher.vue';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  disabled?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
}

const props = withDefaults(defineProps<{
  items: SidebarItem[];
  activeId?: string;
  brand?: string;
  expanded?: boolean;
  mobileOpen?: boolean;
  ariaLabel?: string;
  brandingPlacement?: 'header' | 'sidebar';
  apps?: VirexenApp[];
  otherApps?: VirexenApp[];
  activeAppId?: string;
  logoUrl?: string;
  compactLogoUrl?: string;
  showBrand?: boolean;
  showLogo?: boolean;
  showAppSwitcher?: boolean;
}>(), {
  brand: 'Virexen',
  expanded: true,
  mobileOpen: false,
  ariaLabel: 'Application navigation',
  brandingPlacement: 'header',
  apps: () => [],
  otherApps: () => [],
  showBrand: true,
  showLogo: true,
  showAppSwitcher: true
});

const emit = defineEmits<{
  'update:expanded': [value: boolean];
  'update:mobileOpen': [value: boolean];
  navigate: [item: SidebarItem];
  appSelect: [app: VirexenApp];
}>();

const expandedGroups = ref<string[]>([]);
const flyoutId = ref<string | null>(null);
let hideTimer: ReturnType<typeof setTimeout> | undefined;
function cancelHide() { if (hideTimer) clearTimeout(hideTimer); }
const flyoutTop = ref(0);
const flyoutLeft = ref(0);
const isExpanded = computed(() => props.expanded);

function toggleGroup(id: string) {
  expandedGroups.value = expandedGroups.value.includes(id)
    ? expandedGroups.value.filter(value => value !== id)
    : [...expandedGroups.value, id];
}
function isActive(item: SidebarItem): boolean {
  return props.activeId === item.id || Boolean(item.children?.some(isActive));
}
function select(item: SidebarItem) {
  if (item.disabled) return;
  if (item.children?.length) {
    if (props.expanded || props.mobileOpen) toggleGroup(item.id);
    return;
  }
  emit('navigate', item);
  emit('update:mobileOpen', false);
  flyoutId.value = null;
}
function showFlyout(event: MouseEvent, item: SidebarItem) {
  cancelHide();
  if (props.expanded || props.mobileOpen || !item.children?.length || item.disabled) return;
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  flyoutTop.value = Math.min(rect.top, Math.max(12, window.innerHeight - 330));
  flyoutLeft.value = rect.right + 8;
  flyoutId.value = item.id;
}
function scheduleHide() {
  cancelHide();
  hideTimer = setTimeout(() => { flyoutId.value = null; }, 180);
}
const flyoutItem = computed(() => props.items.find(item => item.id === flyoutId.value));
watch(() => props.expanded, value => { if (value) flyoutId.value = null; });
watch(() => props.mobileOpen, open => { if (!open) flyoutId.value = null; });

</script>

<template>
    <div v-if="mobileOpen" class="vx-sidebar__scrim" @click="emit('update:mobileOpen', false)" />
    <aside :class="['vx-sidebar', { 'vx-sidebar--expanded': isExpanded, 'vx-sidebar--mobile-open': mobileOpen }]" :aria-label="ariaLabel">
      <div v-if="showBrand" class="vx-sidebar__mobile-title"><strong>{{ brand }}</strong><button class="vx-sidebar__icon-button" aria-label="Close navigation" @click="emit('update:mobileOpen', false)">×</button></div>
      <div v-if="brandingPlacement === 'sidebar' && showBrand" class="vx-sidebar__brand">
        <VAppSwitcher v-if="showAppSwitcher && apps.length" :apps="apps" :other-apps="otherApps" :active-id="activeAppId||apps[0]?.id||''" :compact="!isExpanded && !mobileOpen" :label="brand" :logo-url="showLogo ? logoUrl : undefined" :compact-logo-url="showLogo ? compactLogoUrl : undefined" @select="emit('appSelect',$event)" />
        <div v-else class="vx-sidebar__static-brand"><img v-if="showLogo && (isExpanded || mobileOpen ? logoUrl : compactLogoUrl||logoUrl)" :src="isExpanded || mobileOpen ? logoUrl : compactLogoUrl||logoUrl" alt="" /><strong v-if="isExpanded || mobileOpen">{{brand}}</strong></div>
      </div>
      <nav class="vx-sidebar__nav" :aria-label="ariaLabel">
        <div v-for="item in items" :key="item.id" class="vx-sidebar__group" @mouseenter="showFlyout($event, item)" @mouseleave="scheduleHide">
          <button type="button" :disabled="item.disabled" :title="!isExpanded && !mobileOpen && !item.children?.length ? item.label : undefined" :aria-label="!isExpanded && !mobileOpen ? item.label : undefined" :aria-current="activeId === item.id ? 'page' : undefined" :aria-expanded="item.children?.length ? (expandedGroups.includes(item.id) || (flyoutId === item.id && !isExpanded)) : undefined" :class="['vx-sidebar__item', { 'vx-sidebar__item--active': isActive(item) }]" @click="select(item)">
            <VIcon :name="item.icon||'folder'" />
            <span class="vx-sidebar__label">{{ item.label }}</span>
            <span v-if="item.badge !== undefined" class="vx-sidebar__badge">{{ item.badge }}</span>
            <svg v-if="item.children?.length" class="vx-sidebar__chevron" :class="{ 'vx-sidebar__chevron--open': expandedGroups.includes(item.id) }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
          <div v-if="item.children?.length && (expandedGroups.includes(item.id) || item.children.some(isActive)) && (isExpanded || mobileOpen)" class="vx-sidebar__subitems">
            <button v-for="child in item.children" :key="child.id" type="button" :disabled="child.disabled" :class="['vx-sidebar__subitem', {'vx-sidebar__subitem--active':activeId === child.id}]" @click="select(child)">{{ child.label }}<span v-if="child.badge !== undefined" class="vx-sidebar__badge">{{ child.badge }}</span></button>
          </div>
        </div>
      </nav>
      <button class="vx-sidebar__collapse" type="button" :aria-label="isExpanded ? 'Collapse navigation' : 'Expand navigation'" @click="emit('update:expanded', !isExpanded)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" :style="{ transform: isExpanded ? 'rotate(180deg)' : undefined }"><path d="m9 6 6 6-6 6"/></svg>
        <span class="vx-sidebar__collapse-label">{{ isExpanded ? 'Collapse sidebar' : 'Expand sidebar' }}</span>
      </button>
      <div v-if="!isExpanded && !mobileOpen && flyoutItem?.children?.length" class="vx-sidebar__flyout" :style="{ top: flyoutTop + 'px', left: flyoutLeft + 'px' }" @mouseenter="cancelHide()" @mouseleave="flyoutId = null">
        <strong>{{ flyoutItem.label }}</strong>
        <button v-for="child in flyoutItem.children" :key="child.id" type="button" :class="{'vx-sidebar__subitem--active': activeId === child.id}" @click="select(child)">{{ child.label }}</button>
      </div>
    </aside>
</template>
