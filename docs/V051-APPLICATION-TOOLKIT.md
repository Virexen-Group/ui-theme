# Virexen Master UI v0.5.1 — App Toolkit

This is a consolidated source ZIP based on v0.5.0. Review changes before merging into your authoritative repo. All existing named exports and existing form/Identity modules are retained.

## Install and test

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm test
pnpm dev:sandbox
```

Include the standard `theme.css`, `components.css` and `dashboard.css` used by your app. Import from `@virexen-group/ui-theme/vue`, or use subpath exports for new components, e.g. `/vue/data-grid`, `/vue/file-upload`.

## 1. Dashboard editor

`VDashboardGrid` in editable controlled mode **starts in edit mode**. Drag the tile itself; pointer updates show a floating tile and target, but widget order changes only on drop. Corner `↘` resizes widget width. The user can Add/Remove, **Save layout** (emits `update:modelValue` and `update:sizes`) or **Cancel** (restores draft). Grid raises `save` and `cancel`. Dashboard layout is not sent to any server automatically.

```vue
<script setup lang="ts">
import {ref} from 'vue';
import {VDashboardGrid,VMetricTile,useNamedDashboards} from '@virexen-group/ui-theme/vue';
const {dashboards,active,activeId,add,remove,save}=useNamedDashboards([
 {id:'overview',name:'Overview',order:['revenue','users'],sizes:{revenue:6,users:6}},
 {id:'operations',name:'Operations',order:['users'],sizes:{users:12}}
], 'dashboard-layouts-v1');
const items=[{id:'revenue',label:'Revenue',span:6},{id:'users',label:'Users',span:6}];
function persist(payload:{order:string[];sizes:Record<string,number>}){
 if(active.value) save(active.value.id,payload);
 // Optional: await your API.saveUserDashboard(active.value?.id,payload)
}
</script>
<template>
  <select v-model="activeId"><option v-for="d in dashboards" :key="d.id" :value="d.id">{{d.name}}</option></select>
  <VDashboardGrid v-if="active" :key="active.id" :model-value="active.order" :sizes="active.sizes"
    :available-items="items" editable :start-in-edit-mode="true"
    @save="persist">
    <template #item="{id}"><VMetricTile :title="id" :value="id==='revenue'?25000:140"/></template>
  </VDashboardGrid>
</template>
```

### Caveats

- Drag-to-resize changes **grid column width**, not arbitrary x/y positions or row heights. Placement still uses responsive CSS grid flow.
- Browser-local saving in `useNamedDashboards` is optional. You must implement app-level API persistence and permission checks.
- Reordering has not been browser-end-to-end tested on all touch devices.

## 2. Data grids

```vue
<VDataGrid :rows="campers" :columns="[{key:'name',label:'Name',sortable:true},{key:'status',label:'Status',sortable:true}]" :page-size="25" @selection-change="ids=>selected=ids" @bulk-action="handleBulkAction" />
```

Includes text search, column visibility toggles, sorting, selection, client-side pagination, bulk-action event, cell slots. **Not included yet:** column drag-resizing/reordering, server-side pagination, and backend export.

## 3. Shared layouts

```vue
<VAppShell><template #sidebar>Menu</template><template #header>App switcher</template><VPageHeader title="Campers" description="View and manage campers"/><router-view/></VAppShell>
```

Also: `VSettingsLayout`, `VProfileLayout`, `VDetailDrawer`, `VWizardLayout`, `VEmptyState`, `VCommandPalette`.

## 4. File and media

```vue
<VFileUpload accept=".pdf,image/*" :max-size-mb="10" multiple @files="uploadFiles" @error="showError"/>
<VImageUploader @file="uploadPhoto"/>
<VUploadProgress :progress="progress"/>
<VDocumentViewer :src="signedDocumentUrl" mime-type="application/pdf"/>
<VMediaGallery :items="photos" @select="showPhoto"/>
```

Image cropping and upload transport are NOT implemented. The upload components return `File` objects; applications must securely upload them. The PDF viewer expects an already trusted/signed URL.

## 5. Confirmations and feedback

```vue
<VConfirmDialog :open="showDelete" title="Delete record?" message="This cannot be undone" require-phrase="DELETE" danger @confirm="deleteRecord" @cancel="showDelete=false"/>
<VUnsavedChanges :dirty="hasChanges" @save="save" @discard="discard"/>
<VFeedbackBanner kind="error" message="Could not save" @dismiss="error=null"/>
```

These are intentionally UI-only controls: **do not** treat a click as a completed or authorised backend operation.

## 6. Manifest support

Use `defineVirexenUI` as before. Dashboard, motion and other recommended manifest property names from the roadmap are **not** automatically applied to all new components; apps can read their manifest and pass component props. This release preserves the manifest rather than claiming unimplemented global inheritance.

## Validation limits

This patch is based on the latest prior ZIP, not a live checkout of your repository. Do not overwrite local customisations blindly. Run project typecheck/build/test before publishing.
