<script setup lang="ts">
import { computed, ref } from 'vue';
import VIcon from '../icons/VIcon.vue';
const props = withDefaults(defineProps<{
  type?: 'success'|'info'|'warning'|'error'|'neutral'|'loading'; title?:string; description?:string;
  appearance?:'standard'|'soft'|'accent'; dismissible?:boolean; compact?:boolean;
  actionLabel?:string; secondaryActionLabel?:string;
}>(), {type:'info',appearance:'soft'});
const emit=defineEmits<{dismiss:[];action:[];secondaryAction:[]}>();
const visible=ref(true);
const icon=computed(()=>({success:'check',info:'help',warning:'support',error:'shield',neutral:'notifications',loading:'activity'})[props.type]);
function dismiss(){visible.value=false;emit('dismiss');}
</script>
<template>
 <section v-if="visible" :class="['vx-notification',`vx-notification--${type}`,`vx-notification--${appearance}`,{'vx-notification--compact':compact}]" :role="type==='error'?'alert':'status'">
  <VIcon class="vx-notification__icon" :name="icon" size="sm"/>
  <div class="vx-notification__body"><strong v-if="title">{{title}}</strong><span v-if="description">{{description}}</span><slot/></div>
  <div class="vx-notification__actions"><button v-if="actionLabel" type="button" @click="emit('action')">{{actionLabel}}</button><button v-if="secondaryActionLabel" type="button" @click="emit('secondaryAction')">{{secondaryActionLabel}}</button></div>
  <button v-if="dismissible" class="vx-notification__dismiss" type="button" aria-label="Dismiss notification" @click="dismiss">×</button>
 </section>
</template>
