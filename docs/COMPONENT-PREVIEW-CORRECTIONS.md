# Component Preview Corrections

The docs fixtures now provide real `user`, `apps`, `items` and `permissions` props. Avatar uses a fully styled circle photo control and crop editor. Bottom navigation renders contained on the category page (`preview=true`); `visibility=mobile` / `fixed=true` remain for production. Sign-in has a full-page preview at `/identity.html` instead of squeezing a viewport-wide layout into the catalogue card.

The latest commerce suite components are retained, not recreated. See `/commerce.html`.

Always check `pnpm typecheck`, `pnpm build` and a browser smoke test before publishing. Visual component behaviour remains unverified in this environment.

## New components

`VSettingsLinkCard` uses title, description, icon, href, click and chevron props.

`VPaymentBrandIcon` provides stylised text and shape marks for Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal and Discover. These are *UI stand-ins*, **not licensed official payment brand logo artwork**; use approved brand assets for production.

```vue
<VSettingsLinkCard title="General" description="Basic settings and regional preferences" icon="settings" />
<VPaymentBrandIcon brand="visa" :size="48" />
```
