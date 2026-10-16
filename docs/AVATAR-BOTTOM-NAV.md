# Avatar editor and bottom navigation

## Avatar editor

The existing `VAvatarEditor` now displays an avatar directly. Click or focus the avatar to select an image. The editor opens a crop dialog with zoom and placement sliders. **Done** emits `file` and `change` with the generated cropped `File`; your application uploads it. `v-model` returns a local object URL for visual preview and is not a permanent remote URL.

```vue
<VAvatarEditor :src="user.avatarUrl" :size="150" border-radius="50%" :crop="true" :crop-aspect-ratio="1" @file="uploadAvatar" />
```

Props: `src`, `modelValue`, `size`, `borderRadius`, `crop`, `cropAspectRatio`, `maxSizeMb`, `disabled`, `label`, `buttonLabel`. Image processing stays client-side; protect the upload endpoint with your normal validation. To preserve image quality, cropping renders a PNG at up to 640px.

## Bottom navigation

Use the existing `VBottomNavigation` with `items`, `v-model`, `variant`, `showLabels`, `showHelperText`, `visibility` (`mobile` or `always`), and `fixed`. Use `preview` to contain it in a documentation card rather than fix it to the browser window.

```vue
<VBottomNavigation v-model="active" :items="tabs" variant="pill" visibility="mobile" :show-labels="true" />
```

Variants: `classic`, `minimal`, `indicator`, `pill`, `floating`, `raised`. The mobile breakpoint is 768px. For production routing, either supply `href` on the items or handle the `select` event. The `preview` prop is for documentation only.

Live demonstration: `/bottom-nav.html`.
