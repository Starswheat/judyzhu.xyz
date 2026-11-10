// Every word and link on the site lives here. Change copy in this file, not in components.
import garden from './assets/paintings/garden-by-water-scan.jpg';
import fish from './assets/paintings/betta-fish-scan.jpg';
import lagoon from './assets/paintings/palm-lagoon-scan.jpg';
import sunflower from './assets/paintings/sunflower-blue-scan.jpg';
import balloons from './assets/paintings/balloon-sky-scan.jpg';
import horse from './assets/paintings/white-horse-scan.jpg';
import pink from './assets/paintings/pink-currents-scan.jpg';
import tiveLogo from './assets/organizations/tive.svg';
import elcLogo from './assets/organizations/estee-lauder-emblem.ico';
import huataiLogo from './assets/organizations/huatai-international.png';
import avexLogo from './assets/organizations/avex.png';
import boschLogo from './assets/organizations/bosch.svg';
import casLogo from './assets/organizations/chinese-academy-of-sciences.png';

export const site = {
  name: 'Judy Xingying Zhu',
  nameZh: '朱星颖',
  intro: 'I’m a data analyst at Tive in Boston.',
  source: 'https://github.com/Starswheat/judyzhu.xyz',
};

export const appearance = {
  switchToDay: 'Switch to day mode',
  switchToDark: 'Switch to dark mode',
};

export const designSystem = {
  title: 'Design system',
  headings: { color: 'Color', type: 'Type', space: 'Space', rules: 'Rules' },
  columns: { swatch: 'Swatch', name: 'Name and token', token: 'Token', value: 'Value', sample: 'Sample', size: 'Size' },
  colors: [
    ['Page', '--color-page'],
    ['Surface', '--color-surface'],
    ['Raised', '--color-raised'],
    ['Line', '--color-line'],
    ['Text', '--color-ink'],
    ['Muted', '--color-muted'],
    ['Osmanthus', '--color-accent'],
    ['Scrim', '--color-scrim'],
  ],
  type: [['Title', '--text-title', 600], ['Body', '--text-body', 400], ['Small', '--text-small', 400]],
  rules: [
    'Dark by default. Day mode is an explicit choice, remembered on this device.',
    'One gold mark per screen.',
    'Sentence case.',
    'No taglines, helper text or secondary labels. If a screen needs one, change the layout.',
    'Every colour, size and space comes from a token.',
  ],
  source: 'Source on GitHub',
} as const;

export const elsewhere = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xingyzhu/' },
  { label: 'GitHub', href: 'https://github.com/Starswheat' },
  { label: 'Substack', href: 'https://xingyzhu.substack.com/' },
];

export const projects = [
  { id: 'bakery', title: 'Bakery', href: '/bakery.html', source: 'https://github.com/Starswheat/bakery.judyzhu.xyz' },
  { id: 'wishlist', title: 'Wishlist', href: import.meta.env.DEV ? 'http://127.0.0.1:4174/' : 'https://wishlist.judyzhu.xyz/', source: 'https://github.com/Starswheat/wishlist.judyzhu.xyz' },
] as const;

export const paintings = [
  { title: 'Garden by water', image: garden, alt: 'Oil painting of red roofed houses, flowers, and islands beside blue water' },
  { title: 'Betta fish', image: fish, alt: 'A pale betta fish with flowing lavender, blue, and yellow fins on a dark canvas' },
  { title: 'Palm lagoon', image: lagoon, alt: 'The bow of a boat facing palms reflected in still water at sunset' },
  { title: 'Sunflower on blue', image: sunflower, alt: 'A yellow sunflower painted against a bright blue background' },
  { title: 'Balloon sky', image: balloons, alt: 'Colorful hot air balloons and two figures beneath a pink sky' },
  { title: 'White horse', image: horse, alt: 'A white horse with a flowing red and yellow mane against an orange-red background' },
  { title: 'Pink currents', image: pink, alt: 'Sweeping loops of pink paint across the lower part of a deep burgundy canvas' },
];

export const about = {
  intro: 'I’m a data analyst at Tive in Boston, where I build the pipelines and models behind our supply chain analytics (Snowflake, dbt, Airflow). Recent work includes churn prediction, cellular dead-zone mapping, and evals for an AI agent. I studied Data Theory at UCLA, class of 2025.',
  headings: { experience: 'Experience', reading: 'Reading' },
  personal: [
    'I grew up in Suzhou, China, and San Jose, California. I speak Mandarin, Shanghainese, Japanese, and English. I love fresh ideas and good design. I consume way more than I create. Calling it research for now.',
    'Very opinionated about food. Beli top 1% worldwide, for what it’s worth. I also finished a baking course at Le Cordon Bleu, love working out, and made it through HYROX. I’ve been flying internationally in economy since I was 12, so I’m pretty sure I’ve evolved past jet lag.',
  ],
};

export const reading = [
  { title: 'The Emperor of Gladness', author: 'Ocean Vuong' },
  { title: 'Dreams', author: 'C. G. Jung' },
  { title: 'The Future Perfect', author: 'Cay Kim' },
];

export const experience = [
  { label: 'Tive', detail: 'Data pipelines & models', emblem: { image: tiveLogo, width: 114, height: 38, viewBox: '0 0 32 38', style: 'tive' } },
  { label: 'Estée Lauder Companies', detail: 'Enterprise marketing', emblem: { image: elcLogo, width: 16, height: 16, viewBox: '1 3 14 9', style: 'elc' } },
  { label: 'Huatai International', detail: 'Biotech investment banking', emblem: { image: huataiLogo, width: 204, height: 66, viewBox: '4 8 52 50', style: 'huatai' } },
  { label: 'Avex Music Group', detail: 'Copyright & licensing', emblem: { image: avexLogo, width: 214, height: 50, viewBox: '146 0 68 50', style: 'avex' } },
  { label: 'Bosch', detail: 'Manufacturing data automation', emblem: { image: boschLogo, width: 433, height: 97, viewBox: '0 0 97 97', style: 'bosch' } },
  { label: 'Chinese Academy of Sciences', detail: 'Autism spectrum disorder research', emblem: { image: casLogo, width: 614, height: 140, viewBox: '0 0 140 140', style: 'cas' } },
];
