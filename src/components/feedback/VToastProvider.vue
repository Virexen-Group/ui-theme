<script setup lang="ts">
import { vToast } from '../../composables/useVToast';
import VNotification from './VNotification.vue';
withDefaults(defineProps<{position?:'top-right'|'top-center'|'bottom-right'|'bottom-center'}>(),{position:'top-right'});
</script>
<template>
 <Teleport to="body"><div :class="['vx-toast-stack',`vx-toast-stack--${position}`]" aria-label="Notifications">
  <div v-for="item in vToast.items" :key="item.id" class="vx-toast" :style="{'--vx-toast-duration':`${item.duration??5000}ms`}">
   <VNotification :type="item.kind" :appearance="item.appearance||'accent'" :title="item.title" :description="item.description" :action-label="item.actionLabel" dismissible @dismiss="vToast.dismiss(item.id)" @action="item.onAction?.();vToast.dismiss(item.id)"/>
   <span v-if="!item.persistent&&(item.duration??(item.kind==='loading'?0:5000))>0" class="vx-toast__progress" :style="{'animation-duration':`${item.duration??5000}ms`}"/>
  </div>
 </div></Teleport>
</template>
