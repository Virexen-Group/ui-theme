<script setup lang="ts">
import {computed,ref} from 'vue';
import {validateText} from '../../utils/validation';
interface NameValue {first:string;middle:string;last:string}
const props=withDefaults(defineProps<{modelValue:NameValue;includeMiddle?:boolean;middleRequired?:boolean;minLength?:number;maxLength?:number;profanity?:string[]}>(),{includeMiddle:false,middleRequired:false,minLength:1,maxLength:100});
const emit=defineEmits<{'update:modelValue':[value:NameValue];validation:[valid:boolean,error:string]}>();
const touched=ref(false);
function validate(v:NameValue){for(const [key,label,required] of [['first','First name',true],['middle','Middle name',props.includeMiddle&&props.middleRequired],['last','Last name',true]] as const){if(key==='middle'&&!props.includeMiddle)continue;const result=validateText(v[key],{label,required,minLength:props.minLength,maxLength:props.maxLength,profanity:props.profanity});if(!result.valid)return result;}return {valid:true,error:''};}
const result=computed(()=>validate(props.modelValue));
function update(field:keyof NameValue,value:string){const next={...props.modelValue,[field]:value};emit('update:modelValue',next);const res=validate(next);emit('validation',res.valid,res.error)}
</script>
<template><div class="vx-name-grid"><label class="vx-validated-field"><span class="vx-field__label">First name *</span><input class="vx-control" autocomplete="given-name" required :maxlength="maxLength" :value="modelValue.first" @input="update('first',($event.target as HTMLInputElement).value)" @blur="touched=true"/></label><label v-if="includeMiddle" class="vx-validated-field"><span class="vx-field__label">Middle name <span v-if="middleRequired">*</span></span><input class="vx-control" autocomplete="additional-name" :required="middleRequired" :maxlength="maxLength" :value="modelValue.middle" @input="update('middle',($event.target as HTMLInputElement).value)" @blur="touched=true"/></label><label class="vx-validated-field"><span class="vx-field__label">Last name *</span><input class="vx-control" autocomplete="family-name" required :maxlength="maxLength" :value="modelValue.last" @input="update('last',($event.target as HTMLInputElement).value)" @blur="touched=true"/></label><p v-if="touched&&!result.valid" class="vx-validated-error vx-name-grid__error" role="alert">{{result.error}}</p></div></template>
