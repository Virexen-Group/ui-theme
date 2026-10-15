<script setup lang="ts">
import { ref } from 'vue';
import VIdentitySignIn from '../src/components/identity/VIdentitySignIn.vue';
import VThemeToggle from '../src/components/layout/VThemeToggle.vue';
const message = ref('');
function signIn() { message.value = 'Demo only — your app must start the authorised Virexen Identity OIDC flow.'; }
import SandboxNav from './SandboxNav.vue';
</script>
<template>
<SandboxNav/>
  <div class="vx-identity-demo-switch"><VThemeToggle /></div>
  <VIdentitySignIn application-name="CampPulze" description="Sign in securely to continue to CampPulze." terms-url="#terms" privacy-url="#privacy" help-url="#help" @sign-in="signIn">
    <template #status>{{ message }}</template>
  </VIdentitySignIn>
</template>
<style scoped>.vx-identity-demo-switch {position:fixed;top:12px;right:12px;z-index:3}</style>
