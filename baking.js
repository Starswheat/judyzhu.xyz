/* judy's bakery — chatbot flow
   vanilla js, no deps. easy to tweak. */

(() => {
  const $dialog = document.getElementById('dialog-text');
  const $cursor = document.getElementById('dialog-cursor');
  const $choices = document.getElementById('choices');
  const $progress = document.querySelectorAll('.progress .dot');

  // ─── state ─────────────────────────────────────────────────────────
  const state = {
    step: 0,                  // 0 intro → 1 texture → 2 flavor → 3 size → 4 recipe
    texture: 50,              // 0 = fuwafuwa, 100 = stodgy
    flavors: new Set(),       // 'savory' | 'bitter' | 'sweet' | 'sour'
    size: null,               // 'bite' | 'handful' | 'arm'
  };

  // ─── typing effect ────────────────────────────────────────────────
  let typingTimer = null;
  function typeText(text, onDone) {
    if (typingTimer) clearTimeout(typingTimer);
    $dialog.textContent = '';
    $cursor.classList.remove('visible');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      $dialog.textContent = text;
      $cursor.classList.add('visible');
      onDone && onDone();
      return;
    }
    let i = 0;
    const tick = () => {
      $dialog.textContent = text.slice(0, ++i);
      if (i < text.length) {
        // punctuation pauses
        const ch = text[i - 1];
        const delay = /[、。,.!?～]/.test(ch) ? 110 : 22;
        typingTimer = setTimeout(tick, delay);
      } else {
        $cursor.classList.add('visible');
        onDone && onDone();
      }
    };
    tick();
  }

  function setProgress(step) {
    $progress.forEach((d, i) => {
      d.classList.toggle('active', i === step);
      d.classList.toggle('done', i < step);
    });
  }

  function clearChoices() { $choices.innerHTML = ''; }

  function makeBtn({ emoji, label, hint, onClick, selected }) {
    const b = document.createElement('button');
    b.className = 'choice-btn' + (selected ? ' selected' : '');
    b.type = 'button';
    b.innerHTML = `
      ${emoji ? `<span class="emoji">${emoji}</span>` : ''}
      <span class="label">${label}${hint ? `<br><span class="hint">${hint}</span>` : ''}</span>
    `;
    b.addEventListener('click', onClick);
    return b;
  }

  // ─── step 0: intro ────────────────────────────────────────────────
  function stepIntro() {
    state.step = 0;
    setProgress(0);
    clearChoices();
    typeText(
      "やあ！ welcome to the tiny bakery.\n" +
      "tell me about the bread you're dreaming of today, and i'll bake you a recipe ♡"
    );
    setTimeout(() => {
      $choices.appendChild(makeBtn({
        emoji: '🥐',
        label: "let's bake!",
        hint: 'tap to begin',
        onClick: () => stepTexture(),
      }));
    }, 600);
  }

  // ─── step 1: texture slider ───────────────────────────────────────
  function stepTexture() {
    state.step = 1;
    setProgress(1);
    clearChoices();
    typeText(
      "first — what texture are you in the mood for?\n" +
      "ふわふわ soft like soufflé, or stodgy like a baguette?"
    );

    const wrap = document.createElement('div');
    wrap.className = 'slider-wrap';
    wrap.innerHTML = `
      <div class="slider-labels">
        <span>fuwafuwa<span class="jp">ふわふわ</span></span>
        <span style="text-align:right">stodgy<span class="jp">ずっしり</span></span>
      </div>
      <div class="slider-track">
        <input id="tex" type="range" min="0" max="100" value="${state.texture}" class="texture-slider" />
      </div>
      <div class="slider-readout">
        <span class="big" id="tex-big">${textureLabel(state.texture).en}</span>
        <span>${textureLabel(state.texture).note}</span>
      </div>
    `;
    $choices.appendChild(wrap);

    const slider = wrap.querySelector('#tex');
    const big = wrap.querySelector('#tex-big');
    const note = wrap.querySelector('.slider-readout span:not(.big)');
    slider.addEventListener('input', () => {
      state.texture = +slider.value;
      const t = textureLabel(state.texture);
      big.textContent = t.en;
      note.textContent = t.note;
    });

    const row = document.createElement('div');
    row.className = 'confirm-row';
    const next = document.createElement('button');
    next.className = 'btn-primary';
    next.textContent = 'next ▸';
    next.addEventListener('click', () => stepFlavor());
    row.appendChild(next);
    $choices.appendChild(row);
  }

  function textureLabel(v) {
    if (v <= 20) return { en: 'fuwafuwa ☁',  note: 'cloud-soft, milky, soufflé-ish' };
    if (v <= 45) return { en: 'pillowy ♡',   note: 'soft brioche, milk bread vibes' };
    if (v <= 65) return { en: 'tender crumb', note: 'pain de mie · open crumb' };
    if (v <= 85) return { en: 'rustic',      note: 'chewy crust, country loaf' };
    return        { en: 'stodgy 🥖',          note: 'baguette · firm bite, deep crust' };
  }

  // ─── step 2: flavors (multi-select) ───────────────────────────────
  const FLAVORS = [
    { id: 'savory', emoji: '🧀', label: 'savory',  hint: 'ham, sausage, cheese, miso' },
    { id: 'bitter', emoji: '🍫', label: 'bitter',  hint: 'matcha, cocoa, hojicha, walnut' },
    { id: 'sweet',  emoji: '🍑', label: 'sweet',   hint: 'fruits, anko, custard, honey' },
    { id: 'sour',   emoji: '🍋', label: 'sour',    hint: 'yuzu, citrus, tomato, raspberry' },
  ];

  function stepFlavor() {
    state.step = 2;
    setProgress(2);
    clearChoices();
    typeText(
      "next — what flavors are calling you?\n" +
      "pick one, or mix a few. (i love a sweet × bitter combo, personally)"
    );

    FLAVORS.forEach(f => {
      const selected = state.flavors.has(f.id);
      const btn = makeBtn({
        emoji: f.emoji,
        label: f.label,
        hint: f.hint,
        selected,
        onClick: () => {
          if (state.flavors.has(f.id)) state.flavors.delete(f.id);
          else state.flavors.add(f.id);
          btn.classList.toggle('selected');
          updateFlavorNext();
        },
      });
      $choices.appendChild(btn);
    });

    const row = document.createElement('div');
    row.className = 'confirm-row';
    row.innerHTML = `
      <button class="btn-ghost" id="flav-back">‹ back</button>
      <button class="btn-primary" id="flav-next" disabled style="opacity:0.5">pick at least one</button>
    `;
    $choices.appendChild(row);

    row.querySelector('#flav-back').addEventListener('click', stepTexture);
    row.querySelector('#flav-next').addEventListener('click', () => {
      if (state.flavors.size === 0) return;
      stepSize();
    });
    updateFlavorNext();
  }

  function updateFlavorNext() {
    const btn = document.getElementById('flav-next');
    if (!btn) return;
    if (state.flavors.size === 0) {
      btn.disabled = true; btn.style.opacity = 0.5;
      btn.textContent = 'pick at least one';
    } else {
      btn.disabled = false; btn.style.opacity = 1;
      btn.textContent = `next ▸ (${state.flavors.size} chosen)`;
    }
  }

  // ─── step 3: size ─────────────────────────────────────────────────
  const SIZES = [
    { id: 'bite',    emoji: '🐾', label: 'bite size',    hint: '1–2 bites · party tray' },
    { id: 'handful', emoji: '🤲', label: 'handful',      hint: 'one serving · pocket bread' },
    { id: 'arm',     emoji: '🥖', label: 'arm length',   hint: 'shareable loaf or baguette' },
  ];

  function stepSize() {
    state.step = 3;
    setProgress(3);
    clearChoices();
    typeText("last one — how big should it be?\nlittle pop-in-mouth, or a loaf to tear and share?");

    SIZES.forEach(s => {
      const btn = makeBtn({
        emoji: s.emoji,
        label: s.label,
        hint: s.hint,
        selected: state.size === s.id,
        onClick: () => {
          state.size = s.id;
          setTimeout(() => stepRecipe(), 280);
        },
      });
      $choices.appendChild(btn);
    });

    const row = document.createElement('div');
    row.className = 'confirm-row';
    row.innerHTML = `<button class="btn-ghost" id="size-back">‹ back</button>`;
    $choices.appendChild(row);
    row.querySelector('#size-back').addEventListener('click', stepFlavor);
  }

  // ─── step 4: recipe ───────────────────────────────────────────────
  function stepRecipe() {
    state.step = 4;
    setProgress(4);
    clearChoices();
    const r = generateRecipe(state);
    typeText(`done! i baked you something ${r.adjective} — i think you'll like it ♡`);

    const card = document.createElement('article');
    card.className = 'recipe';
    card.innerHTML = `
      <div class="recipe-stamp">★ today's bake</div>
      <h2 class="recipe-name">
        ${r.name}
        <span class="jp">${r.jpName}</span>
      </h2>
      <p class="recipe-desc">${r.desc}</p>
      <p class="recipe-inspired">${r.inspired}</p>

      <div class="recipe-section">
        <h3>ingredients</h3>
        <ul>${r.ingredients.map(x => `<li>${x}</li>`).join('')}</ul>
      </div>

      <div class="recipe-section">
        <h3>method</h3>
        <ol>${r.method.map(x => `<li>${x}</li>`).join('')}</ol>
      </div>

      <div class="recipe-meta">
        <span class="tag">${r.textureTag}</span>
        ${[...state.flavors].map(f => `<span class="tag flavor-${f}">${f}</span>`).join('')}
        <span class="tag">${r.sizeTag}</span>
        <span class="tag">bakes ${r.yield}</span>
      </div>
    `;
    $choices.appendChild(card);

    const row = document.createElement('div');
    row.className = 'confirm-row';
    row.innerHTML = `
      <button class="btn-ghost" id="r-tweak">‹ tweak</button>
      <button class="btn-primary" id="r-again">bake another ♡</button>
    `;
    $choices.appendChild(row);
    row.querySelector('#r-tweak').addEventListener('click', stepSize);
    row.querySelector('#r-again').addEventListener('click', () => {
      state.flavors = new Set();
      state.size = null;
      state.texture = 50;
      stepIntro();
    });
  }

  // ─── recipe generator ─────────────────────────────────────────────
  function generateRecipe(s) {
    const tex = s.texture;
    const flavors = [...s.flavors];
    const size = s.size;

    // base bread by texture
    let base;
    if (tex <= 25) base = {
      name: 'milk bread',  jp: 'ミルク食パン',
      dough: 'tangzhong milk bread (yudane method, 70% hydration, soft enriched dough)',
      flour: 'bread flour 280g · milk 130g · cream 30g · sugar 28g · yeast 4g · butter 28g · salt 4g',
      method: 'whisk tangzhong (20g flour + 90g milk, heat until paste). combine all dough ingredients, knead 12 min until window-pane. proof 60 min, shape, final proof 50 min, bake 175°C 22 min.'
    };
    else if (tex <= 50) base = {
      name: 'brioche bun',  jp: 'ブリオッシュ',
      dough: 'enriched brioche dough, slow cold proof for flavor',
      flour: 'bread flour 250g · egg 2 · milk 80g · sugar 30g · yeast 5g · butter 80g · salt 5g',
      method: 'mix flour, egg, milk, sugar, yeast. knead 10 min, gradually add butter. cold proof overnight. shape, proof 90 min, egg wash, bake 180°C 16 min.'
    };
    else if (tex <= 70) base = {
      name: 'pain de mie',  jp: 'パン・ド・ミ',
      dough: 'open-crumb white pan loaf, gentle hand',
      flour: 'bread flour 320g · water 200g · poolish 80g · yeast 3g · butter 16g · salt 6g',
      method: 'mix poolish night before. knead all 8 min, bulk 90 min with one fold. shape, proof 60 min, score, bake 220°C with steam, then 200°C total 28 min.'
    };
    else if (tex <= 85) base = {
      name: 'country loaf',  jp: 'カンパーニュ',
      dough: 'pain de campagne — wild yeast, 75% hydration, mostly white with a kiss of rye',
      flour: 'bread flour 360g · whole wheat 30g · rye 10g · water 300g · levain 80g · salt 8g',
      method: 'autolyse 40 min, add levain & salt. four folds over 3 hr. pre-shape, bench rest, shape into banneton. cold proof overnight. bake in dutch oven 250°C 20 min lid on, 230°C 22 min lid off.'
    };
    else base = {
      name: 'baguette',  jp: 'バゲット',
      dough: 'lean baguette — flour, water, salt, yeast. long cold fermentation, crackly crust',
      flour: 'T65 flour 400g · water 280g · yeast 1g · salt 8g',
      method: 'mix, autolyse 30 min, add salt. fold every 30 min × 3. bulk 18 hr in fridge. divide, pre-shape, rest 30 min. shape baguettes, proof on couche 50 min. score, bake 250°C with heavy steam, total 20 min.'
    };

    // flavor add-ins
    const addIns = [];
    const fillings = [];
    if (flavors.includes('savory')) addIns.push(...sample(['cured ham 60g', 'milk sausage 2 · grain mustard 1 tbsp', 'comté or gouda 50g shredded', 'white miso 1 tsp + butter', 'corn kernels 40g + black pepper'], 1));
    if (flavors.includes('bitter')) addIns.push(...sample(['matcha powder 6g', 'cocoa powder 12g + 60% chocolate chunks 50g', 'hojicha tea ground 4g', 'roasted walnut 40g'], 1));
    if (flavors.includes('sweet'))  addIns.push(...sample(['anko (sweet red bean paste) 80g', 'banana, sliced · brown sugar dust', 'apple compote (apple 1 + sugar 20g + lemon)', 'blueberries 60g + honey 1 tbsp', 'custard cream 80g'], 1));
    if (flavors.includes('sour'))   addIns.push(...sample(['yuzu marmalade 30g', 'sun-dried tomato 30g + olive oil', 'lemon zest from 1 lemon', 'cream cheese 40g + raspberry 30g'], 1));

    // size adjustments
    const sizeData = {
      bite:    { tag: 'bite-size',  yield: '12 small pieces',   shape: 'pinch into walnut-sized rounds',        bakeNote: 'bake 2 min shorter, watch closely' },
      handful: { tag: 'handful',    yield: '6 buns',            shape: 'divide into 6, round and tuck seams down', bakeNote: 'standard time as above' },
      arm:     { tag: 'arm-length', yield: '1 loaf or baguette', shape: 'shape as a single loaf / baguette',     bakeNote: 'add 6–8 min to bake time' },
    };
    const sz = sizeData[size];

    // build name based on dominant flavor + base
    const namePicks = buildName(base, flavors, addIns);

    // assemble ingredients & method
    const ingredients = [base.flour];
    addIns.forEach(a => ingredients.push(a));
    if (sz.tag !== 'handful') ingredients.push(`(yield: ${sz.yield})`);

    const method = [
      base.method,
      addIns.length
        ? `gently fold in/place filling — ${addIns.join('; ')} — after the first proof, then ${sz.shape}.`
        : `${sz.shape} after the first proof.`,
      `final proof ${tex > 70 ? '45–55 min' : '50–60 min'}, then bake. ${sz.bakeNote}`,
      `cool on a rack at least 20 min before tearing in — the crumb is still setting ♡`,
    ];

    // inspired-by note
    const inspiredOptions = [
      `inspired by pain des philosophes in tokyo — where french fundamentals meet a quiet japanese touch.`,
      `nodding to pain stock in fukuoka — long ferments, wild yeast, a deep crust you can hear.`,
      `somewhere between a tokyo morning bakery and a fukuoka neighborhood oven — humble, generous, a little nerdy.`,
      `the kind of bread you'd find on a small wooden shelf at pain des philosophes, between a kouign-amann and a country loaf.`,
    ];

    // texture tag
    const texTag = textureLabel(tex).en.replace(/[☁♡🥖 ]/g, '').trim() || 'soft';

    // adjective for opening line
    const adjectives = ['warm', 'cozy', 'pillowy', 'a little nerdy', 'soft-hearted', 'crusty in the best way', 'sunny'];

    return {
      name: namePicks.en,
      jpName: namePicks.jp,
      desc: namePicks.desc + ' ' + (base.dough ? base.dough.charAt(0).toUpperCase() + base.dough.slice(1) + '.' : ''),
      inspired: pick(inspiredOptions),
      ingredients,
      method,
      textureTag: texTag,
      sizeTag: sz.tag,
      yield: sz.yield,
      adjective: pick(adjectives),
    };
  }

  function buildName(base, flavors, addIns) {
    // a small lexicon: combine flavor noun + base bread
    const fNouns = {
      savory: ['ham & cheese', 'miso butter', 'sausage', 'corn'],
      bitter: ['matcha', 'cocoa', 'hojicha', 'walnut'],
      sweet:  ['anko', 'banana', 'apple', 'blueberry honey', 'custard cream'],
      sour:   ['yuzu', 'lemon', 'sun-dried tomato', 'raspberry cream cheese'],
    };
    const jpNouns = {
      savory: ['ハム＆チーズ', '味噌バター', 'ソーセージ', 'コーン'],
      bitter: ['抹茶', 'ココア', 'ほうじ茶', 'くるみ'],
      sweet:  ['あんこ', 'バナナ', 'りんご', 'ブルーベリー蜂蜜', 'カスタード'],
      sour:   ['ゆず', 'レモン', 'ドライトマト', 'ラズベリークリームチーズ'],
    };
    const picks = flavors.map(f => pick(fNouns[f]));
    const jpPicks = flavors.map(f => pick(jpNouns[f]));

    const flavorEn = picks.length ? picks.join(' × ') : 'plain';
    const flavorJp = jpPicks.length ? jpPicks.join('×') : 'プレーン';

    const en = `${flavorEn} ${base.name}`.replace(/\s+/g, ' ').toLowerCase();
    const jp = `${flavorJp}${base.jp}`;
    const desc = `a ${flavorEn.toLowerCase()} take on ${base.name}.`;

    return { en, jp, desc };
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function sample(arr, n) {
    const a = [...arr];
    const out = [];
    while (out.length < n && a.length) {
      out.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]);
    }
    return out;
  }

  // ─── kickoff ──────────────────────────────────────────────────────
  stepIntro();
})();
