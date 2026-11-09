import { site } from '../content';

// Tokens are defined once, in :root of styles.css. This page reads their values
// from the document, so it can never drift from what the site uses.
const read = (token: string) => getComputedStyle(document.documentElement).getPropertyValue(token).trim();

const colors = [
  ['Ink', '--color-page'],
  ['Surface', '--color-surface'],
  ['Raised', '--color-raised'],
  ['Line', '--color-line'],
  ['Chalk', '--color-ink'],
  ['Silver', '--color-muted'],
  ['Osmanthus', '--color-accent'],
] as const;
const type = [['Title', '--text-title', 600], ['Body', '--text-body', 400], ['Small', '--text-small', 400]] as const;
const space = ['--space-1', '--space-2', '--space-3', '--space-4', '--space-6', '--space-8', '--space-12', '--space-16', '--space-24'];
const rules = [
  'One gold mark per screen.',
  'Sentence case.',
  'No taglines, helper text or secondary labels. If a screen needs one, change the layout.',
  'Every colour, size and space comes from a token.',
];

export default function DesignSystem() {
  return <>
    <h1>Design system</h1>

    <h2>Color</h2>
    <table className="rows">
      <thead className="sr-only"><tr><th>Swatch</th><th>Name</th><th>Token</th><th>Value</th></tr></thead>
      <tbody>
        {colors.map(([name, token]) => <tr key={token}>
          <td><span className="swatch" style={{ background: `var(${token})` }} /></td>
          <td>{name}</td>
          <td><code>{token}</code></td>
          <td><code>{read(token)}</code></td>
        </tr>)}
      </tbody>
    </table>

    <h2>Type</h2>
    <table className="rows">
      <thead className="sr-only"><tr><th>Sample</th><th>Token</th><th>Value</th></tr></thead>
      <tbody>
        {type.map(([name, token, weight]) => <tr key={token}>
          <td style={{ fontSize: `var(${token})`, fontWeight: weight }}>{name}</td>
          <td><code>{token}</code></td>
          <td><code>{read(token)}</code></td>
        </tr>)}
      </tbody>
    </table>

    <h2>Space</h2>
    <table className="rows">
      <thead className="sr-only"><tr><th>Size</th><th>Token</th><th>Value</th></tr></thead>
      <tbody>
        {space.map(token => <tr key={token}>
          <td><span className="bar" style={{ width: `var(${token})` }} /></td>
          <td><code>{token}</code></td>
          <td><code>{read(token)}</code></td>
        </tr>)}
      </tbody>
    </table>

    <h2>Rules</h2>
    <ul className="rows">
      {rules.map(rule => <li key={rule}>{rule}</li>)}
    </ul>

    <p><a className="link" href={site.source} target="_blank" rel="noreferrer">Source on GitHub</a></p>
  </>;
}
