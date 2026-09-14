/**
 * The Seal.
 *
 * Seven taps on the title opens the Sanctum. Before this, the only feedback
 * was a faint text-shadow at tap five — so the secret was invisible until you
 * already knew it was there, and there was no sense of working a lock.
 *
 * Now each tap traces another seventh of a sigil and lights another rune, the
 * ring accelerates as it nears completion, and the seventh tap breaks it open.
 * Nothing here is discoverable by accident, which is the point; but once you
 * know, it should feel like something is being unlocked.
 *
 * Pure SVG, pointer-events: none, sits below the Sanctum panel's z-index.
 */

const NS = 'http://www.w3.org/2000/svg';
const STEPS = 7;
const R_OUTER = 92;
const R_INNER = 60;
const ID = 'tq-seal';

let el = null;
let fadeTimer = null;

function svg(tag, attrs) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}

function styles() {
  if (document.getElementById('tq-seal-style')) return;
  const s = document.createElement('style');
  s.id = 'tq-seal-style';
  s.textContent = `
    #${ID} {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none; opacity: 0;
      transition: opacity 420ms ease-out;
    }
    #${ID}.tq-seal-on { opacity: 1; }
    #${ID} .ring-outer { transform-origin: center; animation: tqSealSpin 24s linear infinite; }
    #${ID} .ring-inner { transform-origin: center; animation: tqSealSpin 16s linear infinite reverse; }
    #${ID}.near .ring-outer { animation-duration: 7s; }
    #${ID}.near .ring-inner { animation-duration: 4s; }
    #${ID} .rune { opacity: 0.12; transition: opacity 260ms ease-out; }
    #${ID} .rune.lit { opacity: 1; }
    #${ID} .arc { transition: stroke-dashoffset 340ms cubic-bezier(.22,1,.36,1); }
    #${ID} .core { transform-origin: center; transition: transform 300ms ease-out, opacity 300ms; }
    #${ID}.near .core { animation: tqSealPulse 900ms ease-in-out infinite; }
    @keyframes tqSealSpin { to { transform: rotate(360deg); } }
    @keyframes tqSealPulse { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
    @keyframes tqSealBreak {
      0%   { transform: scale(1);    opacity: 1; filter: brightness(1); }
      35%  { transform: scale(1.08); opacity: 1; filter: brightness(2.4); }
      100% { transform: scale(2.2);  opacity: 0; filter: brightness(1); }
    }
    #${ID}.breaking .stack { animation: tqSealBreak 620ms cubic-bezier(.3,0,.2,1) forwards; }
    #${ID} .flash { opacity: 0; }
    #${ID}.breaking .flash { animation: tqSealFlash 520ms ease-out forwards; }
    @keyframes tqSealFlash { 0% { opacity: 0 } 18% { opacity: .8 } 100% { opacity: 0 } }
    @media (prefers-reduced-motion: reduce) {
      #${ID} .ring-outer, #${ID} .ring-inner, #${ID} .core { animation: none !important; }
    }
  `;
  document.head.appendChild(s);
}

function build() {
  styles();
  const host = document.createElement('div');
  host.id = ID;

  const s = svg('svg', { width: 260, height: 260, viewBox: '-130 -130 260 260' });
  const stack = svg('g', { class: 'stack' });

  // Soft flash plate for the break
  stack.appendChild(svg('circle', {
    class: 'flash', r: 126, fill: 'var(--tq-gold-bright)', opacity: 0,
  }));

  // Faint guide rings — always there once visible, so the shape reads as a lock
  const outer = svg('g', { class: 'ring-outer' });
  outer.appendChild(svg('circle', {
    r: R_OUTER, fill: 'none', stroke: 'var(--tq-gold)',
    'stroke-opacity': 0.16, 'stroke-width': 1,
  }));
  // Tick marks, one per step
  for (let i = 0; i < STEPS; i++) {
    const a = (i / STEPS) * Math.PI * 2 - Math.PI / 2;
    outer.appendChild(svg('line', {
      x1: Math.cos(a) * (R_OUTER - 7), y1: Math.sin(a) * (R_OUTER - 7),
      x2: Math.cos(a) * (R_OUTER + 7), y2: Math.sin(a) * (R_OUTER + 7),
      stroke: 'var(--tq-gold)', 'stroke-opacity': 0.3, 'stroke-width': 1,
    }));
  }
  stack.appendChild(outer);

  // The traced arc — one seventh per tap
  const circumference = 2 * Math.PI * R_OUTER;
  const arc = svg('circle', {
    class: 'arc', r: R_OUTER, fill: 'none',
    stroke: 'var(--tq-gold-bright)', 'stroke-width': 2.5, 'stroke-linecap': 'round',
    'stroke-dasharray': circumference, 'stroke-dashoffset': circumference,
    transform: 'rotate(-90)',
    filter: 'drop-shadow(0 0 6px rgba(245,217,143,0.65))',
  });
  stack.appendChild(arc);

  // Inner counter-rotating ring with the runes
  const inner = svg('g', { class: 'ring-inner' });
  inner.appendChild(svg('circle', {
    r: R_INNER, fill: 'none', stroke: 'var(--tq-gold)',
    'stroke-opacity': 0.12, 'stroke-width': 1, 'stroke-dasharray': '3 7',
  }));
  const runes = [];
  for (let i = 0; i < STEPS; i++) {
    const a = (i / STEPS) * Math.PI * 2 - Math.PI / 2;
    const g = svg('g', {
      class: 'rune',
      transform: `translate(${Math.cos(a) * R_INNER} ${Math.sin(a) * R_INNER}) rotate(${(a * 180) / Math.PI + 90})`,
    });
    // A small angular glyph — deliberately not a letter from anywhere
    g.appendChild(svg('path', {
      d: 'M0,-7 L5,0 L0,7 L-5,0 Z M0,-3 L0,3',
      fill: 'none', stroke: 'var(--tq-gold-bright)', 'stroke-width': 1.6,
      'stroke-linejoin': 'round',
      filter: 'drop-shadow(0 0 4px rgba(245,217,143,0.8))',
    }));
    inner.appendChild(g);
    runes.push(g);
  }
  stack.appendChild(inner);

  // Core: a keyhole that widens as the seal fills
  const core = svg('g', { class: 'core' });
  core.appendChild(svg('circle', {
    r: 15, fill: 'none', stroke: 'var(--tq-gold)', 'stroke-width': 1.4, 'stroke-opacity': 0.7,
  }));
  core.appendChild(svg('path', {
    d: 'M0,-6 a6,6 0 1,1 -0.01,0 M-3.2,4 L3.2,4 L1.8,13 L-1.8,13 Z',
    fill: 'var(--tq-gold-bright)', opacity: 0.9,
  }));
  stack.appendChild(core);

  s.appendChild(stack);
  host.appendChild(s);
  document.body.appendChild(host);

  return { host, arc, runes, core, circumference };
}

function ensure() {
  if (el && document.body.contains(el.host)) return el;
  el = build();
  return el;
}

/** Called on every title tap. `n` is 1..7. */
export function sealProgress(n) {
  const e = ensure();
  clearTimeout(fadeTimer);
  e.host.classList.remove('breaking');
  e.host.classList.add('tq-seal-on');
  e.host.classList.toggle('near', n >= 5);

  const frac = Math.min(n, STEPS) / STEPS;
  e.arc.setAttribute('stroke-dashoffset', String(e.circumference * (1 - frac)));
  e.runes.forEach((r, i) => r.classList.toggle('lit', i < n));
  e.core.setAttribute('transform', `scale(${1 + frac * 0.5})`);

  // The tap streak resets after three seconds; the seal should fade with it.
  fadeTimer = setTimeout(() => hide(), 3200);
}

/** Called on the seventh tap, just before the Sanctum opens. */
export function sealBreak() {
  const e = ensure();
  clearTimeout(fadeTimer);
  e.host.classList.add('tq-seal-on', 'breaking');
  fadeTimer = setTimeout(() => hide(), 700);
}

export function hide() {
  if (!el) return;
  el.host.classList.remove('tq-seal-on', 'near', 'breaking');
  el.arc.setAttribute('stroke-dashoffset', String(el.circumference));
  el.runes.forEach((r) => r.classList.remove('lit'));
  el.core.setAttribute('transform', 'scale(1)');
}

export function install() {
  window.TQ = window.TQ || {};
  window.TQ.sealProgress = sealProgress;
  window.TQ.sealBreak = sealBreak;
  window.TQ.sealHide = hide;
}
