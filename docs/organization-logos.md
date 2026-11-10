# Organization logos

The Experience list uses small static emblems beside company names, with a monochrome
CSS treatment that adapts to the current theme. SVG viewports show only the emblem from
each original asset, without modifying source artwork. Text labels carry the company
names; the decorative marks are hidden from assistive technology.

| Organization | Local file in `src/assets/organizations/` | Source |
| --- | --- | --- |
| Tive | `tive.svg` | [Homepage logotype](https://cdn.prod.website-files.com/612c8ba675843d7428e67ee9/6215f88335b37238ca249625_Logotype.svg), linked by [Tive](https://www.tive.com/) |
| Estée Lauder Companies | `estee-lauder-emblem.png` | EL monogram image supplied by Judy; displayed in grayscale with CSS |
| Huatai International | `huatai-international.png` | [English site logo](https://www.htsc.com.hk/static/htsc/images/logo_en.png) |
| Avex Music Group | `avex.png` | [Avex group wordmark](https://avex.com/jp/en/common/v2/img/img-logo-sp.png) |
| Bosch | `bosch.svg` | Inline SVG from the header of [Bosch Global](https://www.bosch.com/) |
| Chinese Academy of Sciences | `chinese-academy-of-sciences.png` | [Academy masthead](https://english.cas.cn/images/logo_ywgb2025.png) |

Keep company names, titles, dates, image imports, and emblem viewports in
`src/content.ts`. `DetailList` renders both Experience and Reading. No animation,
duplicated content, or motion controls are needed.
