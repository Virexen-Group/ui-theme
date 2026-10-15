<script setup lang="ts">
import { computed } from 'vue';
import VSearchSelect from './VSearchSelect.vue';
import {getLanguageOptions, type LanguageDisplayFormat} from '../../data/smart-options';
const props=withDefaults(defineProps<{
  modelValue?:string|null; disabled?:boolean; placeholder?:string;
  displayFormat?:LanguageDisplayFormat;
}>(),{displayFormat:'english-native'});
const emit=defineEmits<{'update:modelValue':[value:string|null]}>();
const options=computed(()=>getLanguageOptions(props.displayFormat));
</script>
<template>
  <VSearchSelect :model-value="modelValue" :options="options" :disabled="disabled"
    :placeholder="placeholder || 'Select language'" search-placeholder="Search language or code…"
    @update:model-value="emit('update:modelValue',$event)" />
</template>
