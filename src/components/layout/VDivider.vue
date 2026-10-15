<script setup lang="ts">
withDefaults(defineProps<{vertical?:boolean; decorative?:boolean}>(),{vertical:false,decorative:false})
</script>
<template><hr class="vx-divider" :class="{'vx-divider-vertical':vertical}" :role="decorative?'none':'separator'"/></template>
