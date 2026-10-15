<script setup lang="ts">
import { computed } from 'vue';
import VIcon from '../icons/VIcon.vue';
const props = withDefaults(defineProps<{
  variant?: 'primary'|'secondary'|'tertiary'|'danger'; type?: 'button'|'submit'|'reset';
  pack?: 'core'|'soft'|'outline'|'elevated'; size?: 'sm'|'md'|'lg'; shape?: 'rounded'|'pill'|'square';
  block?: boolean; disabled?: boolean; loading?: boolean; leadingIcon?: string; trailingIcon?: string;
  icon?: string; tooltip?: string;
}>(), {variant:'secondary', type:'button',pack:'core',size:'md',shape:'rounded'});
const classes = computed(()=>[`vx-button`, `vx-button--${props.variant}`,`vx-button--${props.pack}`,`vx-button--${props.size}`,`vx-button--${props.shape}`,{'vx-button--block':props.block,'vx-button--icon-only':Boolean(props.icon)}]);
</script>
<template>
  <button :class="classes" :type="type" :disabled="disabled||loading" :aria-busy="loading||undefined" :aria-label="icon ? (tooltip||undefined) : undefined" :title="tooltip" >
    <span v-if="loading" class="vx-button__spinner" aria-hidden="true"/>
    <VIcon v-else-if="icon||leadingIcon" :name="(icon||leadingIcon)!" size="sm"/>
    <span v-if="!icon"><slot/></span>
    <VIcon v-if="trailingIcon&&!loading&&!icon" :name="trailingIcon" size="sm"/>
  </button>
</template>
