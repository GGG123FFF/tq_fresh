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
      <polygon points="0,-110 105,-50 65,80 -65,80 -105,-50" fill="#1a2a3a" stroke="#9fc7e6" stroke-width="1.5"/>
      <polygon points="0,-70 65,-30 40,50 -40,50 -65,-30" fill="none" stroke="#9fc7e6" stroke-width="0.8" opacity="0.6"/>
      <text x="0" y="20" text-anchor="middle" font-family="Cinzel, serif" font-size="64" font-weight="700" fill="#9fc7e6" opacity="0.9">XP</text>
    </g>`
  },
  {
    id: 'oil', title: 'Oil', subtitle: 'PHYREXIAN GREASE', accent: '#7a7a8a',
    art: `<g transform="translate(250 360)">
      <ellipse rx="120" ry="100" fill="#0a0a14" stroke="#7a7a8a" stroke-width="1.5"/>
      <ellipse cx="-30" cy="-30" rx="20" ry="12" fill="#3a3a4a" opacity="0.7"/>
      <ellipse cx="40" cy="10" rx="30" ry="18" fill="#3a3a4a" opacity="0.7"/>
      <ellipse cx="-10" cy="40" rx="25" ry="14" fill="#3a3a4a" opacity="0.7"/>
      <circle cx="0" cy="-10" r="6" fill="#c9c9d9" opacity="0.5"/>
      <circle cx="60" cy="-40" r="4" fill="#c9c9d9" opacity="0.4"/>
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
const TOKENS = [
  { id: 'goblin', title: 'Goblin', sub: '1/1 RED', accent: '#d97757',
    art: `<g transform="translate(250 360)" fill="#d97757">
      <ellipse cx="0" cy="-30" rx="50" ry="60"/>
      <polygon points="-40,-90 -50,-60 -30,-70" fill="#a0432c"/>
      <polygon points="40,-90 50,-60 30,-70" fill="#a0432c"/>
      <circle cx="-15" cy="-30" r="4" fill="#1a0a05"/>
      <circle cx="15" cy="-30" r="4" fill="#1a0a05"/>
      <path d="M -20 0 Q 0 15 20 0" stroke="#1a0a05" stroke-width="2" fill="none"/>
      <rect x="-30" y="20" width="60" height="40" fill="#7a3020"/>
    </g>` },
  { id: 'soldier', title: 'Soldier', sub: '1/1 WHITE', accent: '#f5e9d0',
    art: `<g transform="translate(250 360)">
      <rect x="-15" y="-90" width="30" height="40" fill="#c9b890" rx="4"/>
      <circle cx="0" cy="-100" r="20" fill="#e5d4b0" stroke="#9a8765" stroke-width="1.5"/>
      <rect x="-50" y="-40" width="100" height="80" fill="#9a8765" rx="6"/>
      <line x1="-60" y1="-50" x2="-60" y2="80" stroke="#c9a961" stroke-width="4"/>
      <polygon points="-60,-60 -55,-80 -65,-80" fill="#c9a961"/>
    </g>` },
  { id: 'zombie', title: 'Zombie', sub: '2/2 BLACK', accent: '#5a4060',
    art: `<g transform="translate(250 360)" fill="#5a4060">
      <circle cx="0" cy="-50" r="35" fill="#3a2a40"/>
      <rect x="-30" y="-20" width="60" height="70" fill="#3a2a40"/>
      <circle cx="-12" cy="-55" r="5" fill="#c9e6a0"/>
      <circle cx="12" cy="-55" r="5" fill="#c9e6a0"/>
      <path d="M -18 -35 L -10 -32 M -5 -35 L 5 -32 M 10 -35 L 18 -32" stroke="#2a1a30" stroke-width="2"/>
      <path d="M -40 50 L 0 80 L 40 50" stroke="#3a2a40" stroke-width="6" fill="none"/>
    </g>` },
  { id: 'dragon', title: 'Dragon', sub: '5/5 RED', accent: '#b04030',
    art: `<g transform="translate(250 360)" fill="#b04030">
      <path d="M -100 0 Q -60 -80 0 -50 Q 60 -80 100 0 L 70 30 Q 0 60 -70 30 Z"/>
      <circle cx="0" cy="-30" r="30" fill="#7a2820"/>
      <polygon points="-15,-40 -20,-55 -10,-50" fill="#fffbe6"/>
      <polygon points="15,-40 20,-55 10,-50" fill="#fffbe6"/>
      <circle cx="-8" cy="-25" r="3" fill="#fffbe6"/>
      <circle cx="8" cy="-25" r="3" fill="#fffbe6"/>
      <path d="M -60 -40 L -90 -80 M 60 -40 L 90 -80" stroke="#7a2820" stroke-width="3"/>
    </g>` },
  { id: 'angel', title: 'Angel', sub: '4/4 WHITE', accent: '#fffbe6',
    art: `<g transform="translate(250 360)">
      <circle cx="0" cy="-60" r="20" fill="#fffbe6"/>
      <ellipse cx="0" cy="-50" rx="6" ry="10" fill="#f5e9d0"/>
      <rect x="-12" y="-30" width="24" height="60" fill="#fffbe6"/>
      <path d="M -15 -20 Q -90 -10 -70 50 Q -40 30 -15 20 Z" fill="#fffbe6" opacity="0.85"/>
      <path d="M 15 -20 Q 90 -10 70 50 Q 40 30 15 20 Z" fill="#fffbe6" opacity="0.85"/>
      <circle cx="0" cy="-90" r="14" fill="none" stroke="#c9a961" stroke-width="2"/>
    </g>` },
  { id: 'wolf', title: 'Wolf', sub: '2/2 GREEN', accent: '#6a8050',
    art: `<g transform="translate(250 360)" fill="#6a8050">
      <ellipse cx="0" cy="20" rx="70" ry="40"/>
      <ellipse cx="-50" cy="-30" rx="35" ry="30"/>
      <polygon points="-70,-50 -60,-70 -45,-55" fill="#4a5838"/>
      <polygon points="-25,-50 -35,-70 -50,-55" fill="#4a5838"/>
      <circle cx="-60" cy="-35" r="3" fill="#c9e6a0"/>
      <circle cx="-42" cy="-35" r="3" fill="#c9e6a0"/>
      <polygon points="-55,-15 -50,-5 -45,-15" fill="#1a1a0a"/>
    </g>` },
  { id: 'elemental', title: 'Elemental', sub: '3/1 RED', accent: '#d97757',
    art: `<g transform="translate(250 360)" fill="#d97757">
      <path d="M 0 -90 Q -30 -60 -20 -30 Q -40 0 -30 30 Q -50 50 -30 80 L 30 80 Q 50 50 30 30 Q 40 0 20 -30 Q 30 -60 0 -90 Z"/>
      <path d="M 0 -70 Q -15 -40 -8 -10 Q -20 20 -10 50" stroke="#fff3c4" stroke-width="2" fill="none" opacity="0.6"/>
      <circle cx="0" cy="-30" r="6" fill="#fff3c4" opacity="0.7"/>
    </g>` },
  { id: 'saproling', title: 'Saproling', sub: '1/1 GREEN', accent: '#7faf4f',
    art: `<g transform="translate(250 360)">
      <ellipse cx="0" cy="40" rx="40" ry="50" fill="#5a8030"/>
      <ellipse cx="-30" cy="-10" rx="25" ry="35" fill="#7faf4f" transform="rotate(-30 -30 -10)"/>
      <ellipse cx="30" cy="-10" rx="25" ry="35" fill="#7faf4f" transform="rotate(30 30 -10)"/>
      <ellipse cx="0" cy="-50" rx="30" ry="40" fill="#9fcf6f"/>
      <circle cx="-8" cy="-50" r="3" fill="#1a2a0a"/>
      <circle cx="8" cy="-50" r="3" fill="#1a2a0a"/>
    </g>` },
  { id: 'spirit', title: 'Spirit', sub: '1/1 WHITE', accent: '#c9e6f0',
    art: `<g transform="translate(250 360)">
      <path d="M -45 -60 Q -50 60 -30 80 L -10 70 L 0 85 L 10 70 L 30 80 Q 50 60 45 -60 Q 0 -100 -45 -60 Z" fill="#c9e6f0" opacity="0.85"/>
      <ellipse cx="-15" cy="-30" rx="4" ry="6" fill="#1a3a4a"/>
      <ellipse cx="15" cy="-30" rx="4" ry="6" fill="#1a3a4a"/>
      <path d="M -10 0 Q 0 10 10 0" stroke="#1a3a4a" stroke-width="1.5" fill="none"/>
    </g>` },
  { id: 'bird', title: 'Bird', sub: '1/1 BLUE', accent: '#5a90c0',
    art: `<g transform="translate(250 360)" fill="#5a90c0">
      <ellipse cx="0" cy="0" rx="60" ry="35"/>
      <circle cx="35" cy="-15" r="20"/>
      <polygon points="50,-15 80,-15 50,-5" fill="#d4b87a"/>
      <circle cx="40" cy="-18" r="3" fill="#1a0a05"/>
      <path d="M -40 -20 Q -90 -50 -80 0 Q -60 -10 -40 -10 Z" fill="#3a6090"/>
      <path d="M 30 30 L 50 60 M 0 30 L 20 60" stroke="#d4b87a" stroke-width="3"/>
    </g>` },
  { id: 'insect', title: 'Insect', sub: '1/1 GREEN', accent: '#9fc757',
    art: `<g transform="translate(250 360)" fill="#9fc757">
      <ellipse cx="0" cy="0" rx="30" ry="55"/>
      <circle cx="0" cy="-50" r="20"/>
      <line x1="-15" y1="-65" x2="-30" y2="-90" stroke="#9fc757" stroke-width="3"/>
      <line x1="15" y1="-65" x2="30" y2="-90" stroke="#9fc757" stroke-width="3"/>
      <ellipse cx="-50" cy="-10" rx="25" ry="40" fill="#9fc757" opacity="0.5" transform="rotate(-20 -50 -10)"/>
      <ellipse cx="50" cy="-10" rx="25" ry="40" fill="#9fc757" opacity="0.5" transform="rotate(20 50 -10)"/>
      <line x1="-20" y1="20" x2="-50" y2="40" stroke="#1a2a05" stroke-width="2"/>
      <line x1="20" y1="20" x2="50" y2="40" stroke="#1a2a05" stroke-width="2"/>
    </g>` },
  { id: 'thopter', title: 'Thopter', sub: '1/1 ARTIFACT', accent: '#a0a0b0',
    art: `<g transform="translate(250 360)" fill="#a0a0b0">
      <rect x="-20" y="-15" width="40" height="30" rx="4"/>
      <circle cx="0" cy="0" r="8" fill="#5a5a6a"/>
      <line x1="0" y1="-15" x2="0" y2="-50" stroke="#a0a0b0" stroke-width="3"/>
      <ellipse cx="-50" cy="-50" rx="55" ry="8" fill="#a0a0b0" opacity="0.6"/>
      <ellipse cx="50" cy="-50" rx="55" ry="8" fill="#a0a0b0" opacity="0.6"/>
      <polygon points="-15,15 -25,40 0,30 25,40 15,15" fill="#7a7a8a"/>
    </g>` }
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
    experience: { local: 'img/counters/experience.svg', scryfall: 'tc16/21' },
    oil:        { local: 'img/counters/oil.svg',        scryfall: 'tone/15' },
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
