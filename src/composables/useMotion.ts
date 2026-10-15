import {computed,ref} from 'vue';
export type VMotionIntensity='off'|'subtle'|'normal';
const intensity=ref<VMotionIntensity>('subtle');
export function useMotion(){const reduced=computed(()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);return {intensity,reduced,enabled:computed(()=>intensity.value!=='off'&&!reduced.value),setIntensity:(value:VMotionIntensity)=>{intensity.value=value}}}
