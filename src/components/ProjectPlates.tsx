// Project thumbnails drawn from one system: a dark wall, one opening with a lit
// reveal, a line drawing seen through it, and a single gold seal.
// The two subjects are 星 and 颖: a star to wish on, and an ear of wheat.
const VIEW = { viewBox: '0 0 600 400', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true, focusable: false } as const;
const HEXAGON = '496,196 428,313.8 292,313.8 224,196 292,78.2 428,78.2';
const STARS = [[286, 262], [322, 226], [366, 244], [398, 198], [446, 216]] as const;
const STEM = [[352, 326], [356, 230], [380, 112]] as const;

const round = (value: number) => Math.round(value * 10) / 10;

// One grain on the stem's curve: where it sits, how far it turns, and its awn.
function grain(t: number, side: -1 | 0 | 1) {
  const [[x0, y0], [x1, y1], [x2, y2]] = STEM, u = 1 - t;
  const x = u * u * x0 + 2 * u * t * x1 + t * t * x2, y = u * u * y0 + 2 * u * t * y1 + t * t * y2;
  const turn = Math.atan2(2 * u * (x1 - x0) + 2 * t * (x2 - x1), -(2 * u * (y1 - y0) + 2 * t * (y2 - y1))) + side * .46;
  const dx = Math.sin(turn), dy = -Math.cos(turn), cx = x + dx * 14, cy = y + dy * 14;
  return { cx: round(cx), cy: round(cy), turn: round(turn * 180 / Math.PI), x1: round(cx + dx * 13), y1: round(cy + dy * 13), x2: round(cx + dx * 44), y2: round(cy + dy * 44) };
}
const EAR = [.5, .6, .7, .8, .9].flatMap(t => [grain(t, -1), grain(t + .05, 1)]);
const TIP = grain(1, 0);

function WallLight({ id }: { id: string }) {
  return <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" className="plate-light" /><stop offset=".6" className="plate-light plate-light-end" /></linearGradient>;
}

// A round gate. Through it, an ear of wheat with one gold grain at its tip.
export function BakeryPlate() {
  return <svg className="plate" {...VIEW}>
    <defs><WallLight id="plate-bakery-light" /><clipPath id="plate-bakery-gate"><circle cx="360" cy="196" r="128" /></clipPath></defs>
    <rect width="600" height="400" fill="url(#plate-bakery-light)" />
    <circle className="plate-reveal" cx="360" cy="196" r="128" />
    <g clipPath="url(#plate-bakery-gate)">
      <circle className="plate-opening" cx="368" cy="204" r="128" />
      <path className="plate-line" d="M352 326Q356 230 380 112M353.6 296.7Q392 262 428 284" />
      {[...EAR, TIP].map(g => <line className="plate-thread" key={`awn-${g.cx}`} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} />)}
      {EAR.map(g => <ellipse className="plate-grain" key={`grain-${g.cx}`} cx={g.cx} cy={g.cy} rx="5.5" ry="13" transform={`rotate(${g.turn} ${g.cx} ${g.cy})`} />)}
      <ellipse className="plate-seal" cx={TIP.cx} cy={TIP.cy} rx="5.5" ry="13" transform={`rotate(${TIP.turn} ${TIP.cx} ${TIP.cy})`} />
    </g>
    <circle className="plate-edge" cx="360" cy="196" r="128" />
  </svg>;
}

// A six-sided window. Through it, a small constellation and the one gold star.
export function WishlistPlate() {
  return <svg className="plate" {...VIEW}>
    <defs><WallLight id="plate-wishlist-light" /><clipPath id="plate-wishlist-gate"><polygon points={HEXAGON} /></clipPath></defs>
    <rect width="600" height="400" fill="url(#plate-wishlist-light)" />
    <polygon className="plate-reveal" points={HEXAGON} />
    <g clipPath="url(#plate-wishlist-gate)">
      <polygon className="plate-opening" points={HEXAGON} transform="translate(8 8)" />
      <polyline className="plate-thread" points={STARS.map(point => point.join(',')).join(' ')} />
      <line className="plate-thread" x1="398" y1="198" x2="386" y2="134" />
      {STARS.map(([x, y]) => <circle className="plate-dot" key={`${x}-${y}`} cx={x} cy={y} r="2.4" />)}
      <circle className="plate-seal" cx="386" cy="134" r="6.5" />
    </g>
    <polygon className="plate-edge" points={HEXAGON} />
  </svg>;
}
