# Bold is the default Virexen UI preset

The default manifest now uses `theme.preset = "bold"`. The sandbox manifest and initial preset selectors also use Bold. All other presets (`default`, `calm`, `enterprise`) remain available. Existing application manifests which explicitly select another preset are **not** overridden.

## Use Bold automatically

```ts
import { createVirexenUI } from '@virexen-group/ui-theme/vue';
app.use(createVirexenUI());
```

## Explicit application choice

```ts
app.use(createVirexenUI({ theme: { preset: 'bold', appearance: 'system' } }));
```

## Branding note

The remote logo SVG/PNG could not be fetched for direct colour extraction in this environment, so the existing Bold palette is preserved and **not claimed to match sampled logo pixels**. Bold currently has main action colour `#193B9F` and hover `#10296E`. The provisional teal brand palette in `src/data/virexen-brand.ts` is unchanged; accurate sampling needs the original SVG or PNG.

To test: `pnpm typecheck && pnpm build && pnpm dev:sandbox` and open `/manifest.html` and `/buttons.html`.
