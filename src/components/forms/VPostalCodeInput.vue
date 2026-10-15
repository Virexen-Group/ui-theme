<script setup lang="ts">
import {computed} from 'vue';
import {getAddressRules,validatePostalCode} from '../../utils/postal';
const props=withDefaults(defineProps<{modelValue?:string; country?:string; required?:boolean; id?:string}>(),{country:'GB',modelValue:''});
const emit=defineEmits<{'update:modelValue':[value:string]}>();
const rules=computed(()=>getAddressRules(props.country));
const invalid=computed(()=>Boolean(props.modelValue) && !validatePostalCode(props.country,props.modelValue));
</script>
<template><div class="vx-field"><label :for="id || 'vx-postal'" class="vx-field__label">{{rules.postalLabel}} <span v-if="required" aria-hidden="true">*</span></label><input :id="id || 'vx-postal'" class="vx-control" :value="modelValue" :placeholder="rules.postalPlaceholder" autocomplete="postal-code" :required="required" :aria-invalid="invalid" @input="emit('update:modelValue',($event.target as HTMLInputElement).value)" /><small v-if="invalid" class="vx-field__error">Check the {{rules.postalLabel.toLowerCase()}} format.</small></div></template>
