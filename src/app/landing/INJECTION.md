# Bottle feature cards

`InjectionSection` is an editorial hero and two-card section after the product
rail. Its heading introduces 503A and 503B products for patients and practices.
The left card presents 503A patient prescriptions with Glutathione and Tri-Mix
product photographs. The right card keeps the original large, overlapping-vial
layout with two 503B products identified by the user: Testosterone Cypionate
and Testosterone Cypionate / Propionate. Both use the supplied transparent
product images (`testosterone-cypionate-503b.png` and
`testosterone-cypionate-propionate-503b.png`), preserved unchanged.
NAD+ and Glutathione are no longer used as 503B examples. Both cards open the existing sales-catalog access
screen; the preview has no separate live inventory for either category. The
separate original quality/formulations carousel is restored farther down the
landing page at `#quality`.

The section uses a light glacier-blue and seafoam gradient with white glowing accents,
crisp pale cards, dark navy typography, and slate-blue actions.
Its two bottles are enlarged by 10% and shifted down 40px.

- Cards use normal page flow and stack vertically on mobile.
- The reusable NAD+ model is preserved in `BottleModel`, but is not rendered in
  the 503B card. When used, it turns gently and fills across the viewport. There
  is no pinned section, wheel interception, product switching, or generated label.
- Three.js and the supplied `src/assets/nad-bottle/NAD_Bottle.glb` load near the
  viewport. Geometry, UVs, cap, and NAD+ label remain as supplied; alpha-glass
  adjustments allow the CSS backdrop to show through.
- Reduced motion uses a still pose. The product photograph covers loading,
  unavailable WebGL, texture failure, and context loss.
- Requests, listeners, observers, decoded bitmaps, and GPU resources are disposed
  on unmount, including resources that finish loading after navigation.

The original editable SVG, JSON, preview, and licenses are retained alongside
the model. Future label edits must only change the `Editable product label` map,
using sRGB and `flipY=false`; the cap shares the original texture.

Preview: `/dashb/?view=injection-preview` or `/dashb/?view=landing#care-in-motion`.
Validation: `pnpm build` and `node --experimental-strip-types --test tests/injection-motion.test.ts`.
