import {computed,ref,watch} from 'vue';
export interface SavedDashboard {id:string;name:string;order:string[];sizes:Record<string,number>}
/** Named dashboard state. Pass save callback to persist on your backend; localStorage is optional. */
export function useNamedDashboards(initial:SavedDashboard[], storageKey?:string) {
  function load():SavedDashboard[]{ if(!storageKey||typeof localStorage==='undefined')return structuredClone(initial);try{const value=JSON.parse(localStorage.getItem(storageKey)||'null');return Array.isArray(value)&&value.every(v=>typeof v.id==='string'&&Array.isArray(v.order))?value:structuredClone(initial);}catch{return structuredClone(initial)} }
  const dashboards=ref<SavedDashboard[]>(load());
  const activeId=ref(dashboards.value[0]?.id||'');
  const active=computed(()=>dashboards.value.find(d=>d.id===activeId.value));
  watch(dashboards,value=>{if(storageKey&&typeof localStorage!=='undefined')try{localStorage.setItem(storageKey,JSON.stringify(value))}catch{}},{deep:true});
  function add(name:string){const id=`dashboard-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;dashboards.value.push({id,name,order:[],sizes:{}});activeId.value=id;return id;}
  function remove(id:string){dashboards.value=dashboards.value.filter(d=>d.id!==id);if(activeId.value===id)activeId.value=dashboards.value[0]?.id||'';}
  function rename(id:string,name:string){const d=dashboards.value.find(d=>d.id===id);if(d)d.name=name;}
  function save(id:string,layout:{order:string[];sizes:Record<string,number>}){const d=dashboards.value.find(d=>d.id===id);if(d){d.order=[...layout.order];d.sizes={...layout.sizes};}}
  return {dashboards,activeId,active,add,remove,rename,save};
}
