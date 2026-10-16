<script setup lang="ts">
import { ref } from 'vue';
import type { UserAppearance } from '../account/VUserMenu.vue';
import VIcon from '../icons/VIcon.vue';
import VAppSwitcher, {type VirexenApp} from '../navigation/VAppSwitcher.vue';
import { VIREXEN_LAUNCHER_APPS } from '../../data/virexen-app-launcher';
import VUserMenu, { type UserMenuAccount, type UserMenuItem } from '../account/VUserMenu.vue';
export interface HeaderBrandOption { id: string; label: string; logoUrl?: string; href?: string; description?: string }
const props = withDefaults(defineProps<{
  brandName?: string; logoUrl?: string; searchPlaceholder?: string;
  brandSelectable?: boolean; brandOptions?: HeaderBrandOption[]; brandSelectionAction?: 'emit' | 'navigate' | 'both'; selectedBrandId?: string;
  showSearch?: boolean; user?: UserMenuAccount | null; userItems?: UserMenuItem[]; userAppearance?: UserAppearance;
  sticky?: boolean; showNotifications?: boolean; notificationCount?: number;
  notificationHref?: string; userShowAppearance?: boolean; userSupportHref?: string;
  showBrand?: boolean; showLogo?: boolean; showAppSwitcher?: boolean; launcherApps?: VirexenApp[]; launcherOtherApps?: VirexenApp[]; activeAppId?: string;
  surface?: 'subtle' | 'solid' | 'transparent';
}>(), {
  brandSelectable: false, brandOptions: () => [], brandSelectionAction: 'emit', brandName: 'Virexen', searchPlaceholder: 'Search…', showSearch: true,
  userItems: () => [], sticky: true, showNotifications: true,
  notificationCount: 0, userShowAppearance: true, showBrand: true, showLogo: true, surface: 'subtle', showAppSwitcher: true, launcherApps: () => VIREXEN_LAUNCHER_APPS, launcherOtherApps: () => [], activeAppId: 'Virexen'
});
const emit = defineEmits<{
  search: [query: string]; menuSelect: [id: string]; signIn: [];
  brandClick: []; brandSelect: [brand: HeaderBrandOption]; notificationsClick: []; appSelect: [app: VirexenApp]; userAppearanceChange: [value: UserAppearance];
}>();
const query = ref('');
const brandOpen = ref(false);
function chooseBrand(brand: HeaderBrandOption) { brandOpen.value = false; if (props.brandSelectionAction !== 'navigate') emit('brandSelect', brand); if (props.brandSelectionAction !== 'emit' && brand.href) window.location.assign(brand.href); }

</script>
<template>
  <header class="vx-app-header" :class="['vx-app-header--' + surface, { 'vx-app-header--sticky': sticky }]" :data-surface="surface">
    <div v-if="showBrand" class="vx-app-header__brand">
      <slot name="brand">
        <button type="button" class="vx-app-header__brand-button" :aria-expanded="brandSelectable ? brandOpen : undefined" :aria-haspopup="brandSelectable ? 'menu' : undefined" @click="brandSelectable ? (brandOpen = !brandOpen) : emit('brandClick')">
          <img v-if="showLogo && logoUrl" :src="logoUrl" alt="" />
          <span v-else-if="showLogo" class="vx-app-header__brand-mark">V</span>
          <strong>{{ brandName }}</strong><VIcon v-if="brandSelectable" name="chevron-down" size="sm" />
        </button>
        <div v-if="brandSelectable && brandOpen" class="vx-header-brand-menu" role="menu" @keydown.esc="brandOpen=false">
          <button v-for="choice in brandOptions" :key="choice.id" role="menuitem" type="button" :aria-current="selectedBrandId === choice.id ? 'page' : undefined" @click="chooseBrand(choice)">
            <img v-if="choice.logoUrl" :src="choice.logoUrl" alt="" /><span><b>{{choice.label}}</b><small v-if="choice.description">{{choice.description}}</small></span>
            <VIcon v-if="selectedBrandId===choice.id" name="check" size="sm" />
          </button><p v-if="!brandOptions.length">No brands available</p>
        </div>
      </slot>
    </div>
    <slot name="before-search" />
    <div class="vx-app-header__center">
      <slot name="center">
        <form v-if="showSearch" class="vx-app-header__search" role="search" @submit.prevent="emit('search', query)">
          <VIcon name="search" size="sm" />
          <input v-model="query" type="search" aria-label="Search" :placeholder="searchPlaceholder" />
        </form>
      </slot>
    </div>
    <slot name="after-search" />
    <div class="vx-app-header__actions">
      <slot name="actions-start" />
      <slot name="actions" />
      <VAppSwitcher v-if="showAppSwitcher" :apps="launcherApps" :other-apps="launcherOtherApps" :active-id="activeAppId" trigger="launcher" display="grid" @select="emit('appSelect',$event)" />
      <a v-if="showNotifications && notificationHref" class="vx-app-header__action" :href="notificationHref" aria-label="Notifications" title="Notifications"><VIcon name="bell-ring" :size="20" /><span v-if="notificationCount>0" class="vx-app-header__count">{{ notificationCount>99?'99+':notificationCount }}</span></a>
      <button v-else-if="showNotifications" type="button" class="vx-app-header__action" aria-label="Notifications" title="Notifications" @click="emit('notificationsClick')"><VIcon name="bell-ring" :size="20" /><span v-if="notificationCount>0" class="vx-app-header__count">{{ notificationCount>99?'99+':notificationCount }}</span></button>
      <slot name="actions-end" />
      <VUserMenu :user="user" :items="userItems" :appearance="userAppearance" :show-appearance="userShowAppearance" :support-href="userSupportHref" @appearance-change="emit('userAppearanceChange', $event)" @select="id => emit('menuSelect', id)" @sign-in="emit('signIn')" />
    </div>
  </header>
</template>

<style scoped>
.vx-app-header__brand{position:relative}.vx-header-brand-menu{position:absolute;z-index:110;top:calc(100% + 12px);left:0;min-width:255px;max-height:340px;overflow:auto;padding:7px;background:var(--vx-surface,#fff);border:1px solid var(--vx-border,#dbe4ef);border-radius:16px;box-shadow:0 18px 45px #14294820}.vx-header-brand-menu button{display:flex;align-items:center;gap:11px;width:100%;padding:11px;border:0;border-radius:9px;text-align:left;background:transparent;color:var(--vx-text,#172b45);cursor:pointer}.vx-header-brand-menu button:hover,.vx-header-brand-menu button:focus-visible{background:var(--vx-input,#f1f5fa)}.vx-header-brand-menu img{width:32px;height:32px;object-fit:contain}.vx-header-brand-menu span{display:grid;gap:2px;flex:1}.vx-header-brand-menu small{color:var(--vx-muted,#64748b)}.vx-header-brand-menu p{padding:8px;margin:0}.vx-app-header__actions :slotted(*){flex-shrink:0}
</style>
