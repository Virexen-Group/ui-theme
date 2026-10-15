<script setup lang="ts">
import { computed, ref, watch, useId } from 'vue';
import { AsYouType, getCountryCallingCode, getCountries, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/min';
type CountryOption = { iso: CountryCode; dial: string; name: string; flag: string };
const p = withDefaults(defineProps<{
  modelValue?: string; country?: CountryCode; forceCountry?: CountryCode; forceCode?: string | number;
  label?: string; required?: boolean; disabled?: boolean; id?: string;
  name?: string; countries?: CountryCode[]; placeholder?: string;
}>(), { modelValue: '', country: 'GB', label: 'Phone number', required: false, disabled: false });
const emit = defineEmits<{ 'update:modelValue': [value: string]; 'update:country': [country: CountryCode]; valid: [valid: boolean] }>();
const generatedId = useId();
const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
const flag = (iso: string) => [...iso.toUpperCase()].map(c=>String.fromCodePoint(127397+c.charCodeAt(0))).join('');
const allCountries: CountryOption[] = getCountries().map(iso=>({iso, dial: getCountryCallingCode(iso),name:displayNames.of(iso) || iso,flag:flag(iso)})).sort((a,b)=>a.name.localeCompare(b.name));
const choices = computed(()=>allCountries.filter(x=>!p.countries?.length || p.countries.includes(x.iso)));
const forced = computed(()=>{if(p.forceCountry) return p.forceCountry; if(p.forceCode!==undefined){const digits=String(p.forceCode).replace(/\D/g,'');return choices.value.find(x=>x.dial===digits)?.iso;}return undefined});
const locked = computed(()=>p.forceCountry!==undefined || p.forceCode!==undefined);
const chosen = ref<CountryCode>(p.forceCountry || p.country);
const search=ref(''); const expanded=ref(false); const input=ref<HTMLInputElement|null>(null);
const selected = computed(()=>choices.value.find(c=>c.iso===chosen.value)||allCountries.find(c=>c.iso==='GB')!);
const matches=computed(()=>choices.value.filter(c=>(c.name+' '+c.iso+' +'+c.dial).toLowerCase().includes(search.value.toLowerCase())));
const national=ref('');
const formatted=computed(()=>new AsYouType(chosen.value).input(national.value));
const international=computed(()=>{
 const parsed=parsePhoneNumberFromString(national.value,chosen.value);
 if(parsed?.number) return parsed.number;
 return national.value.replace(/\D/g,'') ? '+'+selected.value.dial+national.value.replace(/\D/g,'').replace(/^0+/, '') : '';
});
const isValid=computed(()=>!!national.value && !!parsePhoneNumberFromString(national.value,chosen.value)?.isValid());
function fromModel(v:string){
 const parsed = parsePhoneNumberFromString(v);
 if(parsed && !locked.value && parsed.country && choices.value.some(c=>c.iso===parsed.country)) chosen.value=parsed.country;
 national.value=parsed?.nationalNumber || v.replace(/\D/g,'');
}
watch(()=>p.modelValue,v=>{if(v!==international.value)fromModel(v||'')},{immediate:true});
watch(forced,v=>{if(v && chosen.value!==v)changeCountry(v)},{immediate:true});
function notify(){emit('update:modelValue',international.value);emit('valid',isValid.value)}
function changeCountry(iso:CountryCode){if(locked.value && iso!==forced.value)return; chosen.value=iso;expanded.value=false;search.value='';emit('update:country',iso);notify()}
function onInput(e:Event){national.value=(e.target as HTMLInputElement).value.replace(/[^0-9]/g,'');notify()}
function closeOnEscape(e:KeyboardEvent){if(e.key==='Escape'){expanded.value=false;input.value?.focus()}}
</script>
<template>
  <div class="vx-phone-field">
    <label v-if="label" :for="id || generatedId" class="vx-field__label">{{label}}<span v-if="required" class="vx-field__required"> *</span></label>
    <div class="vx-phone-field__wrap" :class="{'vx-phone-field__disabled':disabled}">
      <div class="vx-phone-field__country">
        <button type="button" class="vx-phone-field__trigger" :disabled="disabled || locked" :aria-expanded="expanded" aria-label="Select country calling code" aria-haspopup="listbox" @click="expanded=!expanded"><span aria-hidden="true">{{selected.flag}}</span> <span>+{{selected.dial}}</span><span v-if="!locked" aria-hidden="true">⌄</span></button>
        <div v-if="expanded && !locked" class="vx-phone-field__popup" @keydown="closeOnEscape">
          <input v-model="search" class="vx-control" aria-label="Search countries" placeholder="Search country or code" autocomplete="off" />
          <div class="vx-phone-field__options" role="listbox" aria-label="Countries">
            <button v-for="c in matches" :key="c.iso" type="button" role="option" :aria-selected="c.iso===chosen" @click="changeCountry(c.iso)">{{c.flag}} <span>{{c.name}}</span> <strong>+{{c.dial}}</strong></button>
            <p v-if="!matches.length">No countries found.</p>
          </div>
        </div>
      </div>
      <input :id="id || generatedId" ref="input" class="vx-phone-field__number" type="tel" autocomplete="tel-national" inputmode="tel" :name="name" :value="formatted" :placeholder="placeholder || 'Phone number'" :required="required" :disabled="disabled" @input="onInput" />
    </div>
    <span v-if="national" class="vx-phone-field__hint" :class="{'vx-phone-field__hint--invalid':!isValid}">{{isValid?'Valid international number: '+international:'Enter a valid phone number for '+selected.name}}</span>
  </div>
</template>
