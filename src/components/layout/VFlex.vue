<script setup lang="ts">
withDefaults(defineProps<{direction?:'row'|'column'; gap?:number|string; wrap?:boolean; align?:string; justify?:string; as?:string}>(),{direction:'row',gap:3,wrap:false,align:'stretch',justify:'start',as:'div'})
</script>
<template><component :is="as" class="vx-flex" :style="{flexDirection:direction,gap:typeof gap === 'number'?`${gap*4}px`:gap,flexWrap:wrap?'wrap':'nowrap',alignItems:align,justifyContent:justify}"><slot/></component></template>
