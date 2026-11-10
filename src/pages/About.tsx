import { about, reading, site } from '../content';
import OrganizationRotation from '../components/OrganizationRotation';

// The ids match the anchors older links point at: #hello, #experience, #shelf.
export default function About() {
  return <>
    <h1 id="hello">{site.name} <span lang="zh-Hans">{site.nameZh}</span></h1>
    <p>{about.intro}</p>
    <p id="experience">{about.experience}</p>
    {about.personal.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

    <OrganizationRotation />

    <h2 id="shelf">Reading</h2>
    <ul className="rows">
      {reading.map(book => <li key={book.title}><span>{book.title}</span><span>{book.author}</span></li>)}
    </ul>
  </>;
}
