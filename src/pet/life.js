/**
 * Pet life.
 *
 * The pet had state — hunger, boredom, mood, XP, three growth stages — but no
 * behaviour. It sat perfectly still in its frame whatever was happening to it,
 * which is why it read as a picture rather than a creature.
 *
 * This gives it things to do on its own: it breathes, it fidgets, it tells you
 * what it wants, it reacts when you touch it, and it sleeps at night. None of
 * it changes the underlying model — the pet is exactly as hungry as it was —
 * but a Tamagotchi is mostly the illusion that something is in there.
 *
 * Animation goes through the Web Animations API rather than inline styles,
 * because the portrait is React-rendered and anything written to style or
 * className is wiped on the next render. WAAPI animations survive it.
 */

const STYLE_ID = 'tq-petlife-style';
const OVERLAY = 'tq-pet-overlay';

let host = null;          // the portrait element we're attached to
let overlay = null;
let bubble = null;
let state = {};
let idleTimer = null;
let bubbleTimer = null;
let breathing = null;
let lastBubbleAt = 0;

// --------------------------------------------------------------------------
// What it says. Keyed by what it currently wants most.
// --------------------------------------------------------------------------
const LINES = {
  asleep: ['…', 'zzz', 'dreaming of tokens'],
  starving: [
    'I could eat a Phyrexian.',
    'Feed me. Please.',
    'My stomach is making the noise again.',
  ],
  hungry: ['Peckish.', 'Is it feeding time?', 'I smell nothing. This is a problem.'],
  bored: [
    'Play with me?',
    'I have counted the stars twice.',
    'Something. Anything. Please.',
  ],
  lonely: ['You were gone a while.', 'I waited.', 'Oh! You came back.'],
  content: [
    'All is well.',
    'A good day.',
    'I like it here.',
    'Warm. Fed. Content.',
  ],
  happy: [
    'Best day.',
    'I feel enormous.',
    'Did you see me? I was magnificent.',
    'More of this, please.',
  ],
  petted: ['Mmm.', 'Again.', 'That is the good spot.', 'Purring. Metaphorically.'],
  fed: ['Delicious.', 'Finally.', 'Thank you.', 'That will do nicely.'],
  played: ['Again! Again!', 'I win.', 'Good game.', 'That was fun.'],
  grew: ['Something is different.', 'I feel bigger.', 'Look at me now.'],
};

function pick(key, name) {
  const pool = LINES[key] || LINES.content;
  const line = pool[Math.floor(Math.random() * pool.length)];
  return name && Math.random() < 0.2 ? `${line}` : line;
}

/** What the pet most wants right now. */
function need(s) {
  if (s.asleep) return 'asleep';
  if (s.hunger >= 90) return 'starving';
  if (s.hunger >= 70) return 'hungry';
  if (s.boredom >= 75) return 'bored';
  if (s.awayHours >= 20) return 'lonely';
  if (s.hunger < 25 && s.boredom < 25) return 'happy';
  return 'content';
}

// --------------------------------------------------------------------------
function styles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .${OVERLAY} {
      position: absolute; inset: 0; pointer-events: none;
      overflow: visible; z-index: 3;
    }
    .tq-pet-bubble {
      position: absolute; left: 50%; top: -6px;
      transform: translate(-50%, -100%) scale(0.9);
      max-width: 88%; padding: 7px 11px; border-radius: 4px;
      background: linear-gradient(180deg, rgba(36,24,9,0.97), rgba(10,6,4,0.97));
      border: 1px solid var(--tq-edge-strong);
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
      font-family: var(--tq-text); font-size: 14px; line-height: 1.35;
      color: var(--tq-ink); text-align: center;
      opacity: 0; transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,1.4,.4,1);
    }
    .tq-pet-bubble.on { opacity: 1; transform: translate(-50%, -100%) scale(1); }
    .tq-pet-bubble::after {
      content: ''; position: absolute; left: 50%; bottom: -5px;
      width: 8px; height: 8px; margin-left: -4px;
      background: rgba(10,6,4,0.97);
      border-right: 1px solid var(--tq-edge-strong);
      border-bottom: 1px solid var(--tq-edge-strong);
      transform: rotate(45deg);
    }
    .tq-pet-zzz {
      position: absolute; right: 8%; top: 8%;
      font-family: var(--tq-display); font-size: 15px;
      color: var(--tq-ink-dim); opacity: 0;
    }
    @keyframes tqZzz {
      0%   { opacity: 0; transform: translate(0,0) scale(0.7); }
      25%  { opacity: 0.9; }
      100% { opacity: 0; transform: translate(14px,-26px) scale(1.15); }
    }
    .tq-pet-spark {
      position: absolute; width: 6px; height: 6px; border-radius: 50%;
      background: var(--tq-gold-bright); pointer-events: none;
      box-shadow: 0 0 8px var(--tq-gold-bright);
    }
    @media (prefers-reduced-motion: reduce) {
      .tq-pet-bubble { transition: opacity 200ms ease; }
    }
  `;
  document.head.appendChild(s);
}

// --------------------------------------------------------------------------
// Behaviour
// --------------------------------------------------------------------------
function breathe() {
  if (!canAnimate(host)) return;
  if (breathing) breathing.cancel();
  const s = state.asleep ? 1.4 : 1;
  breathing = host.animate(
    [
      { transform: 'translateY(0) scale(1)' },
      { transform: `translateY(${state.asleep ? -1.5 : -3}px) scale(1.006)` },
      { transform: 'translateY(0) scale(1)' },
    ],
    { duration: (state.asleep ? 5200 : 3400) * s, iterations: Infinity, easing: 'ease-in-out' },
  );
}

function say(key, hold = 3600) {
  if (!bubble) return;
  bubble.textContent = pick(key, state.name);
  bubble.classList.add('on');
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove('on'), hold);
  lastBubbleAt = Date.now();
}

const canAnimate = (n) => !!(n && typeof n.animate === 'function');

function sparkle(count = 8) {
  if (!overlay || !canAnimate(overlay)) return;
  const rect = overlay.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'tq-pet-spark';
    d.style.left = `${20 + Math.random() * 60}%`;
    d.style.top = `${30 + Math.random() * 40}%`;
    overlay.appendChild(d);
    if (!canAnimate(d)) { d.remove(); continue; }
    d.animate(
      [
        { transform: 'translate(0,0) scale(0.4)', opacity: 0 },
        { opacity: 1, offset: 0.25 },
        {
          transform: `translate(${(Math.random() - 0.5) * rect.width * 0.5}px, ${-30 - Math.random() * 40}px) scale(1)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' },
    ).onfinish = () => d.remove();
  }
}

function zzz() {
  if (!overlay || !state.asleep) return;
  const z = document.createElement('div');
  z.className = 'tq-pet-zzz';
  z.textContent = 'z';
  overlay.appendChild(z);
  z.style.animation = 'tqZzz 2600ms ease-out forwards';
  setTimeout(() => z.remove(), 2700);
}

/** A small unprompted movement, so it isn't perfectly still between events. */
function fidget() {
  if (!canAnimate(host) || state.asleep) return;
  const kind = Math.random();
  if (kind < 0.4) {
    host.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(1.4deg)' },
        { transform: 'rotate(-1deg)' }, { transform: 'rotate(0deg)' }],
      { duration: 900, easing: 'ease-in-out' },
    );
  } else if (kind < 0.7) {
    host.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }],
      { duration: 700, easing: 'ease-out' },
    );
  } else {
    host.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' },
        { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }],
      { duration: 800, easing: 'ease-in-out' },
    );
  }
}

function tick() {
  if (!host || !document.body.contains(host)) return stop();
  if (state.asleep) {
    if (Math.random() < 0.7) zzz();
  } else {
    // Speak up when it wants something; chatter less when it's content.
    const n = need(state);
    const urgent = n === 'starving' || n === 'bored' || n === 'lonely';
    const gap = Date.now() - lastBubbleAt;
    if (gap > (urgent ? 14000 : 42000) && Math.random() < (urgent ? 0.7 : 0.25)) say(n);
    else if (Math.random() < 0.45) fidget();
  }
  idleTimer = setTimeout(tick, 5000 + Math.random() * 5000);
}

function stop() {
  clearTimeout(idleTimer);
  clearTimeout(bubbleTimer);
  if (breathing) breathing.cancel();
  idleTimer = breathing = null;
}

// --------------------------------------------------------------------------
// Public
// --------------------------------------------------------------------------
/** Called from app.js on every render of the pet portrait. */
export function attach(el, next) {
  if (!el) return;
  styles();
  const changedHost = el !== host;
  const wasAsleep = state.asleep;
  state = Object.assign({}, state, next || {});

  if (changedHost) {
    stop();
    host = el;
    if (window.getComputedStyle(el).position === 'static') el.style.position = 'relative';
    overlay = el.querySelector('.' + OVERLAY);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = OVERLAY;
      bubble = document.createElement('div');
      bubble.className = 'tq-pet-bubble';
      overlay.appendChild(bubble);
      el.appendChild(overlay);
    } else {
      bubble = overlay.querySelector('.tq-pet-bubble');
    }
    el.addEventListener('click', onPoke);
    breathe();
    idleTimer = setTimeout(tick, 2500);
    // Greet on arrival if it has been a while.
    if (state.awayHours >= 6 && !state.asleep) setTimeout(() => say('lonely'), 900);
  } else if (wasAsleep !== state.asleep) {
    breathe();
  }
}

function onPoke() {
  if (!host) return;
  if (state.asleep) {
    say('asleep', 2000);
    return;
  }
  if (!canAnimate(host)) { say('petted', 2400); return; }
  host.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.94)' },
      { transform: 'scale(1.05)' }, { transform: 'scale(1)' }],
    { duration: 480, easing: 'cubic-bezier(.3,1.5,.4,1)' },
  );
  sparkle(6);
  say('petted', 2400);
  if (window.TQ && window.TQ.haptic) window.TQ.haptic(12);
}

/** Call after feeding, playing, or a growth stage change. */
export function celebrate(kind) {
  if (!host) return;
  sparkle(kind === 'grew' ? 18 : 10);
  say(kind, 3000);
  if (!canAnimate(host)) return;
  host.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
    { duration: kind === 'grew' ? 900 : 560, easing: 'ease-out' },
  );
}

export function detach() {
  if (host) host.removeEventListener('click', onPoke);
  stop();
  host = overlay = bubble = null;
}

export function install() {
  window.TQ = window.TQ || {};
  window.TQ.petLife = attach;
  window.TQ.petCelebrate = celebrate;
  window.TQ.petDetach = detach;
}
