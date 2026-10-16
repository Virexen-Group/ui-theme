<script setup lang="ts">import VCommerceWidget from './VCommerceWidget.vue';
const props=defineProps<{title?:string;description?:string;items?:Array<{id?:string;label?:string;description?:string;price?:number;quantity?:number;icon?:string}> ;amount?:number;currency?:string;total?:number;discount?:number;tax?:number;percentage?:number;plan?:string;status?:string;modelValue?:string|number|string[];image?:string}>();
const emit=defineEmits<{'update:modelValue':[value:string|number|string[]];select:[id:string];action:[id:string]}>();
</script><template><VCommerceWidget v-bind="props" kind="VDiscountBadge" @update:model-value="emit('update:modelValue',$event)" @select="emit('select',$event)" @action="emit('action',$event)"/></template>
