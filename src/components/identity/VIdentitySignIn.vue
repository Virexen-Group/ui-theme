<script setup lang="ts">
import { computed, ref } from 'vue';
import VIcon from '../icons/VIcon.vue';
import { useVirexenUI } from '../../config/virexen-ui';
const config = useVirexenUI();
const props = withDefaults(defineProps<{
  applicationName?: string; applicationLogo?: string; identityLogo?: string;
  description?: string; identityUrl?: string; loading?: boolean; disabled?: boolean;
  helpUrl?: string; termsUrl?: string; privacyUrl?: string; showFooter?: boolean;
  showCopyright?: boolean; cardMaxWidth?: number;
}>(), { description: 'Continue securely with your Virexen account.', showFooter: true });
const emit = defineEmits<{ signIn: []; help: [] }>();
const attempted = ref(false);
const appName = computed(() => props.applicationName || config.app?.name || 'Virexen');
const logo = computed(() => props.identityLogo || props.applicationLogo || config.branding?.logo);
const cardWidth = computed(() => `${Math.max(280, Math.min(props.cardMaxWidth ?? config.identity?.cardMaxWidth ?? 420, 760))}px`);
const copyright = computed(() => props.showCopyright ?? config.identity?.showCopyright ?? true);
function signIn() { if (props.loading || props.disabled) return; attempted.value = true; emit('signIn'); }
</script>
<template>
  <section class="vx-identity" aria-labelledby="vx-identity-heading" :style="{'--vx-identity-card-width':cardWidth}">
    <div class="vx-identity__group">
      <div class="vx-identity__brand" aria-label="Virexen Identity">
        <img v-if="logo" :src="logo" alt="" class="vx-identity__logo" />
        <div v-else class="vx-identity__logo vx-identity__logo--placeholder"><VIcon name="security" /></div>
        <span class="vx-identity__product">Virexen Identity</span>
      </div>
      <div class="vx-identity__card">
        <h1 id="vx-identity-heading">Sign in to {{ appName }}</h1>
        <p class="vx-identity__description">{{ description }}</p>
        <button class="vx-identity__button" type="button" :disabled="loading || disabled" :aria-busy="loading" @click="signIn">
          <VIcon name="security" size="sm" /> {{ loading ? 'Connecting…' : 'Sign in with Virexen Identity' }}
        </button>
        <slot name="additional-actions" />
        <div v-if="attempted && !loading" class="vx-identity__hint" role="status"><slot name="status" /></div>
        <p class="vx-identity__note">Your sign-in is securely handled by Virexen Identity.</p>
      </div>
      <footer v-if="showFooter" class="vx-identity__footer">
        <nav aria-label="Legal and support links" class="vx-identity__links">
          <a v-if="termsUrl" :href="termsUrl">Terms of Service</a>
          <a v-if="privacyUrl" :href="privacyUrl">Privacy Policy</a>
          <a v-if="helpUrl" :href="helpUrl">Help</a>
        </nav>
        <span v-if="copyright">© {{ new Date().getFullYear() }} Virexen. All rights reserved.</span>
        <span class="vx-identity__powered">Powered by Virexen Identity</span>
      </footer>
    </div>
  </section>
</template>
