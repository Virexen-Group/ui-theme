<script setup lang="ts">
import {onErrorCaptured, ref, watch} from 'vue';
const props=defineProps<{name:string}>();
const error=ref('');
watch(()=>props.name,()=>{error.value=''});
onErrorCaptured((cause)=>{error.value=cause instanceof Error?cause.message:String(cause);return false;});
</script>
<template><div class="vx-preview-boundary"><div v-if="error" role="alert" class="vx-docs-preview-error"><strong>Preview error in {{name}}</strong><p>{{error}}</p><button type="button" @click="error=''">Retry preview</button></div><slot v-else /></div></template>
