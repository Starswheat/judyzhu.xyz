# Organization logos

The About page uses local logo artwork, with a monochrome CSS treatment
that adapts to the current theme. Source files retain their original artwork. The logos
identify organizations in Judy’s biography; they are not an endorsement or client list.

| Organization | Local file in `src/assets/organizations/` | Source |
| --- | --- | --- |
| Tive | `tive.svg` | [Homepage logotype](https://cdn.prod.website-files.com/612c8ba675843d7428e67ee9/6215f88335b37238ca249625_Logotype.svg), linked by [Tive](https://www.tive.com/) |
| Estée Lauder Companies | `estee-lauder-companies.png` | Stacked wordmark supplied by Judy on November 10, 2026; original PNG retained |
| Huatai International | `huatai-international.png` | HTSC wordmark supplied by Judy on November 10, 2026; original PNG retained |
| Avex Music Group | `avex.png` | [Avex group wordmark](https://avex.com/jp/en/common/v2/img/img-logo-sp.png) |
| Bosch | `bosch.svg` | Inline SVG from the header of [Bosch Global](https://www.bosch.com/) |
| Chinese Academy of Sciences | `chinese-academy-of-sciences.png` | [Academy masthead](https://english.cas.cn/images/logo_ywgb2025.png) |

Keep names, destinations, image imports, and accessible control labels in `src/content.ts`. The loop
is CSS-only, with a React pause/resume control. It also pauses on hover and keyboard
focus. Keyboard focus on a logo shows a static wrapping list so every link stays visible.
Reduced motion also shows all six logos in a static wrapping list and hides the
unnecessary motion control. The duplicate loop links remain clickable, but are hidden
from assistive technology and excluded from keyboard navigation to avoid repeated stops.
The ELC and Huatai images use `object-fit: cover` to fit their supplied margins into
the strip without modifying the source images.
