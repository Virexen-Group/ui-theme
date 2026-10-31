# Packed dashboard layouts

`VDashboardGrid` retains its existing ordered layout by default. Opt into two-dimensional packing with `packed`, `positions` and `heights`:

```vue
<VDashboardGrid
  packed
  :model-value="instanceIds"
  :sizes="columnsById"
  :heights="pixelHeightsById"
  :positions="positionsById"
  @save="saveLayout"
/>
```

Positions are zero-based `{ column, row }` cells in the canonical column count (12 by default). Rows are 20px. Pixel heights remain actual widget heights, rather than stretching a short widget to match its tallest neighbour. Layouts reserve vertical spacing and prevent overlaps. A short card can therefore sit above another card beside a tall neighbour.

Existing layouts without positions use deterministic first-fit packing. Explicit positions preserve intentional spaces. Newly added widgets append below the current bottom; dragging a widget into a free gap places it there. Dropping on occupied space reflows conflicting widgets while preserving unaffected neighbours. Expanding a widget clamps it inside the column boundary and reflows collisions. Layout height is bounded to 1,024 rows. Hosts must enforce widget counts and per-widget size limits, and validate persisted positions server-side.

Desktop dragging uses cell positions, including otherwise empty space; a dashed preview indicates the snapped destination. Phones and tablets render a reading-order layout in one or two columns while retaining the canonical desktop positions. Keyboard earlier/later controls remain available and regenerate a compact reading-order layout. Saved layouts include `positions` alongside `order` and `sizes`; external-save hosts commit only after persistence succeeds. Cancel discards draft positions, order and sizes together.

A custom picker can replace the default inline library with the `catalogue` slot. It receives `{ open, items, add, close }`; `add(id)` appends a widget and `close()` dismisses the picker. Existing consumers without the slot retain their original library. Keep custom picker buttons outside inert widget content.
