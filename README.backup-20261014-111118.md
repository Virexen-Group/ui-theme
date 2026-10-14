# Virexen UI — Form Workflow extension

## Installation
Copy `src/components/forms/VFormWorkflow.vue`, `src/components/forms/workflow.types.ts` and `src/styles/workflow.css` into the matching paths in your `ui-theme` repo. Copy `sandbox/FormWorkflowExample.vue` into your sandbox folder if desired.

Add to `src/index.ts`:

```ts
export { default as VFormWorkflow } from './components/forms/VFormWorkflow.vue';
export type { WorkflowSection, WorkflowField, FormValues } from './components/forms/workflow.types';
```

In `scripts/build-assets.mjs`, copy `src/styles/workflow.css` into `dist/workflow.css` (or merge it into `src/styles/components.css`). If keeping separate, add to package.json `exports`:

```json
"./workflow.css": "./dist/workflow.css"
```

Then consuming apps import `@virexen-group/ui-theme/workflow.css` and `VFormWorkflow` from `@virexen-group/ui-theme/vue`.

For the sandbox, add `FormWorkflowExample` to the sandbox's App.vue or route it from the component catalogue. The example imports `../src/...`; if you place it under `sandbox/`, those paths point to the repository's `src/` folder.

## API
`v-model`: app-owned plain object with field values. `sections`: ordered array containing `id`, `title`, optional `description`, and `fields: [{key,label,required?,validate?}]`. `mode`: `'wizard' | 'all'`. `showSave`, `showSaveExit`, `busy`, `canSubmit`: optional controls.

Named slots match each `section.id`, receiving `{ values, update, errors, section }`. The app renders its preferred controls. Form workflow supplies section navigation, required checks, errors and status.

Events: `save`, `save-exit`, `submit` (each receives the full values object), and `section-change`.

## Behaviour / security
- A section is complete when its required fields and custom synchronous validators pass.
- Navigation between sections is allowed, but Next is blocked for an incomplete section.
- Submit is disabled until every section validates (including an optional app-level `canSubmit`).
- Save Draft and Save & Exit are allowed on incomplete forms. The consuming app handles persistence and navigation; no API calls are made by the UI package.
- Server must independently validate on submit; client-side validation alone is never enough.
- Hidden conditional sections should be removed from `sections` by the application or represented with app-specific rules.
- Do not put passwords, access tokens or patient records in insecure browser storage; use an authenticated backend for drafts.

To try the example, open it through your existing sandbox app after registering/importing it.
