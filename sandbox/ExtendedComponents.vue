<script setup lang="ts">
import { ref } from 'vue';
import { VAppHeader, VSearchSelect, VFileUpload, VUserMenu } from '../src/index';
const selected = ref<string | null>('staff'); const query = ref(''); const lastAction = ref('');
const user = { name: 'Example User', email: 'user@example.com' };
const menu = [ { id: 'profile', label: 'Personal information' }, { id: 'security', label: 'Security' }, { id: 'logout', label: 'Sign out', dividerBefore: true, danger: true } ];
const choices = [{label:'Staff',value:'staff',description:'Staff member'}, {label:'Manager',value:'manager'}, {label:'Owner',value:'owner'}];
</script>
<template>
  <div>
    <VAppHeader brand-name="Virexen" :user="user" :user-items="menu" search-placeholder="Search your account settings…" @menu-select="id => lastAction = id" @search="q => query = q">
      <template #actions><button type="button" @click="lastAction='help'">Help</button></template>
    </VAppHeader>
    <div style="max-width:800px;margin:32px auto;padding:20px;display:grid;gap:24px">
      <h2>Extended Virexen components</h2>
      <section class="panel" style="padding:22px"><h3>Searchable select</h3><VSearchSelect v-model="selected" :options="choices" placeholder="Choose a role" /><p>Selected: {{ selected }}</p></section>
      <section class="panel" style="padding:22px"><h3>File uploads & previews</h3><VFileUpload label="Attach files" multiple accept="image/*,.pdf" @change="files => lastAction = `${files.length} files selected`" /></section>
      <section class="panel" style="padding:22px"><h3>Standalone account selector</h3><VUserMenu :user="user" :items="menu" @select="id => lastAction = id" /></section>
      <p role="status">Last action: {{ lastAction }} <span v-if="query">· Header search: {{ query }}</span></p>
    </div>
  </div>
</template>
