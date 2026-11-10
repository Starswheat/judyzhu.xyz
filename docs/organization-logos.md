# Organization logos

The About page uses local copies of official artwork, with a monochrome CSS treatment
that adapts to the current theme. Source files retain their original artwork. The logos
identify organizations in Judy’s biography; they are not an endorsement or client list.

| Organization | Local file in `src/assets/organizations/` | Official source |
| --- | --- | --- |
| Tive | `tive.svg` | [Homepage logotype](https://cdn.prod.website-files.com/612c8ba675843d7428e67ee9/6215f88335b37238ca249625_Logotype.svg), linked by [Tive](https://www.tive.com/) |
| Estée Lauder Companies | `estee-lauder-companies.png` | [Corporate wordmark](https://media.elcompanies.com/images/e/estee-lauder-companies/global/logo/elc-black-logo.png) |
| Huatai International | `huatai-international.png` | [English site logo](https://www.htsc.com.hk/static/htsc/images/logo_en.png) |
| Avex Music Group | `avex.png` | [Avex group wordmark](https://avex.com/jp/en/common/v2/img/img-logo-sp.png) |
| Bosch | `bosch.svg` | Inline SVG from the header of [Bosch Global](https://www.bosch.com/) |
| Chinese Academy of Sciences | `chinese-academy-of-sciences.png` | [Academy masthead](https://english.cas.cn/images/logo_ywgb2025.png) |

Keep names, image imports, and accessible control labels in `src/content.ts`. The loop
is CSS-only, with a React pause/resume control. It also pauses on hover and keyboard
focus. Reduced motion shows all six logos in a static wrapping list and hides the
unnecessary motion control. The duplicate loop is hidden from assistive technology.
