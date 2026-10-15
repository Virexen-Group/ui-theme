<script setup lang="ts">
import {computed,ref} from 'vue';
import {validateText} from '../../utils/validation';
const props=withDefaults(defineProps<{modelValue?:string;type?:string;label?:string;required?:boolean;minLength?:number;maxLength?:number;pattern?:string;profanity?:string[];placeholder?:string;disabled?:boolean}>(),{modelValue:'',type:'text',required:false});
const emit=defineEmits<{'update:modelValue':[value:string];validation:[valid:boolean,error:string]}>();
const touched=ref(false);const result=computed(()=>validateText(props.modelValue,{required:props.required,minLength:props.minLength,maxLength:props.maxLength,pattern:props.pattern,profanity:props.profanity,label:props.label}));
function onInput(value:string){emit('update:modelValue',value);const result=validateText(value,{required:props.required,minLength:props.minLength,maxLength:props.maxLength,pattern:props.pattern,profanity:props.profanity,label:props.label});emit('validation',result.valid,result.error)}
</script>
<template><div class="vx-validated-field"><label v-if="label" class="vx-field__label">{{label}} <span v-if="required" aria-hidden="true">*</span></label><input class="vx-control" :type="type" :value="modelValue" :required="required" :minlength="minLength" :maxlength="maxLength" :placeholder="placeholder" :disabled="disabled" :aria-invalid="touched&&!result.valid" @input="onInput(($event.target as HTMLInputElement).value)" @blur="touched=true"/><p v-if="touched&&!result.valid" class="vx-validated-error" role="alert">{{result.error}}</p></div></template>
