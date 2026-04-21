// tweaks.jsx — Tweaks panel (toggled by host)

const { useEffect: useEffectT, useState: useStateT } = React;

function Tweaks() {
  const [visible, setVisible] = useStateT(false);
  const [state, setState] = useStateT(window.TWEAKS || {});

  useEffectT(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const update = (key, val) => {
    const next = { ...state, [key]: val };
    setState(next);
    window.TWEAKS = next;
    applyTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  useEffectT(() => { applyTweaks(state); }, []);

  if (!visible) return null;

  return (
    <div className={`tweaks-panel visible`}>
      <h3>tweaks</h3>

      <div className="tweaks-row">
        <label>palette</label>
        <select value={state.palette} onChange={(e) => update('palette', e.target.value)}>
          <option value="sage">sage (default)</option>
          <option value="mist">misty blue</option>
          <option value="stone">warm stone</option>
          <option value="ink">deep ink</option>
        </select>
      </div>

      <div className="tweaks-row">
        <label>motion</label>
        <input
          type="range"
          min="0" max="100" step="5"
          value={Math.round((state.motionIntensity || 0.65) * 100)}
          onChange={(e) => update('motionIntensity', parseInt(e.target.value, 10) / 100)}
        />
      </div>

      <div className="tweaks-row">
        <label>hero</label>
        <select value={state.heroConcept} onChange={(e) => update('heroConcept', e.target.value)}>
          <option value="ripples">ripples</option>
          <option value="stillness">stillness</option>
        </select>
      </div>

      <div className="tweaks-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
        <label>spotify playlist id</label>
        <input
          type="text"
          value={state.spotifyPlaylistId || ''}
          onChange={(e) => update('spotifyPlaylistId', e.target.value)}
          style={{
            background: 'transparent',
            border: '1px solid var(--line)',
            padding: '6px 8px',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--ink)',
          }}
        />
      </div>
    </div>
  );
}

function applyTweaks(t) {
  if (!t) return;
  const root = document.documentElement;
  // palette swap
  const palettes = {
    sage: { paper: '#F2F4F1', ink: '#2A3A3A', stone: '#6B8784', mist: '#B4C4BC', rice: '#E8DCC4' },
    mist: { paper: '#EDEFF3', ink: '#222838', stone: '#4A5878', mist: '#8896B4', rice: '#C9B37A' },
    stone: { paper: '#F4F1EC', ink: '#1A1A1A', stone: '#3E4A4A', mist: '#9BA8A8', rice: '#BFA67A' },
    ink: { paper: '#E8EEF1', ink: '#1C2B36', stone: '#5A7A8A', mist: '#A8BFC9', rice: '#D6C7A8' },
  };
  const p = palettes[t.palette] || palettes.sage;
  root.style.setProperty('--paper', p.paper);
  root.style.setProperty('--ink', p.ink);
  root.style.setProperty('--stone', p.stone);
  root.style.setProperty('--mist', p.mist);
  root.style.setProperty('--rice', p.rice);

  // hero concept (stillness disables some motion)
  if (t.heroConcept === 'stillness') {
    document.body.classList.add('still');
  } else {
    document.body.classList.remove('still');
  }

  // spotify playlist
  const iframe = document.querySelector('.playlist-embed iframe');
  if (iframe && t.spotifyPlaylistId) {
    const currentSrc = iframe.src;
    const newSrc = `https://open.spotify.com/embed/playlist/${t.spotifyPlaylistId}?utm_source=generator&theme=0`;
    if (currentSrc !== newSrc) iframe.src = newSrc;
  }
}

Object.assign(window, { Tweaks, applyTweaks });
