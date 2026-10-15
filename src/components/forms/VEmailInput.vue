<script setup lang="ts">
import {computed,ref,watch} from 'vue';
import {validateEmail} from '../../utils/validation';
// Verification provider must be supplied by the consuming application; never call arbitrary public APIs with private email addresses.
const props=withDefaults(defineProps<{modelValue?:string;label?:string;required?:boolean;maxLength?:number;checkEmail?:(email:string)=>Promise<{valid:boolean;reason?:string}>;placeholder?:string}>(),{modelValue:'',label:'Email address',required:false,placeholder:'name@example.com'});
const emit=defineEmits<{'update:modelValue':[value:string];validation:[valid:boolean,error:string]}>();
const touched=ref(false),checking=ref(false),remoteError=ref('');
let requestId=0;
const local=computed(()=>validateEmail(props.modelValue,{required:props.required,maxLength:props.maxLength}));
watch(()=>props.modelValue,()=>{requestId++;remoteError.value='';});
async function verify(){touched.value=true;const localResult=local.value;if(!localResult.valid){emit('validation',false,localResult.error);return;}if(!props.checkEmail||!props.modelValue){emit('validation',true,'');return;}const id=++requestId;checking.value=true;try{const result=await props.checkEmail(props.modelValue.trim());if(id!==requestId)return;remoteError.value=result.valid?'':result.reason||'Email could not be verified.';emit('validation',result.valid,remoteError.value);}catch{if(id!==requestId)return;remoteError.value='Email verification unavailable. Please try again.';emit('validation',false,remoteError.value);}finally{if(id===requestId)checking.value=false;}}
</script>
<template><div class="vx-validated-field"><label class="vx-field__label">{{label}} <span v-if="required" aria-hidden="true">*</span></label><input class="vx-control" type="email" inputmode="email" autocomplete="email" :value="modelValue" :placeholder="placeholder" :required="required" :maxlength="maxLength" :aria-invalid="touched&&(!local.valid||!!remoteError)" @input="emit('update:modelValue',($event.target as HTMLInputElement).value)" @blur="verify"/><p v-if="checking" class="vx-field__hint" role="status">Checking email…</p><p v-else-if="touched&&(!local.valid||remoteError)" class="vx-validated-error" role="alert">{{local.error||remoteError}}</p></div></template>
