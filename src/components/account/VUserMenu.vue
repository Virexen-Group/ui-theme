<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import VIcon from '../icons/VIcon.vue';
export interface UserMenuItem { id: string; label: string; description?: string; icon?: string; href?: string; external?: boolean; danger?: boolean; disabled?: boolean; dividerBefore?: boolean }
export interface UserMenuAccount { name: string; email?: string; avatarUrl?: string; initials?: string; secured?: boolean }
export type UserAppearance = 'light' | 'dark' | 'system';
const props = withDefaults(defineProps<{
  user?: UserMenuAccount | null; items?: UserMenuItem[]; signInLabel?: string;
  align?: 'left' | 'right'; appearance?: UserAppearance; showAppearance?: boolean;
  showAccountSecurity?: boolean; showFooter?: boolean; privacyHref?: string;
  footerText?: string; useDefaultItems?: boolean; supportHref?: string; logoutLabel?: string;
}>(), {
  items: () => [], signInLabel: 'Sign in', align: 'right', appearance: 'system',
  showAppearance: true, showAccountSecurity: true, showFooter: true,
  privacyHref: 'https://virexen.com/privacy', footerText: 'Secured by Virexen Identity', useDefaultItems: false,
  supportHref: 'https://support.virexen.com', logoutLabel: 'Logout'
});
const emit = defineEmits<{ select: [id: string]; signIn: []; appearanceChange: [value: UserAppearance]; 'update:appearance': [value: UserAppearance] }>();
const open = ref(false);
const root = ref<HTMLElement | null>(null);
const appearanceValue = ref<UserAppearance>(props.appearance);
watch(() => props.appearance, value => { appearanceValue.value = value; });
const menuItems = computed(() => props.items.filter(item => !['logout', 'signout', 'sign-out', 'support', 'help'].includes(item.id.toLowerCase())));
const initials = computed(() => props.user?.initials || props.user?.name?.split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase() || '?');
function choose(id: string) { open.value = false; emit('select', id); }
function setAppearance(value: UserAppearance) { appearanceValue.value = value; emit('update:appearance', value); emit('appearanceChange', value); }
function blur(e: FocusEvent) { if (!(e.relatedTarget instanceof Node && root.value?.contains(e.relatedTarget))) open.value = false; }
</script>
<template>
  <div ref="root" class="vx-user-menu" @focusout="blur" @keydown.esc="open = false">
    <button v-if="!user" type="button" class="vx-user-menu__signin" @click="emit('signIn')">{{ signInLabel }}</button>
    <template v-else>
      <button type="button" class="vx-user-menu__trigger" aria-haspopup="true" :aria-expanded="open" aria-label="Account menu" @click="open = !open">
        <img v-if="user.avatarUrl" class="vx-user-menu__avatar" :src="user.avatarUrl" alt="" />
        <span v-else class="vx-user-menu__avatar vx-user-menu__initials">{{ initials }}</span>
        <span class="vx-user-menu__name">{{ user.name }}</span><VIcon name="chevron-down" :size="14" />
      </button>
      <div v-if="open" class="vx-user-menu__popover vx-user-menu__popover--profile" :class="`vx-user-menu__popover--${align}`" aria-label="Account menu">
        <div class="vx-user-menu__profile">
          <img v-if="user.avatarUrl" class="vx-user-menu__profile-avatar" :src="user.avatarUrl" alt="" />
          <span v-else class="vx-user-menu__profile-avatar vx-user-menu__initials">{{ initials }}</span>
          <div class="vx-user-menu__profile-details">
            <strong>{{ user.name }}</strong><span v-if="user.email">{{ user.email }}</span>
            <small v-if="showAccountSecurity && user.secured !== false" class="vx-user-menu__secure"><VIcon name="shield-check" :size="13" /> Account secured</small>
          </div>
        </div>
        <div v-if="menuItems.length" class="vx-user-menu__group">
          <template v-for="item in menuItems" :key="item.id">
            <div v-if="item.dividerBefore" class="vx-user-menu__divider" role="separator" />
            <button type="button" class="vx-user-menu__entry" :class="{ 'is-danger': item.danger }" :disabled="item.disabled" @click="choose(item.id)">
              <VIcon :name="item.icon || 'chevron-right'" :size="18" />
              <span class="vx-user-menu__entry-text"><strong>{{ item.label }}</strong><small v-if="item.description">{{ item.description }}</small></span>
              <VIcon :name="item.external ? 'arrow-up-right' : 'chevron-right'" :size="14" class="vx-user-menu__entry-end" />
            </button>
          </template>
        </div>
        <div v-if="showAppearance" class="vx-user-menu__appearance">
          <div class="vx-user-menu__section-title"><VIcon name="moon" :size="18" /> Appearance</div>
          <div class="vx-user-menu__segments" role="group" aria-label="Appearance">
            <button v-for="mode in (['light','dark','system'] as const)" :key="mode" type="button" :class="{ 'is-active': appearanceValue===mode }" :aria-pressed="appearanceValue===mode" @click="setAppearance(mode)">{{ mode[0].toUpperCase()+mode.slice(1) }}</button>
          </div>
        </div>
        <div class="vx-user-menu__group vx-user-menu__group--last">
          <a class="vx-user-menu__entry" :href="supportHref" target="_blank" rel="noopener noreferrer" @click="choose('support')">
            <VIcon name="circle-help" :size="18" />
            <span class="vx-user-menu__entry-text"><strong>Help &amp; Support</strong></span>
            <VIcon name="arrow-up-right" :size="14" class="vx-user-menu__entry-end" />
          </a>
          <button type="button" class="vx-user-menu__entry is-danger" @click="choose('logout')">
            <VIcon name="log-out" :size="18" />
            <span class="vx-user-menu__entry-text"><strong>{{ logoutLabel }}</strong></span>
          </button>
        </div>
        <slot name="footer" />
        <div v-if="showFooter" class="vx-user-menu__legal"><span>{{ footerText }}</span><a :href="privacyHref" target="_blank" rel="noopener noreferrer">Privacy</a></div>
      </div>
    </template>
  </div>
</template>
