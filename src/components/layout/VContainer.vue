<script setup lang="ts">
withDefaults(defineProps<{size?:'sm'|'md'|'lg'|'xl'|'full'; fluid?:boolean; as?:string}>(),{size:'xl',fluid:false,as:'div'})
</script>
<template><component :is="as" class="vx-container" :class="[fluid ? 'vx-container-fluid' : `vx-container-${size}`]"><slot/></component></template>
