<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue';
import VButton from '../buttons/VButton.vue';

/**
 * Modal confirmation. Focus starts on Cancel (the safe choice), Tab stays inside the dialog,
 * Escape or the backdrop cancels, and focus returns to whatever opened it.
 */
const props = defineProps<{
  open: boolean; title: string; message?: string; confirmText?: string; cancelText?: string;
  requirePhrase?: string; danger?: boolean; busy?: boolean;
}>();
const emit = defineEmits<{ confirm: []; cancel: [] }>();
const entry = ref('');
const dialog = ref<HTMLElement | null>(null);
const id = useId();
let opener: HTMLElement | null = null;

watch(() => props.open, async (open) => {
  entry.value = '';
  if (open) {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    await nextTick();
    dialog.value?.querySelector<HTMLElement>('[data-vx-dialog-cancel]')?.focus();
  } else {
    opener?.focus?.();
    opener = null;
  }
}, { immediate: true });

function cancel() { if (!props.busy) emit('cancel'); }
function trap(event: KeyboardEvent) {
  if (event.key === 'Escape') { event.preventDefault(); cancel(); return; }
  if (event.key !== 'Tab' || !dialog.value) return;
  const focusable = Array.from(dialog.value.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]'));
  if (!focusable.length) return;
  const first = focusable[0]!, last = focusable[focusable.length - 1]!;
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="vx-dialog-backdrop" @click.self="cancel">
      <section
        ref="dialog"
        class="vx-confirm-dialog"
        :class="{ 'vx-confirm-dialog--danger': danger }"
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="`${id}-title`"
        :aria-describedby="message ? `${id}-message` : undefined"
        @keydown="trap"
      >
        <h2 :id="`${id}-title`">{{ title }}</h2>
        <p v-if="message" :id="`${id}-message`">{{ message }}</p>
        <slot />
        <label v-if="requirePhrase">Type <strong>{{ requirePhrase }}</strong> to confirm<input v-model="entry" class="vx-control" autocomplete="off" /></label>
        <footer>
          <VButton data-vx-dialog-cancel block :disabled="busy" @click="cancel">{{ cancelText || 'Cancel' }}</VButton>
          <VButton
            :variant="danger ? 'danger' : 'primary'"
            block
            :loading="busy"
            :disabled="busy || (Boolean(requirePhrase) && entry !== requirePhrase)"
            @click="emit('confirm')"
          >{{ confirmText || 'Confirm' }}</VButton>
        </footer>
      </section>
    </div>
  </Teleport>
</template>
