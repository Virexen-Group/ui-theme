<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import VIcon from '../icons/VIcon.vue';
import { VIREXEN_DEFAULT_AVATAR_URL } from '../../data/virexen-brand';

/**
 * One row in an account list (account chooser, "accounts on this device").
 * Pass `name`/`email` for an account, or `icon` + `name` for an action row such as "Use another account".
 * Actions in the `actions` slot sit outside the main button, so they are never nested inside it.
 */
const props = withDefaults(defineProps<{
  name: string; email?: string; avatarUrl?: string | null; icon?: string;
  active?: boolean; badge?: string; badgeTone?: 'brand' | 'success' | 'neutral';
  interactive?: boolean; chevron?: boolean; disabled?: boolean; label?: string;
  /** Shown when the photo can't load. Defaults to the Virexen default avatar; null shows initials. */
  fallbackAvatarUrl?: string | null;
}>(), { badgeTone: 'brand', interactive: true, chevron: true, fallbackAvatarUrl: VIREXEN_DEFAULT_AVATAR_URL });
const emit = defineEmits<{ select: [] }>();

const initials = computed(() => props.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() ?? '').join('') || '?');
// A stable colour per name so the same person always gets the same avatar colour.
const hue = computed(() => [...props.name].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) % 360, 7));
// A photo that fails to load falls back to the default avatar, and then to initials.
const failures = ref(0);
watch(() => [props.avatarUrl, props.fallbackAvatarUrl], () => (failures.value = 0));
const photo = computed(() => {
  if (!props.avatarUrl) return null;
  if (failures.value === 0) return props.avatarUrl;
  if (failures.value === 1 && props.fallbackAvatarUrl && props.fallbackAvatarUrl !== props.avatarUrl) return props.fallbackAvatarUrl;
  return null;
});
function select() { if (props.interactive && !props.disabled) emit('select'); }
</script>

<template>
  <div class="vx-account-item" :class="{ 'vx-account-item--active': active, 'vx-account-item--action': icon && !email, 'vx-account-item--static': !interactive }">
    <component
      :is="interactive ? 'button' : 'div'"
      class="vx-account-item__main"
      :type="interactive ? 'button' : undefined"
      :disabled="interactive ? disabled : undefined"
      :aria-label="interactive ? label : undefined"
      @click="select"
    >
      <span v-if="icon" class="vx-account-item__icon" aria-hidden="true"><VIcon :name="icon" :size="22" /></span>
      <span v-else class="vx-account-item__avatar" aria-hidden="true" :style="{ '--vx-avatar-hue': hue }">
        <img v-if="photo" :key="photo" :src="photo" alt="" referrerpolicy="no-referrer" @error="failures++" />
        <template v-else>{{ initials }}</template>
      </span>
      <span class="vx-account-item__text">
        <strong>{{ name }}</strong>
        <small v-if="email">{{ email }}</small>
      </span>
      <span v-if="badge" class="vx-account-item__badge" :data-tone="badgeTone">{{ badge }}</span>
      <VIcon v-if="interactive && chevron" class="vx-account-item__chevron" name="chevron-right" :size="18" />
    </component>
    <div v-if="$slots.actions" class="vx-account-item__actions"><slot name="actions" /></div>
  </div>
</template>
