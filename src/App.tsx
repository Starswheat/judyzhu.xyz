import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { elsewhere, site } from './content';
import About from './pages/About';
import DesignSystem from './pages/DesignSystem';
import Paintings from './pages/Paintings';
import Work from './pages/Work';

// Every path the site answers to. Older paths stay as aliases so no link breaks.
// The build writes a static entry for each one in scripts/prepare-portfolio.mjs.
const routes = [
  { path: '/', screen: 'Work', element: <Work /> },
  { path: '/work', screen: 'Work', element: <Work /> },
  { path: '/paintings', screen: 'Paintings', element: <Paintings /> },
  { path: '/studio', screen: 'Paintings', element: <Paintings /> },
  { path: '/photography', screen: 'Paintings', element: <Paintings /> },
  { path: '/about', screen: 'About', element: <About /> },
  { path: '/design-system', screen: 'Design system', element: <DesignSystem /> },
];
const nav = [['Work', '/'], ['Paintings', '/paintings'], ['About', '/about']] as const;

function NotFound() {
  return <><h1>Page not found</h1><p><Link className="link" to="/">Home</Link></p></>;
}

export default function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const screen = routes.find(route => route.path === path)?.screen ?? 'Page not found';

  useEffect(() => {
    document.title = screen === 'Work' ? site.name : `${screen} · ${site.name}`;
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [location, screen]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="shell">
      <header className="header">
        <Link className="header-name" to="/">{site.name}</Link>
        <nav className="nav" aria-label="Main">
          {nav.map(([label, to]) => <Link key={to} to={to} aria-current={screen === label ? 'page' : undefined}>{label}</Link>)}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Routes>
          {routes.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <nav aria-label="Elsewhere">
          {elsewhere.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
          <Link to="/design-system">Design system</Link>
        </nav>
      </footer>
    </div>
  </>;
}
