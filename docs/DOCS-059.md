# Documentation redesign (v0.5.9)

The sandbox home `/` is now a new documentation landing page, not the old mixed component playground. Each category has a searchable index and live Vue component previews with a code tab and copy button. Sidebar navigation lists exports by category and anchors directly to components.

## Start

```sh
pnpm install
pnpm dev:sandbox
```

Navigate to `/` and select a category. All forms, including smart input and validation exports, live on `/forms.html`. The former detailed forms gallery is retained at `/forms-gallery.html`. Existing specialised demos remain in place.

## Notes

- Component examples show representative props; not every complex component can be demonstrated meaningfully without application data or state.
- `VFileUpload` and `VImageUploader` remain compatibility names for `VFileManager`; they are clearly labelled in the catalogue.
- Browser and typecheck validation require installed dependencies.
- The docs now derive the component inventory from the public `src/index.ts` exports at generation time.
