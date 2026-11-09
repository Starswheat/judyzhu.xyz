import { about, experience, reading, site } from '../content';

// The ids match the anchors older links point at: #hello, #experience, #shelf.
export default function About() {
  return <>
    <h1 id="hello">{site.name} <span lang="zh-Hans">{site.nameZh}</span></h1>
    {about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

    <h2 id="experience">Experience</h2>
    <ul className="rows experience">
      {experience.map(item => <li key={item.company}><span>{item.company}</span><span>{item.role}</span><span>{item.years}</span></li>)}
    </ul>

    <h2 id="shelf">Reading</h2>
    <ul className="rows">
      {reading.map(book => <li key={book.title}><span>{book.title}</span><span>{book.author}</span></li>)}
    </ul>
  </>;
}
