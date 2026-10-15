<script setup lang="ts">
import {onBeforeUnmount,ref} from 'vue';
import VFileUpload from './VFileUpload.vue';
const props=withDefaults(defineProps<{crop?:boolean;cropAspectRatio?:number;maxSizeMb?:number;disabled?:boolean}>(),{crop:false,cropAspectRatio:1,maxSizeMb:10,disabled:false});
const emit=defineEmits<{file:[file:File];error:[message:string]}>();
const url=ref('');
function load(files:File[]){const file=files[0];if(!file||!file.type.startsWith('image/'))return;if(url.value)URL.revokeObjectURL(url.value);url.value=URL.createObjectURL(file);emit('file',file)}
onBeforeUnmount(()=>{if(url.value)URL.revokeObjectURL(url.value)});
</script>
<template><div class="vx-image-upload"><VFileUpload image-only :crop="props.crop" :crop-aspect-ratio="props.cropAspectRatio" :max-size-mb="props.maxSizeMb" :disabled="props.disabled" @files="load" @error="emit('error',$event)"/><img v-if="url" :src="url" alt="Selected image preview"/></div></template>
