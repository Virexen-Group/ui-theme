<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { FormValues, WorkflowSection } from './workflow.types';

const props = withDefaults(defineProps<{
  sections: WorkflowSection[];
  modelValue: FormValues;
  mode?: 'wizard' | 'all';
  initialSection?: string;
  showSave?: boolean;
  showSaveExit?: boolean;
  busy?: boolean;
  /** Optional app-level check in addition to section field validation. */
  canSubmit?: boolean;
}>(), {
  mode: 'wizard',
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

const currentIndex = ref(Math.max(0, props.sections.findIndex(s => s.id === props.initialSection)));
const attempted = ref(false);
const touchedSections = ref<Set<string>>(new Set());
watch(() => props.sections.length, length => {
  if (currentIndex.value >= length) currentIndex.value = Math.max(0, length - 1);
});
const errorsBySection = computed(() => props.sections.map(section => {
  const errors: Record<string, string> = {};
  for (const field of section.fields) {
    const value = props.modelValue[field.key];
    const missing = value === undefined || value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) || value === false;
    if (field.required && missing) errors[field.key] = `${field.label} is required`;
    else if (field.validate) {
      const message = field.validate(value, props.modelValue);
      if (message) errors[field.key] = message;
    }
  }
  return errors;
}));
const completed = computed(() => props.sections.map((_, index) => Object.keys(errorsBySection.value[index]).length === 0));
const allComplete = computed(() => props.sections.length > 0 && completed.value.every(Boolean));
const showErrors = (index: number) => attempted.value || touchedSections.value.has(props.sections[index]?.id ?? '');
const current = computed(() => props.sections[currentIndex.value]);
function markTouched(index: number) {
  const section = props.sections[index];
  if (section) touchedSections.value = new Set([...touchedSections.value, section.id]);
}
function goTo(index: number) {
  if (props.busy || index < 0 || index >= props.sections.length) return;
  currentIndex.value = index;
  emit('section-change', props.sections[index].id);
}
function next() {
  markTouched(currentIndex.value);
  if (!completed.value[currentIndex.value]) return;
  goTo(currentIndex.value + 1);
}
function submit() {
  attempted.value = true;
  if (!allComplete.value || !props.canSubmit || props.busy) {
    const firstIncomplete = completed.value.findIndex(value => !value);
    if (firstIncomplete >= 0) goTo(firstIncomplete);
    return;
  }
  emit('submit', { ...props.modelValue });
}
function update(values: FormValues) { emit('update:modelValue', values); }
function status(index: number) {
  if (completed.value[index]) return 'Complete';
  if (index === currentIndex.value) return 'In progress';
  return 'Incomplete';
}
</script>

<template>
  <form class="vx-workflow" novalidate @submit.prevent="submit">
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
          <slot :name="section.id" :values="modelValue" :update="update"
            :errors="showErrors(index) ? errorsBySection[index] : {}"
            :section="section" />
          <p v-if="showErrors(index) && !completed[index]" class="vx-workflow__error" role="alert">
            Complete the required fields in this section before continuing.
          </p>
        </section>
      </template>

      <div class="vx-workflow__actions">
        <button v-if="showSave" type="button" class="vx-workflow__button" :disabled="busy" @click="emit('save', { ...modelValue })">Save draft</button>
        <button v-if="showSaveExit" type="button" class="vx-workflow__button" :disabled="busy" @click="emit('save-exit', { ...modelValue })">Save &amp; exit</button>
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
