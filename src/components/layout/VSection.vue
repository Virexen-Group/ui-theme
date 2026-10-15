<script setup lang="ts">
withDefaults(defineProps<{spacing?:'sm'|'md'|'lg'; as?:string}>(),{spacing:'md',as:'section'})
</script>
<template><component :is="as" class="vx-section" :class="`vx-section-${spacing}`"><slot/></component></template>
