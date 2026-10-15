<script setup lang="ts">
import {computed,ref,watch} from 'vue';
type Row=Record<string,unknown>;
export type TableColumn={key:string;label:string;sortable?:boolean};
const p=withDefaults(defineProps<{rows:Row[];columns:TableColumn[];rowKey?:string;total?:number;pageSize?:number;serverSide?:boolean;loading?:boolean}>(),{rowKey:'id',pageSize:10,serverSide:false,loading:false});
const emit=defineEmits<{request:[params:{page:number;pageSize:number;search:string;sort:string;descending:boolean}];select:[rows:Row[]];rowClick:[row:Row]}>();
const search=ref('');const page=ref(1);const sort=ref('');const descending=ref(false);const visible=ref<string[]>([]);const chosen=ref<string[]>([]);
watch(()=>p.columns,cs=>visible.value=cs.map(c=>c.key),{immediate:true});
function key(row:Row,index:number){return String(row[p.rowKey]??index)}
const filtered=computed(()=>p.serverSide?p.rows:p.rows.filter(row=>Object.values(row).some(v=>String(v??'').toLowerCase().includes(search.value.toLowerCase()))));
const ordered=computed(()=>{if(p.serverSide||!sort.value)return filtered.value;return [...filtered.value].sort((a,b)=>String(a[sort.value]??'').localeCompare(String(b[sort.value]??''),undefined,{numeric:true})*(descending.value?-1:1))});
const pages=computed(()=>Math.max(1,Math.ceil((p.serverSide?(p.total??p.rows.length):ordered.value.length)/p.pageSize)));
const current=computed(()=>p.serverSide?ordered.value:ordered.value.slice((page.value-1)*p.pageSize,page.value*p.pageSize));
const selectedRows=computed(()=>p.rows.filter((r,i)=>chosen.value.includes(key(r,i))));
const allSelected=computed(()=>!!current.value.length && current.value.every((r,i)=>chosen.value.includes(key(r,p.rows.indexOf(r)))));
function request(){emit('request',{page:page.value,pageSize:p.pageSize,search:search.value,sort:sort.value,descending:descending.value})}
function sortBy(c:TableColumn){if(!c.sortable)return;descending.value=sort.value===c.key?!descending.value:false;sort.value=c.key;page.value=1;request()}
function select(r:Row){const k=key(r,p.rows.indexOf(r));chosen.value=chosen.value.includes(k)?chosen.value.filter(x=>x!==k):[...chosen.value,k];emit('select',selectedRows.value)}
function selectAll(){const ids=current.value.map(r=>key(r,p.rows.indexOf(r)));chosen.value=allSelected.value?chosen.value.filter(x=>!ids.includes(x)):[...new Set([...chosen.value,...ids])];emit('select',selectedRows.value)}
</script>
<template><section class="vx-pro-table" aria-label="Data table">
 <div class="vx-pro-table__toolbar"><div class="vx-pro-table__search"><span aria-hidden="true">⌕</span><input v-model="search" type="search" placeholder="Search records…" aria-label="Search records" @input="page=1;request()"/></div><details class="vx-pro-table__columns"><summary>Columns ▾</summary><div><label v-for="c in columns" :key="c.key"><input v-model="visible" type="checkbox" :value="c.key"/> {{c.label}}</label></div></details></div>
 <div v-if="chosen.length" class="vx-pro-table__selected">{{chosen.length}} selected <button type="button" @click="chosen=[];emit('select',[])">Clear</button></div>
 <div class="vx-pro-table__scroll"><table><thead><tr><th><input type="checkbox" aria-label="Select all rows on this page" :checked="allSelected" @change="selectAll"/></th><th v-for="c in columns.filter(x=>visible.includes(x.key))" :key="c.key" scope="col"><button type="button" :disabled="!c.sortable" :aria-sort="sort===c.key?(descending?'descending':'ascending'):undefined" @click="sortBy(c)">{{c.label}}<span v-if="sort===c.key"> {{descending?'↓':'↑'}}</span><span v-else-if="c.sortable" class="vx-pro-table__sort"> ⇅</span></button></th></tr></thead><tbody><tr v-for="(r,i) in current" :key="key(r,p.rows.indexOf(r))" @click="emit('rowClick',r)"><td><input type="checkbox" :aria-label="'Select row '+(i+1)" :checked="chosen.includes(key(r,p.rows.indexOf(r)))" @click.stop @change="select(r)"/></td><td v-for="c in columns.filter(x=>visible.includes(x.key))" :key="c.key" :data-label="c.label"><slot :name="'cell-'+c.key" :row="r" :value="r[c.key]">{{r[c.key]}}</slot></td></tr><tr v-if="!current.length"><td :colspan="visible.length+1">{{loading?'Loading…':'No matching records'}}</td></tr></tbody></table></div>
 <footer class="vx-pro-table__footer"><span>{{filtered.length?((page-1)*pageSize+1):0}}–{{Math.min(page*pageSize,serverSide?(total??rows.length):filtered.length)}} of {{serverSide?(total??rows.length):filtered.length}}</span><div><button type="button" :disabled="page<=1" @click="page--;request()">← Previous</button><span>Page {{page}} of {{pages}}</span><button type="button" :disabled="page>=pages" @click="page++;request()">Next →</button></div></footer>
 </section></template>