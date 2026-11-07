# design and interaction review

reviewed 6 november 2026. the selected direction follows the user's simpler michelle liu reference, superseding the earlier generated concepts.

## reference comparison

compared the source and implementation at the same default desktop viewport (1265 by 712 captured pixels). both use a restrained identity area, a compact tab row, fine separators, an about index, and a readable image and text composition. judy's version uses her own painting, professional history, hobbies, and lowercase voice. it intentionally omits the reference's ambient gradient and decorative portrait framing. photography remains an honest empty collection until original photographs are supplied.

* source: [michelle about](https://www.liumichelle.com/about)
* source: [michelle design system](https://www.liumichelle.com/design-system)
* interaction reference: [zara wishlist](https://wishlist.zarazhang.com/)
* desktop comparison: `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/michelle-about-simple.jpg` and `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-about-desktop.jpg`
* phone captures: `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-home-mobile.jpg`, `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-about-mobile.jpg`, `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-wishlist-mobile.jpg`
* desktop captures: `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-home-desktop.jpg`, `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-design-system-desktop.jpg`, `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/judy-wishlist-desktop.jpg`

## verified in the browser

* desktop and a 390 by 844 phone viewport, with no page overflow on the tested home, about, and wishlist layouts.
* home source toggle reveals both project repositories.
* studio opens real paintings; next image and escape close work. photography displays the intended empty state and instagram link.
* design system button counter, name field, project filter, glass action, motion action, and motion disable switch work. disabling the example also disables its duration slider.
* wishlist claim persists through reload, undo claim restores it, search finds the flying car book, and add, edit, delete, and undo delete work. temporary test wishes were removed afterward.
* bundled production links reach `/wishlist/`; its local images load. direct `/about/` and `/design-system/` retain correct titles and headers.
* no console warnings or errors observed in the portfolio and design system checks.

## fixes made during review

* normalized trailing slashes for the header and document title on static hosts.
* removed nested main landmarks from the design system.
* kept the mobile painting medium caption on one line.
* protected wishlist data against stale changes from another tab, with regression tests.
* updated the wishlist shop URL editor to remove a replaced primary link.

## automated validation

portfolio typecheck and production build pass. static output resource resolution and preserved file checks pass. wishlist has 8 passing data tests and 4 passing worker tests; production build passes. import and export validation is covered by the data tests, not a native file chooser browser test. reduced motion behavior is implemented in css and the pointer handler; no operating system preference was changed during review.

## remaining content

add original photographs, any preferred portrait, and public project outcomes when available. the photography tab is ready for a future collection; it is not currently a photo upload or cloud storage service. edits and claims in the wishlist are local to each browser. the production artifact is ready at `dist/portfolio`, and is not deployed to the main domain by this build.
