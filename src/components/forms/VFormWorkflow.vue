<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { FormValues, WorkflowSection } from './workflow.types';

const props = withDefaults(defineProps<{
  sections?: WorkflowSection[];
  modelValue?: FormValues;
  mode?: 'wizard' | 'all';
  navigationPosition?: 'side' | 'top';
  initialSection?: string;
  showSave?: boolean;
  showSaveExit?: boolean;
  busy?: boolean;
  /** Optional app-level check in addition to section field validation. */
  canSubmit?: boolean;
}>(), {
  mode: 'wizard',
  navigationPosition: 'side',
  showSave: true,
  showSaveExit: true,
  busy: false,
  canSubmit: true
});
const emit = defineEmits<{
  'update:modelValue': [values: FormValues];
  'section-change': [sectionId: string];
  'save': [values: FormValues];
  'save-exit': [values: FormValues];
  'submit': [values: FormValues];
}>();

const sections = computed<WorkflowSection[]>(() => props.sections ?? []);
const values = computed<FormValues>(() => props.modelValue ?? {});
const currentIndex = ref(Math.max(0, sections.value.findIndex(s => s.id === props.initialSection)));
const attempted = ref(false);
const touchedSections = ref<Set<string>>(new Set());
// Confirmation is separate from validity. A valid field does not imply a confirmed section.
const confirmedSnapshots = ref<Record<string, string>>({});
function sectionSnapshot(index: number) {
  const section = sections.value[index];
  if (!section) return "[]";
  return JSON.stringify(section.fields.map(field => values.value[field.key] ?? null));
}
function isValid(index: number) { return Object.keys(errorsBySection.value[index] ?? {}).length === 0; }
function confirmSection(index: number) {
  if (!isValid(index)) return false;
  const section = sections.value[index];
  if (!section) return false;
  confirmedSnapshots.value = { ...confirmedSnapshots.value, [section.id]: sectionSnapshot(index) };
  return true;
}
function save(action: 'save' | 'save-exit') {
  // Drafts may contain incomplete sections. Confirm only sections which are valid.
  // The host application must separately report actual persistence success.
  sections.value.forEach((_, index) => { if (isValid(index)) confirmSection(index); });
  if (action === 'save') emit('save', { ...values.value });
  else emit('save-exit', { ...values.value });
}
watch(() => sections.value.length, length => {
  if (currentIndex.value >= length) currentIndex.value = Math.max(0, length - 1);
});
const errorsBySection = computed(() => sections.value.map(section => {
  const errors: Record<string, string> = {};
  for (const field of section.fields) {
    const value = values.value[field.key];
    const missing = value === undefined || value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) || value === false;
    if (field.required && missing) errors[field.key] = `${field.label} is required`;
    else if (field.validate) {
      const message = field.validate(value, values.value);
      if (message) errors[field.key] = message;
    }
  }
  return errors;
}));
const completed = computed(() => sections.value.map((section, index) => isValid(index) && confirmedSnapshots.value[section.id] === sectionSnapshot(index)));
const allComplete = computed(() => sections.value.length > 0 && completed.value.every(Boolean));
const showErrors = (index: number) => attempted.value || touchedSections.value.has(sections.value[index]?.id ?? '');
const current = computed(() => sections.value[currentIndex.value]);
function markTouched(index: number) {
  const section = sections.value[index];
  if (section) touchedSections.value = new Set([...touchedSections.value, section.id]);
}
function goTo(index: number) {
  if (props.busy || index < 0 || index >= sections.value.length) return;
  currentIndex.value = index;
  emit('section-change', sections.value[index].id);
}
function next() {
  markTouched(currentIndex.value);
  if (!confirmSection(currentIndex.value)) return;
  goTo(currentIndex.value + 1);
}
function submit() {
  attempted.value = true;
  if (!allComplete.value || !props.canSubmit || props.busy) {
    const firstIncomplete = completed.value.findIndex(value => !value);
    if (firstIncomplete >= 0) goTo(firstIncomplete);
    return;
  }
  emit('submit', { ...values.value });
}
function update(nextValues: FormValues) { emit('update:modelValue', nextValues); }
function status(index: number) {
  if (completed.value[index]) return 'Complete';
  if (index === currentIndex.value) return 'In progress';
  return 'Incomplete';
}
</script>

<template>
  <form :class="['vx-workflow--' + navigationPosition]" novalidate @submit.prevent="submit">
    <nav class="vx-workflow__nav" aria-label="Form sections">
      <div class="vx-workflow__nav-title">Sections</div>
      <button v-for="(section, index) in sections" :key="section.id" type="button"
        class="vx-workflow__nav-item" :class="{ 'is-active': currentIndex === index }"
        :aria-current="currentIndex === index ? 'step' : undefined"
        :disabled="busy" @click="goTo(index)">
        <span class="vx-workflow__step" :class="{ 'is-complete': completed[index] }">{{ completed[index] ? '✓' : index + 1 }}</span>
        <span class="vx-workflow__nav-copy"><strong>{{ section.title }}</strong><small>{{ status(index) }}</small></span>
      </button>
    </nav>

    <div class="vx-workflow__main">
      <div class="vx-workflow__progress" role="status">
        {{ completed.filter(Boolean).length }} of {{ sections.length }} sections complete
      </div>
      <template v-for="(section, index) in sections" :key="section.id">
        <section v-if="mode === 'all' || currentIndex === index" class="vx-workflow__section"
          :aria-labelledby="`vx-workflow-${section.id}`">
          <header class="vx-workflow__section-header">
            <h2 :id="`vx-workflow-${section.id}`">{{ section.title }}</h2>
            <p v-if="section.description">{{ section.description }}</p>
            <span class="vx-workflow__status">{{ status(index) }}</span>
          </header>
          <slot :name="section.id" :values="values" :update="update"
            :errors="showErrors(index) ? errorsBySection[index] : {}"
            :section="section" />
          <p v-if="showErrors(index) && !completed[index]" class="vx-workflow__error" role="alert">
            Complete the required fields in this section before continuing.
          </p>
        </section>
      </template>

      <div class="vx-workflow__actions">
        <button v-if="showSave" type="button" class="vx-workflow__button" :disabled="busy" @click="save('save')">Save draft</button>
        <button v-if="showSaveExit" type="button" class="vx-workflow__button" :disabled="busy" @click="save('save-exit')">Save &amp; exit</button>
        <span class="vx-workflow__action-spacer" />
        <template v-if="mode === 'wizard'">
          <button v-if="currentIndex > 0" type="button" class="vx-workflow__button" :disabled="busy" @click="goTo(currentIndex - 1)">Back</button>
          <button v-if="currentIndex < sections.length - 1" type="button" class="vx-workflow__button vx-workflow__button--primary" :disabled="busy" @click="next">Next</button>
          <button v-else type="submit" class="vx-workflow__button vx-workflow__button--primary" :disabled="busy || !allComplete || !canSubmit">Submit</button>
        </template>
        <button v-else type="submit" class="vx-workflow__button vx-workflow__button--primary" :disabled="busy || !allComplete || !canSubmit">Submit</button>
      </div>
    </div>
  </form>
</template>
