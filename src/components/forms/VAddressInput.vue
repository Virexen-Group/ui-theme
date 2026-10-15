<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import VCountrySelect from './VCountrySelect.vue';
import VGoogleAddressAutocomplete from './VGoogleAddressAutocomplete.vue';
import VRegionSelect from './VRegionSelect.vue';
import VPostalCodeInput from './VPostalCodeInput.vue';
import { getAddressRules } from '../../utils/postal';
import { regionsByCountry } from '../../data/smart-options';

interface VAddressValue {
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string | null;
  postalCode: string;
  company?: string;
}

const props = withDefaults(defineProps<{
  modelValue: VAddressValue;
  defaultCountry?: string;
  forceCountry?: string;
  required?: boolean;
  showCompany?: boolean;
  showAddressLine2?: boolean;
  autocompleteProvider?: 'none' | 'google';
  googleApiKey?: string;
  googleLanguage?: string;
}>(), {
  defaultCountry: 'GB',
  required: false,
  showAddressLine2: true,
  autocompleteProvider: 'none',
  googleApiKey: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: VAddressValue];
}>();

const manualOpen = ref(props.autocompleteProvider !== 'google');
const country = computed(() => props.forceCountry || props.modelValue.country || props.defaultCountry);
const rules = computed(() => getAddressRules(country.value));
const regions = computed(() => regionsByCountry[country.value] || []);
const searchEnabled = computed(() => props.autocompleteProvider === 'google' && Boolean(props.googleApiKey));
const showFields = computed(() => !searchEnabled.value || manualOpen.value);

function update(key: keyof VAddressValue, value: string | null) {
  if (key === 'country' && props.forceCountry) return;
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
    ...(key === 'country' ? { region: null, postalCode: '' } : {})
  });
}
function applyGoogleAddress(value: Partial<VAddressValue>) {
  emit('update:modelValue', {
    ...props.modelValue,
    country: props.forceCountry || value.country || country.value,
    addressLine1: value.addressLine1 ?? '',
    addressLine2: value.addressLine2 ?? '',
    city: value.city ?? '',
    region: value.region ?? null,
    postalCode: value.postalCode ?? ''
  });
  manualOpen.value = true; // Show populated fields for confirmation and corrections.
}
watch(() => props.forceCountry, forced => {
  if (forced && props.modelValue.country !== forced) {
    emit('update:modelValue', { ...props.modelValue, country: forced, region: null, postalCode: '' });
  }
}, { immediate: true });
watch(() => props.autocompleteProvider, provider => {
  if (provider === 'none') manualOpen.value = true;
});
</script>

<template>
  <div class="vx-address-grid">
    <div class="vx-address-wide vx-field">
      <label class="vx-field__label">Country <span v-if="required" class="vx-field__required">*</span></label>
      <VCountrySelect
        :model-value="country"
        :disabled="Boolean(forceCountry)"
        @update:model-value="update('country', $event)"
      />
    </div>

    <div v-if="autocompleteProvider === 'google'" class="vx-address-wide vx-field">
      <VGoogleAddressAutocomplete
        v-if="googleApiKey"
        :api-key="googleApiKey"
        :country="country"
        :language="googleLanguage"
        @selected="applyGoogleAddress"
      />
      <p v-else class="vx-field__hint" role="status">Address search is not configured. Please enter your address manually.</p>
      <button
        v-if="searchEnabled && !manualOpen"
        type="button"
        class="vx-address__manual-link"
        @click="manualOpen = true"
      >Enter address manually</button>
      <button
        v-else-if="searchEnabled && manualOpen"
        type="button"
        class="vx-address__manual-link"
        @click="manualOpen = false"
      >Hide manual address fields</button>
    </div>

    <template v-if="showFields">
      <div v-if="showCompany" class="vx-address-wide vx-field">
        <label class="vx-field__label">Company</label>
        <input class="vx-control" :value="modelValue.company || ''" autocomplete="organization" @input="update('company', ($event.target as HTMLInputElement).value)" />
      </div>
      <div class="vx-address-wide vx-field">
        <label class="vx-field__label">Address line 1 <span v-if="required" class="vx-field__required">*</span></label>
        <input class="vx-control" autocomplete="address-line1" :required="required" :value="modelValue.addressLine1" @input="update('addressLine1', ($event.target as HTMLInputElement).value)" />
      </div>
      <div v-if="showAddressLine2" class="vx-address-wide vx-field">
        <label class="vx-field__label">Address line 2</label>
        <input class="vx-control" autocomplete="address-line2" :value="modelValue.addressLine2" @input="update('addressLine2', ($event.target as HTMLInputElement).value)" />
      </div>
      <div class="vx-field">
        <label class="vx-field__label">{{ country === 'GB' ? 'Town / City' : 'City' }} <span v-if="required" class="vx-field__required">*</span></label>
        <input class="vx-control" autocomplete="address-level2" :required="required" :value="modelValue.city" @input="update('city', ($event.target as HTMLInputElement).value)" />
      </div>
      <VPostalCodeInput :model-value="modelValue.postalCode" :country="country" :required="required" @update:model-value="update('postalCode', $event)" />
      <div v-if="rules.regionRequired || regions.length || modelValue.region" class="vx-address-wide vx-field">
        <label class="vx-field__label">{{ rules.regionLabel || 'Region' }} <span v-if="rules.regionRequired" class="vx-field__required">*</span></label>
        <VRegionSelect v-if="regions.length" :model-value="modelValue.region" :country="country" @update:model-value="update('region', $event)" />
        <input v-else class="vx-control" :value="modelValue.region || ''" autocomplete="address-level1" :required="rules.regionRequired" @input="update('region', ($event.target as HTMLInputElement).value)" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.vx-address__manual-link {
  display: inline-flex;
  align-self: start;
  width: fit-content;
  min-height: 44px;
  align-items: center;
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: var(--vx-primary, #1fb5ab);
  font: inherit;
  font-size: .9rem;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.vx-address__manual-link:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
</style>
