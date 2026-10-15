<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';

interface GoogleAddressResult {
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string | null;
  postalCode: string;
  placeId?: string;
  formattedAddress?: string;
}
const props = withDefaults(defineProps<{
  apiKey?: string;
  country?: string;
  placeholder?: string;
  disabled?: boolean;
  language?: string;
}>(), { country: '', placeholder: 'Search for an address', disabled: false });
const emit = defineEmits<{
  selected: [value: GoogleAddressResult];
  error: [message: string];
}>();
const mountPoint = ref<HTMLElement | null>(null);
const loading = ref(false);
const errorMessage = ref('');
let widget: (HTMLElement & { includedRegionCodes?: string[]; placeholder?: string }) | null = null;
let disposed = false;
let currentListener: ((event: Event) => void) | null = null;

// Use one shared Maps JavaScript script across every instance of the component.
declare global {
  interface Window {
    google?: { maps: { importLibrary: (name: string) => Promise<any> } };
    __vxGoogleMapsReady?: () => void;
  }
}
let loadPromise: Promise<void> | null = null;
function loadGoogleMaps(apiKey: string, language?: string): Promise<void> {
  if (window.google?.maps?.importLibrary) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    const params = new URLSearchParams({ key: apiKey, v: 'weekly', libraries: 'places', callback: '__vxGoogleMapsReady' });
    if (language) params.set('language', language);
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    window.__vxGoogleMapsReady = () => { delete window.__vxGoogleMapsReady; resolve(); };
    script.onerror = () => { delete window.__vxGoogleMapsReady; loadPromise = null; reject(new Error('Unable to load Google Maps. Check API key and permitted domains.')); };
    document.head.appendChild(script);
  });
  return loadPromise;
}
function componentValue(parts: any[], type: string, short = false): string {
  const found = parts.find(part => Array.isArray(part.types) && part.types.includes(type));
  return String((short ? found?.shortText : found?.longText) ?? found?.longText ?? '');
}
function mapPlace(place: any): GoogleAddressResult {
  const parts = Array.isArray(place.addressComponents) ? place.addressComponents : [];
  const number = componentValue(parts, 'street_number');
  const street = componentValue(parts, 'route');
  const premise = componentValue(parts, 'premise');
  const subpremise = componentValue(parts, 'subpremise');
  return {
    country: componentValue(parts, 'country', true),
    addressLine1: [number, street].filter(Boolean).join(' ') || premise || componentValue(parts, 'street_address'),
    addressLine2: subpremise,
    city: componentValue(parts, 'postal_town') || componentValue(parts, 'locality') || componentValue(parts, 'sublocality_level_1') || componentValue(parts, 'administrative_area_level_2'),
    region: componentValue(parts, 'administrative_area_level_1', true) || null,
    postalCode: [componentValue(parts, 'postal_code'), componentValue(parts, 'postal_code_suffix')].filter(Boolean).join('-'),
    placeId: place.id,
    formattedAddress: place.formattedAddress
  };
}
async function initialise() {
  if (!props.apiKey || !mountPoint.value) return;
  loading.value = true;
  errorMessage.value = '';
  try {
    await loadGoogleMaps(props.apiKey, props.language);
    const places = await window.google!.maps.importLibrary('places');
    if (disposed || !mountPoint.value) return;
    const Element = places.PlaceAutocompleteElement;
    if (!Element) throw new Error('Places Autocomplete (New) is unavailable for this project.');
    widget = new Element({ includedRegionCodes: props.country ? [props.country.toLowerCase()] : undefined });
    widget!.classList.add('vx-google-address__widget');
    if (props.placeholder) widget!.placeholder = props.placeholder;
    currentListener = async (event: Event) => {
      try {
        const prediction = (event as Event & { placePrediction?: { toPlace(): any } }).placePrediction;
        if (!prediction) return;
        const place = prediction.toPlace();
        await place.fetchFields({ fields: ['addressComponents', 'formattedAddress', 'id'] });
        if (!disposed) emit('selected', mapPlace(place));
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        errorMessage.value = msg; emit('error', msg);
      }
    };
    widget!.addEventListener('gmp-select', currentListener);
    mountPoint.value.replaceChildren(widget!);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    errorMessage.value = msg; emit('error', msg);
  } finally { loading.value = false; }
}
watch(() => props.country, country => {
  if (widget) widget.includedRegionCodes = country ? [country.toLowerCase()] : [];
});
onMounted(initialise);
onBeforeUnmount(() => {
  disposed = true;
  if (widget && currentListener) widget.removeEventListener('gmp-select', currentListener);
  widget = null;
});
</script>

<template>
  <div class="vx-google-address">
    <div v-if="!apiKey" class="vx-google-address__hint">Address search is not configured. Enter your address manually below.</div>
    <template v-else>
      <label class="vx-field__label">Find your address</label>
      <div ref="mountPoint" class="vx-google-address__mount" :aria-busy="loading">
        <span v-if="loading">Loading address search…</span>
      </div>
      <p v-if="errorMessage" class="vx-field__error" role="alert">{{ errorMessage }}. You can still enter your address manually.</p>
      <p class="vx-google-address__hint">Search powered by Google · Review your address below</p>
    </template>
  </div>
</template>
