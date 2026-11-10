import { useEffect, useReducer } from 'react';
import { designSystem, site } from '../content';
import { useTheme } from '../theme';

// Tokens are defined once, in :root of styles.css. This page reads their values
// from the document, so it can never drift from what the site uses.
const read = (token: string) => getComputedStyle(document.documentElement).getPropertyValue(token).trim();

const { colors, type, rules, headings, columns } = designSystem;
const space = ['--space-1', '--space-2', '--space-3', '--space-4', '--space-6', '--space-8', '--space-12', '--space-16', '--space-24'];

export default function DesignSystem() {
  useTheme(); // Re-read computed tokens immediately when the appearance changes.
  const [, refresh] = useReducer(value => value + 1, 0);
  useEffect(() => {
    window.addEventListener('resize', refresh);
    return () => window.removeEventListener('resize', refresh);
  }, []);
  return <>
    <h1>{designSystem.title}</h1>

    <h2>{headings.color}</h2>
    <table className="rows color-tokens">
      <thead className="sr-only"><tr><th>{columns.swatch}</th><th>{columns.name}</th><th>{columns.value}</th></tr></thead>
      <tbody>
        {colors.map(([name, token]) => <tr key={token}>
          <td><span className="swatch" style={{ background: `var(${token})` }} /></td>
          <td>{name}<code>{token}</code></td>
          <td><code>{read(token)}</code></td>
        </tr>)}
      </tbody>
    </table>

    <h2>{headings.type}</h2>
    <table className="rows">
      <thead className="sr-only"><tr><th>{columns.sample}</th><th>{columns.token}</th><th>{columns.value}</th></tr></thead>
      <tbody>
        {type.map(([name, token, weight]) => <tr key={token}>
          <td style={{ fontSize: `var(${token})`, fontWeight: weight }}>{name}</td>
          <td><code>{token}</code></td>
          <td><code>{read(token)}</code></td>
        </tr>)}
      </tbody>
    </table>

    <h2>{headings.space}</h2>
    <table className="rows">
      <thead className="sr-only"><tr><th>{columns.size}</th><th>{columns.token}</th><th>{columns.value}</th></tr></thead>
      <tbody>
        {space.map(token => <tr key={token}>
          <td><span className="bar" style={{ width: `var(${token})` }} /></td>
          <td><code>{token}</code></td>
          <td><code>{read(token)}</code></td>
        </tr>)}
      </tbody>
    </table>

    <h2>{headings.rules}</h2>
    <ul className="rows">
      {rules.map(rule => <li key={rule}>{rule}</li>)}
    </ul>

    <p><a className="link" href={site.source} target="_blank" rel="noreferrer">{designSystem.source}</a></p>
  </>;
}
