/**
 * Token Queen design tokens.
 *
 * These aren't a new look. app.js contained 118 distinct hex values across 615
 * literals, but nine of them accounted for the overwhelming majority — the
 * palette was already there, it just wasn't written down anywhere, so every
 * new screen drifted a shade. This is that palette, named.
 *
 * The Vault had drifted furthest: its own greyer, cooler set (#c8a84b gold,
 * #6b6870 grey muted) against the warm brown the rest of the app uses. That's
 * the main reason the app didn't feel like one app.
 *
 * Canvas colours (Flappy Dragon) stay as literals — ctx.fillStyle can't
 * resolve a CSS custom property.
 */

export const tokens = {
  // Surfaces, darkest first
  '--tq-bg': '#05030a',
  '--tq-surface-deep': '#0a0604',
  '--tq-surface': '#1a110a',
  '--tq-surface-raised': '#241809',

  // Ink
  '--tq-ink': '#e8dcc4',        // parchment — body text
  '--tq-ink-dim': '#9a8765',    // warm brown — secondary
  '--tq-ink-faint': '#6a5a42',  // captions, disabled

  // Gold. The signature; used for anything active, chosen or emphasised.
  '--tq-gold': '#c9a961',
  '--tq-gold-deep': '#d4b87a',
  '--tq-gold-bright': '#f5d98f',

  // States
  '--tq-danger': '#d48a86',
  '--tq-info': '#9fc7e6',   // info blue, used across counters and hints
  '--tq-ink-mid': '#8a7555',   // between dim and faint
  '--tq-life': '#b4d4a0',   // life gain
  '--tq-life-deep': '#8fbc8f',   // life gain, deeper
  '--tq-ink-warm': '#b09870',   // raised label
  '--tq-danger-soft': '#e8947a',   // damage, lighter
  '--tq-danger-deep': '#a0302c',   // damage, deeper
  '--tq-brass': '#8a6f3a',   // inactive metal
  '--tq-edge': 'rgba(201, 169, 97, 0.22)',
  '--tq-edge-strong': 'rgba(201, 169, 97, 0.45)',
  '--tq-panel': 'rgba(201, 169, 97, 0.05)',

  // Type. The old scale was 7/8/9/10/11px — five sizes inside four pixels,
  // which produced no hierarchy and was genuinely hard to read at arm's length
  // in low light. This has a legible floor and real steps between levels.
  '--tq-label': '11px',   // Cinzel, tracked uppercase
  '--tq-body-sm': '13px',
  '--tq-body': '15px',
  '--tq-figure-sm': '20px',
  '--tq-figure': '28px',
  '--tq-figure-lg': '40px',

  // Families
  '--tq-display': "'Cinzel', serif",
  '--tq-text': "'Crimson Pro', serif",
  '--tq-mono': "'JetBrains Mono', monospace",

  // The smallest comfortable tap target for a thumb, one-handed, holding cards
  // in the other hand. Several button rows were sitting at about 28px.
  '--tq-tap': '44px',
};

/** JS-side access for inline styles: T.gold, T.ink, T.body … */
export const T = Object.fromEntries(
  Object.entries(tokens).map(([k, v]) => [k.replace('--tq-', '').replace(/-(\w)/g, (_, c) => c.toUpperCase()), `var(${k})`]),
);

/** Raw values, for the few places that can't take a CSS variable (canvas). */
export const raw = Object.fromEntries(
  Object.entries(tokens).map(([k, v]) => [k.replace('--tq-', '').replace(/-(\w)/g, (_, c) => c.toUpperCase()), v]),
);

/**
 * index.html already declares these in a <style> block so there's no flash of
 * unstyled colour on launch. This re-applies them at runtime, which matters
 * only if a future build ships tokens the HTML doesn't know about yet.
 */
export function install() {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(tokens)) {
    if (!root.style.getPropertyValue(k)) root.style.setProperty(k, v);
  }
}
