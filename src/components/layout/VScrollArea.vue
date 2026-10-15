<script setup lang="ts">
withDefaults(defineProps<{maxHeight?:string; as?:string}>(),{maxHeight:'400px',as:'div'})
</script>
<template><component :is="as" class="vx-scroll-area" :style="{maxHeight}"><slot/></component></template>
