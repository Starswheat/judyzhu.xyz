import { about, experience, reading, site } from '../content';
import DetailList from '../components/DetailList';

// The ids match the anchors older links point at: #hello, #experience, #shelf.
export default function About() {
  return <>
    <h1 id="hello">{site.name} <span lang="zh-Hans">{site.nameZh}</span></h1>
    <p>{about.intro}</p>
    {about.personal.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

    <h2 id="experience">{about.headings.experience}</h2>
    <DetailList items={experience} labelledBy="experience" />

    <h2 id="shelf">{about.headings.reading}</h2>
    <DetailList items={reading.map(book => ({ label: book.title, detail: book.author }))} labelledBy="shelf" />
  </>;
}
