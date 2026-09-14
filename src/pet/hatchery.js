/**
 * The Hatchery backdrop.
 *
 * The empty pet state was a dashed rectangle with an egg and two lines of
 * text — the first thing a new user sees in there, and the least worked part
 * of the app. This gives it somewhere to be: a carved plinth under a runic
 * arch, with the same seven-part seal motif used by the Sanctum unlock so the
 * two secrets feel related.
 *
 * Exported as a data URI because it's applied as a background on an existing
 * compiled element — no structural change to app.js.
 */

export function hatcheryBackdropSvg({ lit = 0 } = {}) {
  const g = '#c9a961';
  const gb = '#f5d98f';
  const runes = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
    const x = 200 + Math.cos(a) * 96;
    const y = 132 + Math.sin(a) * 58;
    const on = i < lit;
    runes.push(
      `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" opacity="${on ? 0.85 : 0.18}">
         <path d="M0,-6 L4,0 L0,6 L-4,0 Z M0,-2.5 L0,2.5" fill="none"
               stroke="${on ? gb : g}" stroke-width="1.4" stroke-linejoin="round"/>
       </g>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <radialGradient id="vault" cx="50%" cy="38%" r="72%">
      <stop offset="0%" stop-color="#241809"/>
      <stop offset="55%" stop-color="#120c06"/>
      <stop offset="100%" stop-color="#05030a"/>
    </radialGradient>
    <linearGradient id="stone" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3a2c1a"/>
      <stop offset="55%" stop-color="#241a10"/>
      <stop offset="100%" stop-color="#150e07"/>
    </linearGradient>
    <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${g}" stop-opacity="0.15"/>
      <stop offset="50%" stop-color="${gb}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${g}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <rect width="400" height="300" fill="url(#vault)"/>

  <!-- Arch behind the egg -->
  <path d="M92,232 L92,150 A108,108 0 0 1 308,150 L308,232"
        fill="none" stroke="${g}" stroke-width="1.6" opacity="0.28"/>
  <path d="M108,232 L108,152 A92,92 0 0 1 292,152 L292,232"
        fill="none" stroke="${g}" stroke-width="0.8" opacity="0.16"/>

  <!-- Seven-part seal, echoing the Sanctum -->
  <ellipse cx="200" cy="132" rx="96" ry="58" fill="none"
           stroke="${g}" stroke-width="0.9" opacity="0.22" stroke-dasharray="4 8"/>
  ${runes.join('\n  ')}

  <!-- Plinth -->
  <path d="M128,238 L272,238 L286,266 L114,266 Z" fill="url(#stone)"/>
  <path d="M114,266 L286,266 L292,282 L108,282 Z" fill="url(#stone)"/>
  <path d="M128,238 L272,238" stroke="url(#brass)" stroke-width="1.6"/>
  <path d="M114,266 L286,266" stroke="url(#brass)" stroke-width="1.2"/>
  <g opacity="0.3" stroke="${g}" stroke-width="0.7">
    <line x1="157" y1="238" x2="150" y2="266"/>
    <line x1="200" y1="238" x2="200" y2="266"/>
    <line x1="243" y1="238" x2="250" y2="266"/>
  </g>

  <!-- Carved sigil on the plinth face -->
  <g transform="translate(200 254)" opacity="0.55">
    <circle r="9" fill="none" stroke="${g}" stroke-width="1"/>
    <path d="M0,-5 a5,5 0 1,1 -0.01,0 M-2.4,3.2 L2.4,3.2 L1.4,9 L-1.4,9 Z"
          fill="${g}" opacity="0.8"/>
  </g>

  <!-- Motes -->
  <g fill="${gb}">
    <circle cx="128" cy="104" r="1.5" opacity="0.5"/>
    <circle cx="286" cy="86" r="1.2" opacity="0.4"/>
    <circle cx="96" cy="176" r="1" opacity="0.35"/>
    <circle cx="310" cy="170" r="1.6" opacity="0.45"/>
    <circle cx="168" cy="64" r="1" opacity="0.3"/>
    <circle cx="246" cy="58" r="1.3" opacity="0.35"/>
  </g>

  <!-- Floor pool of light under the plinth -->
  <ellipse cx="200" cy="284" rx="120" ry="14" fill="${g}" opacity="0.07"/>
</svg>`;
}

export function hatcheryBackdropUrl(opts) {
  return `url("data:image/svg+xml,${encodeURIComponent(hatcheryBackdropSvg(opts))}")`;
}

export function install() {
  window.TQ = window.TQ || {};
  window.TQ.hatcheryBackdrop = hatcheryBackdropUrl;
  window.TQ.hatcheryBackdropSvg = hatcheryBackdropSvg;
}
