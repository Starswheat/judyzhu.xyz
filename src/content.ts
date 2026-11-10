// Every word and link on the site lives here. Change copy in this file, not in components.
import garden from '../assets/paintings/garden-by-water-scan.jpg';
import fish from '../assets/paintings/betta-fish-scan.jpg';
import lagoon from '../assets/paintings/palm-lagoon-scan.jpg';
import sunflower from '../assets/paintings/sunflower-blue-scan.jpg';
import balloons from '../assets/paintings/balloon-sky-scan.jpg';
import horse from '../assets/paintings/white-horse-scan.jpg';
import pink from '../assets/paintings/pink-currents-scan.jpg';

export const site = {
  name: 'Judy Xingying Zhu',
  nameZh: '朱星颖',
  intro: 'I’m a data analyst at Tive in Boston.',
  source: 'https://github.com/Starswheat/judyzhu.xyz',
};

export const elsewhere = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xingyzhu/' },
  { label: 'GitHub', href: 'https://github.com/Starswheat' },
  { label: 'Instagram', href: 'https://www.instagram.com/judyfruitee/' },
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

export const about = [
  'I’m a data analyst at Tive in Boston. I work on supply chain analytics. Before this, I studied Data Theory in the mathematics and statistics departments at UCLA, and graduated in 2025.',
  'I grew up in Suzhou, China. I love fresh ideas and expressing them through design. Editorial, motion, branding, UI/UX, publication, type, experimental: I like them all.',
];

export const experience = [
  { company: 'Tive', role: 'Data analyst', years: '2026–now' },
  { company: 'Estée Lauder Companies', role: 'Consumer insights assistant manager', years: '2024' },
  { company: 'Huatai International', role: 'Investment banking summer analyst', years: '2023' },
  { company: 'Avex Music Group', role: 'Record label A&R', years: '2022–2023' },
  { company: 'Bosch', role: 'Data analyst intern', years: '2022' },
];

export const reading = [
  { title: 'The Emperor of Gladness', author: 'Ocean Vuong' },
  { title: 'Dreams', author: 'C. G. Jung' },
  { title: 'The Future Perfect', author: 'Cay Kim' },
];
