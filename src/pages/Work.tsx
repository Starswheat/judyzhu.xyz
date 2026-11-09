import { GithubLogo } from '@phosphor-icons/react';
import { BakeryPlate, WishlistPlate } from '../components/ProjectPlates';
import { projects, site } from '../content';

const plates = { bakery: <BakeryPlate />, wishlist: <WishlistPlate /> };

export default function Work() {
  return <>
    <h1>{site.intro}</h1>
    <ul className="projects">
      {projects.map(project => <li key={project.id}>
        <a className="project" href={project.href}>{plates[project.id]}<span>{project.title}</span></a>
        <a className="icon-link" href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.title} source on GitHub`}><GithubLogo size={18} aria-hidden="true" /></a>
      </li>)}
    </ul>
  </>;
}
