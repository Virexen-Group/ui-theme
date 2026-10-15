import { ref, watch, type Ref } from 'vue';
/** Save widget ordering and visibility. Unknown/duplicate IDs are discarded; new widgets are added automatically. */
export function useDashboardLayout(initial: string[], storageKey?: string): {
  layout: Ref<string[]>; move: (id: string, to: number) => void; add: (id: string) => void; remove: (id: string) => void; reset: () => void;
} {
  const load = () => {
    if (!storageKey || typeof localStorage === 'undefined') return [...initial];
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!Array.isArray(stored)) return [...initial];
      return [...new Set(stored.filter((id: unknown): id is string => typeof id === 'string' && initial.includes(id)))];
    } catch { return [...initial]; }
  };
  const layout = ref<string[]>(load());
  watch(layout, value => {
    if (storageKey && typeof localStorage !== 'undefined') {
      try { localStorage.setItem(storageKey, JSON.stringify(value)); } catch { /* storage unavailable */ }
    }
  }, { deep: true });
  return {
    layout,
    move(id, to) { const next = [...layout.value]; const from = next.indexOf(id); if (from < 0 || to < 0 || to >= next.length) return; next.splice(from,1); next.splice(to,0,id); layout.value = next; },
    add(id) { if (initial.includes(id) && !layout.value.includes(id)) layout.value = [...layout.value,id]; },
    remove(id) { layout.value = layout.value.filter(item => item !== id); },
    reset() { layout.value = [...initial]; }
  };
}
