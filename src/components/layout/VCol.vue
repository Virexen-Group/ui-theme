<script setup lang="ts">
withDefaults(defineProps<{xs?:number; sm?:number; md?:number; lg?:number; xl?:number; offset?:number; as?:string}>(),{xs:12,as:'div'})
</script>
<template><component :is="as" class="vx-col" :class="[`vx-col-${xs}`,sm && `vx-col-sm-${sm}`,md && `vx-col-md-${md}`,lg && `vx-col-lg-${lg}`,xl && `vx-col-xl-${xl}`,offset !== undefined && `vx-offset-${offset}`]"><slot/></component></template>
