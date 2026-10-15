<script setup lang="ts">
import { onMounted } from 'vue';
import { useVTheme, type VTheme } from '../../composables/useVTheme';
const { preference, setTheme, initTheme } = useVTheme();
onMounted(initTheme);
function change(event: Event) { setTheme((event.target as HTMLSelectElement).value as VTheme); }
</script>
<template>
  <label class="vx-theme-toggle">
    <span class="vx-theme-toggle__label">Appearance</span>
    <select :value="preference" aria-label="Appearance theme" @change="change">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
</template>
