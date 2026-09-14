#!/usr/bin/env node
/**
 * Generate themed SVG fallbacks for counters and memory-game tokens.
 * These are used ONLY when the runtime Scryfall fetch fails.
 *
 * Style: dark MTG parchment + gold accents, matching Token Queen's aesthetic.
 */
const fs = require('fs');
const path = require('path');

const COUNTERS_DIR = path.join(__dirname, 'www', 'img', 'counters');
const TOKENS_DIR = path.join(__dirname, 'www', 'img', 'tokens');
[COUNTERS_DIR, TOKENS_DIR].forEach(d => fs.mkdirSync(d, { recursive: true }));

// Reusable parchment background
function bg(accent) {
  return `
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#2a1f14"/>
        <stop offset="60%" stop-color="#15100a"/>
        <stop offset="100%" stop-color="#05030a"/>
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c9a961"/>
        <stop offset="50%" stop-color="#7d6740"/>
        <stop offset="100%" stop-color="#c9a961"/>
      </linearGradient>
    </defs>
    <rect width="500" height="700" fill="url(#bg)"/>
    <rect width="500" height="700" fill="url(#glow)"/>
    <rect x="10" y="10" width="480" height="680" fill="none" stroke="url(#border)" stroke-width="2" rx="6"/>
    <rect x="20" y="20" width="460" height="660" fill="none" stroke="${accent}" stroke-width="0.5" opacity="0.4" rx="4"/>
  `;
}

function frame(title, subtitle, accent) {
  return `
    <text x="250" y="80" text-anchor="middle" font-family="Cinzel, serif" font-size="32" font-weight="600" fill="${accent}" letter-spacing="4">${title.toUpperCase()}</text>
    <line x1="120" y1="100" x2="380" y2="100" stroke="${accent}" stroke-width="0.8" opacity="0.5"/>
    <text x="250" y="650" text-anchor="middle" font-family="Cinzel, serif" font-size="14" fill="#9a8765" letter-spacing="3" opacity="0.8">${subtitle}</text>
  `;
}

const COUNTERS = [
  {
    id: 'energy', title: 'Energy', subtitle: '{E}', accent: '#d4b87a',
    art: `<g transform="translate(250 360)">
      <circle r="120" fill="none" stroke="#d4b87a" stroke-width="1" opacity="0.3"/>
      <circle r="80" fill="none" stroke="#d4b87a" stroke-width="0.8" opacity="0.4"/>
      <path d="M -20 -90 L 30 0 L -10 0 L 20 90 L -30 0 L 10 0 Z" fill="#d4b87a" opacity="0.9" stroke="#fff3c4" stroke-width="1"/>
      <circle r="160" fill="none" stroke="#d4b87a" stroke-width="0.4" opacity="0.2"/>
    </g>`
  },
  {
    id: 'poison', title: 'Poison', subtitle: 'TEN AND YOU PERISH', accent: '#7faf4f',
    art: `<g transform="translate(250 360)">
      <ellipse rx="100" ry="120" fill="#1a2a14" stroke="#7faf4f" stroke-width="1.5" opacity="0.85"/>
      <path d="M -40 -60 Q -20 -100 0 -90 Q 20 -100 40 -60 Q 60 -20 40 30 Q 20 60 0 70 Q -20 60 -40 30 Q -60 -20 -40 -60 Z" fill="#3a5a2a" opacity="0.7"/>
      <circle cx="-15" cy="-30" r="8" fill="#c9e6a0" opacity="0.8"/>
      <circle cx="20" cy="-10" r="5" fill="#c9e6a0" opacity="0.6"/>
      <circle cx="-5" cy="20" r="6" fill="#c9e6a0" opacity="0.7"/>
      <path d="M 0 -110 Q 5 -130 0 -140 Q -5 -130 0 -110 Z" fill="#7faf4f"/>
    </g>`
  },
  {
    id: 'experience', title: 'Experience', subtitle: 'KNOWLEDGE EARNED', accent: '#9fc7e6',
    art: `<g transform="translate(250 360)">
      <radialGradient id="xpGrad" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#5a90c0" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#1a3a5a" stop-opacity="0.95"/>
      </radialGradient>
      <polygon points="0,-115 110,-35 70,90 -70,90 -110,-35" fill="url(#xpGrad)" stroke="#9fc7e6" stroke-width="2.5"/>
      <polygon points="0,-115 110,-35 70,90 -70,90 -110,-35" fill="none" stroke="#c9e6f0" stroke-width="0.5" opacity="0.6"/>
      <polygon points="0,-75 70,-25 45,55 -45,55 -70,-25" fill="none" stroke="#c9e6f0" stroke-width="1" opacity="0.5"/>
      <text x="0" y="22" text-anchor="middle" font-family="Cinzel, serif" font-size="68" font-weight="700" fill="#fffbe6" opacity="0.95">XP</text>
      <circle cx="0" cy="-115" r="5" fill="#fffbe6" opacity="0.8"/>
      <circle cx="110" cy="-35" r="4" fill="#fffbe6" opacity="0.7"/>
      <circle cx="-110" cy="-35" r="4" fill="#fffbe6" opacity="0.7"/>
    </g>`
  },
  {
    id: 'oil', title: 'Oil', subtitle: 'PHYREXIAN GREASE', accent: '#b8a0d4',
    art: `<g transform="translate(250 360)">
      <radialGradient id="oilGrad" cx="40%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#e8c4f0" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="#9070c0" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#2a1a3a" stop-opacity="0.95"/>
      </radialGradient>
      <ellipse rx="130" ry="105" fill="url(#oilGrad)" stroke="#b8a0d4" stroke-width="2"/>
      <ellipse rx="130" ry="105" fill="none" stroke="#e8c4f0" stroke-width="0.5" opacity="0.5"/>
      <ellipse cx="-40" cy="-35" rx="35" ry="20" fill="#d4b0e8" opacity="0.6"/>
      <ellipse cx="35" cy="15" rx="45" ry="25" fill="#c090d4" opacity="0.5"/>
      <ellipse cx="-15" cy="45" rx="30" ry="15" fill="#a878c4" opacity="0.7"/>
      <ellipse cx="-50" cy="20" rx="14" ry="8" fill="#fff4ff" opacity="0.5"/>
      <ellipse cx="55" cy="-25" rx="10" ry="6" fill="#fff4ff" opacity="0.7"/>
      <circle cx="-10" cy="-15" r="4" fill="#fff4ff" opacity="0.8"/>
      <circle cx="20" cy="-50" r="3" fill="#fff4ff" opacity="0.6"/>
    </g>`
  },
  {
    id: 'rad', title: 'Radiation', subtitle: 'FALLOUT MILL', accent: '#c9d44f',
    art: `<g transform="translate(250 360)">
      <circle r="120" fill="#1a1a0a" stroke="#c9d44f" stroke-width="1.5"/>
      <circle r="20" fill="#c9d44f"/>
      <path d="M 0 -100 A 100 100 0 0 1 86 -50 L 50 -29 A 50 50 0 0 0 0 -50 Z" fill="#c9d44f"/>
      <path d="M 86 -50 A 100 100 0 0 1 86 50 L 50 29 A 50 50 0 0 0 50 -29 Z" transform="rotate(120)" fill="#c9d44f"/>
      <path d="M 86 -50 A 100 100 0 0 1 86 50 L 50 29 A 50 50 0 0 0 50 -29 Z" transform="rotate(240)" fill="#c9d44f"/>
    </g>`
  }
];

// Token glyphs — stylised creature silhouettes
/**
 * Heraldic medallion: a bold silhouette inside an engraved ring.
 *
 * The previous token art was a few primitives each - the zombie was a
 * rectangle with two dots - which read as placeholder emoji rather than
 * Magic tokens. These fill the art box and share one visual language, so a
 * table of fallbacks looks deliberate instead of broken.
 */
function emblem(accent, deep, body) {
  return `<g transform="translate(250 372)">
    <circle r="168" fill="none" stroke="${accent}" stroke-width="1" opacity="0.22"/>
    <circle r="152" fill="none" stroke="${accent}" stroke-width="2.5" opacity="0.5"/>
    <circle r="144" fill="${deep}" opacity="0.35"/>
    <g stroke="${accent}" stroke-width="1" opacity="0.3">
      <line x1="-152" y1="0" x2="-168" y2="0"/><line x1="152" y1="0" x2="168" y2="0"/>
      <line x1="0" y1="-152" x2="0" y2="-168"/><line x1="0" y1="152" x2="0" y2="168"/>
    </g>
    ${body}
  </g>`;
}

const TOKENS = [
  { id: 'goblin', title: 'Goblin', sub: '1/1 RED', accent: '#d97757', deep: '#4a1a10',
    art: emblem('#d97757', '#4a1a10', `
      <g fill="#c0603c" stroke="#2a0d06" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-40,86 L-30,26 C-44,16 -44,-6 -28,-12 L36,-12
                 C52,-6 52,16 38,26 L46,86 L22,86 L16,44 L-14,44 L-18,86 Z"/>
        <path d="M-28,-16 L-16,-30 L28,-30 L38,-16 Z"/>
        <ellipse cx="6" cy="-56" rx="34" ry="30"/>
        <path d="M-28,-58 C-62,-76 -84,-70 -88,-54 C-68,-48 -48,-48 -30,-46 Z"/>
        <path d="M40,-58 C74,-76 96,-70 100,-54 C80,-48 60,-48 42,-46 Z"/>
      </g>
      <g fill="#1a0603"><ellipse cx="-6" cy="-60" rx="6" ry="7"/><ellipse cx="18" cy="-60" rx="6" ry="7"/></g>
      <path d="M-10,-40 L-4,-32 L4,-40 L12,-32 L20,-40" stroke="#ffe0a8" stroke-width="3.5"
            fill="none" stroke-linecap="round"/>
      <g stroke="#8a4a20" stroke-width="9" stroke-linecap="round">
        <line x1="44" y1="10" x2="86" y2="-46"/>
      </g>
      <path d="M86,-46 L124,-70 L130,-40 L96,-26 Z" fill="#e8c98a" stroke="#2a0d06" stroke-width="2.5"/>`) },
  { id: 'soldier', title: 'Soldier', sub: '1/1 WHITE', accent: '#e8dcc4', deep: '#3a3020',
    art: emblem('#e8dcc4', '#3a3020', `
      <g fill="#cbbf9f" stroke="#2a2418" stroke-width="2" stroke-linejoin="round">
        <path d="M-34,64 L-34,4 C-34,-16 -18,-28 0,-28 C18,-28 34,-16 34,4 L34,64 Z"/>
        <path d="M0,-32 C-16,-32 -26,-44 -26,-58 C-26,-74 -12,-84 0,-84
                 C12,-84 26,-74 26,-58 C26,-44 16,-32 0,-32 Z"/>
        <path d="M-26,-58 L26,-58 M0,-84 L0,-40" stroke-width="3"/>
      </g>
      <path d="M-30,-96 C-14,-108 14,-108 30,-96 L26,-76 C10,-88 -10,-88 -26,-76 Z" fill="#c9a961" stroke="#2a2418" stroke-width="2"/>
      <g stroke="#c9a961" stroke-width="7" stroke-linecap="round"><line x1="62" y1="-92" x2="62" y2="72"/></g>
      <path d="M62,-118 L74,-88 L50,-88 Z" fill="#e8dcc4" stroke="#2a2418" stroke-width="2"/>
      <path d="M-62,-40 L-62,34 C-62,50 -48,60 -40,64 C-32,60 -18,50 -18,34 L-18,-40 Z"
            fill="#8a7555" stroke="#2a2418" stroke-width="2"/>`) },

  { id: 'zombie', title: 'Zombie', sub: '2/2 BLACK', accent: '#9a7fb0', deep: '#241634',
    art: emblem('#9a7fb0', '#241634', `
      <g fill="#6f5980" stroke="#150c20" stroke-width="2" stroke-linejoin="round">
        <path d="M-30,66 L-24,6 C-34,-4 -32,-22 -20,-28 L-16,-44
                 C-16,-64 4,-74 20,-64 C34,-56 36,-36 24,-26 L30,8 L38,66
                 L18,66 L10,26 L-2,68 Z"/>
        <path d="M-20,-24 C-52,-34 -70,-20 -72,0 C-56,-2 -36,-10 -22,-14 Z"/>
        <path d="M28,-22 C58,-46 78,-40 82,-22 C66,-16 46,-12 30,-10 Z"/>
      </g>
      <g fill="#d8c8e8"><ellipse cx="-4" cy="-46" rx="6" ry="7"/><ellipse cx="16" cy="-48" rx="6" ry="7"/></g>
      <g stroke="#d8c8e8" stroke-width="2.5" stroke-linecap="round">
        <line x1="-10" y1="-28" x2="22" y2="-30"/>
        <line x1="-6" y1="-34" x2="-6" y2="-24"/><line x1="4" y1="-34" x2="4" y2="-25"/>
        <line x1="14" y1="-35" x2="14" y2="-26"/>
      </g>
      <path d="M-24,10 L-46,26 M30,14 L52,4" stroke="#6f5980" stroke-width="9" stroke-linecap="round"/>`) },

  { id: 'dragon', title: 'Dragon', sub: '5/5 FLYING', accent: '#d4453f', deep: '#4a0f0c',
    art: emblem('#d4453f', '#4a0f0c', `
      <g fill="#b33a34" stroke="#2a0705" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-6,-4 C-40,-44 -96,-70 -128,-58 C-112,-38 -92,-14 -84,14
                 C-66,4 -44,2 -26,12 Z"/>
        <path d="M6,-4 C40,-44 96,-70 128,-58 C112,-38 92,-14 84,14
                 C66,4 44,2 26,12 Z"/>
        <ellipse cx="0" cy="18" rx="34" ry="26"/>
        <path d="M-14,38 C-26,60 -48,72 -74,68 C-56,58 -44,44 -38,28 Z"/>
        <path d="M14,38 C26,60 48,72 74,68 C56,58 44,44 38,28 Z"/>
        <path d="M-8,-8 L-10,-40 C-10,-58 10,-58 10,-40 L8,-8 Z"/>
        <path d="M0,-46 C-22,-46 -32,-62 -24,-76 C-12,-84 12,-84 24,-76 C32,-62 22,-46 0,-46 Z"/>
        <path d="M-24,-76 L-44,-98 L-14,-88 Z"/>
        <path d="M24,-76 L44,-98 L14,-88 Z"/>
      </g>
      <g fill="#ffd46a"><circle cx="-11" cy="-64" r="5"/><circle cx="11" cy="-64" r="5"/></g>
      <path d="M-34,44 L34,44" stroke="#7a1f1a" stroke-width="3" opacity="0.7"/>`) },

  { id: 'angel', title: 'Angel', sub: '4/4 FLYING', accent: '#f0e4c8', deep: '#3c3524',
    art: emblem('#f0e4c8', '#3c3524', `
      <g fill="#e4d6b4" stroke="#2c2618" stroke-width="2" stroke-linejoin="round">
        <path d="M-16,-34 C-52,-58 -94,-60 -122,-40 C-96,-32 -72,-16 -56,6
                 C-42,-10 -28,-22 -16,-28 Z"/>
        <path d="M16,-34 C52,-58 94,-60 122,-40 C96,-32 72,-16 56,6
                 C42,-10 28,-22 16,-28 Z"/>
        <path d="M-18,-40 C-42,-32 -70,-14 -84,10 C-62,8 -40,14 -24,26
                 C-24,4 -22,-18 -18,-34 Z" opacity="0.75"/>
        <path d="M18,-40 C42,-32 70,-14 84,10 C62,8 40,14 24,26
                 C24,4 22,-18 18,-34 Z" opacity="0.75"/>
        <path d="M-24,78 L-16,4 C-26,-6 -22,-22 -8,-26 L-8,-34
                 C-22,-42 -18,-62 0,-62 C18,-62 22,-42 8,-34 L8,-26
                 C22,-22 26,-6 16,4 L24,78 Z"/>
      </g>
      <ellipse cx="0" cy="-78" rx="26" ry="7" fill="none" stroke="#f5d98f" stroke-width="4"/>
      <path d="M0,10 L0,88 M-16,28 L16,28" stroke="#f5d98f" stroke-width="5" stroke-linecap="round"/>`) },

  { id: 'wolf', title: 'Wolf', sub: '2/2 GREEN', accent: '#9db88c', deep: '#1f2c1c',
    art: emblem('#9db88c', '#1f2c1c', `
      <g fill="#6f8a62" stroke="#131c11" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-104,70 L-80,8 C-70,-14 -48,-26 -24,-24 L20,-24
                 C46,-24 64,-6 64,16 L64,66 L44,66 L40,26 L-16,30 L-22,66
                 L-42,66 L-44,26 L-80,70 Z"/>
        <path d="M64,16 C88,6 112,18 118,38 C98,36 80,28 64,24 Z"/>
        <path d="M-24,-24 L-14,-38 L36,-38 L46,-24 Z"/>
        <path d="M6,-44 L58,-44 C74,-44 84,-32 84,-18 L84,-6
                 C84,6 74,14 60,14 L6,14 C-10,14 -20,4 -20,-12 C-20,-30 -10,-44 6,-44 Z"/>
        <path d="M84,-12 L124,-4 L124,4 L84,4 Z"/>
        <path d="M-4,-44 L-22,-92 L18,-62 Z"/>
        <path d="M44,-44 L44,-94 L74,-58 Z"/>
      </g>
      <g fill="#e8f0d8"><ellipse cx="20" cy="-24" rx="5.5" ry="7"/><ellipse cx="52" cy="-24" rx="5.5" ry="7"/></g>
      <ellipse cx="118" cy="-2" rx="9" ry="7" fill="#131c11"/>
      <path d="M84,4 L112,10" stroke="#131c11" stroke-width="3" stroke-linecap="round"/>
      <path d="M62,6 L68,16 L76,6" stroke="#e8f0d8" stroke-width="3" fill="none" stroke-linecap="round"/>`) },
  { id: 'elemental', title: 'Elemental', sub: 'X/X', accent: '#e8a45c', deep: '#3d2008',
    art: emblem('#e8a45c', '#3d2008', `
      <g fill="#c07a32" stroke="#2a1404" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-44,80 L-36,10 C-52,-4 -48,-30 -28,-38 L-30,-70
                 C-30,-96 30,-96 30,-70 L28,-38 C48,-30 52,-4 36,10 L44,80 Z"/>
        <path d="M-36,10 L-84,34 L-78,52 L-32,36 Z"/>
        <path d="M36,10 L84,34 L78,52 L32,36 Z"/>
      </g>
      <path d="M0,-94 C-14,-70 -26,-56 -26,-40 C-26,-18 -12,-6 0,-6
               C12,-6 26,-18 26,-40 C26,-56 14,-70 0,-94 Z" fill="#f5c069" opacity="0.9"/>
      <path d="M0,-66 C-8,-52 -12,-44 -12,-34 C-12,-22 -6,-16 0,-16
               C6,-16 12,-22 12,-34 C12,-44 8,-52 0,-66 Z" fill="#fff0c0"/>`) },

  { id: 'saproling', title: 'Saproling', sub: '1/1 GREEN', accent: '#8fbf6a', deep: '#1d3216',
    art: emblem('#8fbf6a', '#1d3216', `
      <g fill="#5f8f44" stroke="#12210d" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-24,76 L-18,16 C-34,8 -34,-14 -18,-22 L-18,-34
                 C-18,-52 18,-52 18,-34 L18,-22 C34,-14 34,8 18,16 L24,76 Z"/>
        <path d="M-20,-4 C-52,-16 -78,-8 -86,10 C-64,14 -40,14 -20,10 Z"/>
        <path d="M20,-4 C52,-16 78,-8 86,10 C64,14 40,14 20,10 Z"/>
      </g>
      <path d="M0,-48 C-30,-56 -46,-84 -34,-108 C-12,-102 2,-76 0,-48 Z" fill="#7fb857" stroke="#12210d" stroke-width="2.5"/>
      <path d="M0,-48 C30,-56 46,-84 34,-108 C12,-102 -2,-76 0,-48 Z" fill="#9fd07a" stroke="#12210d" stroke-width="2.5"/>
      <g fill="#0f1c0b"><circle cx="-9" cy="-14" r="4"/><circle cx="9" cy="-14" r="4"/></g>`) },

  { id: 'spirit', title: 'Spirit', sub: '1/1 FLYING', accent: '#a8cce8', deep: '#17283a',
    art: emblem('#a8cce8', '#17283a', `
      <path d="M0,-96 C-42,-96 -70,-62 -70,-20 C-70,18 -58,46 -58,72
               C-44,60 -36,74 -22,62 C-10,76 10,76 22,62 C36,74 44,60 58,72
               C58,46 70,18 70,-20 C70,-62 42,-96 0,-96 Z"
            fill="#7fb0d4" opacity="0.42" stroke="#a8cce8" stroke-width="2.5"/>
      <path d="M0,-72 C-28,-72 -48,-46 -48,-16 C-48,10 -40,32 -40,52
               C-30,44 -24,54 -14,46 C-6,56 6,56 14,46 C24,54 30,44 40,52
               C40,32 48,10 48,-16 C48,-46 28,-72 0,-72 Z"
            fill="#c6e0f2" opacity="0.5"/>
      <g fill="#0b1826"><ellipse cx="-16" cy="-32" rx="7" ry="11"/><ellipse cx="16" cy="-32" rx="7" ry="11"/></g>
      <path d="M-12,-2 C-4,8 4,8 12,-2" stroke="#0b1826" stroke-width="3" fill="none" stroke-linecap="round"/>`) },

  { id: 'bird', title: 'Bird', sub: '1/1 FLYING', accent: '#9fc7e6', deep: '#1a2c3e',
    art: emblem('#9fc7e6', '#1a2c3e', `
      <g fill="#6f9fc4" stroke="#0f1d2a" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-10,6 C-46,-30 -96,-52 -132,-38 C-110,-16 -86,10 -76,40
                 C-56,22 -32,12 -12,14 Z"/>
        <path d="M10,6 C46,-30 96,-52 132,-38 C110,-16 86,10 76,40
                 C56,22 32,12 12,14 Z"/>
        <ellipse cx="0" cy="20" rx="26" ry="34"/>
        <path d="M0,50 L-16,86 L0,76 L16,86 Z"/>
        <circle cx="0" cy="-24" r="22"/>
      </g>
      <path d="M18,-24 L46,-16 L18,-8 Z" fill="#e8b45c" stroke="#0f1d2a" stroke-width="2"/>
      <circle cx="6" cy="-30" r="4.5" fill="#0b1520"/>`) },

  { id: 'insect', title: 'Insect', sub: '1/1', accent: '#b4a24a', deep: '#2f2a0e',
    art: emblem('#b4a24a', '#2f2a0e', `
      <g stroke="#171405" stroke-width="7" stroke-linecap="round" fill="none">
        <path d="M-22,-16 L-74,-46 L-104,-30"/><path d="M22,-16 L74,-46 L104,-30"/>
        <path d="M-24,8 L-80,8 L-106,26"/><path d="M24,8 L80,8 L106,26"/>
        <path d="M-22,32 L-70,58 L-92,84"/><path d="M22,32 L70,58 L92,84"/>
      </g>
      <g fill="#8f7f34" stroke="#171405" stroke-width="2.5" stroke-linejoin="round">
        <ellipse cx="0" cy="34" rx="38" ry="52"/>
        <ellipse cx="0" cy="-16" rx="28" ry="26"/>
        <circle cx="0" cy="-56" r="24"/>
        <path d="M-14,-76 L-34,-108 M14,-76 L34,-108" stroke-width="6" stroke-linecap="round"/>
      </g>
      <path d="M0,-16 L0,86" stroke="#171405" stroke-width="3" opacity="0.6"/>
      <g fill="#f0e08a"><circle cx="-10" cy="-60" r="5"/><circle cx="10" cy="-60" r="5"/></g>`) },

  { id: 'thopter', title: 'Thopter', sub: '1/1 ARTIFACT', accent: '#bcc4cc', deep: '#25292e',
    art: emblem('#bcc4cc', '#25292e', `
      <g fill="#8e979f" stroke="#141719" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-8,-18 C-44,-52 -100,-66 -130,-50 C-104,-36 -70,-20 -48,0
                 C-36,-10 -22,-16 -10,-16 Z"/>
        <path d="M8,-18 C44,-52 100,-66 130,-50 C104,-36 70,-20 48,0
                 C36,-10 22,-16 10,-16 Z"/>
        <path d="M-26,-4 L26,-4 L34,44 C34,62 -34,62 -34,44 Z"/>
        <rect x="-12" y="-46" width="24" height="30" rx="5"/>
      </g>
      <g stroke="#141719" stroke-width="2" fill="none" opacity="0.75">
        <path d="M-48,0 C-70,-14 -98,-28 -122,-38"/><path d="M48,0 C70,-14 98,-28 122,-38"/>
      </g>
      <circle cx="0" cy="20" r="14" fill="#f5d98f" stroke="#141719" stroke-width="2.5"/>
      <g stroke="#c9a961" stroke-width="4" stroke-linecap="round">
        <line x1="0" y1="62" x2="0" y2="88"/><line x1="-20" y1="80" x2="20" y2="80"/>
      </g>`) }
];


function makeSVG(spec, art) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice">
  ${bg(spec.accent)}
  ${frame(spec.title, spec.subtitle || spec.sub, spec.accent)}
  ${art}
</svg>`;
}

console.log('Generating counter SVGs...');
for (const c of COUNTERS) {
  const dest = path.join(COUNTERS_DIR, `${c.id}.svg`);
  fs.writeFileSync(dest, makeSVG(c, c.art));
  console.log(`  OK  counters/${c.id}.svg`);
}

console.log('Generating token SVGs...');
for (const t of TOKENS) {
  const dest = path.join(TOKENS_DIR, `${t.id}.svg`);
  fs.writeFileSync(dest, makeSVG(t, t.art));
  console.log(`  OK  tokens/${t.id}.svg`);
}

// Manifest tells the runtime what we have locally + what Scryfall queries to try
const manifest = {
  generated: new Date().toISOString(),
  counters: {
    energy:     { local: 'img/counters/energy.svg',     scryfall: 'tmh3/36' },
    poison:     { local: 'img/counters/poison.svg',     scryfall: 'tone/14' },
    experience: { local: 'img/counters/experience.svg', scryfall: 'ttdc/34' },
    oil:        { local: 'img/counters/oil.svg',        scryfall: null },
    rad:        { local: 'img/counters/rad.svg',        scryfall: 'tpip/22' }
  },
  tokens: {
    goblin:    { local: 'img/tokens/goblin.svg',    name: 'Goblin Token' },
    soldier:   { local: 'img/tokens/soldier.svg',   name: 'Soldier Token' },
    zombie:    { local: 'img/tokens/zombie.svg',    name: 'Zombie Token' },
    dragon:    { local: 'img/tokens/dragon.svg',    name: 'Dragon Token' },
    angel:     { local: 'img/tokens/angel.svg',     name: 'Angel Token' },
    wolf:      { local: 'img/tokens/wolf.svg',      name: 'Wolf Token' },
    elemental: { local: 'img/tokens/elemental.svg', name: 'Elemental Token' },
    saproling: { local: 'img/tokens/saproling.svg', name: 'Saproling Token' },
    spirit:    { local: 'img/tokens/spirit.svg',    name: 'Spirit Token' },
    bird:      { local: 'img/tokens/bird.svg',      name: 'Bird Token' },
    insect:    { local: 'img/tokens/insect.svg',    name: 'Insect Token' },
    thopter:   { local: 'img/tokens/thopter.svg',   name: 'Thopter Token' }
  }
};
fs.writeFileSync(path.join(__dirname, 'www', 'img', 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('\nManifest written.');
