<script setup lang="ts">
withDefaults(defineProps<{gap?:number|string; as?:string; align?:string; justify?:string}>(),{gap:3,as:'div',align:'center',justify:'start'})
</script>
<template><component :is="as" class="vx-flex" :style="{flexDirection:'row',gap:typeof gap === 'number'?`${gap*4}px`:gap,alignItems:align,justifyContent:justify}"><slot/></component></template>
