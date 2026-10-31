# Command center (0.6.12)

Import `theme.css`, `components.css`, `dashboard.css` and `command-center.css`; add `.vx-command-center` around dashboard content. The optional theme is scoped to this content and does not alter headers, sidebars or product-wide tokens. It supports the root `data-vx-theme="light|dark"` convention and respects reduced-motion settings.

`VWelcomeBanner` (`/vue/welcome-banner`) accepts name, greeting, description, detail, imageUrl and camp/lake/forest/dusk/gradient presets. Images are decorative. Enable `editable` and handle `edit`, or supply its actions slot. The application owns storage and image access.

`VAccountManagerCard` (`/vue/account-manager-card`) accepts a nullable manager and a supportHref. Manager fields: name, role, avatarUrl, email, phone, bookingUrl, messageUrl and responseTime. Assignment, contact details, availability and response times are never invented. HTTPS is required for images/booking/message URLs; omit fields that are not configured. It reuses VProfileTile.

Existing `VDashboardGrid` and `VMetricTile` now also have individual `/vue/dashboard-grid` and `/vue/metric-tile` entry points. The grid retains its immediate-save behaviour by default. For server persistence, set `save-mode="external"`, handle `save`, pass `busy` and `save-error`, and call exposed `commit()` only after successful persistence. Failed saves leave the draft intact. `reload()` resynchronises a draft after an application reset; `setEditing()` supports application controls. The heading and toolbar-actions slots let products supply context without rebuilding the editor. Touch/pointer sorting, resizing and keyboard Earlier/Later controls remain shared.

Authentication, permission filtering, registered plugin catalogues, persistence, empty states and data ownership belong to the consuming API/application. None of these components grants access.
