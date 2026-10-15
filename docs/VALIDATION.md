# Validation controls — Virexen Master UI

## New components

All are available from `@virexen-group/ui-theme/vue` **after you add the exports listed in README-VALIDATION.md**.

```vue
<script setup lang="ts">
import {ref} from 'vue';
import {VValidatedDate, VDateOfBirth, VEmailInput, VValidatedInput, VNameInput} from '@virexen-group/ui-theme/vue';
const dob=ref(''); const fullName=ref({first:'',middle:'',last:''}); const email=ref('');
</script>
<template>
  <VDateOfBirth v-model="dob" :min-age="4" :max-age="18" required />
  <VEmailInput v-model="email" required />
  <VNameInput v-model="fullName" :include-middle="true" />
</template>
```

### Dates

`VValidatedDate`: `rule="any|past|future|today-or-past|today-or-future"`, `min`, `max` (YYYY-MM-DD), `required`, `minAge`, `maxAge`, `showAge`. `VDateOfBirth` always requires a date before today and optionally enforces ages **inclusive** of both limits. Ages are computed on the current calendar date in the user's browser timezone; for enrollment on a future session date, validate separately on the server using that date.

### Email

`VEmailInput` validates syntax on blur and emits `{ update:modelValue, validation }`. Optional `:check-email="async (email) => ({valid:true})"` is a host-supplied verifier. **There is no reliable free API that can prove a mailbox exists**: DNS/MX tests only indicate a domain accepts mail, SMTP probes may be blocked, and risky services can expose personal information. The best verification is to send a one-time link/code and confirm possession. Do verification through the host backend, never expose third-party service secrets in the shared browser library. Rate limit and limit retention of addresses.

### Text

`VValidatedInput` supports `required`, `min-length`, `max-length`, `pattern`, `profanity` (a developer-supplied array of words), `type`, and emits `validation`. Filtering client-side is advisory and must run server-side too. Do not rely on a tiny static profanity list as a content-safety policy; use a specialised moderated backend where necessary. Do not apply profanity rules to legal names by default.

### Names

`VNameInput` has required first and last names, optional middle via `include-middle` and `middle-required`; emits `{first,middle,last}`. These fields reflect a particular requested application convention, not every culture's naming system—permit application-level adjustments for international onboarding.

### Existing `VInput`

The existing `VInput` supports native `type="email"` but does not automatically perform server deliverability checks. Use `VEmailInput` for the enhanced email flow. These components are additive to preserve existing `VInput` API and styling.

### Validation lifecycle

Local `validation` events provide feedback only. An application must validate again at submit time and on its server. For form sections, completion should only occur on explicit Next/Save confirmation according to your established `VFormWorkflow` behaviour, not on keystrokes.

### Build CSS

Import `src/styles/validation.css` in the sandbox and publish it as `validation.css` by extending your `scripts/build-assets.mjs` and `package.json` exports. Alternatively, append validation CSS once to `src/styles/components.css` for an existing supported published export.
