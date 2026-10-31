<script setup lang="ts">
withDefaults(defineProps<{name?:string;greeting?:string;description?:string;detail?:string;imageUrl?:string;preset?:'camp'|'lake'|'forest'|'dusk'|'gradient';editable?:boolean}>(),{name:'Welcome',greeting:'Welcome back',preset:'lake',editable:false});
defineEmits<{edit:[]}>();
</script>
<template>
<section class="vx-welcome-banner" :data-preset="preset" aria-label="Personal welcome">
 <img v-if="imageUrl" class="vx-welcome-banner__image" :src="imageUrl" alt="" />
 <div class="vx-welcome-banner__wash" />
 <div class="vx-welcome-banner__copy"><p class="vx-welcome-banner__eyebrow">{{greeting}}</p><h1>{{name}} <span aria-hidden="true">👋</span></h1><p v-if="description" class="vx-welcome-banner__description">{{description}}</p><p v-if="detail" class="vx-welcome-banner__detail">{{detail}}</p><div v-if="editable||$slots.actions" class="vx-welcome-banner__actions"><slot name="actions"><button type="button" class="vx-welcome-banner__edit" @click="$emit('edit')">Edit banner</button></slot></div></div>
 <slot />
</section>
</template>
