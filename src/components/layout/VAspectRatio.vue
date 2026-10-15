<script setup lang="ts">
withDefaults(defineProps<{ratio?:number}>(),{ratio:16/9})
</script>
<template><div class="vx-aspect-ratio" :style="{aspectRatio:String(ratio)}"><slot/></div></template>
