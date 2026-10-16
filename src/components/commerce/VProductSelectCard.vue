<script setup lang="ts">
import {computed} from 'vue';
import VIcon from '../icons/VIcon.vue';
const props=withDefaults(defineProps<{title:string;description?:string;price?:number;currency?:string;image?:string;modelValue?:boolean;disabled?:boolean;badge?:string;features?:string[];icon?:string;selectionType?:'checkbox'|'radio';}>(),{currency:'USD',features:()=>[],selectionType:'checkbox'});
const emit=defineEmits<{'update:modelValue':[value:boolean]}>();
const formatted=computed(()=>new Intl.NumberFormat(undefined,{style:'currency',currency:props.currency}).format(props.price??0));
</script>
<template><label class="vx-commerce-product" :class="{'is-selected':modelValue,'is-disabled':disabled}">
<input class="vx-commerce-product__check" :type="selectionType" :checked="modelValue" :disabled="disabled" @change="emit('update:modelValue',($event.target as HTMLInputElement).checked)"/>
<span class="vx-commerce-product__art"><img v-if="image" :src="image" :alt="title"/><VIcon v-else :name="icon||'package'" :size="29"/></span>
<span class="vx-commerce-product__details"><span class="vx-commerce-product__headline"><strong>{{title}}</strong><span v-if="badge" class="vx-commerce-chip">★ {{badge}}</span></span><span v-if="description" class="vx-commerce-muted">{{description}}</span><span v-for="(feature,i) in features" :key="i" class="vx-commerce-product__feature"><VIcon name="check-circle" :size="17"/> {{feature}}</span></span>
<strong v-if="price!==undefined" class="vx-commerce-product__price">{{formatted}}</strong>
</label></template>
<style src="./commerce-widgets.css"></style>
