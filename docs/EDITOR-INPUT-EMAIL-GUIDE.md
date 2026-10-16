# Master UI — Editor, Inputs, Pricing & Email shells

- `VRichTextEditor` is the upgraded existing component, uses native contenteditable editing and a modern Lucide toolbar. It emits raw HTML; **sanitize on the server before displaying or sending**. Native `execCommand` is deprecated; plan a Tiptap/ProseMirror migration for collaborative editing or more advanced behaviour.
- `VPhoneInput` keeps the existing libphonenumber-js parsing with repaired shared styling, including country code dropdown.
- `VSecureInput v-model="secret" label="Password"` masks values; optional `:revealable="false"`.
- `VCodeInput v-model="code" :length="6" :digits-only="true" @complete="verifyCode"` supports keyboard navigation and pasted codes. **Actual code verification must be server-side.**
- `VSubscriptionPricing :plans="plans" currency="GBP" period="month" v-model="plan"` now renders responsive feature comparison cards. Design data is illustrative.
- `/email-templates.html`: 13 branded base templates with preview, HTML copy, recipient and reason footer. Application content is separate from the shell.
- `import { renderBrandedEmail,emailBrands } from '@virexen-group/ui-theme/email-brands'` for server-side generation. Example: `renderBrandedEmail({brand:'CampPulze',subject:'Welcome',bodyHtml:'<p>Hello!</p>',to:'alex@example.com',reason:'you have a camp account.'})`. HTML body is sanitised. The email shells are table-based and inline-styled for email client compatibility. Avoid injecting untrusted subject/recipient URLs.
- Font preview offers Manrope and common fallback stacks. Only Manrope is bundled; Inter and other fonts display if locally available.
- `pnpm typecheck && pnpm build && pnpm test`; `pnpm dev:sandbox` for previews.
