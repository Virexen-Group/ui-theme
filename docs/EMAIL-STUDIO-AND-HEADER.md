# Email Studio and Header customisation

## Email studio
Run `pnpm dev:sandbox` and open `/email-templates.html`; it also appears in the global documentation sidebar. Change the brand, optional secondary logo, preview width or background. Copy the emitted HTML and review the plaintext fallback. Email-safe templates are generated on the server and the preview uses a sandboxed iframe.

The renderer is exported at `@virexen-group/ui-theme/email-brands`:

```js
import {renderBrandedEmail, renderBrandedEmailText} from '@virexen-group/ui-theme/email-brands';
const config = {brand:'Virexen-Pay',subject:'Receipt',to:'person@example.com',reason:'you made a payment',bodyHtml:'<p>Your receipt is available.</p>'};
const html=renderBrandedEmail(config);
const text=renderBrandedEmailText(config);
```

Custom brands may pass `brandConfig` with `name`, `logo`, `secondaryLogo`, `primary`, `soft`, `dividerColor`, `privacyUrl`, and `supportUrl`. Images and links must use HTTPS. Permitted body HTML is sanitised; user content should be escaped or templated safely by the calling service. Use `secondaryBranding: false` to hide the secondary logo. Always send the plaintext output as multipart/alternative.

The email footer always carries Virexen Group copyright and the official wordmark. The playground content is placeholder data.

## Header
```vue
<VAppHeader
  :brand-selectable="true"
  :brand-options="[ { id:'pay',label:'Virexen Pay',href:'https://pay.virexen.com' } ]"
  brand-selection-action="emit"
  selected-brand-id="pay"
  @brand-select="onBrandSelect"
>
  <template #actions><AppSpecificHeaderAction /></template>
  <template #before-search><AppContextChip /></template>
  <template #actions-end><AppStatusIcon /></template>
</VAppHeader>
```

`brand-selection-action` values: `emit` (default, app handles selection), `navigate` (navigate to chosen HTTPS URL), or `both`. Other slots: `brand` replaces the brand control, `center` replaces the search area, `after-search`, `actions-start`, `actions`, `actions-end`. Your custom Vue slots can use any application-specific styles. The app controls which options appear; the shared UI does not grant permissions.

Test in `/header.html`. Note that optional navigation is a real browser redirect; in demos leave the action set to `emit`.
