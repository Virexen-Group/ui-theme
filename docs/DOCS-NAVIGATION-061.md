# Virexen UI v0.6.1 — documentation navigation repair

## Fixed
- `/` directly mounts `DocsHome`, not legacy `HomeCatalog`.
- All eight category URLs (`forms`, `navigation`, `data`, `layout`, `feedback`, `commerce`, `foundations`, `media`) mount `DocsCategory` and display the same `DocsShell` sidebar.
- Category **Explore examples** links open `/playground.html?demo=...`, preserving the sidebar and embedding older dedicated demos without rewriting them. Existing standalone demos remain usable for direct bookmarks.
- The sandbox server now uses `strictPort: true`.

## Installation
**Back up or commit your existing repository.** Extract this archive *into your project root*, overwriting matching files; no enclosing `ui-theme/` folder exists. Confirm `sandbox/home-main.ts` imports `DocsHome` and `sandbox/feedback.html` and `sandbox/media.html` use `category-main.ts`.

```
pnpm install
pnpm typecheck
pnpm build
pnpm test
pnpm dev:sandbox
```

Go to `/`, follow each sidebar category and its Explore examples links. The sidebar should remain visible on desktop; on mobile it becomes a Browse components drawer.

## Scope
This fixes entry points and documentation navigation. The old individual playgrounds remain loaded in frames, so their content may still carry its original styling and their own internal links. For a complete single-router docs SPA, migrate the older playgrounds into shared slots in a later release.
