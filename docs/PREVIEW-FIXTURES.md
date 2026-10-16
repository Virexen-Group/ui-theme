# Live previews

Every exported catalogue entry is now mounted in its own `DocsPreviewBoundary` with sample props from `sandbox/preview-fixtures.ts`. Complex overlays expose an Open preview control. Widget slots receive demo content. Runtime exceptions are contained per example so the entire category page remains usable.

When adding a new component, add accurate sample props and slots to the fixture registry, and add a browser smoke test. These previews use illustrative data and are not substitutes for full product integrations.
