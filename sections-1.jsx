// sections-1.jsx — Hero + Life (bio, tight)

const { useEffect, useRef, useState } = React;

// ————————————————————————————————————————————————
// HERO
// ————————————————————————————————————————————————

function Hero() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="pond" className="hero">
      <canvas id="pond-canvas" className="pond-canvas" />
      <div className="light-beam" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="dot" />
          <span>open to projects</span>
          <span className="eyebrow-sep">·</span>
          <span>boston</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-name">judy zhu</span>
          <span className="hero-cn-accent">星颖</span>
        </h1>

        <p className="hero-sub">
          still water, moving light.<br />
          a life spent between <em>suzhou</em>, <em>shanghai</em>, <em>hong kong</em>, <em>tokyo</em>,
          and both coasts of the sea.
        </p>

        <div className="hero-meta">
          <span>41.36°N</span>
          <span className="sep">·</span>
          <span>71.05°W</span>
          <span className="sep">·</span>
          <span className="hero-meta-cn">朱星颖</span>
        </div>
      </div>

      <div className={`hero-scroll ${scrolled ? 'faded' : ''}`}>
        <span>scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
// LIFE — bio, tight (2-3 paragraphs)
// ————————————————————————————————————————————————

function Life() {
  return (
    <section id="life" className="section life">
      <div className="container">
        <div className="section-head">
          <span className="section-index">01 /</span>
          <h2 className="section-en-big">life</h2>
          <span className="section-en">a short note</span>
        </div>

        <div className="life-grid">
          <div className="life-prose">
            <p>
              i grew up in <em>suzhou</em>, crossed to silicon valley at fifteen,
              studied in los angeles, and now keep a small apartment in <em>boston</em>.
              in between, there was always <em>shanghai</em>, <em>hong kong</em>, <em>tokyo</em> —
              places that collect, the way rain collects in a stone basin.
            </p>
            <p>
              by day i build <em>ai for supply chains</em>. before that, customer intelligence
              at estée lauder, and earlier chapters at avex usa, huatai securities,
              and hong kong biotech banking. analytic work, always cross-cultural.
            </p>
            <p>
              by the quiet hours: oil painting, a film camera, tea ceremony,
              a freshly-minted cordon bleu pastry certificate, a bartender's
              licence, and far too many pour-overs. three languages out loud —
              chinese, english, japanese — and one whispered at home, shanghainese.
            </p>
          </div>

          <aside className="life-meta">
            <div className="life-meta-row">
              <span className="k">based</span>
              <span className="v">boston, ma</span>
            </div>
            <div className="life-meta-row">
              <span className="k">from</span>
              <span className="v">suzhou <span className="cn-whisper">苏州</span></span>
            </div>
            <div className="life-meta-row">
              <span className="k">languages</span>
              <span className="v">en · 中文 · 日本語 · 上海话</span>
            </div>
            <div className="life-meta-row">
              <span className="k">work</span>
              <span className="v">supply-chain ai / consulting</span>
            </div>
            <div className="life-meta-row">
              <span className="k">practice</span>
              <span className="v">oil, lens, tea, pastry, bar</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Life });
