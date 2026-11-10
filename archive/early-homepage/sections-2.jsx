// sections-2.jsx — Work (paintings + photography merged), Sound

const { useEffect: useEffect2, useRef: useRef2, useState: useState2 } = React;

// ————————————————————————————————————————————————
// Placeholder block (swap for real images)
// ————————————————————————————————————————————————

function Placeholder({ label, ratio = 1, tone = 'mist', kind }) {
  const toneMap = {
    mist: 'linear-gradient(135deg, #B4C4BC 0%, #D4DED7 50%, #E8DCC4 100%)',
    stone: 'linear-gradient(160deg, #6B8784 0%, #3E4F4F 100%)',
    ink: 'linear-gradient(180deg, #3E4F4F 0%, #2A3A3A 100%)',
    rice: 'linear-gradient(140deg, #E8DCC4 0%, #D4DED7 100%)',
    water: 'linear-gradient(180deg, #D4DED7 0%, #B4C4BC 60%, #6B8784 100%)',
  };
  return (
    <div className="ph" style={{ aspectRatio: ratio, background: toneMap[tone] }}>
      <div className="ph-grain" />
      {kind && <div className="ph-kind">{kind}</div>}
      <div className="ph-label">
        <span className="ph-dot" />
        {label}
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————
// WORK — paintings + photography, filterable
// ————————————————————————————————————————————————

function Work() {
  const works = [
    // paintings
    { label: 'pond at dusk', meta: 'oil on linen · 2024', ratio: 4/5, tone: 'water', kind: 'oil' },
    { label: 'mother, reading', meta: 'oil on board · 2023', ratio: 3/4, tone: 'mist', kind: 'oil' },
    { label: 'suzhou window', meta: 'oil · 2023', ratio: 1, tone: 'stone', kind: 'oil' },
    { label: 'kyoto moss', meta: 'oil · 2024', ratio: 4/5, tone: 'ink', kind: 'oil' },
    { label: 'still life, peach', meta: 'oil · 2022', ratio: 1, tone: 'rice', kind: 'oil' },
    // photography
    { label: 'ryōan-ji', meta: 'kyōto · 2023', ratio: 3/4, tone: 'rice', kind: 'photo' },
    { label: 'a lake in maine', meta: '2024', ratio: 4/5, tone: 'water', kind: 'photo' },
    { label: 'fog over taihu', meta: '2022', ratio: 3/4, tone: 'mist', kind: 'photo' },
    { label: 'hokkaido pines', meta: '2023', ratio: 1, tone: 'ink', kind: 'photo' },
    { label: 'cape cod dunes', meta: '2024', ratio: 4/5, tone: 'rice', kind: 'photo' },
    { label: 'rain, shanghai alley', meta: '2022', ratio: 3/4, tone: 'stone', kind: 'photo' },
    { label: 'charles river, january', meta: '2024', ratio: 4/5, tone: 'water', kind: 'photo' },
  ];

  const [filter, setFilter] = useState2('all');
  const shown = works.filter((w) => filter === 'all' || w.kind === filter);

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="section-head">
          <span className="section-index">02 /</span>
          <h2 className="section-en-big">work</h2>
          <span className="section-en">oil &amp; lens</span>
        </div>

        <div className="work-intro">
          <p className="work-lede">
            slow work, usually at night. what the light remembers
            after the day has ended.
          </p>

          <div className="work-filter">
            {[
              { v: 'all', l: 'all' },
              { v: 'oil', l: 'paintings' },
              { v: 'photo', l: 'photography' },
            ].map((f) => (
              <button
                key={f.v}
                className={`filter-btn ${filter === f.v ? 'active' : ''}`}
                onClick={() => setFilter(f.v)}
              >
                {f.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mosaic">
          {shown.map((w, i) => (
            <figure className="mosaic-item" key={`${w.kind}-${w.label}`}>
              <Placeholder {...w} />
              <figcaption>
                <span className="cap-title">{w.label}</span>
                <span className="cap-meta">{w.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
// SOUND — Spotify
// ————————————————————————————————————————————————

function Sound() {
  const playlistId = (window.TWEAKS && window.TWEAKS.spotifyPlaylistId) || '37i9dQZF1DX4sWSpwq3LiO';

  return (
    <section id="sound" className="section sound">
      <div className="container">
        <div className="section-head">
          <span className="section-index">03 /</span>
          <h2 className="section-en-big">sound</h2>
          <span className="section-en">what's playing</span>
        </div>

        <div className="sound-grid">
          <div className="sound-copy">
            <p className="sound-quote">
              music is the space<br />between the notes.
            </p>
            <p className="sound-cite">— debussy, always on.</p>

            <p className="sound-blurb">
              a rotating pond of it — satie, sakamoto, a lot of <em>stefanie sun</em>,
              some evenings only bill evans, some only rain.
            </p>

            <ul className="sound-tags">
              <li>piano</li>
              <li>ambient</li>
              <li>jazz</li>
              <li>mandopop</li>
              <li>city pop</li>
              <li>erhu</li>
            </ul>
          </div>

          <div className="sound-embed">
            <iframe
              title="spotify playlist"
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="480"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Work, Sound, Placeholder });
