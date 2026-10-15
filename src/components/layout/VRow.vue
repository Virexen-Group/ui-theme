<script setup lang="ts">
withDefaults(defineProps<{gap?:number|string; as?:string; align?:'start'|'center'|'end'|'stretch'}>(),{gap:3,as:'div',align:'stretch'})
</script>
<template><component :is="as" class="vx-row" :class="`vx-align-${align}`" :style="{'--vx-row-gap': typeof gap === 'number' ? `${gap * 4}px` : gap}"><slot/></component></template>
