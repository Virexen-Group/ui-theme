import { reactive } from 'vue';
export type ToastKind = 'success'|'info'|'warning'|'error'|'loading'|'neutral';
export type ToastAppearance = 'standard'|'soft'|'accent';
export interface ToastOptions { title: string; description?:string; duration?:number; persistent?:boolean; appearance?:ToastAppearance; actionLabel?:string; onAction?:()=>void }
export interface ToastItem extends ToastOptions {id:number;kind:ToastKind;created:number}
const items=reactive<ToastItem[]>([]);
let nextId=0;
const timers=new Map<number,ReturnType<typeof setTimeout>>();
function dismiss(id:number){const i=items.findIndex(t=>t.id===id); if(i!==-1) items.splice(i,1);const timer=timers.get(id);if(timer)clearTimeout(timer);timers.delete(id);}
function notify(kind:ToastKind,options:ToastOptions){const id=++nextId;items.push({id,kind,...options,created:Date.now()});const duration=options.duration??(kind==='loading'?0:5000);if(!options.persistent&&duration>0)timers.set(id,setTimeout(()=>dismiss(id),duration));return id;}
export const vToast={items,dismiss,notify,success:(o:ToastOptions)=>notify('success',o),info:(o:ToastOptions)=>notify('info',o),warning:(o:ToastOptions)=>notify('warning',o),error:(o:ToastOptions)=>notify('error',o),loading:(o:ToastOptions)=>notify('loading',o)};
export function useVToast(){return vToast;}
