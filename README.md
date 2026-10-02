# @virexen-group/ui-theme

Shared Virexen design tokens and base styles. Initially copied from My-Virexen with only the header changed.

## Consume

Add `@virexen-group:registry=https://npm.pkg.github.com` to `.npmrc`, authenticate with `read:packages` access in user configuration (never commit credentials), and install with `pnpm add @virexen-group/ui-theme` or `npm install @virexen-group/ui-theme` according to the app’s package manager.

```ts
import "@virexen-group/ui-theme/theme.css";
```

Verify the app before removing its local stylesheet. Compare and reconcile drift with the team before migrating another app. Grant consuming repositories Actions access to the package when using their `GITHUB_TOKEN`.

## Develop and release

Use Node 22. Run `npm ci`, `npm run lint`, and `npm run build`. The build copies src/theme.css and its self-hosted font assets into dist.

For the initial release, commit the scaffold, create an annotated `v0.1.0` tag, and run `git push --follow-tags`. Version 0.1.0 is already set, so do not run `npm version 0.1.0`.

For future changes, edit src/theme.css, validate and commit, run `npm version patch` (or minor/major), then `git push --follow-tags`. The workflow checks the tag, lints, builds, and publishes to GitHub Packages using GITHUB_TOKEN. Consumers bump their dependency on their own schedule.

## Typography

Manrope is the primary body and display font through `--font-body` and `--font-display`. The packaged variable WOFF2 fonts support weights 200–800, with Latin, extended Latin, Cyrillic, Greek and Vietnamese subsets. Browsers fetch only the subsets they need; `font-display: swap` retains readable fallback text during loading. Fonts are served by each consuming app, with no external font service. Code and credential surfaces may retain monospace fonts.

Font assets originate from `@fontsource-variable/manrope@5.3.0`, Copyright 2019 The Manrope Project Authors, under the SIL Open Font License bundled at `src/fonts/LICENSE` and `dist/fonts/LICENSE`. PWA builds that copy the theme stylesheet must also copy/cache `dist/fonts` so relative font URLs work offline.

## HTML emails

The server-side export `@virexen-group/ui-theme/email` supplies the common Virexen
email shell and a safe, non-executable placeholder renderer. Store individual
template definitions in your template service/database, not in this package.

```js
import { renderEmail } from '@virexen-group/ui-theme/email';
const message = renderEmail(templateFromDatabase, { name: 'Alex', code: '123456' }, { to: 'alex@example.test' });
```

Definitions contain `subject`, `title`, `preheader`, `html`, `text` and
`urlVariables`. Both `{{name}}` and `{name}` work. Variables are strings; missing
values, unsafe URL variables and subject newlines fail rendering. HTML values
are escaped and editable HTML is sanitized. The shell uses inline styles and
tables for email clients. No scripts, arbitrary expressions or raw HTML variable
injection are supported. This package contains no delivery credentials.
