<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ExtendedComponents from './ExtendedComponents.vue';
import FormWorkflowExample from './FormWorkflowExample.vue';
import {
  VButton, VInput, VSelect, VTextarea,
  VCheckbox, VFileUpload, VFormField, VAlert
} from '../src/index';

type Template = { subject: string; title?: string; preheader?: string; html: string; text: string; urlVariables?: string[] };
type Rendered = { subject: string; html: string; text: string };
const tab = ref<'components' | 'extended' | 'workflow' | 'email'>('components');
const name = ref('Alex Morgan');
const email = ref('alex@example.com');
const role = ref('staff');
const description = ref('A sample description for Virexen forms.');
const enabled = ref(true);
const selectedFiles = ref<string[]>([]);
const submitted = ref(false);
const simulatedError = ref(false);

const templates: Record<string, Template> = {
  welcome: {
    subject: 'Welcome to Virexen, {{firstName}}',
    title: 'Welcome to Virexen',
    preheader: 'Your account is ready.',
    html: '<h2>Welcome, {{firstName}}!</h2><p>Thanks for joining <strong>Virexen</strong>.</p><p>Your account <strong>{{email}}</strong> is ready.</p><p><a href="https://my.virexen.com">Go to your account</a></p>',
    text: 'Welcome, {{firstName}}! Your Virexen account ({{email}}) is ready.'
  },
  verification: {
    subject: 'Your Virexen verification code',
    title: 'Verify your email',
    preheader: 'Your one-time verification code',
    html: '<p>Hello {{firstName}},</p><p>Your verification code is:</p><h1 style="text-align:center;color:#1fb5ab;">{{code}}</h1><p>Only enter this code on an official Virexen sign-in page.</p>',
    text: 'Hello {{firstName}}, your verification code is {{code}}.'
  },
  support: {
    subject: 'Virexen support update',
    title: 'Support update',
    preheader: 'An update from our team',
    html: '<p>Hi {{firstName}},</p><p>We have an update about your support request:</p><blockquote>{{message}}</blockquote><p>Thank you,<br><strong>Virexen Support</strong></p>',
    text: 'Hi {{firstName}}, update on your support request: {{message}}'
  }
};
const templateKey = ref('welcome');
const template = ref<Template>({ ...templates.welcome });
const variablesJson = ref(JSON.stringify({ firstName: 'Alex', email: 'alex@example.com', code: '482961', message: 'Your request is being reviewed.' }, null, 2));
const recipient = ref('alex@example.com');
const preview = ref<Rendered | null>(null);
const previewError = ref('');
const busy = ref(false);
const frameWidth = ref<'desktop' | 'mobile'>('desktop');
const previewMode = ref<'html' | 'text'>('html');
const requiredVarNames = computed(() => {
  const all = [template.value.subject, template.value.title, template.value.preheader, template.value.html, template.value.text].join(' ');
  return [...new Set([...all.matchAll(/\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}|\{([a-zA-Z][a-zA-Z0-9_]*)\}/g)].map(match => match[1] || match[2]))].sort();
});
watch(templateKey, key => {
  template.value = { ...templates[key] };
  preview.value = null;
});
let pending = 0;
async function renderPreview() {
  const current = ++pending;
  busy.value = true;
  previewError.value = '';
  try {
    const variables = JSON.parse(variablesJson.value);
    if (!variables || Array.isArray(variables) || typeof variables !== 'object') throw new Error('Variables must be a JSON object');
    const response = await fetch('/__sandbox/render-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: template.value, variables, to: recipient.value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Rendering failed');
    if (current === pending) preview.value = data;
  } catch (error) {
    if (current === pending) { preview.value = null; previewError.value = error instanceof Error ? error.message : String(error); }
  } finally { if (current === pending) busy.value = false; }
}
async function copyHtml() { if (preview.value) await navigator.clipboard.writeText(preview.value.html); }
async function copyText() { if (preview.value) await navigator.clipboard.writeText(preview.value.text); }
renderPreview();
</script>

<template>
  <div class="sb-shell">
    <header class="sb-header panel">
      <div class="sb-brand"><span class="sb-mark">V</span><div><strong>Virexen UI</strong><small>Design system sandbox · Development only</small></div></div>
      <div class="sb-nav">
        <button :class="['sb-tab', { active: tab === 'components' }]" @click="tab = 'components'">Components</button>
        <button :class="['sb-tab', { active: tab === 'extended' }]" @click="tab = 'extended'">Advanced components</button>
        <button :class="['sb-tab', { active: tab === 'workflow' }]" @click="tab = 'workflow'">Form workflows</button>
        <button :class="['sb-tab', { active: tab === 'email' }]" @click="tab = 'email'; renderPreview()">Email playground</button>
      </div>
    </header>
    <main>
      <section class="sb-intro">
        <p class="eyebrow">@virexen-group/ui-theme</p>
        <h1>{{ tab === 'components' ? 'Component gallery' : tab === 'extended' ? 'Advanced components' : tab === 'workflow' ? 'Form workflows' : 'Email playground' }}</h1>
        <p class="muted">{{ tab === 'components' ? 'Preview real components imported from src.' : tab === 'extended' ? 'Header, account menu, searchable select, and file previews.' : tab === 'workflow' ? 'Step-by-step and all-on-one-page forms with completion tracking.' : 'Edit templates and data, then render through the real src/email.js on the local Vite server.' }}</p>
      </section>
      <template v-if="tab === 'components'">
        <div class="sb-grid">
          <section class="panel sb-card">
            <h2>Buttons</h2><p class="muted">Primary, default, disabled and link actions</p>
            <div class="sb-inline">
              <VButton variant="primary" @click="submitted = true">Primary action</VButton>
              <VButton @click="submitted = false">Secondary</VButton>
              <VButton disabled>Disabled</VButton>
            </div>
            <p v-if="submitted" class="sb-inline-feedback">Button clicked — the action works.</p>
          </section>
          <section class="panel sb-card">
            <h2>Notifications</h2><p class="muted">Alert components and UI feedback</p>
            <VAlert>Default notification for users.</VAlert>
            <VAlert variant="success">Your changes have been saved.</VAlert>
            <VAlert variant="warning">Please review the information.</VAlert>
            <div class="sb-inline"><VButton @click="simulatedError = !simulatedError">Toggle error</VButton></div>
            <VAlert v-if="simulatedError" variant="error">Something went wrong. Please try again.</VAlert>
          </section>
          <section class="panel sb-card">
            <h2>Form components</h2><p class="muted">Uses current Manrope font, field spacing and focus styling.</p>
            <form @submit.prevent="submitted = true">
              <VFormField label="Full name" required v-slot="field">
                <VInput v-model="name" :id="field.id" :describedby="field.describedby" required placeholder="Enter name" />
              </VFormField>
              <VFormField label="Email address" hint="Used for account notifications" v-slot="field">
                <VInput v-model="email" type="email" :id="field.id" :describedby="field.describedby" />
              </VFormField>
              <VFormField label="Account role" v-slot="field">
                <VSelect v-model="role" :id="field.id" :options="[{label:'Staff',value:'staff'},{label:'Manager',value:'manager'},{label:'Owner',value:'owner'}]" />
              </VFormField>
              <VFormField label="Description" v-slot="field">
                <VTextarea v-model="description" :id="field.id" :describedby="field.describedby" />
              </VFormField>
              <VCheckbox v-model="enabled" label="Enable notifications" />
              <VFileUpload label="Upload a file" accept=".png,.jpg,.pdf" @change="files => selectedFiles = files.map(file => file.name)" />
              <p v-if="selectedFiles.length" class="muted">Selected: {{ selectedFiles.join(', ') }}</p>
              <div class="sb-inline"><VButton type="submit" variant="primary">Save example form</VButton></div>
            </form>
          </section>
          <section class="panel sb-card">
            <h2>Live form data</h2><p class="muted">Illustrates v-model reactivity without an API.</p>
            <dl class="sb-values"><dt>Name</dt><dd>{{ name }}</dd><dt>Email</dt><dd>{{ email }}</dd><dt>Role</dt><dd>{{ role }}</dd><dt>Notifications</dt><dd>{{ enabled ? 'Enabled' : 'Disabled' }}</dd><dt>Description</dt><dd>{{ description }}</dd></dl>
          </section>
        </div>
      </template>
      <template v-else-if="tab === 'extended'"><ExtendedComponents /></template>
      <template v-else-if="tab === 'workflow'"><FormWorkflowExample /></template>
      <template v-else>
        <div class="sb-email-grid">
          <section class="panel sb-card sb-editor">
            <h2>Template editor</h2>
            <label for="preset">Example template</label>
            <select id="preset" v-model="templateKey" class="sb-native"><option value="welcome">Welcome</option><option value="verification">Verification code</option><option value="support">Support update</option></select>
            <label for="subject">Subject</label><input id="subject" v-model="template.subject" class="sb-native" />
            <label for="title">Title</label><input id="title" v-model="template.title" class="sb-native" />
            <label for="preheader">Preheader</label><input id="preheader" v-model="template.preheader" class="sb-native" />
            <label for="recipient">Recipient (preview only)</label><input id="recipient" v-model="recipient" class="sb-native" />
            <label for="html">HTML body</label><textarea id="html" v-model="template.html" rows="10" class="sb-native sb-code" spellcheck="false"></textarea>
            <label for="text">Plain-text body</label><textarea id="text" v-model="template.text" rows="4" class="sb-native sb-code" spellcheck="false"></textarea>
            <label for="variables">JSON variables</label><textarea id="variables" v-model="variablesJson" rows="7" class="sb-native sb-code" spellcheck="false"></textarea>
            <p class="muted sb-small">Required placeholders: {{ requiredVarNames.length ? requiredVarNames.join(', ') : 'None' }}</p>
            <div class="sb-inline"><VButton variant="primary" :disabled="busy" @click="renderPreview">{{ busy ? 'Rendering…' : 'Render email' }}</VButton></div>
            <p v-if="previewError" role="alert" class="sb-error">{{ previewError }}</p>
          </section>
          <section class="panel sb-card sb-preview-panel">
            <div class="sb-preview-header"><div><h2>Rendered preview</h2><p class="muted sb-small">Local only · Nothing is sent</p></div><div class="sb-inline"><button :class="['sb-tab',{active:previewMode==='html'}]" @click="previewMode='html'">HTML</button><button :class="['sb-tab',{active:previewMode==='text'}]" @click="previewMode='text'">Text</button></div></div>
            <div class="sb-preview-meta"><strong>Subject:</strong> {{ preview?.subject || 'No preview yet' }}</div>
            <div class="sb-inline sb-preview-actions"><button :class="['sb-tab',{active:frameWidth==='desktop'}]" @click="frameWidth='desktop'">Desktop</button><button :class="['sb-tab',{active:frameWidth==='mobile'}]" @click="frameWidth='mobile'">Mobile</button><VButton @click="copyHtml" :disabled="!preview">Copy HTML</VButton><VButton @click="copyText" :disabled="!preview">Copy text</VButton></div>
            <div v-if="previewMode==='html'" class="sb-frame-wrap"><iframe v-if="preview" title="Rendered Virexen email preview" sandbox="" :srcdoc="preview.html" :class="['sb-email-frame', frameWidth]" /></div>
            <pre v-else class="sb-text-preview">{{ preview?.text || 'Render the template to see plain text.' }}</pre>
            <p class="muted sb-small">Preview uses your production renderer and sanitizer. Actual inbox appearance can still vary by email client.</p>
          </section>
        </div>
      </template>
    </main>
    <footer class="sb-footer">Local development sandbox · Not included in the published UI package</footer>
  </div>
</template>
