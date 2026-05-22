# Brand Assets

Drop these files here (overwrite existing placeholders):

| File | Source | Purpose |
| --- | --- | --- |
| `smartech-icon.svg` | Identity/IMG_3729.PNG (icon only) — export as SVG | Used by `<Logo />` and favicons |
| `smartech-logo.svg` | Identity/IMG_3730.PNG (full wordmark) — export as SVG | Open Graph + footer fallback |
| `smartech-logo-light.svg` | Identity/IMG_3732.PNG (white version) | Footer / dark backgrounds |
| `pattern-brain.svg` | Optional repeating brain pattern | Section backgrounds |

After replacing the files, the inline SVG fallback in `src/components/brand/Logo.tsx` can be swapped with `next/image` if you prefer raster logos.
