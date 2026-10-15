# Unified file uploader — v0.5.6

`VFileManager` is the canonical uploader, using the original `roadmap.html` drop zone and tiles. `VFileUpload` remains an alias for existing apps. `VImageUploader` is a compatibility wrapper (not another uploader implementation).

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VFileManager } from '@virexen-group/ui-theme/vue';
const files = ref<File[]>([]);
</script>
<template>
  <VFileManager v-model="files" multiple :max-size-mb="10" />
  <VFileManager image-only crop :crop-aspect-ratio="1" @files="handleImages" />
</template>
```

## Props

- `modelValue?: File[]` — `v-model` file list
- `accept?: string` — MIME types or extensions
- `multiple?: boolean` — defaults false (old `VFileManager` defaulted true, so set explicitly when upgrading)
- `maxSizeMb?: number` — default 10
- `maxSize?: number` — legacy limit in **bytes**, overrides `maxSizeMb`
- `imageOnly?: boolean` — restrict MIME to images
- `crop?: boolean` — opens a cropping dialog before accepting an image, implies image-only
- `cropAspectRatio?: number` — default 1
- `cropOutputType?: 'image/png' | 'image/jpeg' | 'image/webp'`
- `cropQuality?: number` — default 0.92
- `disabled?: boolean`

## Events
`update:modelValue` emits the full selected file list; `files` maintains the legacy upload event (added files for multi-select; whole list after removal); `error`, `cropped`, `cancelled`.

All props above are Vue props (`:image-only`, `:crop`). DOM `data-*` attributes are not used for runtime behavioural configuration. The browser `accept` attribute alone is not trusted: the component also validates files. Server-side validation is still essential.

## Consolidation audit
- `VFileManager`: canonical functionality + scoped original design
- `VFileUpload`: compatibility re-export, no independent UI
- `VImageUploader`: thin compatibility wrapper of same uploader, still shows an extra image preview
- `VUploadProgress`, `VMediaGallery`, `VDocumentViewer`: separate **different-purpose** components and intentionally retained

## Tests
`pnpm typecheck && pnpm build && pnpm test && pnpm dev:sandbox` and open `/roadmap.html` and `/media.html`.
