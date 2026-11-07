import { useId, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Check, Copy, Plus } from '@phosphor-icons/react'
import { GlassButton } from './components/GlassButton'
import './design-system.css'

const sections = [
  ['overview', 'overview'],
  ['color', 'color'],
  ['typography', 'typography'],
  ['spacing', 'spacing'],
  ['components', 'components'],
  ['materials', 'materials'],
  ['motion', 'motion'],
  ['principles', 'principles'],
] as const

const colors = [
  { name: 'paper', value: '#ffffff', usage: 'the page', variable: '--color-page' },
  { name: 'ink', value: '#27272a', usage: 'words that matter', variable: '--color-ink' },
  { name: 'quiet', value: '#71717a', usage: 'supporting details', variable: '--color-muted' },
  { name: 'line', value: '#e4e4e7', usage: 'a little separation', variable: '--color-line' },
  { name: 'moss', value: '#526244', usage: 'links and selected states', variable: '--color-accent' },
  { name: 'soft', value: '#f6f7f4', usage: 'a gentle surface', variable: '--color-surface' },
]

const projects = [
  { name: 'judy’s bakery', category: 'play' },
  { name: 'judy’s wishlist', category: 'play' },
  { name: 'garden by water', category: 'art' },
]

type Filter = 'all' | 'play' | 'art'

export default function DesignSystem() {
  const inputId = useId()
  const durationId = useId()
  const [copied, setCopied] = useState('')
  const [copyMessage, setCopyMessage] = useState('')
  const [name, setName] = useState('')
  const [presses, setPresses] = useState(0)
  const [filter, setFilter] = useState<Filter>('all')
  const [motion, setMotion] = useState(true)
  const [moved, setMoved] = useState(false)
  const [duration, setDuration] = useState(180)
  const [materialPresses, setMaterialPresses] = useState(0)
  const filteredProjects = projects.filter(project => filter === 'all' || project.category === filter)

  async function copyColor(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      setCopyMessage(`${value} copied`)
    } catch {
      setCopied('')
      setCopyMessage(`copy isn't available here. select the value ${value} instead.`)
    }
  }

  return <div className="ds-page" id="design-system-main">
    <header className="ds-intro" id="ds-overview">
      <p className="ds-eyebrow">a small, living system</p>
      <h1>the details behind<br className="ds-desktop-break" /> this little corner.</h1>
      <p>the type, color, and interactions shared across my portfolio and small projects. simple enough to feel familiar, with a little room to play.</p>
    </header>

    <div className="ds-layout">
      <nav className="ds-index" aria-label="design system sections">
        {sections.map(([id, label]) => <a key={id} href={`#ds-${id}`}>{label}</a>)}
      </nav>

      <div className="ds-content">
        <section className="ds-section" id="ds-color" aria-labelledby="ds-color-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">01</p>
            <h2 id="ds-color-title">color</h2>
            <p className="ds-section-description">a quiet base. one green accent. the artwork brings the rest.</p>
          </div>
          <div className="ds-colors">
            {colors.map(color => <div className="ds-color" key={color.name}>
              <button
                className="ds-swatch"
                style={{ backgroundColor: `var(${color.variable}, ${color.value})`, color: ['ink', 'quiet', 'moss'].includes(color.name) ? '#ffffff' : '#27272a' }}
                onClick={() => copyColor(color.value)}
                aria-label={`copy ${color.name}: ${color.value}`}
                title={`copy ${color.value}`}
              >
                {copied === color.value ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              </button>
              <div className="ds-color-label"><span>{color.name}</span><code>{color.value}</code></div>
              <p>{color.usage}</p>
            </div>)}
          </div>
          <p className="ds-feedback" aria-live="polite">{copyMessage || 'tap a swatch to copy its color.'}</p>
        </section>

        <section className="ds-section" id="ds-typography" aria-labelledby="ds-type-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">02</p>
            <h2 id="ds-type-title">typography</h2>
            <p className="ds-section-description">figtree throughout. easy to read, softly rounded, always lowercase.</p>
          </div>
          <div className="ds-type-sheet">
            <div className="ds-type-row"><span className="ds-type-spec">display · 40 / 48</span><span className="ds-type-display">judy xīngyǐng</span></div>
            <div className="ds-type-row"><span className="ds-type-spec">heading · 28 / 36</span><span className="ds-type-heading">a curious eye.</span></div>
            <div className="ds-type-row"><span className="ds-type-spec">body · 16 / 26</span><span className="ds-type-body">a place for things i make and notice.</span></div>
            <div className="ds-type-row"><span className="ds-type-spec">caption · 13 / 20</span><span className="ds-type-caption">little details, given a little space.</span></div>
          </div>
        </section>

        <section className="ds-section" id="ds-spacing" aria-labelledby="ds-spacing-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">03</p>
            <h2 id="ds-spacing-title">spacing</h2>
            <p className="ds-section-description">a rhythm of four. comfortable controls, generous space between ideas.</p>
          </div>
          <div className="ds-spacing-scale" aria-label="spacing scale in pixels">
            {[4, 8, 12, 16, 24, 32, 48, 64].map(value => <div className="ds-space-token" key={value}>
              <div className="ds-space-measure" aria-hidden="true"><span style={{ width: value }} /></div>
              <span>{value}<span className="ds-px">px</span></span>
            </div>)}
          </div>
          <div className="ds-layout-notes"><p><strong>24px</strong> mobile gutters</p><p><strong>64px</strong> between sections</p><p><strong>44px</strong> minimum touch target</p></div>
        </section>

        <section className="ds-section" id="ds-components" aria-labelledby="ds-components-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">04</p>
            <h2 id="ds-components-title">components</h2>
            <p className="ds-section-description">a few useful pieces, with clear focus, pressed, and selected states.</p>
          </div>
          <div className="ds-component-grid">
            <div className="ds-example">
              <h3>buttons</h3>
              <div className="ds-button-row">
                <button type="button" className="ds-button ds-button-primary" onClick={() => setPresses(value => value + 1)}>try me <Plus size={16} aria-hidden="true" /></button>
                <button type="button" className="ds-button ds-button-secondary" onClick={() => setPresses(0)}>reset</button>
              </div>
              <p className="ds-example-note" aria-live="polite">{presses === 0 ? 'ready when you are.' : `pressed ${presses} ${presses === 1 ? 'time' : 'times'}.`}</p>
            </div>
            <div className="ds-example">
              <h3>inputs</h3>
              <label className="ds-field-label" htmlFor={inputId}>your name</label>
              <input id={inputId} className="ds-input" value={name} onChange={event => setName(event.target.value)} placeholder="say hello" maxLength={50} autoComplete="off" />
              <p className="ds-example-note" aria-live="polite">{name.trim() ? `hello, ${name.trim().toLocaleLowerCase()}.` : 'a label stays visible when you type.'}</p>
            </div>
          </div>
          <div className="ds-filter-example">
            <h3>filters</h3>
            <div className="ds-filter-row" role="group" aria-label="filter example projects">
              {(['all', 'play', 'art'] as const).map(value => <button className={`ds-filter${filter === value ? ' is-selected' : ''}`} key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}
            </div>
            <ul className="ds-project-list" aria-label={`${filter} example projects`}>
              {filteredProjects.map(project => <li key={project.name}><span>{project.name}</span><span>{project.category}</span></li>)}
            </ul>
            <span className="ds-sr-only" aria-live="polite">{filteredProjects.length} examples shown</span>
          </div>
        </section>

        <section className="ds-section" id="ds-materials" aria-labelledby="ds-materials-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">05</p>
            <h2 id="ds-materials-title">a little glass</h2>
            <p className="ds-section-description">a material you can interact with. a soft tilt, a clear edge, a gentle press.</p>
          </div>
          <div className="ds-material-stage">
            <GlassButton className="ds-glass-example" onClick={() => setMaterialPresses(value => value + 1)}>take a closer look <ArrowUpRight size={18} aria-hidden="true" /></GlassButton>
            <p aria-live="polite">{materialPresses ? `a little response, ${materialPresses === 1 ? 'one press' : `${materialPresses} presses`}.` : 'move over it, tab to it, or give it a tap.'}</p>
          </div>
          <p className="ds-small-note">glass belongs on actions. photographs and words stay clear.</p>
        </section>

        <section className="ds-section" id="ds-motion" aria-labelledby="ds-motion-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">06</p>
            <h2 id="ds-motion-title">motion</h2>
            <p className="ds-section-description">brief, responsive, and easy to turn off. every action works without it.</p>
          </div>
          <div className="ds-motion-controls">
            <button type="button" className="ds-toggle" role="switch" aria-checked={motion} onClick={() => setMotion(value => !value)}><span>animate this example</span><span className={`ds-switch${motion ? ' is-on' : ''}`} aria-hidden="true"><span /></span></button>
            <div className="ds-duration-field"><label htmlFor={durationId}>duration <span>{duration}ms</span></label><input id={durationId} type="range" min="120" max="360" step="30" value={duration} onChange={event => setDuration(Number(event.target.value))} disabled={!motion} /></div>
          </div>
          <div className="ds-motion-stage">
            <button type="button" className={`ds-motion-sample${moved ? ' is-moved' : ''}`} style={{ '--ds-duration': motion ? `${duration}ms` : '0ms' } as CSSProperties} onClick={() => setMoved(value => !value)} aria-pressed={moved}>{moved ? 'and back again' : 'try a little movement'}<ArrowUpRight size={18} aria-hidden="true" /></button>
          </div>
          <p className="ds-small-note">your device’s reduced motion preference is respected, too.</p>
        </section>

        <section className="ds-section ds-principles" id="ds-principles" aria-labelledby="ds-principles-title">
          <div className="ds-section-heading">
            <p className="ds-eyebrow">07</p>
            <h2 id="ds-principles-title">a few things to keep</h2>
          </div>
          <ol>
            <li><strong>make the next step obvious.</strong><p>ordinary links, useful labels, and nothing hidden behind a trick.</p></li>
            <li><strong>let real things lead.</strong><p>my photographs, paintings, projects, and the stories behind them.</p></li>
            <li><strong>leave room to breathe.</strong><p>a simple layout that feels just as considered on a phone.</p></li>
            <li><strong>delight in the small moments.</strong><p>a button that responds. a photograph worth pausing for.</p></li>
          </ol>
        </section>
      </div>
    </div>
  </div>
}
