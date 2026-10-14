<script setup lang="ts">
import { ref } from 'vue';
import { VFormField, VInput, VSelect, VTextarea, VCheckbox, VFileUpload, VButton, VAlert } from '@virexen-group/ui-theme/vue';
const firstName = ref('');
const email = ref('');
const accountType = ref('personal');
const notes = ref('');
const agreed = ref(false);
const files = ref<File[]>([]);
const message = ref('');
function submit() { message.value = `Form collected for ${firstName.value}. Connect your own API to save it.`; }
</script>
<template>
  <form class="stack" @submit.prevent="submit">
    <div class="vx-form-grid">
      <VFormField label="First name" required v-slot="f"><VInput v-bind="{ id: f.id, describedby: f.describedby, invalid: f.invalid }" v-model="firstName" required /></VFormField>
      <VFormField label="Email" required v-slot="f"><VInput v-bind="{ id: f.id, describedby: f.describedby, invalid: f.invalid }" v-model="email" type="email" autocomplete="email" required /></VFormField>
    </div>
    <VFormField label="Account type" v-slot="f"><VSelect :id="f.id" :describedby="f.describedby" v-model="accountType" :options="[{label:'Personal', value:'personal'}, {label:'Business', value:'business'}]" /></VFormField>
    <VFormField label="Notes" hint="Optional" v-slot="f"><VTextarea :id="f.id" :describedby="f.describedby" v-model="notes" /></VFormField>
    <VFileUpload label="Attachments" accept=".pdf,image/*" :max-file-size-mb="5" multiple @change="files = $event" />
    <VCheckbox v-model="agreed" label="I confirm the information is accurate" required />
    <VButton type="submit" variant="primary">Save changes</VButton>
    <VAlert v-if="message" variant="success">{{ message }} ({{ files.length }} attachments selected)</VAlert>
  </form>
</template>
