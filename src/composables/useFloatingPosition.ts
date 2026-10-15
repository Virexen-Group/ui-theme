import { computed, ref } from 'vue';
import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue';
/** Position a floating control, preventing viewport clipping. Attach reference and floating refs. */
export function useFloatingPosition(initialPlacement: Placement = 'bottom-start', distance = 8) {
  const reference = ref<HTMLElement | null>(null);
  const floating = ref<HTMLElement | null>(null);
  const placement = ref<Placement>(initialPlacement);
  const result = useFloating(reference, floating, {
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(distance), flip({ padding: 8 }), shift({ padding: 8 })]
  });
  return { reference, floating, placement, floatingStyles: result.floatingStyles,
    isPositioned: computed(() => Boolean(result.x.value != null && result.y.value != null)) };
}
