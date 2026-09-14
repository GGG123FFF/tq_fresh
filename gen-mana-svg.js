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
  // Real MTG pips are spheres: lit from the upper left, darker at the lower
  // right, with a high-contrast glyph. The old set drew flat glyphs in colours
  // close to their own backgrounds, which is why R and G were unreadable.
  W: {
    bg: '#fbf6e3', mid: '#efe2bd', rim: '#b9a271', ink: '#2e2413',
    glyph: `<g transform="translate(50 50)" fill="#2e2413">
      <circle r="12.5"/>
      <g>
        <path d="M0,-31 L4.6,-19 L-4.6,-19 Z"/>
        <path d="M0,31 L4.6,19 L-4.6,19 Z"/>
        <path d="M-31,0 L-19,4.6 L-19,-4.6 Z"/>
        <path d="M31,0 L19,4.6 L19,-4.6 Z"/>
        <path d="M-22,-22 L-12.4,-16.5 L-16.5,-12.4 Z"/>
        <path d="M22,22 L12.4,16.5 L16.5,12.4 Z"/>
        <path d="M-22,22 L-16.5,12.4 L-12.4,16.5 Z"/>
        <path d="M22,-22 L16.5,-12.4 L12.4,-16.5 Z"/>
      </g>
    </g>`
  },
  U: {
    bg: '#bfe6fb', mid: '#93cdf0', rim: '#4d8fb5', ink: '#0b2436',
    glyph: `<g transform="translate(50 50)">
      <path d="M0,-30 C-13,-12 -21,-1 -21,8 A21,21 0 0 0 21,8 C21,-1 13,-12 0,-30 Z" fill="#0b2436"/>
      <path d="M-11,2 C-13,9 -9,15 -3,16" stroke="#bfe6fb" stroke-width="3"
            fill="none" stroke-linecap="round" opacity="0.85"/>
    </g>`
  },
  B: {
    bg: '#cdc6bd', mid: '#aaa197', rim: '#6e665d', ink: '#13100e',
    glyph: `<g transform="translate(50 52)" fill="#13100e">
      <path d="M0,-28 C-16,-28 -25,-17 -25,-4 C-25,5 -20,12 -14,15 L-14,22
               C-14,25 -11,27 -8,27 L8,27 C11,27 14,25 14,22 L14,15
               C20,12 25,5 25,-4 C25,-17 16,-28 0,-28 Z"/>
      <ellipse cx="-9.5" cy="-6" rx="6.5" ry="7.5" fill="#cdc6bd"/>
      <ellipse cx="9.5" cy="-6" rx="6.5" ry="7.5" fill="#cdc6bd"/>
      <path d="M0,4 L-3.5,11 L3.5,11 Z" fill="#cdc6bd"/>
      <g fill="#cdc6bd">
        <rect x="-9" y="17" width="3.6" height="10" rx="1.2"/>
        <rect x="-1.8" y="17" width="3.6" height="10" rx="1.2"/>
        <rect x="5.4" y="17" width="3.6" height="10" rx="1.2"/>
      </g>
    </g>`
  },
  R: {
    bg: '#f6b3a2', mid: '#ec8a74', rim: '#b05340', ink: '#3d0f0a',
    glyph: `<g transform="translate(50 51)">
      <path d="M2,-31 C-6,-19 -13,-13 -17,-5 C-22,5 -19,17 -9,23
               C-14,14 -11,7 -5,3 C-6,11 -2,16 4,17 C-1,11 1,5 6,1
               C7,9 13,12 15,19 C22,11 22,-1 15,-10 C10,-16 5,-23 2,-31 Z"
            fill="#3d0f0a"/>
      <path d="M0,-5 C-5,2 -4,10 1,14 C5,10 6,3 2,-3 Z" fill="#f6b3a2" opacity="0.55"/>
    </g>`
  },
  G: {
    bg: '#b6ddb3', mid: '#8dc58c', rim: '#4f8451', ink: '#0d2611',
    glyph: `<g transform="translate(50 51)" fill="#0d2611">
      <path d="M0,-30 C-9,-24 -15,-16 -15,-8 C-21,-5 -24,2 -20,8
               C-23,14 -18,21 -11,20 C-7,25 2,26 6,21 C14,23 20,16 17,9
               C22,3 19,-5 13,-8 C13,-17 7,-25 0,-30 Z"/>
      <path d="M-3.6,10 L3.6,10 L2.4,29 L-2.4,29 Z"/>
      <path d="M0,14 L-8,7 M0,20 L8,13" stroke="#b6ddb3" stroke-width="2.2"
            stroke-linecap="round" fill="none"/>
    </g>`
  },
  C: {
    bg: '#d8d3cc', mid: '#bcb5ac', rim: '#7d766c', ink: '#22201d',
    glyph: `<g transform="translate(50 50)" fill="#22201d">
      <path d="M0,-30 L9,-9 L30,0 L9,9 L0,30 L-9,9 L-30,0 L-9,-9 Z"/>
      <path d="M0,-17 L5,-5 L17,0 L5,5 L0,17 L-5,5 L-17,0 L-5,-5 Z"
            fill="#d8d3cc" opacity="0.35"/>
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
