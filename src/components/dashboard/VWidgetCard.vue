<script setup lang="ts">
/**
 * A dashboard widget's card: a tinted icon, a title (a link when `href` is set), header actions
 * (e.g. a menu), the body and an optional footer. Fills its grid cell, so widgets in a row line up.
 */
withDefaults(defineProps<{
  title: string;
  subtitle?: string;
  /** Makes the title a link with a chevron. Listen to `open` to route inside a single-page app. */
  href?: string;
  /** Icon tint */
  tone?: 'neutral' | 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'teal' | 'red';
}>(), { tone: 'neutral' });
const emit = defineEmits<{ open: [event: MouseEvent] }>();
</script>

<template>
  <article class="vx-widget-card">
    <header class="vx-widget-card__head">
      <span v-if="$slots.icon" class="vx-widget-card__icon" :data-tone="tone" aria-hidden="true"><slot name="icon" /></span>
      <div class="vx-widget-card__titles">
        <h3 class="vx-widget-card__title">
          <a v-if="href" :href="href" class="vx-widget-card__link" @click="emit('open', $event)">{{ title }}<span class="vx-widget-card__chevron" aria-hidden="true">›</span></a>
          <template v-else>{{ title }}</template>
        </h3>
        <p v-if="subtitle" class="vx-widget-card__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="vx-widget-card__actions"><slot name="actions" /></div>
    </header>
    <div class="vx-widget-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="vx-widget-card__footer"><slot name="footer" /></footer>
  </article>
</template>
