<script setup lang="ts">
import { computed, ref } from 'vue';
export interface UserMenuItem { id: string; label: string; danger?: boolean; disabled?: boolean; dividerBefore?: boolean }
export interface UserMenuAccount { name: string; email?: string; avatarUrl?: string; initials?: string }
const props = withDefaults(defineProps<{ user?: UserMenuAccount | null; items?: UserMenuItem[]; signInLabel?: string; align?: 'left' | 'right' }>(), { items: () => [], signInLabel: 'Sign in', align: 'right' });
const emit = defineEmits<{ select: [id: string]; signIn: [] }>();
const open = ref(false); const root = ref<HTMLElement | null>(null);
const initials = computed(() => props.user?.initials || props.user?.name.split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase() || '?');
function choose(id: string) { open.value = false; emit('select', id); }
function blur(e: FocusEvent) { if (!(e.relatedTarget instanceof Node && root.value?.contains(e.relatedTarget))) open.value = false; }
</script>
<template>
  <div ref="root" class="vx-user-menu" @focusout="blur" @keydown.esc="open = false">
    <button v-if="!user" type="button" class="vx-user-menu__signin" @click="emit('signIn')">{{ signInLabel }}</button>
    <template v-else>
      <button type="button" class="vx-user-menu__trigger" aria-haspopup="menu" :aria-expanded="open" @click="open = !open">
        <img v-if="user.avatarUrl" class="vx-user-menu__avatar" :src="user.avatarUrl" alt="" />
        <span v-else class="vx-user-menu__avatar vx-user-menu__initials">{{ initials }}</span>
        <span class="vx-user-menu__name">{{ user.name }}</span><span aria-hidden="true">⌄</span>
      </button>
      <div v-if="open" class="vx-user-menu__popover" :class="`vx-user-menu__popover--${align}`" role="menu" aria-label="Account menu">
        <div class="vx-user-menu__identity"><strong>{{ user.name }}</strong><small v-if="user.email">{{ user.email }}</small></div>
        <template v-for="item in items" :key="item.id">
          <div v-if="item.dividerBefore" class="vx-user-menu__divider" role="separator"></div>
          <button type="button" role="menuitem" class="vx-user-menu__item" :class="{ 'is-danger': item.danger }" :disabled="item.disabled" @click="choose(item.id)">{{ item.label }}</button>
        </template>
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>
