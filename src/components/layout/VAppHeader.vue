<script setup lang="ts">
import VUserMenu, { type UserMenuAccount, type UserMenuItem } from '../account/VUserMenu.vue';
withDefaults(defineProps<{ brandName?: string; logoUrl?: string; searchPlaceholder?: string; showSearch?: boolean; user?: UserMenuAccount | null; userItems?: UserMenuItem[]; sticky?: boolean }>(), { brandName: 'Virexen', searchPlaceholder: 'Search…', showSearch: true, userItems: () => [], sticky: true });
const emit = defineEmits<{ search: [query: string]; menuSelect: [id: string]; signIn: []; brandClick: [] }>();
</script>
<template>
  <header class="vx-app-header" :class="{ 'vx-app-header--sticky': sticky }">
    <div class="vx-app-header__brand"><slot name="brand"><button type="button" class="vx-app-header__brand-button" @click="emit('brandClick')"><img v-if="logoUrl" :src="logoUrl" alt="" /><span v-else class="vx-app-header__brand-mark">V</span><strong>{{ brandName }}</strong></button></slot></div>
    <div class="vx-app-header__center"><slot name="center"><form v-if="showSearch" class="vx-app-header__search" role="search" @submit.prevent="emit('search', ($event.target as HTMLFormElement).querySelector('input')?.value || '')"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search" :placeholder="searchPlaceholder" /></form></slot></div>
    <div class="vx-app-header__actions"><slot name="actions" /><VUserMenu :user="user" :items="userItems" @select="id => emit('menuSelect', id)" @sign-in="emit('signIn')" /></div>
  </header>
</template>
