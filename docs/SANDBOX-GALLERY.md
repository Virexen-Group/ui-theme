# Sandbox gallery pages

Run `pnpm dev:sandbox` and open `http://127.0.0.1:5173/`. All 17 demo links are on the catalogue home.

New preview pages:
- `/dashboard-builder.html` – dashboard grid and editable widgets
- `/data-grid.html` – sorting, search, column visibility, selection, bulk actions
- `/layouts.html` – shell, settings, profile, wizard, drawer, command palette
- `/media.html` – file/image uploads, gallery, progress
- `/feedback.html` – confirmation, destructive phrase, notices, drawers
- `/manifest.html` – illustrative theme and manifest configuration

Preview data is illustrative. No backend is called for saving dashboards, permission checks or actual uploads. The media demo's three placeholder images require network access.

Source: `sandbox/ToolkitDemos.vue`; entry point: `sandbox/toolkit-main.ts`. Individual HTML pages select the appropriate demo based on the pathname. No public component exports are changed.
