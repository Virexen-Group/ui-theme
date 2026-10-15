# Accessibility and responsive design

The library targets mobile-first UI and keyboard operability. Before production release, test with VoiceOver, NVDA and keyboard-only navigation, as well as dark mode and 200–400% zoom.

- Use clear labels for all inputs and keep required-field messages associated with input IDs.
- Do not use colour alone to indicate state. Icons, labels and text should remain visible.
- Honour `prefers-reduced-motion`.
- Preserve minimum 44×44 px interactive targets on mobile.
- Avoid fixed widths where content or localisation can cause clipping.
- Keep text and surface colours above appropriate WCAG contrast thresholds; verify brand overrides.
- For server-rendered or asynchronous changes, announce loading and errors in an `aria-live` region when appropriate.
- Tooltips must not block interaction, and navigation should remain fully usable by keyboard without hover.
- Rich-text content must be sanitized and inspected before injecting into application pages.

## Motion tokens

The `roadmap.css` file is composed with the existing theme variables. Use these tokens instead of hard-coded transition times:

```css
:root {
  --vx-motion-fast: 120ms;
  --vx-motion-normal: 180ms;
  --vx-motion-slow: 280ms;
  --vx-motion-ease: cubic-bezier(.2,.75,.25,1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --vx-motion-fast: 0ms; --vx-motion-normal: 0ms; --vx-motion-slow: 0ms; }
}
```
