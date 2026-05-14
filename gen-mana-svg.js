#!/usr/bin/env node
/**
 * Generate mana symbol SVG fallbacks (W, U, B, R, G, C).
 * These are used when Scryfall's CDN is unreachable.
 * Design follows the standard MTG mana pip: outer ring + inner glyph.
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'www', 'img', 'mana');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Each mana symbol: { bg color, ring color, glyph SVG path drawn inside an 80x80 viewBox }
const SYMBOLS = {
  W: {
    bg: '#f8efd1', ring: '#cab682', text: '#3a2f1a',
    glyph: `<g transform="translate(50 50)" fill="#3a2f1a">
      <!-- Sun symbol: central disc + 8 rays -->
      <circle r="14" fill="#3a2f1a"/>
      <g stroke="#3a2f1a" stroke-width="6" stroke-linecap="round">
        <line x1="0" y1="-30" x2="0" y2="-22"/>
        <line x1="0" y1="22" x2="0" y2="30"/>
        <line x1="-30" y1="0" x2="-22" y2="0"/>
        <line x1="22" y1="0" x2="30" y2="0"/>
        <line x1="-21" y1="-21" x2="-15" y2="-15"/>
        <line x1="15" y1="15" x2="21" y2="21"/>
        <line x1="-21" y1="21" x2="-15" y2="15"/>
        <line x1="15" y1="-15" x2="21" y2="-21"/>
      </g>
    </g>`
  },
  U: {
    bg: '#aae0fa', ring: '#5fa2c6', text: '#0a2238',
    glyph: `<g transform="translate(50 50)">
      <!-- Water droplet -->
      <path d="M 0 -28 C -16 -10, -22 4, -14 18 C -8 28, 8 28, 14 18 C 22 4, 16 -10, 0 -28 Z" fill="#0a2238"/>
      <path d="M -8 -8 C -12 0, -10 8, -4 10" stroke="#aae0fa" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>`
  },
  B: {
    bg: '#cfc7c0', ring: '#7a716a', text: '#0a0506',
    glyph: `<g transform="translate(50 50)" fill="#0a0506">
      <!-- Skull shape -->
      <ellipse cx="0" cy="-2" rx="20" ry="22"/>
      <rect x="-12" y="14" width="24" height="14" rx="3"/>
      <!-- Eye sockets -->
      <ellipse cx="-7" cy="-4" rx="5" ry="6" fill="#cfc7c0"/>
      <ellipse cx="7" cy="-4" rx="5" ry="6" fill="#cfc7c0"/>
      <!-- Teeth gaps -->
      <line x1="-6" y1="14" x2="-6" y2="28" stroke="#cfc7c0" stroke-width="1.5"/>
      <line x1="0" y1="14" x2="0" y2="28" stroke="#cfc7c0" stroke-width="1.5"/>
      <line x1="6" y1="14" x2="6" y2="28" stroke="#cfc7c0" stroke-width="1.5"/>
      <!-- Nose -->
      <polygon points="0,8 -3,14 3,14"/>
    </g>`
  },
  R: {
    bg: '#fcb6a0', ring: '#c47358', text: '#3a0a05',
    glyph: `<g transform="translate(50 50)" fill="#3a0a05">
      <!-- Fireball / clenched fist (Scryfall uses a stylised punch) -->
      <path d="M -18 -8 Q -22 0 -18 12 L -12 18 Q -4 22 4 20 L 14 16 Q 22 10 22 0 Q 22 -10 14 -16 L 4 -20 Q -4 -22 -12 -18 L -18 -12 Z"/>
      <path d="M -10 -6 L -6 -2 M -2 -8 L 2 -4 M 6 -10 L 10 -6 M 12 -2 L 16 2" stroke="#fcb6a0" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </g>`
  },
  G: {
    bg: '#9bd3ae', ring: '#5a8a6a', text: '#0a2812',
    glyph: `<g transform="translate(50 50)" fill="#0a2812">
      <!-- Tree shape -->
      <ellipse cx="0" cy="-10" rx="20" ry="18"/>
      <ellipse cx="-12" cy="-4" rx="12" ry="14" opacity="0.85"/>
      <ellipse cx="12" cy="-4" rx="12" ry="14" opacity="0.85"/>
      <rect x="-3" y="6" width="6" height="22"/>
      <path d="M -3 14 L -10 22 M 3 14 L 10 22" stroke="#0a2812" stroke-width="3" stroke-linecap="round"/>
    </g>`
  },
  C: {
    bg: '#cac5b8', ring: '#88847a', text: '#2a2820',
    glyph: `<g transform="translate(50 50)" fill="#2a2820">
      <!-- Diamond (colourless symbol) -->
      <polygon points="0,-26 18,0 0,26 -18,0" stroke="#2a2820" stroke-width="2" fill="#9a9486"/>
      <polygon points="0,-16 10,0 0,16 -10,0" fill="#2a2820"/>
    </g>`
  }
};

function makeSVG(spec) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="${spec.bg}" stroke="${spec.ring}" stroke-width="3"/>
  <circle cx="50" cy="50" r="44" fill="none" stroke="${spec.ring}" stroke-width="0.8" opacity="0.5"/>
  ${spec.glyph}
</svg>`;
}

console.log('Generating mana symbol SVGs...');
for (const id of Object.keys(SYMBOLS)) {
  fs.writeFileSync(path.join(OUT_DIR, `${id}.svg`), makeSVG(SYMBOLS[id]));
  console.log(`  OK  mana/${id}.svg`);
}

// Numeric / generic — built dynamically at runtime, not bundled
console.log('Done.');
