<script setup lang="ts">
import { ref } from 'vue';
import VFormWorkflow from '../src/components/forms/VFormWorkflow.vue';
import type { WorkflowSection, FormValues } from '../src/components/forms/workflow.types';
import VFormField from '../src/components/forms/VFormField.vue';
import VInput from '../src/components/forms/VInput.vue';
import '../src/styles/workflow.css';

const mode = ref<'wizard' | 'all'>('wizard');
const savedMessage = ref('');
const values = ref<FormValues>({ firstName: '', email: '', camp: '', agreement: false });
const sections: WorkflowSection[] = [
  { id: 'personal', title: 'Personal information', description: 'Your contact details', fields: [
    { key: 'firstName', label: 'Full name', required: true },
    { key: 'email', label: 'Email', required: true, validate: value => typeof value === 'string' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Enter a valid email' : undefined }
  ] },
  { id: 'camp', title: 'Camp information', fields: [{ key: 'camp', label: 'Camp name', required: true }] },
  { id: 'review', title: 'Review & agreement', fields: [{ key: 'agreement', label: 'Agreement', required: true }] }
];
function setField(key: string, value: unknown) { values.value = { ...values.value, [key]: value }; }
</script>
<template>
  <div style="padding:24px;max-width:1150px;margin:auto">
    <h1>Virexen form workflow</h1>
    <label>Display: <select v-model="mode"><option value="wizard">Step-by-step</option><option value="all">All sections on one page</option></select></label>
    <p v-if="savedMessage" role="status">{{ savedMessage }}</p>
    <VFormWorkflow v-model="values" :sections="sections" :mode="mode"
      @save="savedMessage = 'Draft save requested — connect to your app API.'"
      @save-exit="savedMessage = 'Save & exit requested — connect to your app API and navigation.'"
      @submit="savedMessage = 'Valid form submitted — connect to your app API.'">
      <template #personal="{ errors }">
        <VFormField label="Full name" required :error="errors.firstName" v-slot="field">
          <VInput :id="field.id" :model-value="String(values.firstName ?? '')" :aria-invalid="!!errors.firstName" @update:model-value="setField('firstName', $event)" />
        </VFormField>
        <VFormField label="Email" required :error="errors.email" v-slot="field">
          <VInput :id="field.id" :model-value="String(values.email ?? '')" @update:model-value="setField('email', $event)" />
        </VFormField>
      </template>
      <template #camp="{ errors }">
        <VFormField label="Camp name" required :error="errors.camp" v-slot="field">
          <VInput :id="field.id" :model-value="String(values.camp ?? '')" @update:model-value="setField('camp', $event)" />
        </VFormField>
      </template>
      <template #review>
        <label><input type="checkbox" :checked="values.agreement === true" @change="setField('agreement', ($event.target as HTMLInputElement).checked)" /> I agree to the terms <strong>(required)</strong></label>
      </template>
    </VFormWorkflow>
  </div>
</template>
