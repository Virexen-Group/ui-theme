# Virexen UI — File uploader update (v0.5.4)

`VFileUpload` now uses the **same dashed drop zone + thumbnail tile styling** as `VFileManager` on `/roadmap.html`, with the same rounded preview cards and remove actions. It retains `@files` and `@error` and the existing `accept`, `multiple`, `maxSizeMb`, and `disabled` props.

## General files

```vue
<script setup lang="ts">
import VFileUpload from '@virexen-group/ui-theme/vue/file-upload';
const processFiles = (files: File[]) => { /* send files to your backend */ };
</script>
<template>
  <VFileUpload multiple accept=".pdf,.docx,image/*" :max-size-mb="10" @files="processFiles" @error="console.error" />
</template>
```

## Image-only with crop popup

```vue
<VFileUpload image-only crop :crop-aspect-ratio="1" @files="handleImages" />
```

`image-only` filters to MIME `image/*` and blocks dropped non-image files. Enabling `crop` automatically enables image-only validation, and opens a dialog for each selected image. The user adjusts zoom and horizontal/vertical position, then confirms the crop. The resulting **new File** is emitted to `@files`, ready for upload. Default output is PNG. Set `crop-output-type="image/jpeg"` and `:crop-quality="0.9"` to output JPEG. `crop-aspect-ratio` defaults to 1 (square); `4/3` makes a 4:3 crop. Crop relies on browser Canvas APIs; do not use untrusted remote images without CORS permission.

`@files` is emitted with **newly added files** for multiple uploads; removal emits the current selected array. `@cropped` emits each cropped File, and `@cancelled` fires when the crop dialog is dismissed. Files are not uploaded automatically.

For simpler single-image uploads:

```vue
<VImageUploader crop :crop-aspect-ratio="1" @file="saveAvatar" @error="handleError" />
```

A full media preview / try-it panel is available at `http://127.0.0.1:5173/media.html`. The original `VFileManager` remains unchanged on `roadmap.html`.

## Integration notes

- Import the existing `components.css` stylesheet and `roadmap.css` (for the original FileManager-aligned styles).
- Backend must validate file bytes, limits, image type and malware independently of UI checks.
- Existing `VFileUpload` imports and events are retained; component visuals are updated.
- The crop dialog requires a modern browser (Canvas, `File`, `Blob`, `URL.createObjectURL`).
