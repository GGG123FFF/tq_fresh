/**
 * Orb puzzle feedback.
 *
 * The Sanctum's five orbs have to be lit in WUBRG order. A wrong tap silently
 * cleared everything with nothing but a buzz — you were told you'd failed but
 * not that a reset had happened, which reads as the app dropping your taps
 * rather than as a puzzle.
 *
 * The class goes on <body>, not on the orbs. The orbs are React-rendered and
 * their className comes from props, so anything set directly on them is wiped
 * by the re-render that clears the puzzle — which happens immediately.
 */

const STYLE_ID = 'tq-orb-style';

function styles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes tqOrbReject {
      0%   { transform: translateX(0);    filter: none; }
      15%  { transform: translateX(-5px); filter: hue-rotate(-40deg) brightness(1.5); }
      35%  { transform: translateX(5px);  filter: hue-rotate(-40deg) brightness(1.5); }
      55%  { transform: translateX(-3px); filter: hue-rotate(-40deg) brightness(1.2); }
      75%  { transform: translateX(3px);  filter: none; }
      100% { transform: translateX(0);    filter: none; }
    }
    body.tq-orb-reject .tq-orb { animation: tqOrbReject 420ms ease-out; }
    body.tq-orb-reject .tq-orb-rail {
      box-shadow: 0 0 18px var(--tq-danger);
      border-color: var(--tq-danger) !important;
    }
    @keyframes tqOrbAccept { 50% { transform: scale(1.18); } }
    body.tq-orb-accept .tq-orb:last-of-type { animation: tqOrbAccept 260ms ease-out; }
    @media (prefers-reduced-motion: reduce) {
      body.tq-orb-reject .tq-orb, body.tq-orb-accept .tq-orb:last-of-type { animation: none; }
    }
  `;
  document.head.appendChild(s);
}

let rejectTimer = null;

export function orbReject() {
  styles();
  clearTimeout(rejectTimer);
  document.body.classList.remove('tq-orb-reject');
  // Force a reflow so the animation restarts on a second wrong tap.
  void document.body.offsetWidth;
  document.body.classList.add('tq-orb-reject');
  rejectTimer = setTimeout(() => document.body.classList.remove('tq-orb-reject'), 460);
}

export function orbAccept() {
  styles();
  document.body.classList.add('tq-orb-accept');
  setTimeout(() => document.body.classList.remove('tq-orb-accept'), 280);
}

export function install() {
  styles();
  window.TQ = window.TQ || {};
  window.TQ.orbReject = orbRejectCounted;
  window.TQ.orbAccept = orbAccept;
  window.TQ.orbResetHints = orbResetHints;
}

// ---------------------------------------------------------------------------
// Escalating hint
// ---------------------------------------------------------------------------
/**
 * After three wrong attempts, nudge. The standing hint says the orbs
 * "remember an order", which tells you there is one but not which — fair for
 * a first go, less fair on the fourth. This points at WUBRG without saying it.
 */
let rejects = 0;

function nudge() {
  const existing = document.getElementById('tq-orb-nudge');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.id = 'tq-orb-nudge';
  Object.assign(n.style, {
    position: 'fixed', left: '50%', bottom: '14%', transform: 'translateX(-50%)',
    zIndex: '126', maxWidth: '78%', padding: '9px 14px', borderRadius: '4px',
    background: 'rgba(10,6,4,0.95)', border: '1px solid var(--tq-edge-strong)',
    fontFamily: 'var(--tq-text)', fontSize: '14px', fontStyle: 'italic',
    color: 'var(--tq-ink-dim)', textAlign: 'center', pointerEvents: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.7)',
  });
  n.textContent = rejects >= 6
    ? 'the order every mana symbol is printed in'
    : 'the order a card lists its colours';
  document.body.appendChild(n);
  n.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, fill: 'forwards' });
  setTimeout(() => {
    n.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' })
      .onfinish = () => n.remove();
  }, 4200);
}

const baseReject = orbReject;
export function orbRejectCounted() {
  rejects += 1;
  baseReject();
  if (rejects === 3 || rejects === 6) setTimeout(nudge, 500);
}

export function orbResetHints() {
  rejects = 0;
  const n = document.getElementById('tq-orb-nudge');
  if (n) n.remove();
}
