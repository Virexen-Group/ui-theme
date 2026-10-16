<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Undo2, Redo2, Code2, Heading1, Heading2, RemoveFormatting } from '@lucide/vue';
const p=withDefaults(defineProps<{modelValue?:string;label?:string;disabled?:boolean;placeholder?:string;minHeight?:number}>(),{modelValue:'',minHeight:220,placeholder:'Start writing your message…'});
const emit=defineEmits<{'update:modelValue':[value:string]}>();
const area=ref<HTMLDivElement|null>(null);const source=ref(false);const raw=ref(p.modelValue);const active=ref('');
watch(()=>p.modelValue,v=>{if(v!==raw.value){raw.value=v||'';if(area.value&&area.value.innerHTML!==raw.value)area.value.innerHTML=raw.value}});
onMounted(()=>{if(area.value)area.value.innerHTML=raw.value});
function changed(){if(area.value){raw.value=area.value.innerHTML;emit('update:modelValue',raw.value)}}
function command(name:string,value?:string){if(p.disabled)return;area.value?.focus();document.execCommand(name,false,value);changed();}
function addLink(){const url=window.prompt('Enter a link URL (https://...)');if(!url)return;try{const parsed=new URL(url);if(!['https:','http:','mailto:'].includes(parsed.protocol))return;command('createLink',parsed.href)}catch{return}}
function toggleSource(){if(source.value){source.value=false;nextTick(()=>{if(area.value)area.value.innerHTML=raw.value})}else{changed();source.value=true}}
function editSource(e:Event){raw.value=(e.target as HTMLTextAreaElement).value;emit('update:modelValue',raw.value)}
</script>
<template><div class="vx-rte vx-editor"><label v-if="label" class="vx-field__label">{{label}}</label>
<div class="vx-editor__toolbar" role="toolbar" aria-label="Formatting options">
 <div class="vx-editor__tools"><button type="button" title="Bold" aria-label="Bold" :disabled="disabled" @mousedown.prevent @click="command('bold')"><Bold :size="17"/></button><button type="button" title="Italic" aria-label="Italic" :disabled="disabled" @mousedown.prevent @click="command('italic')"><Italic :size="17"/></button><button type="button" title="Underline" aria-label="Underline" :disabled="disabled" @mousedown.prevent @click="command('underline')"><Underline :size="17"/></button></div>
 <div class="vx-editor__tools"><button type="button" title="Heading 1" aria-label="Heading 1" @mousedown.prevent @click="command('formatBlock','H1')"><Heading1 :size="18"/></button><button type="button" title="Heading 2" aria-label="Heading 2" @mousedown.prevent @click="command('formatBlock','H2')"><Heading2 :size="18"/></button></div>
 <div class="vx-editor__tools"><button type="button" title="Bullet list" aria-label="Bullet list" @mousedown.prevent @click="command('insertUnorderedList')"><List :size="18"/></button><button type="button" title="Numbered list" aria-label="Numbered list" @mousedown.prevent @click="command('insertOrderedList')"><ListOrdered :size="18"/></button><button type="button" title="Insert link" aria-label="Insert link" @mousedown.prevent @click="addLink"><Link2 :size="18"/></button></div>
 <div class="vx-editor__tools"><button type="button" title="Undo" aria-label="Undo" @mousedown.prevent @click="command('undo')"><Undo2 :size="18"/></button><button type="button" title="Redo" aria-label="Redo" @mousedown.prevent @click="command('redo')"><Redo2 :size="18"/></button><button type="button" title="Clear formatting" aria-label="Clear formatting" @mousedown.prevent @click="command('removeFormat')"><RemoveFormatting :size="18"/></button></div>
 <button type="button" class="vx-editor__source" :aria-pressed="source" @click="toggleSource"><Code2 :size="16"/> {{source?'Visual':'HTML'}}</button>
</div>
<textarea v-if="source" class="vx-editor__canvas vx-editor__source-area" :style="{minHeight:minHeight+'px'}" :disabled="disabled" :value="raw" @input="editSource" />
<div v-else ref="area" class="vx-editor__canvas vx-editor__body" :style="{minHeight:minHeight+'px'}" :contenteditable="!disabled" role="textbox" aria-multiline="true" :data-placeholder="placeholder" :aria-label="label||'Rich text editor'" @input="changed" />
<div class="vx-editor__bottom"><span>Rich text editor · Format your content above</span><span>{{raw.replace(/<[^>]*>/g,'').trim().length}} characters</span></div>
</div></template>
