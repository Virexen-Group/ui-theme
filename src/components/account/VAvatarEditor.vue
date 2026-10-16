<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import VIcon from '../icons/VIcon.vue';
const props=withDefaults(defineProps<{
  src?:string; modelValue?:string; size?:number; borderRadius?:string|number;
  crop?:boolean; cropAspectRatio?:number; maxSizeMb?:number; accept?:string;
  disabled?:boolean; label?:string; buttonLabel?:string;
}>(),{size:144,borderRadius:'50%',crop:true,cropAspectRatio:1,maxSizeMb:10,accept:'image/*',label:'Edit avatar',buttonLabel:'Done'});
const emit=defineEmits<{file:[file:File];change:[file:File];'update:modelValue':[url:string];cancel:[];error:[message:string]}>();
const fileInput=ref<HTMLInputElement>(); const editing=ref(false); const pending=ref<File|null>(null);
const draftUrl=ref('');const committedUrl=ref('');const zoom=ref(1);const horizontal=ref(50);const vertical=ref(50);const busy=ref(false);
const displayUrl=computed(()=>committedUrl.value||props.modelValue||props.src||'');
const radius=computed(()=>typeof props.borderRadius==='number'?props.borderRadius+'px':props.borderRadius);
function cleanup(){if(draftUrl.value){URL.revokeObjectURL(draftUrl.value);draftUrl.value='';}}
onBeforeUnmount(()=>{cleanup();if(committedUrl.value)URL.revokeObjectURL(committedUrl.value)});
function choose(){if(!props.disabled)fileInput.value?.click()}
function onPicked(e:Event){const input=e.target as HTMLInputElement;const file=input.files?.[0];input.value='';if(!file)return;
 if(!file.type.startsWith('image/')){emit('error','Please choose an image file.');return}
 if(file.size>props.maxSizeMb*1024*1024){emit('error',`Image must be under ${props.maxSizeMb} MB.`);return}
 cleanup();pending.value=file;draftUrl.value=URL.createObjectURL(file);zoom.value=1;horizontal.value=50;vertical.value=50;editing.value=true;
}
function cancel(){editing.value=false;pending.value=null;cleanup();emit('cancel')}
async function produceCrop():Promise<File>{const f=pending.value!;if(!props.crop)return f;
 const picture=new Image();picture.src=draftUrl.value;await picture.decode();
 const ratio=Math.max(.1,props.cropAspectRatio);const width=ratio>=1?640:Math.round(640*ratio);const height=ratio>=1?Math.round(640/ratio):640;
 const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
 const baseScale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight)*zoom.value;
 const w=picture.naturalWidth*baseScale,h=picture.naturalHeight*baseScale;
 const x=(width-w)*(horizontal.value/100),y=(height-h)*(vertical.value/100);
 ctx.drawImage(picture,x,y,w,h);
 const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Could not crop image')),'image/png'));
 return new File([blob],(f.name.replace(/\.[^.]+$/,'')||'avatar')+'-cropped.png',{type:'image/png'});
}
async function done(){if(!pending.value||busy.value)return;busy.value=true;try{
 const output=await produceCrop();const newUrl=URL.createObjectURL(output);if(committedUrl.value)URL.revokeObjectURL(committedUrl.value);
 committedUrl.value=newUrl;emit('file',output);emit('change',output);emit('update:modelValue',newUrl);editing.value=false;pending.value=null;cleanup();
 }catch(e){emit('error',e instanceof Error?e.message:'Could not prepare avatar')}finally{busy.value=false}}
</script>
<template>
  <div class="vx-avatar-control" :style="{'--vx-avatar-size':size+'px','--vx-avatar-radius':radius}">
    <button type="button" class="vx-avatar-control__button" :disabled="disabled" :aria-label="label" @click="choose">
      <img v-if="displayUrl" :src="displayUrl" alt="Current avatar" class="vx-avatar-control__image" />
      <span v-else class="vx-avatar-control__empty"><VIcon name="user" :size="Math.max(28,size*.35)"/></span>
      <span class="vx-avatar-control__overlay"><VIcon name="upload" size="lg"/><span>{{label}}</span></span>
    </button>
    <input ref="fileInput" type="file" :accept="accept" hidden @change="onPicked" />
    <Teleport to="body"><div v-if="editing" class="vx-avatar-modal-backdrop" @click.self="cancel" @keydown.esc="cancel">
      <section class="vx-avatar-modal" role="dialog" aria-modal="true" aria-label="Edit avatar">
        <div class="vx-avatar-modal__heading"><h2>Edit avatar</h2><button type="button" aria-label="Close" @click="cancel">×</button></div>
        <div class="vx-avatar-modal__view" :style="{'--vx-avatar-preview-ratio':String(cropAspectRatio)}">
          <div class="vx-avatar-modal__crop" :style="{borderRadius:radius}">
            <img :src="draftUrl" alt="Avatar crop preview" :style="{transform:`translate(${(horizontal-50)*-0.65}%, ${(vertical-50)*-0.65}%) scale(${zoom})`}" />
          </div>
        </div>
        <div v-if="crop" class="vx-avatar-modal__controls">
          <label>Zoom <input v-model.number="zoom" type="range" min="1" max="3" step="0.05" /></label>
          <label>Horizontal <input v-model.number="horizontal" type="range" min="0" max="100" /></label>
          <label>Vertical <input v-model.number="vertical" type="range" min="0" max="100" /></label>
        </div>
        <div class="vx-avatar-modal__footer"><button type="button" @click="cancel">Cancel</button><button type="button" class="vx-avatar-modal__done" :disabled="busy" @click="done">{{busy?'Preparing…':buttonLabel}}</button></div>
      </section>
    </div></Teleport>
  </div>
</template>

<style scoped>
.vx-avatar-control{display:inline-block;vertical-align:middle;line-height:0}.vx-avatar-control__button{position:relative;display:block;width:var(--vx-avatar-size);height:var(--vx-avatar-size);padding:0;border:2px solid var(--vx-border,#d8e2ef);border-radius:var(--vx-avatar-radius);overflow:hidden;cursor:pointer;background:var(--vx-input,#eef3fa);color:var(--vx-text,#18304a)}
.vx-avatar-control__image,.vx-avatar-control__empty{display:flex;align-items:center;justify-content:center;width:100%;height:100%;object-fit:cover}.vx-avatar-control__overlay{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;justify-content:center;align-items:center;background:rgba(11,20,35,.6);color:#fff;font-size:12px;line-height:1.3;opacity:0;transition:opacity .2s}.vx-avatar-control__button:is(:hover,:focus-visible) .vx-avatar-control__overlay{opacity:1}.vx-avatar-control__button:focus-visible{outline:3px solid var(--vx-primary,#193b9f);outline-offset:3px}
.vx-avatar-modal-backdrop{position:fixed;inset:0;z-index:10050;display:grid;place-items:center;padding:20px;background:#0b1425ac}.vx-avatar-modal{width:min(440px,100%);max-height:92dvh;overflow-y:auto;background:var(--vx-surface,#fff);color:var(--vx-text,#16253a);border:1px solid var(--vx-border,#dce4ef);border-radius:20px;padding:22px;box-shadow:0 25px 65px #0004;line-height:1.5}.vx-avatar-modal__heading,.vx-avatar-modal__footer{display:flex;align-items:center;justify-content:space-between;gap:14px}.vx-avatar-modal__heading h2{font-size:18px;margin:0}.vx-avatar-modal__heading button{border:0;background:transparent;color:inherit;font-size:24px;cursor:pointer}.vx-avatar-modal__view{display:grid;place-items:center;padding:20px 0}.vx-avatar-modal__crop{width:240px;height:240px;overflow:hidden;border:2px solid var(--vx-primary,#193b9f);background:var(--vx-input,#edf2fa)}.vx-avatar-modal__crop img{width:100%;height:100%;object-fit:cover}.vx-avatar-modal__controls{display:grid;gap:12px;margin-bottom:18px}.vx-avatar-modal__controls label{display:grid;gap:3px;font-size:13px}.vx-avatar-modal__controls input{width:100%;accent-color:var(--vx-primary,#193b9f)}.vx-avatar-modal__footer button{border:1px solid var(--vx-border,#cbd5e1);border-radius:10px;background:transparent;color:inherit;padding:11px 18px;font:inherit;cursor:pointer}.vx-avatar-modal__footer .vx-avatar-modal__done{background:var(--vx-primary,#193b9f);color:white;border-color:transparent}
@media(prefers-reduced-motion:reduce){.vx-avatar-control__overlay{transition:none}}
</style>
