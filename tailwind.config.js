/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./www/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        // Gold parchment (the primary UI accent — used in titles, borders, text)
        'mtg-gold':       '#c9a961',  // base gold (95 uses)
        'mtg-gold-light': '#d4b87a',  // lighter gold for highlights
        'mtg-gold-pale':  '#e8dcc4',  // body text on dark
        'mtg-gold-soft':  '#f5d98f',  // glow accents
        'mtg-gold-dim':   '#9a8765',  // secondary / muted gold
        'mtg-gold-faint': '#6a5a42',  // tertiary / disabled
        'mtg-gold-deep':  '#8a7555',  // borders at rest

        // Dark obsidian background scale
        'mtg-obsidian':   '#05030a',  // body bg
        'mtg-obsidian-2': '#0a0604',  // panel bg
        'mtg-obsidian-3': '#15100a',  // raised panel
        'mtg-obsidian-4': '#1a110a',  // hover / active
        'mtg-obsidian-5': '#2a1f14',  // card backs / radial centres

        // Mana / status colours
        'mana-w': '#fffbe6',          // white mana
        'mana-u': '#9fc7e6',          // blue mana / experience counter
        'mana-b': '#5a4060',          // black mana
        'mana-r': '#d97757',          // red mana
        'mana-g': '#7faf4f',          // green mana / poison counter
        'mana-c': '#a0a0b0',          // colourless

        // Status / accent
        'mtg-blood':   '#a0302c',     // damage, danger
        'mtg-blood-2': '#d48a86',     // poison pip text
        'mtg-energy':  '#d4b87a',     // energy counter
        'mtg-leaf':    '#b4d4a0',     // success
        'mtg-flame':   '#e8947a'      // attention
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        crimson: ['Crimson Pro', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'gold-glow':    '0 0 12px rgba(201, 169, 97, 0.3)',
        'gold-glow-lg': '0 0 24px rgba(201, 169, 97, 0.4)',
        'panel':        '0 4px 16px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'sanctum-in':  'sanctumIn 0.3s ease-out',
        'tab-fade-in': 'tabFadeIn 0.25s ease-out',
        'pet-pulse':   'petPulse 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
