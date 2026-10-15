<script setup lang="ts">
import VValidatedDate from './VValidatedDate.vue';
withDefaults(defineProps<{modelValue?:string;label?:string;minAge?:number;maxAge?:number;required?:boolean;showAge?:boolean}>(),{label:'Date of birth',required:true,showAge:true});
const emit=defineEmits<{'update:modelValue':[value:string];validation:[valid:boolean,error:string]}>();
</script>
<template><VValidatedDate :model-value="modelValue" :label="label" rule="past" :min-age="minAge" :max-age="maxAge" :required="required" :show-age="showAge" @update:model-value="emit('update:modelValue',$event)" @validation="(ok,error)=>emit('validation',ok,error)"/></template>
