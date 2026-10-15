<script setup lang="ts">
import { computed, ref } from 'vue';
import { validateDate, ageOn, todayISO, type DateRule } from '../../utils/validation';
const props=withDefaults(defineProps<{modelValue?:string;label?:string;rule?:DateRule;required?:boolean;min?:string;max?:string;minAge?:number;maxAge?:number;showAge?:boolean;disabled?:boolean}>(),{modelValue:'',rule:'any',required:false,showAge:false,disabled:false});
const emit=defineEmits<{'update:modelValue':[value:string];validation:[valid:boolean,error:string]}>();
const touched=ref(false);
const result=computed(()=>validateDate(props.modelValue,{rule:props.rule,required:props.required,min:props.min,max:props.max,minAge:props.minAge,maxAge:props.maxAge}));
const today=computed(()=>todayISO());
const maxDate=computed(()=>{const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);const ruleMax=props.rule==='past'?todayISO(yesterday):props.rule==='today-or-past'?today.value:undefined;return ruleMax&&props.max?(ruleMax<props.max?ruleMax:props.max):ruleMax??props.max;});
function update(value:string){emit('update:modelValue',value);emit('validation',validateDate(value,{rule:props.rule,required:props.required,min:props.min,max:props.max,minAge:props.minAge,maxAge:props.maxAge}).valid,validateDate(value,{rule:props.rule,required:props.required,min:props.min,max:props.max,minAge:props.minAge,maxAge:props.maxAge}).error)}
</script>
<template><div class="vx-validated-field"><label v-if="label" class="vx-field__label">{{label}} <span v-if="required" aria-hidden="true">*</span></label><input class="vx-control" type="date" :value="modelValue" :disabled="disabled" :required="required" :min="min" :max="maxDate" :aria-invalid="touched&&!result.valid" @input="update(($event.target as HTMLInputElement).value)" @blur="touched=true"/><p v-if="touched&&!result.valid" class="vx-validated-error" role="alert">{{result.error}}</p><p v-else-if="showAge&&modelValue&&result.valid" class="vx-field__hint">Age: {{ageOn(modelValue)}}</p></div></template>
