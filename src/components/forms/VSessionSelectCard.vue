<script setup lang="ts">
import { computed, ref } from 'vue';
const props = withDefaults(defineProps<{
  modelValue: boolean; title: string; dateLabel: string; subtitle?: string;
  price?: number; currency?: string; locale?: string; disabled?: boolean; description?: string;
}>(), { currency: 'USD', locale: 'en-US', disabled: false });
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
const expanded = ref(false);
const priceText = computed(() => props.price == null ? '' : new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency, maximumFractionDigits: 2 }).format(props.price));
</script>
<template>
  <article class="vx-choice" :class="{'vx-choice--selected':modelValue,'vx-choice--disabled':disabled}">
    <div class="vx-choice__row">
      <label class="vx-choice__selection">
        <input class="vx-choice__checkbox" type="checkbox" :checked="modelValue" :disabled="disabled" @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
        <span class="vx-choice__details"><strong>{{ title }}</strong><small>{{ dateLabel }}<span v-if="subtitle"> · {{ subtitle }}</span></small></span>
      </label>
      <strong v-if="price != null" class="vx-choice__price">{{ priceText }}</strong>
      <button v-if="description" type="button" class="vx-choice__expand" :aria-expanded="expanded" :aria-label="`${expanded ? 'Hide' : 'Show'} details for ${title}`" @click="expanded = !expanded">{{ expanded ? '⌃' : '⌄' }}</button>
    </div>
    <div v-if="expanded && description" class="vx-choice__description">{{ description }}</div>
  </article>
</template>
