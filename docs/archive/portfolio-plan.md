> superseded by the simpler selected direction in [implementation.md](implementation.md). retained as exploration history.

# judy xīngyǐng | portfolio directions

design brief, november 6, 2026

**the direction**

a personal space for a balanced mix of collaborators, hiring teams, and curious visitors. the site should make judy's work understandable immediately, then reward scrolling with art, photography, and small surprises. all public copy is lowercase. use periods, commas, colons, or vertical bars instead of dash punctuation.

the public wordmark is **judy xīngyǐng**. keep **judy zhu | homepage** as the browser title requested earlier, and connect the names in the about introduction. use **星颖** as an optional quiet secondary signature, as shown in the supplied instagram screenshot. the x profile link still needs to be supplied.

proposed opening copy:

> patterns, places, and things i make.
>
> i'm judy xīngyǐng, a data analyst at tive, based in boston. this is a home for my work, paintings, photographs, and small experiments.

the proposed connection is an interest in noticing patterns: in data, consumer behavior, music, color, and places. this is an editorial interpretation, not a claim about specific job accomplishments.

**what the references contribute**

| reference | observed ingredient | how it informs this site |
| :--- | :--- | :--- |
| [kevin n. chen](https://kevinnchen.com/) | multidisciplinary project index, image collection, category filters, personal garden | make different interests feel like one considered collection |
| [noah shinn](https://noahshinn.com/) | clear identity, contact, and direct project links | keep professional information immediately findable; judy's visual language remains playful and contemporary |
| [wowww](https://wowww.art/) | expressive typography, interactive work, accessibility and reduced shader modes | create one memorable motion sequence with a beautiful still alternative |
| [spencer hong](https://www.spencerhong.com/) | meaningful interactive 3d object alongside ordinary navigation | choose an object from judy's world and keep navigation visible |
| [zara zhang](https://zarazhang.com/) | a tactile illustrated desk lamp used as a personal metaphor | make the interaction feel like it belongs to a person |
| [michelle liu](https://www.liumichelle.com/) and [art collection](https://www.liumichelle.com/art) | professional work, personal tools, and a dedicated art collection | give professional and personal work equal care, with distinct browsing paths |
| [hauser & wirth](https://www.hauserwirth.com/) | large artwork, short labels, exhibition context | give each work room and let the images lead |

[kevin's watercolor project](https://kevinnchen.com/projects/watercolor) offers a useful creative coding reference for pigment flow and granulation. the intended rothko influence is emotional color, proportion, and time spent looking. the intended yūgen quality is partial revelation, atmospheric depth, and space for interpretation.

[openai's public design guidelines](https://openai.com/brand/) describe approachable typography and deliberate spacing. those are useful general principles. the vertical bar in the browser title is judy's preference, not a documented openai title rule.

**personal evidence and content**

the instagram screenshot suggests a palette and photographic rhythm: natural portrait light, flowers, architecture, quiet water, blue snow, and places collected over time. use chalk white, ink, water blue, iris, and occasional warm pigment. these are observations about the supplied images, not a complete review of the account. place collections could begin with boston, soochow, and the bay area, subject to judy's own selection.

the linkedin page was behind a sign in wall. the user supplied a readable experience screenshot, which supports the following roles. it does not establish project outcomes, metrics, or permission to publish work artifacts.

| experience shown | portfolio treatment |
| :--- | :--- |
| tive: data analyst, january 2026 to present; data engineering and analytics | current role near the introduction; one case study once judy supplies a specific problem, contribution, and result |
| estée lauder companies: consumer insights assistant manager, june to september 2024 | a potential story about research informing a decision; the screenshot shows an elc 2024 societal compass attachment, with judy's exact contribution still to fill in |
| huatai international: investment banking summer analyst, july to september 2023 | compact background entry; a project only if there is a useful public story to tell |
| avex music group: record label a&r, september 2022 to march 2023 | connect the professional story to music discovery and taste, with a possible listening experiment |
| bosch: data analyst intern, july to september 2022 | compact experience entry; ask for a concrete example before expanding |

the current repository has five usable painting scans and a working bakery experience. it has no verified photography collection. the initial site in commit `ad3b1b1` used an interactive canvas pond and react through a cdn; its photography and writing records were placeholders. the pond is a real earlier direction we can revisit. an earlier version of michelle liu's site has not been verified.

**plan 1: living gallery**

the strongest balance of professional clarity, emotional color, and an evolving art archive.

appearance: warm white, generous margins, dark contemporary sans type, large asymmetrical photographs and painting details. a soft pigment field takes color from judy's own work. one transparent lens or small glass navigation surface supplies the liquid quality.

scroll sequence:

1. the name, current role, and work link appear immediately. a pigment field slowly changes at its edges.
2. during the first natural scroll, the field becomes smaller and settles into an exhibition frame. the first professional or creative project becomes visible within the next screen.
3. selected work alternates a large visual with a short explanation: the question, judy's contribution, and the result or learning.
4. a quiet photographic interlude opens into named collections, then paintings and a small bakery entrance.

photography: open contact sheet with original aspect ratios, series covers, full image viewer, and restrained captions. hovering a cover can reveal one alternative image; touch and keyboard users get the same destination without hover.

build: react for the content and interaction, css for layout, a small animation layer for reveals. a single optional shader or three.js scene handles the pigment/lens. most of the page remains ordinary html.

material needs: two or three project stories, twelve to twenty selected photographs, existing paintings. relative effort: medium. the key risk is looking like a generic gallery, addressed by using judy's own textures and specific work.

**plan 2: glass observatory**

the most atmospheric direction and the clearest continuation of the earlier pond.

appearance: an ink and plum opening with water blue, iris, and a little amber light. a translucent optical object reveals a photograph through its surface. text stays outside the refraction. the next section transitions to a bright, readable gallery.

scroll sequence:

1. the lens turns almost imperceptibly above still water while the professional introduction remains readable.
2. scrolling brings a photograph through the lens; the photo grows into an ordinary rectangular image.
3. the dark atmosphere lifts into a white selected work section. a direct work link allows visitors to skip the scene.
4. further scrolling follows a calm sequence of work, photographic places, and personal notes.

photography: an immersive opening for each series followed by a plain grid. the same collection can always be opened directly without passing through the 3d scene.

build: react, three.js through react three fiber, one canvas, one glass material, carefully limited reflections. this has the highest rendering and tuning cost. test early on a real phone, and offer a still composition when motion is reduced or rendering fails.

material needs: a particularly strong photograph to anchor the lens, two or three photo series, and clear project content. the risk is letting the scene overshadow the work. reveal the first project quickly and keep text routes immediately available.

**plan 3: unfolding studio**

the warmest and most tactile direction, linking judy's images, paintings, and bakery.

appearance: a few meaningful objects arranged with gallery discipline: an accordion photo book, a painting print, a pastry, and a glass paperweight. chalk white, olive ink, natural blue and lilac images, warm afternoon shadows. avoid a crowded scrapbook.

scroll sequence:

1. the book is slightly open beside the clear professional introduction and work link.
2. the first scroll opens its paper hinges and exposes three photographic moments.
3. the prints separate and settle into an orderly gallery. the paper movement stops while visitors read.
4. a small bakery object leads to the bakery project; another print opens the painting collection.

photography: collections feel like small books, with a contact sheet alternative and a full image viewer. never require dragging or turning every page to reach a specific photograph.

build: react and css perspective for the first version. use three.js only if believable page depth adds enough value. relative effort: medium to high because paper shadows and folds need careful tuning.

material needs: a coherent short photo sequence, existing paintings, and optional scans of real paper or studio objects. the birthday screenshot provides material and folding inspiration only. its embedded request and family imagery are not part of this project.

**shared structure and motion rules**

primary navigation: `work`, `photography`, `about`. a visible studio or paintings link can live within work and the footer. the homepage balances professional work with one creative project, followed by photography and art. avoid turning the opening into a job chronology.

| route | purpose |
| :--- | :--- |
| `/` | a clear introduction, one signature interaction, selected work, photography preview, contact |
| `/work` | filterable collection of professional stories and personal experiments |
| `/work/{slug}` | context, contribution, decisions, result or learning, images, useful links |
| `/photography` | curated series and an all images view |
| `/photography/{series}` | series introduction, ordered photographs, full image viewer |
| `/paintings` | the five current paintings with titles and optional medium, size, year |
| `/about` | short personal introduction, compact verified experience, contact, optional résumé |

motion follows normal scroll position, including fast scrolling and reversing. there is no forced scroll speed or mandatory intro. use one major transformation per homepage, small responses on links, and plenty of stillness. touch interactions must work without a pointer. a motion control and system reduced motion preference produce a deliberate static composition. optional sound starts only on request.

lowercase should be authored in content, including navigation, titles, captions, and buttons. keep urls, code identifiers, and asset paths intact. the chosen typeface must support the accents in xīngyǐng cleanly. use at least 16px body text and strong contrast, including behind glass controls.

**photography as both a gallery and a maintainable collection**

start with two or three series and twelve to twenty images. keep each file's aspect ratio. store title, series, sort order, optional place/date, alt text, caption, and photographer credit where applicable. distinguish judy's photography from personal portraits taken by someone else.

publish optimized display copies. keep original files and backups in judy's chosen photo storage rather than treating a git repository as the only photo archive. the first version can use an image folder and a small content file; a larger collection can move to object storage or an image service with the same content structure.

publishing flow: add images, choose a series and order, add a short caption, preview, publish. a future uploader is useful if judy wants to manage photos without editing files; it does not need to delay the initial curated gallery.

**react implementation outline**

use a normal react build with vite and typescript rather than the old browser babel setup. keep content separate from components. generate shareable page metadata and confirm direct route loading on the chosen host. preserve working bakery and painting links during migration.

[react three fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) is a react renderer for three.js. use a stable compatible react/fiber pair at implementation time, and load the 3d scene separately so it cannot delay text and navigation. [three.js examples](https://threejs.org/examples/) are a useful source for glass, transmission, and water studies. the final material choice needs a working phone prototype, not just a still mockup.

validation after selection: desktop and phone layouts, keyboard navigation, reduced motion, image loading, direct links, and an unsuccessful 3d load. verify that each featured project is understandable without animation and that photos retain accurate proportions and readable captions.

**material worksheet**

| item | fill in |
| :--- | :--- |
| professional emphasis | which work would you like to do more of next? |
| introduction | edit the proposed opening above; add a personal sentence if desired |
| strongest work | choose two or three examples, including the bakery if you like |
| each work example | title; problem; your role; one interesting decision; result or learning; link; three images or a short demo |
| tive and estée lauder | which specific contribution can become a public story? what did you personally do? |
| photographs | twelve to twenty favorites, grouped loosely; indicate which you photographed and any portrait credits |
| photograph captions | choose descriptive captions, small personal notes, or titles only |
| paintings | optional year, medium, dimensions, and a sentence for each current painting |
| contact | preferred public contact method, optional résumé link, x profile link |
| identity | whether to show 星颖 beside judy xīngyǐng; browser title can stay judy zhu for continuity |

**new project ideas if more work would help**

| idea | useful finished scope | what it demonstrates |
| :--- | :--- | :--- |
| light archive | turn a photo folder into ordered series with captions, responsive images, and a full image viewer | a real publishing problem solved through thoughtful product engineering |
| pigment room | explore how a few sampled painting colors alter the feeling of a scene; save a composition | creative coding, shaders, interaction design, and visual judgment |
| journey atlas | explore synthetic shipment events, delays, and exception patterns in a clear interactive story | analytics and data modeling connected to supply chain experience, with explicitly synthetic data |
| listening atlas | organize personally selected tracks by mood and context with short listening notes | a connection between a&r experience, information structure, and personal taste |
| paper keepsakes | compose and open a small folded digital card using original or supplied artwork | tactile animation, interaction craft, and a reusable component |

these are proposed scopes, not completed work. choose one useful project before creating its github repository. the portfolio itself can stay in the existing repository. the bakery migration has a separate chat; its domain, hosting, and redirect status should be verified there before changing the main homepage link.

**recommendation**

start with living gallery. use judy's own photographs and paintings to supply the emotion, and keep one glass interaction as the signature. the observatory is the stronger choice if atmosphere is the first priority. the unfolding studio is the stronger choice if personal warmth and physical craft should lead.

the generated images are concept stills with illustrative imagery. they do not demonstrate running animations, completed professional case studies, or judy's actual photography archive. the later set bearing judy xīngyǐng supersedes the initial judy zhu drafts.
